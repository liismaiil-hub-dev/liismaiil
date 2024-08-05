import ErrorBoundaryComp from "@/components/front/ErrorBoundaryComp";
import Navigation from '@/components/front/Navigation';
import { Providers } from '@/store/Providers';
import '@/styles/global.css';
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'space liismaiil',
    description: 'space liismaiil board stages '
}

function Spacelayout({ children,souras, stage, board }: {
    children: ReactNode, sprint: ReactNode,
    stage: ReactNode, board: ReactNode, grid: ReactNode
}) {
    return (<html lang="en" className='light'>
        <body className={` h-screen w-screen`}>
            <ErrorBoundary fallback={<ErrorBoundaryComp />}>
      <ToastContainer position="top-center" />
        <Providers >
          <NextUIProvider >
            
                <main className='container mx-auto w-full  flex flex-col  justify-start items-center h -full'>
                    <div className='container '>
                        <Navigation />
                    </div>
                    <section className="container flex border   w-full h-[calc(100vh-7rem)] justify-between items-start" >
                        <div className="flex flex-col justify-start items-center bg-green-200 border shadow-md w-1/4 h-full" >
                            {souras}
                        </div >
                        <div className="flex flex-col justify-between items-start space-y-3 border-3   w-3/4 h-full" >
                            {/* 
                            <div className="flex  justify-start   bg-orange-200 w-full h-full text-medium text-gray-500" >
                                {board}
                            </div> */}

                            {children}

                        </div >

                    </section>
                </main>
            </NextUIProvider >
        </Providers >
            </ErrorBoundary>

        </body>
    </html >
    )
}

export default Spacelayout;
