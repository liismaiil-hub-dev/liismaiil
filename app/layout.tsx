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
import Guests from "@/components/front/Guests";
import Navigation from '@/components/front/Navigation';
import { Providers } from '@/store/Providers';
import { persistor } from '@/store/store';
import { ReactNode } from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloWrapper } from './ApolloWraper';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })


export const viewport = {
  themeColor: "#FFFFFF",
};



function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en" className='light'>
    <body className={`${inter.className} h-screen w-screen`}>
      <NextSeo {...SEO} />
      <ToastContainer position="top-center" />
      <ApolloWrapper>
        <Providers >
          <NextUIProvider >
            <PersistGate persistor={persistor}>
              <ErrorBoundary fallback={<ErrorBoundaryComp />}>
                <main className='container mx-auto w-full h-fit flex flex-col  justify-start items-center '>
                  <div className='container '>
                    <Navigation />
                  </div>

                  <div className='container w-full border-2 border-green-300 flex flex-col pt-24 justify-start items-center '>
                    {children}
                  </div>
                  <div className="flex border-2 border-violet-500  justify-center items-center">
                    <Guests guests={[]} />
                    {/*      {typeof organisations !== 'undefined' && typeof organisations[0] !== 'undefined' && organisations[0]['email'] !== '' && <MapComponent />}
    */}
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
  )
}

export default RootLayout