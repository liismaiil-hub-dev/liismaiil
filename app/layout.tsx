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
import GuestsComponents from "@/components/front/Guests";
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { ApolloWrapper } from "./ApolloWrapper";
const inter = Inter({ subsets: ['latin'] })
export const viewport = {
  themeColor: "#FFFFFF",
};
function RootLayout({ children }: { children: ReactNode }) {
 const pathname = usePathname()

 
  return <html lang="en" className='light'>
    <head>
    <script async
    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&loading=async&libraries=places&callback=initMap`}>
</script>
      </head>
    <body className={`${inter.className} h-screen w-screen`}>
          <ApolloWrapper>   
      <NextSeo {...SEO} />
      <ToastContainer position="top-center" />
        <Providers >
          <NextUIProvider >
            <PersistGate persistor={persistor}>
              <ErrorBoundary fallback={<ErrorBoundaryComp />}>
                <main className='container mx-auto w-screen  flex flex-col space-y-1 max-h-screen  justify-start items-center '>
                  <div className='container '>
                    <Navigation />
                  </div>
                  {pathname ==='/' ?
                   <div className=' container  flex flex-col gap-3 justify-start items-center'>
                  <div className='  container border-2  rounded-md border-green-700/20 shadow-md '>
                    {children}
                  </div>
                  <div className="flex flex-col  justify-start w-full items-start">
                    <GuestsComponents />
                  </div>
                  <div className="flex justify-center w-full items-center">
                    <Footer />
                  </div>
                  </div>: 
                  <div className='container border-2   scrollbar-hide rounded-r-md border-green-300 flex flex-col  justify-start items-center w-full h-full '>
                    {children}
                  </div>
                 }
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