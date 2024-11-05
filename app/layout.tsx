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
import { getGuestFromCookies } from "@/lib/authTools";
import { Providers } from '@/store/Providers';
import { persistor } from '@/store/store';
import { Inter } from 'next/font/google';
import { ReactNode } from "react";
import { PersistGate } from 'redux-persist/integration/react';


const inter = Inter({ subsets: ['latin'] })
export const viewport = {
  themeColor: "#FFFFFF",
};
async function RootLayout({ children }: { children: ReactNode }) {
  const _guest = await getGuestFromCookies()
  const guest = _guest ?? {
    flag: '', host: -1, tokenId: -1, status: '', collaboratorId: ''
  }

  return <html lang="en" className='light'>
    <head>
      <script async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&loading=async&libraries=places&callback=initMap`}>
      </script>
    </head>
    <body className={`${inter.className} h-screen w-screen`}>
      <NextSeo {...SEO} />
      <ToastContainer position="top-center" />
      <Providers >
        <PersistGate persistor={persistor}>
          <ErrorBoundary fallback={<ErrorBoundaryComp />}>
            <main className='container mx-auto w-screen  flex flex-col space-y-1 max-h-screen  justify-start items-center '>
              <div className='container' >
                <Navigation guest={guest} />
              </div>
              <div className='container border-2   scrollbar-hide rounded-r-md border-green-300 flex flex-col  justify-start items-center w-full h-full '>
                {children}
              </div>

            </main>
          </ErrorBoundary>
        </PersistGate>
      </Providers >

    </body>
  </html >

}

export default RootLayout