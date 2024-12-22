'use client'
import { signinGuestLocal } from "@/actions/guest";
import { COUNTRY_CODES } from "@/store/constants/flagArray";
import { guestPrismaActions } from "@/store/slices/guestPrismaSlice";
import { RootStateType } from "@/store/store";
//import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
//import { z } from "zod";
import  Cookies from "js-cookie";
import { COOKIE_NAME } from '@/store/constants/constants';



//______COMPONENT _______\\\
const  Signin =  () => {
const dispatch = useDispatch()

  const [formState, action] =   useFormState(signinGuestLocal, {message:'', success: false, errors:{}})     
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
  
const {pending} = useFormStatus()

console.log({formState});
const { setGuestPrisma, logout } = guestPrismaActions

useEffect(() => {
if(typeof formState !== 'undefined' && formState.success) {
  const {status, tokenId, host , flag} = JSON.parse(formState.message)
  dispatch(setGuestPrisma({guestPrisma:{
    tokenId, host, flag,
       status
  }}))  
  toast.success('you are successfully connected to youre stages page ')
  redirect(`/stages/${tokenId}`)
}

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [formState]);
useEffect(() => {
  if(typeof guestPrisma !== 'undefined' && guestPrisma.tokenId !== -1) {
  const cookie = Cookies.get(COOKIE_NAME)
  console.log({cookie});
   
  //dispatch(logout())
    //  redirect(`/stages/${guestPrisma.tokenId}`)
  
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (<div className='flex relative  flex-col w-full h-screen justify-center items-center gap-3'>
    <form action={action}>
      <div className='flex border-1 border-emerald-700/50 p-7 rounded-md flex-col w-full h-full justify-center items-left gap-3 shadow-md '>
        <div className='flex   justify-center items-center text-center rounded-md'>
          Sign In
        </div>
        <div className='flex   justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'tokenId'} className="text-left w-28 "> tokenId: </label>
          <input  disabled={!!formState?.errors.tokenId} type="text" placeholder={'tokenId'} name={'tokenId'} id={'tokenId'} className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " required />
        </div>
        {!!formState?.errors.tokenId && <div className="flex justify-center items-center text-red-500">{formState?.errors.tokenId?.join(', ')}</div>}

        <div className='flex justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'host'} className="text-left w-28" > host: </label>
          <input type="text" disabled={!!formState?.errors.host} placeholder={'host'} name={'host'} id={'hostId'} className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " required />
        </div>
        {!!formState?.errors.host && <div className="flex justify-center items-center text-red-500">{formState?.errors.host?.join(', ')}</div>}
        <div className='flex justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'password'} className="text-left w-28 "> password:</label>
          <input  disabled={!!formState?.errors.password} type="password" placeholder={'password'} name={'password'} id={'password'} className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " required />
        </div>
        {!!formState?.errors.password && <div className="flex justify-center items-center text-red-500">{formState?.errors.password?.join(', ')}</div>}
        <div className={`flex justify-between items-center gap-6 rounded-md`}>
          <label htmlFor={'country'} className="text-left w-28 "> Country: </label>
        <select  name={'country'} id={'country'}  disabled={!!formState?.errors.country} className="h-11 ring-1 ring-emerald-200/30 px-3 w-full flex justify-end  rounded-md " >
        {COUNTRY_CODES && 
         <option value={""} > --get country code -- </option>&&
         COUNTRY_CODES.map((cc, index)  => 
         <option value={cc.code} key={cc.code} > {cc.name} : {cc.code}</option> 
        ) 
        }
        </select>
       </div>
        {/* <div className={`flex justify-between items-center gap-2 rounded-md`}>
          <div className={`flex  w-56 text-left`}> Copy from code above:
        </div>
       <div className={`flex `}>
       <input  disabled={!!formState?.errors.country} type="text" placeholder={'code'} name={'country'} id={'country'} className="px-2 w-14  h-11 ring-1 ring-emerald-200/30 rounded-md " required />

        </div>
        
        </div> */}
        {!!formState?.errors.country && <div className="flex justify-center items-center text-red-500 bg-red-300">{formState?.errors.country?.join(', ')}</div>}
        <div className='flex justify-center items-center '>
              <button  type='submit' disabled={pending} className='btn bg-blue-400
                   text-yellow-100  text-center text-2xl p-2 disabled:opacity-30
                    rounded-md'> Sign In</button>
              </div>
 
        {formState?.success && formState?.message && <div className="flex justify-center items-center text-green-700 bg-green-100/20 w-32">{formState?.message}</div>}
              
              <div className='flex justify-center items-center '>
      
          <Link href={'/signup'} className='text-blue-400 text-sm
   text-center p-2'> {`No account yet, Register first-> `}</Link>

        </div>
        {/*         {formState && formState?.tokenId &&
          toast.info(`${JSON.parse(formState.tokenId)['tokenId']} successfully signin`) && redirect(`/stages/${formState.tokenId}`)}
 */}
      </div>
    </form>
  </div>
  )
}

export default Signin;
 