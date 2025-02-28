'use client'
import { RootStateType } from '@/store/store';
import Link from 'next/link';
import { SiCrunchyroll, SiProgress } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { z } from "zod";
import {COUNTRY_CODES} from "@/store/constants/flagArray";
import  { getFreeGuestsPrisma, registerGuestLocal} from "@/actions/guest";

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { guestPrismaActions } from '@/store/slices/guestPrismaSlice';

import { useRouter } from 'next/navigation'

export const GuestRegisterSchema = z.object({
  tokenId: z.number().int(),
  host: z.number().int().lt(1000),
  password: z.string(),
  country: z.string().max(3),
//  collaboratorId: z.string().max(35),
});


const SignUp = () => {
 const dispatch = useDispatch()
 const router = useRouter()
  const { guestPrisma, } = useSelector((state: RootStateType) => state.guestPrisma)
  const { setGuestPrisma} = guestPrismaActions
  const [formState, action] =   useFormState(registerGuestLocal, {message:'', success: false, errors:{}})     
const {pending} = useFormStatus()
//console.log({formState, guestPrisma});
const [nextGuest, setNextGuest] = useState(-1);

const _getGuestsCounts = async () => {
    const _counts = await getFreeGuestsPrisma()
   if(_counts && _counts.length > 0){ 
    const sup = _.maxBy(_counts,function(e) {return e.tokenId})
    console.log({_counts});
   setNextGuest(sup?.tokenId!+ Math.round(Math.random()*5))
  }else {
   setNextGuest(100001)
  }
}
console.log({formState});
useEffect(() => {
if(formState && formState.success){
  toast.success(`your tokenId ${JSON.parse(formState.message).tokenId} is created`)
  dispatch(setGuestPrisma({guestPrisma:JSON.parse(formState.message).tokenId}))
} 
}, [formState]);


  if (typeof guestPrisma != 'undefined' && guestPrisma?.tokenId !== -1) {
    router.push('/stages')
  }
  return (<div className='flex relative  flex-col w-full h-screen justify-center items-center gap-3'>
    <div className='flex   justify-center items-center text-center rounded-md'>
    If you want a free tokenId Click
    </div>
     <button onClick={() => _getGuestsCounts()} type="submit" className='btn bg-green-200
             text-blue-600  text-center text-2xl p-2
              rounded-md'>
            Here 
          </button>
 
    <form action={action} /* action={action} */>
      <div className='flex border-1 border-emerald-700/50 p-7 rounded-md flex-col w-full h-full justify-center items-left gap-3 shadow-md '>
        {/* <SelectHost countryHandler={(country: string) => handleCountry(country)} hostHandler={(host: number) => handleHost(host)} /> */}
        <div className='flex   justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'tokenId'} className="text-left w-28"> tokenId: </label>
          <input  type="text" name={'tokenId'} id={'tokenId'} className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " required 
          value={typeof nextGuest ==='number' ? nextGuest: -1 }/>
        </div>
        <div className='flex justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'password'} className="text-left "> password: </label>
          <input type="password" name={'password'} id={'password'} className="px-3  w-full flex justify-end  rounded-md h-11 ring-1 ring-emerald-200/30" required />
        </div>
        <div className={`flex justify-between items-center gap-6 rounded-md`}>
          <label htmlFor={'host'} className="text-left w-28 "> Host: </label>
          <input type="text" name={'host'} id={'host'} className="px-3 h-11 ring-1 ring-emerald-200/30  w-full flex justify-end  rounded-md " required
          value={typeof nextGuest ==='number' ? 3: -1 } />
        </div>
       
        <div className={`flex justify-between items-center gap-6 rounded-md`}>
          <label htmlFor={'country'} className="text-left w-28 "> Country: </label>
          
<select name={'country'} id={'country'}   className="h-11 ring-1 ring-emerald-200/30 px-3 w-full flex justify-end  rounded-md " required>
  {COUNTRY_CODES && 
   <option value={""} >--Please choose a country--</option>&&
   COUNTRY_CODES.map((cc, index)  => 
   <option  key={cc.code} value={cc.code} > {cc.name}</option> 
  )}
  </select>
        </div>
        <div className='flex justify-center gap-3 items-center '>
          <button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-2xl p-2
              rounded-md'>
            Sign Up
          </button>
        </div>
        <div className='flex justify-center items-center '>
    <Link href={'/signIn'} className='text-blue-400 text-center p-2'> {`You have an account  ? `}</Link>

        </div>
      </div>
    </form>
  </div>
  )

}

export default SignUp;
