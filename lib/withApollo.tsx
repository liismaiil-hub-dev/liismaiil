
import React from 'react';
import { NextPage } from 'next';
import { ApolloProvider, ApolloClient, ApolloLink, concat, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

type ApolloClientCache = any;

interface WithApolloInitialProps {
  apolloState?: ApolloClientCache;
}
interface WithApolloProps extends WithApolloInitialProps {
  apolloClient?: ApolloClient<ApolloClientCache>;
}

let apolloClient: ApolloClient<ApolloClientCache> | null = null;
/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/ban-types
export function withApollo<PageProps extends object, PageInitialProps = PageProps>(
  PageComponent: NextPage<PageProps, PageInitialProps>,
  { ssr = true } = {}
) {
  const WithApollo: NextPage<PageProps & WithApolloProps, PageInitialProps & WithApolloInitialProps> =
    // eslint-disable-next-line react/prop-types
    ({ apolloClient, apolloState, ...pageProps }) => {
      const client = apolloClient || initApolloClient(apolloState);
      return (
        <ApolloProvider client={client}>
          <PageComponent {...(pageProps as PageProps)} />
        </ApolloProvider>
      );
    };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const { AppTree } = ctx;
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {} as PageInitialProps;
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              //entire tree of the application
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState?: ApolloClientCache) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)

  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export function createApolloClient(initialState: ApolloClientCache = {}) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  //const token = localStorage.getItem('token');
  //console.log({ token });
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authtoken: typeof window !== 'undefined' ? window.localStorage.getItem('authtoken') : null,
        authorization: typeof window !== 'undefined' ? `Bearer ${window.localStorage.getItem('authorization')}` : null,
      },
    }));

    return forward(operation);
  });
  let graphuri = process.env.NEXT_PUBLIC_GRAPH_PROD;
  if (process.env.NODE_ENV === 'development') {
    graphuri = process.env.NEXT_PUBLIC_GRAPH_DEV;
    //console.log({ graphuri })
  } //console.log({ authLink });
  const httpLink = new HttpLink({
    uri: graphuri, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch,
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache().restore(initialState),
    name: 'liismaiil',
    version: '1.1',
  });
}
