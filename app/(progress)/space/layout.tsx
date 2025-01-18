import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
//import { getGuestFromCookies } from '@/lib/authTools';
import '@/styles/global.css';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Space',
    description: 'Open Space Access  '
}
function Spacelayout({ children, souras, sprints, grid }: {
    children: ReactNode, 
    souras: ReactNode,
    sprints: ReactNode,  grid: ReactNode
}) {

    return (
        <main className='container mx-auto w-full  flex-col  justify-start items-center  min-h-screen gap-2 space-y-2 '>
         
            <section className=" h-52 container grid grid-cols-6 shadow-sm w-full    " >
                <div className="   bg-green-100/50 border  overflow-y-scroll   col-span-1 shadow-md " >
                    {souras}
                </div >
                <div className=" bg-green-100/50  shadow-md overflow-y-scroll  col-span-4 " >
                    {grid}
                </div >
                <div className=" col-span-1 bg-green-100/50  overflow-y-scroll shadow-md " >
                    {sprints}
                </div >
            </section>
            <section className="container flex-col w-full   ring-red-300/80 justify-start items-center" >
                {children}
            </section>
        </main>
    )
}

export default Spacelayout;
