import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'space liismaiil',
    description: 'space liismaiil board stages '
}

function Spacelayout({ children, sprint, board }:
    { children: React.ReactNode, sprint: React.ReactNode, stage: React.ReactNode, board: React.ReactNode }) {
    return (<html lang="en" className='dark'>
        <body className={`${inter.className} h-screen w-screen`}>
            <div id="spacePage" className="flex flex-col justify-start items-center gap-3 md:w-full mt-10  h-full " >
                <div className="flex flex-col justify-start items-center  w-full overflow-visible" >
                    {sprint}
                </div >
                <div className="flex justify-start items-start h-3/4  w-full border  border-emerald-700 bg-green-400 text-sm text-blue-800" >

                    <div className="flex  justify-start items-start h-full  w-3/4 border  bg-slate-300 text-sm text-gray-500" >
                        {board}
                    </div>
                    {children}
                </div >
            </div>
        </body>
    </html>
    )
}

export default Spacelayout;
