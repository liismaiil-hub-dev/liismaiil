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
        <nav className={`container  flex  justify-between bg-transparent 
        items-center mx-auto w-full z-10 relative border-2 border-blue-300`} >
            <section className='hidden md:flex justify-center items-center h-20 ' >
                <Logo />
            </section>
            <section className='flex md:hidden justify-center items-center  ml-3 space-x-3  h-20 ' >

                <div className=' text-2xl font-semibold p-3 bg-blue-500
                 rounded-full hover:bg-blue-300 hover:text-blue-600 cursor-pointer ' >

                    <FaBars onClick={() => { setShowMenu((showMenu) => !showMenu) }} />
                </div>

            </section>
            {/* moble nav  */}
            <section className={`md:hidden flex bg-green-300 flex-col justify-start cursor-pointer items-center`} >
                <div className={` hidden ${showMenu && 'sm:flex'} bg-lime-600/50 rounded-md  
                flex-col font-mont items-center absolute top-[38px] left-0 w-full`} >
                    <div className={` ${isRoute('/') && 'bg-green-200/10 text-blue-500'} 
                menu-item sub-menu group` } >
                        <Link key={`home`} href='/' > Home </Link>
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
                    <div className={` text-green-200/10 bg-text-blue-500 rounded-full'} 
               `} >
                        {(typeof guest !== 'undefined' && guest.token !== "") ? <Link onClick={handleLogout}
                            key={`logout`} href='/'> Sign out </Link> :
                            <Link key={`login`} href='/signIn'> Sign in </Link>}
                    </div>
                    <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
                        <ThemeSelector className="relative z-10" />
                    </div>
                </div>
            </section>
            {/* laptop nav  */}

            <section className='hidden md:flex  justify-end items-center space-x-3 text-gray-400' >
                <div className={` ${isRoute('/') && 'bg-green-200/10 text-blue-500'} `} >
                    <Link key={`home`} href='/' > Home </Link>

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
                <div className='text-green-100 font-semibold p-3 bg-blue-500 rounded-full hover:bg-blue-300 hover:text-blue-600' >
                    {(typeof guest !== 'undefined' && guest.token !== "") ? <Link className='text-green-100 font-semibold p-3 bg-blue-500 rounded-md'
                        onClick={handleLogout} href='/'> Sign out </Link> :
                        <Link key={`login`} href='/signIn'> Sign in </Link>}
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