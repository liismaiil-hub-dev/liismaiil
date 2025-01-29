import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })



function Guestlayout({ children, }:
    { children: React.ReactNode, }) {
    return (    <div id="spacePage" className="flex flex-col border-3  justify-start items-stretch w-full h-screen  " >
               
                    {children}
               </div>
       )
}

export default Guestlayout;
