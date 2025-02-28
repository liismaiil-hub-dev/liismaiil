'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme,} from "next-themes";
import {FiSun, FiMoon } from "react-icons/fi";

function Logo() {
   const {setTheme, resolvedTheme} =  useTheme()

    return (
        <div className='flex justify-between items-center' >
        
        <div className='cursor-pointer p-3' >
            <Link href='/' >
                <Image src="/logo.svg" alt="liismaiil s logo"
                    className='object-contain p-1' width={150} height={150} />
            </Link>
        </div>
        <div className="flex w-11 justify-center items-center " >
        <div onClick={() => setTheme('light')} className={`${resolvedTheme === 'dark' ? 'CENTER w-7' : 'hidden'}` } >

                    <FiSun /> 
        
                    </div> 
        <div onClick={() => setTheme('dark')}  className={`${resolvedTheme !== 'dark' ? 'CENTER w-7' : 'hidden'}` } >
                    <FiMoon /> 

                    </div> 
                    </div> 
                    </div> 
    )
}

export default Logo