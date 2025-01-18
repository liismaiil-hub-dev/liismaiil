import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'stages',
    description: 'stages progress '
}

function Spacelayout({ children, sprint, board }:
    { children: React.ReactNode, sprint: React.ReactNode, stage: React.ReactNode, board: React.ReactNode }) {
    return (    <div id="spacePage" className="flex flex-col justify-center items-center  " >
               
                    {children}
               </div>
       )
}

export default Spacelayout;
