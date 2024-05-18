import Footer from 'components/Layout/Footer'
import Head from 'next/head'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryComp from "../front/ErrorBoundaryComp"
import Navigation from './Navigation'
import SideBar from './SideBar'

function SpaceLayout({ children, title }) {

    return (
        <main className='h-screen w-full font-mont  '>
            <Head>
                <title>{title}</title>
                <meta name="description" content="liismaiil space " />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='mb-3'>
                <Navigation />
            </div>
            <ErrorBoundary fallback={<ErrorBoundaryComp />}>

                <main className="relative grid  sm:flex-col grid-cols-[250px_1fr] mt-[25px]  ">
                    <div className='sm:hidden'>
                        <SideBar />
                    </div>

                    <div className='bg-violet-20  overflow-x-hidden w-full h-full'>
                        {children}
                    </div>
                </main>
            </ErrorBoundary>
            <div className='  flex justify-center items-center   w-full '>
                <Footer />
            </div>
        </main>

    )
}

export default SpaceLayout