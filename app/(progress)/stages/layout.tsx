import '@/styles/global.css';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

/* import { useEffect, useState } from 'react'; */
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] })


function Stageslayout({ children, steps }: {
    children: ReactNode, steps: ReactNode, 
}) {
    //  h-[calc(100vh-7rem)]
    return (
        <main className='container  flex-col justify-start items-stretch w-full '>
                <div className=" flex flex-col justify-start items-stretch p-1 shadow-md    " >
                    {steps}
                </div > 
                 {/*  <div className="flex flex-col justify-start items-stretch bg-green-50/50 border-lime-100 shadow-md  h-1/3 " >
                    {sprints}
                </div > */}
            
            <div className="flex flex-col justify-start  items-stretch space-y-1  h-screen  " >
                {children}

            </div>
        </main>
    )
}

export default Stageslayout;
