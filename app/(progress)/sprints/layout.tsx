import '@/styles/global.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'space liismaiil',
    description: 'space liismaiil board stages '
}

function Spacelayout({ children, sprints, }: {
    children: ReactNode, sprints: ReactNode
}) {

    return (<main className='container mx-auto w-full  flex flex-col  justify-start items-center h -full'>
        <section className="container flex  border   w-full h-52 justify-center items-center" >
            {sprints}
        </section>

        <section className="container flex  w-full h-full  justify-centr items-center" >


            {children}

        </section>
    </main>

    )
}

export default Spacelayout;
