import Head from 'next/head'
import React, { useState } from 'react'



function GridLayout({ children, title }) {

    return (
        <main className='min-h-screen  font-mont overflow-x-hidden flex-col justify-center items-center '>
            <Head>

                <title>{title}</title>
                <meta name="description" content="liismaiil grid practice " />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="fixed w-full h-full right-0">
                {children}
            </div>
        </main >
    )
}

export default GridLayout