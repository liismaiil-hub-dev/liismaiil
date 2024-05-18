'use client'
import Logo from '@/components/front/Logo';
import { RootStateType } from '@/store/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import GuestModal from './GuestModal';
function Navigation() {
    const [showMenu, setShowMenu] = useState<Boolean>(false)
    const router = useRouter()

    const { guest } = useSelector((state: RootStateType) => state.guest)

    const isRoute = (route) => {
        return router.pathname.slice(1) == route

    }
    useEffect(() => {
        setShowMenu((showMenu) => !showMenu)
    }, [router])
    const [guestConnect, setGuestConnect] = useState(false)
    const SetGuestHandler = () => {
        setGuestConnect((guestConnect) => !guestConnect)
    }
    const CloseModalHandler = () => {
        setGuestConnect(false)
    }
    return (
        <nav className={`flex bg-blue-50 items-center m-auto w-full z-10 fixed  `} >
            <main className='flex justify-between items-center gap-4  h-20 ' >
                <Logo />
                <FaBars onClick={() => {
                    setShowMenu((showMenu) => !showMenu)

                }}
                    className='sm:flex hidden absolute top-1 right-2
                     hover:text-3xl text-2xl hover:text-lime-600 cursor-pointer' />
            </main>
            <main className={`hidden sm:flex relative my-auto flex-1 justify-start cursor-pointer items-center`} >
                <div className={` hidden ${showMenu && 'sm:flex'} bg-lime-600/50 rounded-md  
                flex-col font-mont items-center absolute top-[38px] left-0 w-full`} >
                    <div className={` ${isRoute('') && 'bg-green-200/10 text-blue-500'} 
                    mobile-menu-item mobile-sub-menu mobile-menu group`} >
                        <Link key={`home`} href='/' > Home </Link>

                        <div className='div-sub-menu  hidden group-hover:block' >
                            <div className='sub-menu ' onClick={SetGuestHandler}>
                                <span>
                                    guest
                                </span>
                            </div>
                            <div className='sub-menu'>
                                <span>  liismaiil
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={`${isRoute('space') && 'bg-green-200/10 text-blue-500'}
                    mobile-menu-item mobile-sub-menu mobile-menu`} >
                        <Link key={`space`} href='/space'> Space </Link>
                    </div>
                    <div className={` ${isRoute('tablets') && 'bg-green-200/10 text-blue-500'} 
                    mobile-menu-item mobile-sub-menu mobile-menu` } >
                        <Link key={`tablets`} href='/tablets'> Tablets </Link>
                    </div>
                    <div className={`  ${isRoute('guests') && 'bg-green-200/10 text-blue-500'} 
                    mobile-menu-item mobile-sub-menu mobile-menu`} >
                        <Link key={`guests`} href='/guests'>Guests </Link>
                    </div>
                    <div className={`  ${isRoute('domain') && 'bg-green-200/10 text-blue-500'} 
                    mobile-menu-item mobile-sub-menu mobile-menu`} >
                        <Link key={`domain`} href='/domain'> Domain </Link>
                    </div>
                    <div className={` ${isRoute('api/auth') && 'bg-green-200/10 text-blue-500'} 
                    mobile-menu-item mobile-sub-menu mobile-menu`} >
                        {user ? <Link key={`logout`} href='/api/auth/logout'> Logout </Link> :
                            <Link key={`login`} href='/api/auth/login'> Login </Link>}
                    </div>
                </div>
            </main>
            <main className='sm:hidden flex  flex-1 justify-end items-center ' >
                <div className={` ${isRoute('') && 'bg-green-200/10 text-blue-500'} 
                menu-item sub-menu group` } >
                    <Link key={`home`} href='/' > Home </Link>

                    <div className='div-sub-menu  hidden group-hover:block' >
                        <div className='sub-menu ' onClick={SetGuestHandler}>
                            <span>
                                guest
                            </span>
                        </div>
                        <div className='sub-menu'>
                            <span>  liismaiil
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`${isRoute('space') && 'bg-green-200/10 text-blue-500'}
                 menu-item sub-menu`} >
                    <Link key={`space`} href='/space'> Space </Link>
                </div>
                <div className={` ${isRoute('tablets') && 'bg-green-200/10 text-blue-500'} 
              menu-item sub-menu`} >
                    <Link key={`tablets`} href='/tablets'> Tablets </Link>
                </div>
                <div className={`  ${isRoute('guests') && 'bg-green-200/10 text-blue-500'} 
                menu-item sub-menu`} >
                    <Link key={`guests`} href='/guests'>Guests </Link>
                </div>
                <div className={`  ${isRoute('domain') && 'bg-green-200/10 text-blue-500'} 
               menu-item sub-menu`} >
                    <Link key={`domain`} href='/domain'> Domain </Link>
                </div>
                <div className={` ${isRoute('api/auth') && 'bg-green-200/10 text-blue-500'} 
               menu-item sub-menu`} >
                    {user ? <Link key={`logout`} href='/api/auth/logout'> Logout </Link> :
                        <Link key={`login`} href='/api/auth/login'> Login </Link>}
                </div>
                {
                    guestConnect && <GuestModal handleModalClose={() => CloseModalHandler()} />
                }
            </main >
        </nav >

    )
}

export default React.memo(Navigation)