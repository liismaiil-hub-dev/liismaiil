'use client'
//import { useApollo } from '@/lib/apolloClient';
import ErrorBoundaryComp from "@/components/front/ErrorBoundaryComp";
import Footer from '@/components/layouts/Footer';
import SEO from '@/lib/next-seo-config';
import '@/styles/global.css';
import { NextUIProvider } from "@nextui-org/react";
import { NextSeo } from 'next-seo';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
import Navigation from '@/components/front/Navigation';
import { Providers } from '@/store/Providers';
import { persistor } from '@/store/store';
import { ReactNode } from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloWrapper } from './ApolloWraper';

import GuestsComponents from "@/components/front/Guests";
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })


export const viewport = {
  themeColor: "#FFFFFF",
};



function RootLayout({ children }: { children: ReactNode }) {

  return <html lang="en" className='light'>
    <body className={`${inter.className} h-screen w-screen`}>
      <NextSeo {...SEO} />
      <ToastContainer position="top-center" />
      <ApolloWrapper>
        <Providers >
          <NextUIProvider >
            <PersistGate persistor={persistor}>
              <ErrorBoundary fallback={<ErrorBoundaryComp />}>
                <main className='container mx-auto w-screen  h-screen flex flex-col space-y-1 justify-start items-center '>
                  <div className='container '>
                    <Navigation />
                  </div>
                  <div className='container border-2 h-1/2  scrollbar-hide rounded-r-md border-green-300
                   flex flex-col  justify-start items-start '>
                    {children}
                  </div>
                  <div className="flex border-2 h-full w-full  border-violet-500  justify-start items-center">
                    <GuestsComponents />
                  </div>
                  <div className="flex justify-center items-center">
                    <Footer />
                  </div>
                </main>
              </ErrorBoundary>
            </PersistGate>
          </NextUIProvider >
        </Providers >
      </ApolloWrapper>
    </body>
  </html >

}

export default RootLayout