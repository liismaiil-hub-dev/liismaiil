'use client'
import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
import { RootStateType } from '@/store/store';
import '@/styles/global.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

const inter = Inter({ subsets: ['latin'] })

//const Navigation = dynamic(()=> import('@/components/front/Navigation'),{ssr:false})

function HostLayout({ children, stages, sprints, guests }: {
    children: ReactNode, sprints: ReactNode,

    stages: ReactNode, guests: ReactNode
}) {

    const { gridSelected, hideNbContext, spaceGridsSelected, evalIndex, shuffeledAyahsContext, orderedAyahsContext, gridIndexContext, evalContext } = useSelector((state: RootStateType) => state.stage)

    const path = usePathname();
    return (
        <main className='container mx-auto w-full  flex flex-col  justify-start items-center  min-h-screen '>
            {/*  <section className="container flex   w-full max-h-52  ring-2 ring-yellow-300/80 justify-between items-center" >
                <div className="h-52  w-1/4 bg-green-100/70 border 
                        shadow-md " >
                    {stages}
                </div >
                <div className="flex flex-col justify-start items-center bg-emerald-600/100 border border-yellow-200 shadow-md w-1/2" >
                    {sprints}
                </div >
                <div className="flex flex-col justify-start items-center bg-green-100/50 border shadow-md w-1/4" >
                    {guests}
                </div >
            </section> */}
            <section className="container flex-col   w-full  h-full  ring-2 ring-red-300/80 justify-start items-center" >

                   {/* 
                            <div className="flex  justify-start   bg-orange-200 w-full h-full text-medium text-gray-500" >
                            {board}
                            </div> */}

                    {children}

                
            </section>
        </main>


    )
}

export default HostLayout;
