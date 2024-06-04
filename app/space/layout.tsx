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

function Spacelayout({ children, grid, stage, board }: {
    children: ReactNode, sprint: ReactNode,
    stage: ReactNode, board: ReactNode, grid: ReactNode
}) {
    return (<html lang="en" className='light'>
        <body className={` h-screen w-screen`}>
            <ErrorBoundary fallback={<ErrorBoundaryComp />}>

                <main className='container mx-auto w-full  flex flex-col  justify-start items-center h -full'>
                    <div className='container '>
                        <Navigation />
                    </div>

                    <section className="container flex  border bg-green-100 border-blue-600 w-full h-screen justify-between items-center" >

                        <div className="flex flex-col justify-start items-center border border-amber-500 w-1/4 h-full" >
                            {grid}
                        </div >
                        <div className="flex flex-col justify-start items-start space-y-3 border border-amber-500 w-3/4 
                        h-full" >


                            {/* <div className="flex  justify-between items-center nowrap max-h-1/4   border
                      border-emerald-700 bg-green-400 text-sm text-blue-800" >

                            {stage}
                        </div> */}
                            <div className="flex  justify-start items-start h-full bg-slate-100 w-full border  text-sm text-gray-500" >
                                {board}
                            </div>
                            <div className="flex  justify-start items-start h-full w-full  border
                      border-emerald-700  font-semibold text-gray-500" >

                                {children}
                            </div >
                        </div >

                    </section>
                </main>
            </ErrorBoundary>

        </body>
    </html >
    )
}

export default Spacelayout;
