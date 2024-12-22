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
        <main className=' flex-col container h-full w-full justify-between items-stretch '>
                <div className=" flex -mt-10  justify-center items-center shadow-md px-3  " >
                    {steps}
                </div >
               {/*  <div className="flex flex-col justify-start items-stretch bg-green-50/50 border-lime-100 shadow-md  h-1/3 " >
                    {sprints}
                </div >  */}
            
            <section className="col-span-3 flex flex-col justify-start  items-stretch space-y-1   p-2 h-full" >
                {children}

            </section>
        </main>
    )
}

export default Stageslayout;
