'use client'
//import Logo from '@/components/auth/Logo-ISM';
import { logoutGuest } from "@/actions/guest";
import Logo from '@/components/front/Logo';
import { COOKIE_NAME } from '@/store/constants/constants';
import { guestPrismaActions } from "@/store/slices/guestPrismaSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import Cookies from "js-cookie";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaWaterLadder } from "react-icons/fa6";
import { FiHome, FiLogIn, FiLogOut } from "react-icons/fi";
import { PiHandsPrayingThin } from "react-icons/pi";
import { SiCrunchyroll, SiMastercomfig, SiProgress } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import GuestModal from './GuestModal';
import ThemeSelector from "./ThemeSelector";

function Navigation() {
    const [showMenu, setShowMenu] = useState<Boolean>(false)
    const dispatch = useDispatch()
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { logout, setGuestPrisma } = guestPrismaActions
    const pathname = usePathname()
    const isRoute = (route: string) => {
        return pathname.split('/')[1] === route
    }
//    console.log({guestPrisma});

    const [guestConnect, setGuestConnect] = useState(false)
    const SetGuestHandler = () => {
        setGuestConnect((guestConnect) => !guestConnect)
    }
    const CloseModalHandler = () => {
        setGuestConnect(false)
    }

    const handleLogout = async () => {
        if (guestPrisma.tokenId) {
            console.log({ tokenId: guestPrisma.tokenId });

            const { message, success } = await logoutGuest(guestPrisma.tokenId)
            console.log({ message, success });
            if (success) {
            toast.success('Loged out successfully !!! ')

    //                Cookies.remove(COOKIE_NAME)
                dispatch(logout())
                setShowMenu(false)
            } else {
                toast.warning( `You are diconnected from liismaiil plateform`)
                Cookies.remove(COOKIE_NAME)
                dispatch(logout())
            }

        } else {
            toast.warning('some thing went wrong !!! ')
        }
    }
    // console.log({ guestPrisma });

    return (
        <nav className={`container  flex  md:justify-between
            justify-center
            bg-emerald-100/30 h-14 
        items-center mx-auto w-full z-10  border-2 border-blue-200/50 rounded-sm shadow-md`} >
            <section className=' hidden md:flex justify-center items-center  p-3 ' >
                <Logo />
            </section>
            {/* moble nav  */}
            <section className='flex justify-between items-center p-1 space-x-1 h-24   md:hidden' >

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
                <div className={cn(isRoute('insight') && 'selected-navig-mobile', 'navig-mobile')}  >
                    <Link prefetch={true} key={`insight`} href='/insight'>
                        <div className={'navig-mobile-svg'}  >
                            <SiCrunchyroll />

                        </div>
                        <div className={'nanvig-mobile-txt'}  >
                                    Insight
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
                <div className={cn(isRoute('stages') && 'selected-navig-mobile', 'navig-mobile')}  >
                    <Link prefetch={true} key={`stages`} href='/stage'>
                        <div className={'navig-mobile-svg'}  >
                            <SiProgress />

                        </div>
                        <div className={'nanvig-mobile-txt'}  >
                            Stages
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
                
                <div className={cn(isRoute('signIn') && 'selected-navig-mobile', 'navig-mobile')}  >
                    {(typeof guestPrisma !== 'undefined' && guestPrisma !== null && guestPrisma?.tokenId !== 0) ?
                        <div className={cn(isRoute('signOut') ? 'borde-3 border-yellow-200 shadow-lg' : 'text-center font-tight')}  >
                            <div className={'navig-mobile-svg'}  >
                                < FiLogOut />
                            </div>
                            <Link prefetch={true} onClick={handleLogout} key={`logout`} href='/'>
                                Sign out
                            </Link>
                        </div> : <div className={cn(isRoute('signin') && 'borde-3 border-yellow-200 shadow-lg', 'text-center font-tight')} >
                            <div className={'navig-mobile-svg'}  >
                                < FiLogIn />
                            </div>
                            <Link prefetch={true} key={`login`} href='/signin'> Sign in
                            </Link>
                        </div>

                    }
                </div>
                <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
                    <ThemeSelector className="relative z-10" />
                </div>

            </section>


            {/* laptop nav  */}

            <section className='hidden md:flex text-xl font-extralight gap-1 md:justify-center  md:items-center 
            flex-nowrap  text-gray-400' >
                <div className={cn(isRoute('') && 'nav-selected', 'CENTER nav-element')}  >
                    <Link prefetch={true} key={`home`} href='/'  >
                        Home
                    </Link>
                </div>
                <div className={cn(isRoute('insight') && ' nav-selected', 'CENTER nav-element')}  >

                    <Link prefetch={true} key={`Insight`} href='/insight'> Insight </Link>
                </div>
                <div className={cn(isRoute('space') && ' nav-selected', 'CENTER nav-element')}  >
                    <Link prefetch={true} key={`space`} href='/space'> Space </Link>
                </div>
                <div className={cn(isRoute('stages') && ' nav-selected', 'CENTER nav-element')}  >

                    <Link prefetch={true} key={`stages`} href='/stages'> Stages </Link>
                </div>
                
                <div className={cn(isRoute('hosts') && ' nav-selected', 'CENTER nav-element')}  >
                    <Link prefetch={true} key={`hosts`} href='/hosts'>Hosts </Link>
                </div>
                <div className={cn(isRoute('guests') && ' nav-selected', 'CENTER nav-element')}  >
                    <Link prefetch={true} key={`guests`} href='/guests'>Guests </Link>
                </div>
       
                {(typeof guestPrisma !== 'undefined' && guestPrisma !== null && guestPrisma?.tokenId !== 0) ?
                    <div className={cn((guestPrisma?.tokenId !== 0) && 'nav-selected', 'outline-none text-green-400 CENTER nav-element')}  >

                        <Link prefetch={true}
                            onClick={handleLogout} href='/'> Sign out </Link>
                    </div>

                    :
                    <div className={cn((guestPrisma?.tokenId !== 0) && 'nav-selected', 'outline-none text-green-400 CENTER nav-element')}  >
                        <Link prefetch={true} className='outline-none text-orange-400 '
                            key={`login`} href='/signin'> Sign in </Link>
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

export default Navigation