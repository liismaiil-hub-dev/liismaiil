import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'space liismaiil',
    description: 'space liismaiil board stages '
}

function Spacelayout({ children, sprint, board }:
    { children: React.ReactNode, sprint: React.ReactNode, stage: React.ReactNode, board: React.ReactNode }) {
    return (    <div id="spacePage" className="flex flex-col justify-start items-center gap-3 md:w-full mt-10  h-full " >
               
                    {children}
               </div>
       )
}

export default Spacelayout;
