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
        <main className='container mx-auto w-full   h-[calc(100vh-7rem)] relative'>
            <aside className=" absolute flex-col justify-start items-stretch border-sky-200/10 shadow-md  h-full top-0 left-0  w-[250px]" >

                <div className="flex flex-col justify-start items-stretch bg-green-50/50 border-sky-200 shadow-md  h-1/3 " >
                    {steps}
                </div >
                {/*  <div className="flex flex-col justify-start items-stretch bg-green-50/50 border-lime-100 shadow-md  h-1/3 " >
                    {sprints}
                </div > */}
            </aside>

            <section className="flex flex-col justify-start  items-start space-y-1  p-2 h-full ml-[250px]   " >
                {children}

            </section>
        </main>
    )
}

export default Stageslayout;
