import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaBars } from 'react-icons/fa'
import useInterface from '@/store/hooks/useInterface'
import { useUser } from '@auth0/nextjs-auth0/client';

function SideBar() {
    const { user } = useUser()
    const [showMenu, setShowMenu] = useState<Boolean>(false)
    const router = useRouter()

    const isRoute = (route) => {
        return router.pathname.slice(1) === route
    }
    useEffect(() => {
        setShowMenu((showMenu) => !showMenu)
    }, [router])


        return (<div className='sm:hidden flex flex-col overflow-hidden h-screen text-sky-100' >
            <div className='bg-cyan-900 '  >
                <ul className='flex flex-col justify-between  font-mont font-light w-3/4   pt-4 sm:hidden items-start  '>
                    <li className={`list-none ${isRoute('domain') && 'bg-green-100 shadow-lg'} w-full hover:bg-green-300 p-2 mx-1 rounded-md `}>
                        <Link key={`domain`} href='/domain' > Domain </Link>
                    </li>

                    <li className={`list-none ${isRoute('organisations') && 'bg-orange-200'} 
                mx-1 hover:bg-orange-100 p-2 rounded-md`}>

                        <Link key={`organisations`} href='/organisations'> Organisations  </Link>
                    </li>
                    <li className={`list-none ${isRoute('loans') && 'bg-orange-200'} 
                mx-1 hover:bg-orange-100 p-2 rounded-md`}>
                        <Link key={`loans`} href='/loans'> Loans  </Link>
                    </li>


                </ul>
            </div>

            <div className={`list-none ${isRoute('guest') && 'shadow-lg'} bg-gradient-to-b from-slate-800 to-cyan-800  flex-1
                  hover:bg-orange-100 p-2 `}>
                <Link key='guests' href='/guests'> Guests </Link>
            </div>
            <div className={`list-none ${isRoute('guest') && 'shadow-lg'} bg-cyan-800   p-2 `}>
                <Link key='logout' href='/auth/logout'> Logout </Link>
            </div>
        </ div>)
   }

export default React.memo(SideBar)