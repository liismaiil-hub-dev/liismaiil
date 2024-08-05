import ErrorBoundaryComp from "@/components/front/ErrorBoundaryComp";
import SEO from '@/lib/next-seo-config';
import '@/styles/global.css';
import { NextUIProvider } from "@nextui-org/react";
import { NextSeo } from 'next-seo';
import { Inter } from 'next/font/google';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
import { persistor } from '@/store/store';
import { ReactNode } from "react";
import { PersistGate } from 'redux-persist/integration/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'space liismaiil',
    description: 'space liismaiil board stages '
}

function Spacelayout({ children,souras, }: {
    children: ReactNode,  souras: ReactNode
}) {
    return (   
        <main className='container mx-auto w-full  flex flex-col  justify-start items-center h-full'>
      <NextSeo {...SEO} />
      <ToastContainer position="top-center" />
          <NextUIProvider >
            <PersistGate persistor={persistor}>
              <ErrorBoundary fallback={<ErrorBoundaryComp />}>
                  <section className="container flex  border flex-row   w-full h-[calc(100vh-7rem)] justify-between items-center" >
                        <div className="flex flex-col justify-start items-start bg-green-100 border shadow-md  h-full" >
                            {souras}
                        </div >
                        <div className="flex flex-col justify-between items-start space-y-3 border-3   w-full h-full" >
                            {/* 
                            <div className="flex  justify-start   bg-orange-200 w-full h-full text-medium text-gray-500" >
                                {board}
                            </div> */}

                            {children}

                        </div >

                    </section>
            </ErrorBoundary> 
            </PersistGate>
                  </NextUIProvider>
                </main>
)
}

export default Spacelayout;
