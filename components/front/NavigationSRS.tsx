'use client'
import Logo from '@/components/front/Logo';
import { guestActions } from "@/store/slices/guestSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
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

    return (
        <nav className={`container  flex  justify-between bg-transparent flex-wrap 
        items-center mx-auto w-full z-10  border-2 border-blue-200 shadow-md`} >
             <section className='hidden md:flex justify-start items-center h-20 ' >
                <Logo />
            </section>
             {/* moble nav  */}
            <section className='flex justify-center items-center  ml-3 gap-2 h-20 relative  md:hidden' >
                <div className=' text-2xl font-semibold flex items-center justify-center border-3 border-green-300  bg-blue-500 relative 
                 rounded-xl w-16 h-16 hover:bg-blue-300 hover:text-blue-600 cursor-pointer ' >
                <FaBars onClick={() => { setShowMenu((showMenu) => !showMenu) }} />
                </div>
                <section className={cn(!showMenu && 'hidden',"md:hidden flex justify-center bg-blue-300/70 border-3 border-green-300   gap-3 rounded-xl text-xl font-light items-center absolute top-1 left-20 " )} >
                <div  onClick={() => { setShowMenu((showMenu) => !showMenu) }}  className={cn(isRoute('') &&  'selected-navig-mobile', 'navig-mobile') }  >
                <Link key={`home`} href='/' >
                      <div className={'navig-mobile-svg'}  >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                        </div>
                    <div  className={ 'nanvig-mobile-txt' }  >
                        Home
                        </div>
                        </Link>
                </div>
                <div onClick={() => { setShowMenu((showMenu) => !showMenu) }} className={cn(isRoute('space') && 'selected-navig-mobile','navig-mobile') }  >
                        <Link key={`space`} href='/space'>     
                           <div className={'navig-mobile-svg'}  >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                        stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                        </svg>
                            </div>
                        <div className={ 'navig-mobile-txt' }  >
                            Space
                        </div>
                        </Link>
                </div>
                <div onClick={() => { setShowMenu((showMenu) => !showMenu) }} className={cn(isRoute('stage') &&  'selected-navig-mobile','navig-mobile') }  >
                        <Link key={`stage`} href='/stage'> 
                    <div className={'navig-mobile-svg'}  >
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                        </svg>
                    </div>
<div  className={ 'nanvig-mobile-txt' }  >        
                    Stage
                    </div>
                    </Link>
                </div>
                <div onClick={() => { setShowMenu((showMenu) => !showMenu) }} className={cn(isRoute('sprints') && 'selected-navig-mobile','navig-mobile') }  >
                     <Link key={`sprints`} href='/sprints'>
                         <div className={'navig-mobile-svg'}  >
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">    
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                    </div>
                     <div  className={ 'nanvig-mobile-txt' }  >
                           Sprints
                    </div>
                    </Link>
                </div>
                <div onClick={() => { setShowMenu((showMenu) => !showMenu) }} className={cn(isRoute('guests') &&  'selected-navig-mobile','navig-mobile') }  >

                        <Link key={`guests`} href='/guests'>
                       <div className={'navig-mobile-svg'}  >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </div>
                   <div  className={ 'nanvig-mobile-txt' }  >
                     Guests 
                    </div>
        </Link>
                </div>
                <div onClick={() => { setShowMenu((showMenu) => !showMenu) }} className={cn(isRoute('hosts') &&  'selected-navig-mobile','navig-mobile') }  >
                        <Link key={`hosts`} href='/hosts'>
                     <div className={'navig-mobile-svg'}  >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                    </div>
                    <div  className={ 'nanvig-mobile-txt' }  >
                    Hosts
                    </div>
                    </Link>
                </div>
                <div onClick={() => { setShowMenu((showMenu) => !showMenu) }} className={cn(isRoute('signIn') &&  'selected-navig-mobile','navig-mobile') }  >
                    {(typeof guest !== 'undefined' && guest !==null && guest?.tokenId !== 0) ? 
                      <div className={cn(isRoute('signOut') ? 'borde-3 border-yellow-200 shadow-lg': 'text-center font-semibold') }  >
                          <Link onClick={handleLogout}  key={`logout`} href='/'> 
                          Sign out 
                        </Link>
                        </div>:<div className={cn(isRoute('signIn') && 'borde-3 border-yellow-200 shadow-lg', 'text-center font-semibold')} >
                            <Link key={`login`} href='/signIn'> Sign in 
                            </Link>
                    </div>

                            }
                    </div>
                    <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
                        <ThemeSelector className="relative z-10" />
                    </div>
                
            </section>
            </section>
            {/* moble nav  */}
          
            {/* laptop nav  */}

            <section className='hidden md:flex text-xl font-extralight md:justify-end  items-center flex-wrap  text-gray-400' >
                <Link key={`home`} href='/'  className=' flex justify-center'> 
                <div className={cn(isRoute('') && ' border-1 border-green-500 text-blue-500  ', 'text-center  px-4 py-3 rounded-md ')}  >
                    Home 
                </div>
                </Link>
                 <div className={cn(isRoute('space')  &&' border-1 border-green-500 text-blue-500  ', 'text-center  px-4 py-3 rounded-md ')}  >
                    <Link key={`space`} href='/space'> Space </Link>
                </div>
                 <div className={cn(isRoute('stage')  && ' border-1 border-green-500 text-blue-500  ', 'text-center  px-4 py-3 rounded-md ')}  >
              
                        <Link key={`stage`} href='/stages'> Stages </Link>
                    </div>
                <div className={cn(isRoute('sprints')  && ' border-1 border-green-500 text-blue-500  ', 'text-center  px-4 py-3 rounded-md ')}  >
              
                    <Link key={`sprints`} href='/sprints'> Sprints </Link>
                </div>
                <div className={cn(isRoute('guests')  && ' border-1 border-green-500 text-blue-500  ', 'text-center  px-4 py-3 rounded-md ')}  >
                
                    <Link key={`guests`} href='/guests'>Guests </Link>
                </div>
                <div className={cn(isRoute('hosts')  && ' border-1 border-green-500 text-blue-500  ', 'text-center  px-4 py-3 rounded-md ')}  >
               
                    <Link key={`hosts`} href='/hosts'>Hosts </Link>
                </div>
               
                <div className=' p-3 flex justify-center items-center font-extralight border-1 border-green-text-center  px-4 py-3 rounded-md '  >
                    {(typeof guest !== 'undefined' && guest !== null && guest?.tokenId !== 0) ? <Link className='outline-none text-green-400 '
                        onClick={handleLogout} href='/'> Sign out </Link> :
                        <Link  className='outline-none text-orange-400 ' key={`login`} href='/signIn'> Sign in </Link>}
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