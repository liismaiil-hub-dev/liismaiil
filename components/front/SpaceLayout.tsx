import Head from 'next/head'

import useInterface from '@/store/hooks/useInterface'
import Footer from 'components/Layout/Footer'
import Navigation from './Navigation'
import SideBar from './SideBar'
function SpaceLayout({ children, title }) {
    const { show } = useInterface()
    console.log('layout')
    return (
        <main className='min-h-screen w-screen font-mont overflow-x-hidden '>
            <Head>
                <title>{title}</title>
                <meta name="description" content="liismaiil asaas dashboard " />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation />

            <main className="grid grid-cols-[300px_1fr] m-auto max-w-screen-2xl m-auto ">
                <SideBar />

                <div className='bg-violet-300  min-h-screen'>
                    {children}
                </div>
            </main>
            <div className=' w-full flex justify-center items-center '>
                <Footer />
            </div>
        </main>

    )
}

export default SpaceLayout