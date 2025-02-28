'use client'
//import { useApollo } from '@/lib/apolloClient';
import ErrorBoundaryComp from "@/components/front/ErrorBoundaryComp";
import SEO from '@/lib/next-seo-config';
import '@/styles/global.css';
import { NextSeo } from 'next-seo';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
import Navigation from '@/components/front/Navigation';
//import { getGuestFromCookies } from "@/lib/authTools";
import { Providers } from '@/store/Providers';
import { persistor } from '@/store/store';
import { Inter } from 'next/font/google';
import { ReactNode } from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloWrapper } from "./ApolloWrapper";

const inter = Inter({ subsets: ['latin'] })
export const viewport = {
  themeColor: "#FFFFFF",
};
function RootLayout({ children }: { children: ReactNode }) {
  /*   
    useEffect(() => {
      const getCurrentGuest = async () => { 
       const _connectedGuest =  await getGuestFromCookies()
        console.log({_connectedGuest});
        
  }
  getCurrentGuest();
    }, []);
    
   */
  return <html lang="en" className='light'>
    <head>
      <script async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&loading=async&libraries=places&callback=initMap`}>
      </script>
    </head>
    <body className={`${inter.className} h-screen w-screen`}>
      <NextSeo {...SEO} />
      <ToastContainer position="top-center" />
      <ApolloWrapper >

        <Providers >
          <PersistGate persistor={persistor}>
            <ErrorBoundary fallback={<ErrorBoundaryComp />}>
              <main className='container mx-auto w-screen  flex flex-col space-y-1 max-h-screen  justify-start items-center '>
                <div className='container' >
                  <Navigation />
                </div>
                <div className='container    overflow-scroll  flex flex-col  justify-start items-stretch w-full h-full '>
                  {children}
                </div>

              </main>
            </ErrorBoundary>
          </PersistGate>
        </Providers >
      </ApolloWrapper >

    </body>
  </html >

}

export default RootLayout