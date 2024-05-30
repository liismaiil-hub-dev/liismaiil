import ErrorBoundaryComp from "@/components/front/ErrorBoundaryComp";
import Navigation from '@/components/front/Navigation';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'space liismaiil',
    description: 'space liismaiil board stages '
}

function Spacelayout({ children, sprint, stage, board }: {
    children: ReactNode, sprint: ReactNode,
    stage: ReactNode, board: ReactNode
}) {
    return (<html lang="en" className='light'>
        <body className={`${inter.className} h-screen w-screen`}>
            <ErrorBoundary fallback={<ErrorBoundaryComp />}>

                <main className='container mx-auto w-full h-fit flex flex-col  justify-start items-center '>
                    <div className='container '>
                        <Navigation />
                    </div>

                    <section className="container flex  mt-40 w-full justify-between items-center" >
                        <div className="flex flex-col justify-start items-center  w-1/4 overflow-visible" >
                            {sprint}
                        </div >
                        <div className="flex flex-col justify-start items-center h-full  w-full border  border-emerald-700
                 bg-green-400 text-sm text-blue-800" >
                            <div className="flex  justify-between items-center nowrap max-h-1/4   border
                      border-emerald-700 bg-green-400 text-sm text-blue-800" >

                                {stage}
                            </div>
                            {/* 
                            <div className="flex  justify-start items-center h-full   border 
                     bg-slate-600 text-sm text-gray-500" >
                                {board}
                            </div> */}
                            <div className="flex  justify-start items-center h-full   border 
                     bg-slate-600 text-sm text-gray-500" >

                                {children}
                            </div >
                        </div>
                    </section>
                </main>
            </ErrorBoundary>

        </body>
    </html>
    )
}

export default Spacelayout;
