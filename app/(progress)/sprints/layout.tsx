import Navigation from '@/components/front/Navigation';
import '@/styles/global.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'space liismaiil',
    description: 'space liismaiil board stages '
}

function Spacelayout({ children,souras, }: {
    children: ReactNode,  souras: ReactNode
}) {
    return (    <main className='container mx-auto w-full  flex flex-col  justify-start items-center h -full'>
                    <section className="container flex  border   w-full h-[calc(100vh-7rem)] justify-between items-center" >
                        <div className="flex flex-col justify-start items-start bg-green-200 border shadow-md w-1/4 h-full" >
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
                </main>
           
    )
}

export default Spacelayout;
