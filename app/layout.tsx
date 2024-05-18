import { useApollo } from '@/lib/apolloClient';
import SEO from '@/lib/next-seo-config';
import ThemeProvider from "@/store/theme-provider";
import { dmSans, dmSerif, ranga, roboto } from '@/styles/fonts';
import '@/styles/global.css';
import { ApolloProvider } from '@apollo/client';
import { NextSeo } from 'next-seo';
import { ToastContainer } from 'react-toastify';

import Footer from '@/components/layouts/Footer';
import { Providers } from '@/store/Providers';
import { persistor } from '@/store/store';
import type { Metadata } from "next";
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
/* import { useEffect, useState } from 'react'; */
import ErrorBoundaryComp from "@/components/front/ErrorBoundaryComp";
import Navigation from '@/components/front/Navigation';
import { ErrorBoundary } from "react-error-boundary";

const APP_NAME = "liismaiil-hub";
const APP_DEFAULT_TITLE = "liismaiil hub App";
const APP_TITLE_TEMPLATE = "%s |  liismaiil hub App";
const APP_DESCRIPTION = "lismaiil 1asas tool";


export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};
function Layout({ children, title }) {
  const apolloClient = useApollo(pageProps)

  return (




    <main className='h-screen w-full font-mont overflow-x-hidden justify-center items-center '>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="liismaiil tools and entertainment  " />
        <NextSeo {...SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="top-center" />

      <Navigation />

      {/*         <main className=" m-auto max-w-7xl  "> */}
      {/* 
                <div id="dark-mode-toggle" onClick={darkToggleHandler}
                    className="fixed top-24 right-0 inline-block w-12 cursor-pointer 
            rounded-l-xl 
            bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900 p-2 
            text-3xl">
                    {!dark ? <SunIcon onClick={darkToggleHandler} className="h-6 w-6 text-blue-500" /> :
                        <MoonIcon onClick={darkToggleHandler} className="h-6 w-6 text-blue-500" />
                    }
                </div> */}
      <ErrorBoundary fallback={<ErrorBoundaryComp />}>

        <ApolloProvider client={apolloClient}>

          <Providers >
            <ThemeProvider >
              <PersistGate loading={<div className="flex">Looding in progress</div>}
                persistor={persistor}>
                <main className={` ${dmSans.className} ${dmSerif.className} ${ranga.className} ${roboto.className}`}>
                  <div className='w-full flex justify-center items-center '>
                    {children}
                  </div>
                </main>
                <Footer />
              </PersistGate>
            </ThemeProvider >

          </Providers >
        </ApolloProvider>

      </ErrorBoundary>
      {/* </main > */}
    </main>
  )
}

export default Layout