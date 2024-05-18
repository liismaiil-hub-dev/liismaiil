import { menuActions } from '@/store/slices/menuSlice';
import { RootStateType } from '@/store/store';
import Footer from 'components/Layout/Footer';
import type { Metadata } from "next";
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundaryComp from "../front/ErrorBoundaryComp";
import Navigation from './Navigation';

const APP_NAME = "liismaiil-hub";
const APP_DEFAULT_TITLE = "liismaiil hub App";
const APP_TITLE_TEMPLATE = "%s |  liismaiil hub App";
const APP_DESCRIPTION = "lismaiil 1asas tool";


export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport = {
    themeColor: "#FFFFFF",
};
function Layout({ children, title }) {
    const dispatch = useDispatch()
    const { dark } = useSelector((state: RootStateType) => state.menu)
    const { setDark } = menuActions


    const [backend, setBackend] = useState(false)

    const darkToggleHandler = () => {
        dispatch(setDark({ dark: !dark }))
    }
    useEffect(() => {
        console.log(dark)

    }, [dark])

    return (
        <main className='h-screen w-full font-mont overflow-x-hidden justify-center items-center '>
            <Head>
                <title>{title}</title>
                <meta name="description" content="liismaiil tools and entertainment  " />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation />

            {/*         <main className=" m-auto max-w-7xl  "> */}
            {/* 
                <div id="dark-mode-toggle" onClick={darkToggleHandler}
                    className="fixed top-24 right-0 inline-block w-12 cursor-pointer 
            rounded-l-xl 
            bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900 p-2 
            text-3xl">
                    {!dark ? <SunIcon onClick={darkToggleHandler} className="h-6 w-6 text-blue-500" /> :
                        <MoonIcon onClick={darkToggleHandler} className="h-6 w-6 text-blue-500" />
                    }
                </div> */}
            <ErrorBoundary fallback={<ErrorBoundaryComp />}>

                <main className='bg-white  h-screen '>

                    {children}
                </main>
            </ErrorBoundary>
            <div className='w-full flex justify-center items-center '>
                <Footer />
            </div>
            {/* </main > */}
        </main>
    )
}

export default Layout