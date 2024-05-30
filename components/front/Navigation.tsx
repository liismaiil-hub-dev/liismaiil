'use client'
import Logo from '@/components/front/Logo';
import { guestActions } from "@/store/slices/guestSlice";
import { RootStateType } from '@/store/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import GuestModal from './GuestModal';
import ThemeSelector from "./ThemeSelector";

function Navigation() {
    const [showMenu, setShowMenu] = useState<Boolean>(false)
    const dispatch = useDispatch()

    const { guest } = useSelector((state: RootStateType) => state.guest)
    const { logout } = guestActions
    const pathname = usePathname()
    const isRoute = (route: string) => {


        return pathname.split('/')[1] === route

    }
    useEffect(() => {
        setShowMenu((showMenu) => !showMenu)
    }, [])
    const [guestConnect, setGuestConnect] = useState(false)
    const SetGuestHandler = () => {
        setGuestConnect((guestConnect) => !guestConnect)
    }
    const CloseModalHandler = () => {
        setGuestConnect(false)
    }

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <nav className={`container flex  justify-between bg-transparent items-center m-auto w-full z-10 fixed border-2 border-blue-300`} >
            <section className='sm:hidden md:flex justify-between items-center gap-4  h-20 ' >
                <Logo />

                <FaBars onClick={() => {
                    setShowMenu((showMenu) => !showMenu)

                }}
                    className='sm:flex md:hidden absolute top-1 right-2
                     hover:text-3xl text-2xl hover:text-lime-600 cursor-pointer' />
            </section>
            <section className={`hidden sm:flex relative my-auto flex-1 justify-start cursor-pointer items-center`} >
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
                        {(typeof guest !== 'undefined' && guest.token !== "") ? <Link onClick={handleLogout}
                            key={`logout`} href='/'> Logout </Link> :
                            <Link key={`login`} href='/signIn'> Login </Link>}



                    </div>
                </div>
            </section>

            <section className=' flex  justify-end items-center gap-4 text-gray-300' >
                <div className={` ${isRoute('/') && 'bg-green-600 text-blue-50'} 
                menu-item sub-menu group` } >
                    <Link key={`home`} href='/' > Home </Link>

                    <section className='div-sub-menu  hidden group-hover:block' >
                        <button className='sub-menu ' onClick={SetGuestHandler}>
                            <span>
                                guest
                            </span>
                        </button>
                        <button className='sub-menu'>
                            <span>  liismaiil
                            </span>
                        </button>
                    </section>
                </div>

                <div className={`${isRoute('space') && 'bg-green-200/10 text-blue-500'}`} >
                    <Link key={`space`} href='/space'> Space </Link>
                </div>
                <div className={` ${isRoute('sprints') && 'bg-green-200/10 text-blue-500'} 
              `} >
                    <Link key={`tablets`} href='/sprints'> Sprints </Link>
                </div>
                <div className={`  ${isRoute('guests') && 'bg-green-200/10 text-blue-500'} 
                `} >
                    <Link key={`guests`} href='/guests'>Guests </Link>
                </div>
                <div className={`  ${isRoute('guests') && 'bg-green-200/10 text-blue-500'} 
               `} >
                    <Link key={`guests`} href='/guests'>Hosts </Link>
                </div>
                <div className={`  ${isRoute('domain') && 'bg-green-200/10 text-blue-500'} 
               `} >
                    <Link key={`domain`} href='/domain'> Domain </Link>
                </div>
                <div className={` ${isRoute('api/auth') && 'bg-green-200/10 text-blue-500'} 
               `} >
                    {(typeof guest !== 'undefined' && guest.token !== "") ? <Link onClick={handleLogout}
                        key={`logout`} href='/'> Logout </Link> :
                        <Link key={`login`} href='/signIn'> Login </Link>}
                </div>
                <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
                    <ThemeSelector className="relative z-10" />
                </div>
                {
                    guestConnect && <GuestModal handleModalClose={() => CloseModalHandler()} />
                }
            </section >
        </nav >

    )
}

export default React.memo(Navigation)