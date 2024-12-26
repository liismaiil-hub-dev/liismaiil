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
        <main className=' flex-col container    p-2 h-full w-full justify-start items-stretch '>
                          {children}
        </main>
    )}

export default Stageslayout;
