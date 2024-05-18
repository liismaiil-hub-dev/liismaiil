import { useApollo } from '@/lib/apolloClient';
import SEO from '@/lib/next-seo-config';
import ThemeProvider from "@/store/theme-provider";
import { dmSans, dmSerif, ranga, roboto } from '@/styles/fonts';
import '@/styles/global.css';
import { ApolloProvider } from '@apollo/client';
import { NextSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import { Providers } from '@/store/Providers';
import { persistor } from '@/store/store';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
}

export default function myApp({ Component, pageProps }: AppProps & Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const apolloClient = useApollo(pageProps)
  const getLayout = Component?.getLayout! || ((page) => page)
  //console.log({config});


  // If loading a variable font, you don't need to specify the font weight
  return (

    <>
      <Head>
        <title>liismaiil hub </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NextSeo {...SEO} />


      <ToastContainer position="top-center" />

      <ApolloProvider client={apolloClient}>

        <Providers >
          <ThemeProvider >
            <PersistGate loading={<div className="flex">Looding in progress</div>}
              persistor={persistor}>
              <main className={` ${dmSans.className} ${dmSerif.className} ${ranga.className} ${roboto.className}`}>
                {getLayout(<Component {...pageProps} />, pageProps)}
              </main>
            </PersistGate>
          </ThemeProvider >

        </Providers>
      </ApolloProvider>

    </>
  )
}
/* export function reportWebVitals(metrics) {
    console.log({metrics  })  
} */