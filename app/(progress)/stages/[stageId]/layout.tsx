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
        <main className=' flex-col container    p-2 h-full w-full justify-start items-stretch '>
   {/*     <div className="grid grid-cols-2 h-44 ">
             <div className="flex-col justify-start items-stretch col-span-1 overflow-x-scroll">
             {guests}
             </div>
             <div className="flex-col justify-start items-stretch col-span-1 overflow-x-scroll">
             {sprints}
             </div>
             </div>

    */}          <div className="flex-col justify-start items-stretch h-full overflow-x-scroll">
             
                          {children}
                          </div>
        
        </main>
    )}

export default Stageslayout;
