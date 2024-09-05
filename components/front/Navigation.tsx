'use client'
//import Logo from '@/components/auth/Logo-ISM';
import Logo from '@/components/front/Logo';
import { COOKIE_NAME } from '@/store/constants/constants';
import { guestActions } from "@/store/slices/guestSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import Cookies from "js-cookie";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaWaterLadder } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { PiHandsPrayingThin } from "react-icons/pi";
import { SiCrunchyroll, SiMastercomfig, SiProgress } from "react-icons/si";
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
        const _guest = Cookies.get(COOKIE_NAME)
        console.log({ _guest });

    }, []);

    useEffect(() => {
        //    console.log(showMenu) 
    }, [showMenu])
    const [guestConnect, setGuestConnect] = useState(false)
    const SetGuestHandler = () => {
        setGuestConnect((guestConnect) => !guestConnect)
    }
    const CloseModalHandler = () => {
        setGuestConnect(false)
    }

    const handleLogout = () => {
        dispatch(logout())
        setShowMenu(false)
    }
    console.log({ guest });

    return (
        <nav className={`container  flex  justify-between bg-emerald-100/30 h-24 
        items-center mx-auto w-full z-10  border-2 border-blue-200/50 rounded-sm shadow-md`} >
            <section className=' hidden md:flex justify-center items-center  p-3 ' >
                <Logo />
            </section>
            {/* moble nav  */}
            <section className='flex justify-center items-center  space-x-3 h-20   md:hidden' >

                <div className={cn(isRoute('') && 'selected-navig-mobile', 'navig-mobile')}  >
                    <Link prefetch={true} key={`home`} href='/' >
                        <div className={'navig-mobile-svg'}  >
                            <FiHome />
                        </div>
                        <div className={'nanvig-mobile-txt'}  >
                            Home
                        </div>
                    </Link>
                </div>
                <div className={cn(isRoute('space') && 'selected-navig-mobile', 'navig-mobile')}  >
                    <Link prefetch={true} key={`space`} href='/space'>
                        <div className={'navig-mobile-svg'}  >
                            <FaWaterLadder />
                        </div>
                        <div className={'navig-mobile-txt'}  >
                            Space
                        </div>
                    </Link>
                </div>
                <div className={cn(isRoute('stage') && 'selected-navig-mobile', 'navig-mobile')}  >
                    <Link prefetch={true} key={`stage`} href='/stage'>
                        <div className={'navig-mobile-svg'}  >
                            <SiProgress />

                        </div>
                        <div className={'nanvig-mobile-txt'}  >
                            Stage
                        </div>
                    </Link>
                </div>
                <div className={cn(isRoute('sprints') && 'selected-navig-mobile', 'navig-mobile')}  >
                    <Link prefetch={true} key={`sprints`} href='/sprints'>
                        <div className={'navig-mobile-svg'}  >
                            <SiCrunchyroll />

                        </div>
                        <div className={'nanvig-mobile-txt'}  >
                            Sprints
                        </div>
                    </Link>
                </div>
                <div className={cn(isRoute('guests') && 'selected-navig-mobile', 'navig-mobile')}  >

                    <Link prefetch={true} key={`guests`} href='/guests'>
                        <div className={'navig-mobile-svg'}  >
                            <PiHandsPrayingThin />
                        </div>
                        <div className={'nanvig-mobile-txt'}  >
                            Guests
                        </div>
                    </Link>
                </div>
                <div className={cn(isRoute('hosts') && 'selected-navig-mobile', 'navig-mobile')}  >
                    <Link prefetch={true} key={`hosts`} href='/hosts'>
                        <div className={'navig-mobile-svg'}  >
                            < SiMastercomfig />
                        </div>
                        <div className={'nanvig-mobile-txt'}  >
                            Hosts
                        </div>
                    </Link>
                </div>
                <div className={cn(isRoute('signIn') && 'selected-navig-mobile', 'navig-mobile')}  >
                    {(typeof guest !== 'undefined' && guest !== null && guest?.tokenId !== 0) ?
                        <div className={cn(isRoute('signOut') ? 'borde-3 border-yellow-200 shadow-lg' : 'text-center font-semibold')}  >
                            <Link prefetch={true} onClick={handleLogout} key={`logout`} href='/'>
                                Sign out
                            </Link>
                        </div> : <div className={cn(isRoute('signIn') && 'borde-3 border-yellow-200 shadow-lg', 'text-center font-semibold')} >
                            <Link prefetch={true} key={`login`} href='/signIn'> Sign in
                            </Link>
                        </div>

                    }
                </div>
                <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
                    <ThemeSelector className="relative z-10" />
                </div>

            </section>


            {/* laptop nav  */}

            <section className='hidden md:flex text-xl font-extralight space-x-2 space-y-2 md:justify-center  md:items-center flex-wrap  text-gray-400' >
                <div className={cn(isRoute('') && 'nav-selected', 'CENTER nav-element')}  >
                    <Link prefetch={true} key={`home`} href='/'  >
                        Home
                    </Link>
                </div>
                <div className={cn(isRoute('space') && ' nav-selected', 'CENTER nav-element')}  >
                    <Link prefetch={true} key={`space`} href='/space'> Space </Link>
                </div>
                <div className={cn(isRoute('stage') && ' nav-selected', 'CENTER nav-element')}  >

                    <Link prefetch={true} key={`stage`} href='/stages'> Stages </Link>
                </div>
                <div className={cn(isRoute('sprints') && ' nav-selected', 'CENTER nav-element')}  >

                    <Link prefetch={true} key={`sprints`} href='/sprints'> Sprints </Link>
                </div>
                <div className={cn(isRoute('guests') && ' nav-selected', 'CENTER nav-element')}  >

                    <Link prefetch={true} key={`guests`} href='/guests'>Guests </Link>
                </div>
                <div className={cn(isRoute('hosts') && ' nav-selected', 'CENTER nav-element')}  >

                    <Link prefetch={true} key={`hosts`} href='/hosts'>Hosts </Link>
                </div>

                {(typeof guest !== 'undefined' && guest !== null && guest?.tokenId !== 0) ?
                    <div className={cn((guest?.tokenId !== 0) && 'nav-selected', 'outline-none text-green-400 CENTER nav-element')}  >

                        <Link prefetch={true}
                            onClick={handleLogout} href='/'> Sign out </Link>
                    </div>

                    :
                    <div className={cn((guest?.tokenId !== 0) && 'nav-selected', 'outline-none text-green-400 CENTER nav-element')}  >


                        <Link prefetch={true} className='outline-none text-orange-400 ' key={`login`} href='/signIn'> Sign in </Link>
                    </div>
                }

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