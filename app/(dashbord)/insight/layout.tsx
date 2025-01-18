import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
//import { getGuestFromCookies } from '@/lib/authTools';
import '@/styles/global.css';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Insight',
    description: 'Insight   '
}
function Spacelayout({ children, souras, sprints, template }: {
    children: ReactNode, 
    souras: ReactNode,
    sprints: ReactNode,  template: ReactNode
}) {

    return (
        <main className='container mx-auto w-full  flex-col  justify-start items-center  min-h-screen gap-2 space-y-2 '>
         
            <section className=" h-52 container grid grid-cols-6 shadow-sm w-full    " >
                <div className="   bg-green-100/50 border  overflow-hidden   col-span-1 shadow-md " >
                    {souras}
                </div >
                <div className=" bg-green-100/50  shadow-md col-span-4 " >
                    {template}
                </div >
                <div className=" col-span-1 bg-green-100/50  overflow-hidden shadow-md " >
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
