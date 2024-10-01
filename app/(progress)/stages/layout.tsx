'use client'
import '@/styles/global.css';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] })


function Stageslayout({ children, steps, sprints }: {
    children: ReactNode, steps: ReactNode, sprints: ReactNode
}) {
    return (
        <main className='container mx-auto w-full   h-full'>
            <section className="container flex  flex-row   w-full h-[calc(100vh-7rem)] justify-between items-start" >
                <div className="flex flex-col justify-start items-stretch border-sky-200 shadow-md  h-full w-1/4" >
                    <div className="flex flex-col justify-start items-stretch bg-green-50/50 border-sky-200 shadow-md  h-1/3 " >

                        {steps}
                    </div >
                    <div className="flex flex-col justify-start items-stretch bg-green-50/50 border-lime-100 shadow-md  h-1/3 " >
                        {sprints}
                    </div >
                </div >
                <div className="flex flex-col justify-start items-start space-y-1 border-3   w-full h-[calc(100vh-7rem)] " >
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

export default Stageslayout;
