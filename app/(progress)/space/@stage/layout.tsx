import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })



function Spacelayout({ children, }:
    { children: React.ReactNode, sprint: React.ReactNode, stage: React.ReactNode, board: React.ReactNode }) {
    return (    <div id="spacePage" className="flex flex-col border-3  justify-center items-center  " >
               
                    {children}
               </div>
       )
}

export default Spacelayout;
