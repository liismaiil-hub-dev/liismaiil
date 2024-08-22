'use client'
import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
import '@/styles/global.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })

//const Navigation = dynamic(()=> import('@/components/front/Navigation'),{ssr:false})

function SpaceTemplate({ children }: {
    children: ReactNode
}) {
 
    return (
                <div className="flex flex-col justify-center items-center    w-full h-full" >
                            {/* 
                            <div className="flex  justify-start   bg-orange-200 w-full h-full text-medium text-gray-500" >
                            {board}
                            </div> */}

                            {children}

                        </div >

       
    )
}

export default SpaceTemplate;
