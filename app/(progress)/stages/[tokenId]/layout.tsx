'use client'
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
import { ApolloWrapper } from "@/app/ApolloWrapper";
import { Providers } from '@/store/Providers';
import { persistor } from '@/store/store';
import { ReactNode } from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })


function Stageslayout({ children,souras, }: {
    children: ReactNode,  souras: ReactNode
}) {
   const params =   useParams()
   console.log({params});
   
    return (   
        <main className='container w-full   h-full'>
      <NextSeo {...SEO} />
    <ToastContainer position="top-center" />
         <ApolloWrapper>
            <Providers >
            <NextUIProvider >
            <PersistGate persistor={persistor}>
              <ErrorBoundary fallback={<ErrorBoundaryComp />}>
                  <section className="container flex  border   border-blue-600  w-full h-[calc(100vh-7rem)] justify-start items-center" >
                        <div className="flex flex-col justify-start items-start bg-green-50 border shadow-md  h-full w-1/2" >
                            {souras}
                        </div >
                        <div className="flex flex-col justify-start items-start border-3   w-full h-full " >
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
                  </Providers>
        </ApolloWrapper>
                
                </main>
)
}

export default Stageslayout;
