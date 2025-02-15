import '@/styles/global.css';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] })


function Stageslayout({ children, guests, sprints }: {
    children: ReactNode, guests: ReactNode, sprints: ReactNode
}) {
    return (
        <main className=' flex-col container    p-1 h-full w-full justify-start items-stretch '>
                          {children}
        
        </main>
    )}

export default Stageslayout;
