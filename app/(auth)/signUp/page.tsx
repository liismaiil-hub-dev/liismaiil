'use client'
import organisations from "@/store/shares/organisations.json";
import { RootStateType } from '@/store/store';

import { registerGuest, registerGuestPrisma } from "@/actions/auth";
import SelectHost from "@/components/auth/SelectHost";
import Submit from "@/components/auth/Submit";
import { OrgCoordType } from "@/store/slices/guestSlice";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useState } from 'react';
import { useFormState } from "react-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const initialState = {
  message: null,

}

const SignUp = () => {
  const [formState, action] = useFormState<{
    message: string,
  }>(registerGuestPrisma, initialState)
  const { liismaiilProfiles } = useSelector((state: RootStateType) => state.profile)
 
   const collaboratorsCoords:OrgCoordType[] = liismaiilProfiles.map((org)  => {
    //console.log({coords:org.coords, address:org.addressGeo});
    
    return {coords:org.coords, addressGeo:org.addressGeo}
   } )

const [host, setHost] = useState(0);
const [country, setCountry] = useState('Select from the list ');

  const handleCountry = (countr : string) => {
    console.log({ countr })
setCountry(countr)

  }
  const handleHost = (hos: string) => {
    console.log({ hos })
setHost(parseInt(hos))
  }

  const countries = organisations.map((org) => org.country)
  const hosts = organisations.map((org) => {
    return ({ login: org.login, uid: org.uid })
  })
 
  return (<div className='flex relative  flex-col w-full h-screen justify-center items-center gap-3'>
    <form className="loginForm" action={action}>
      <div className='flex flex-col w-full h-full justify-center items-left gap-3 '>
      <SelectHost countryHandler={(country: string) => handleCountry(country)} hostHandler ={(host: number) => handleHost(host)} />
        <div className='flex   justify-between items-center  gap-6 rounded-md'>
          <label id={'token'} className="text-center "> token: </label>
          <input  type="text" name={'tokenId'} id={'token'} className="border  w-full flex justify-end  rounded-md " required />
        </div>
        <div className='flex justify-between items-center  gap-6 rounded-md'>
          <label id={'password'} className="text-left "> password: </label>
          <input  type="password" name={'password'} id={'password'} className="border  w-full flex justify-end  rounded-md " required />
        </div>
        <div className='hidden justify-between items-center  gap-6 rounded-md'>
          <label id={'token'} className="text-center "> Host: </label>
          <input  type="text" name={'host'} id={'token'} value={host} className="border  w-full flex justify-end  rounded-md " required />
        </div>
        <div className=' hidden justify-between items-center  gap-6 rounded-md'>
          <label id={'country'} className="text-left "> Country: </label>
          <input  type="text" name={'country'} id={'country'} disabled={true} value={country} className="border  w-full flex justify-end  rounded-md " required />
        </div>
     <div className='flex justify-center items-center '>
          <Submit label={'Sign Up'} />


        </div>
        <div className='flex justify-center items-center '>

          <Link href={'/signIn'} className='text-blue-400
   text-center p-2'> {`You have an account  ? `}</Link>

        </div>
        {formState && formState?.message! &&
          toast.info(`${JSON.parse(formState.message)} successfully signin`) && redirect(`/stages/${JSON.parse(formState?.message)['tokenId']}`)}

      </div>
    </form>
  </div>
  )
  
}
{/* Login.getLayout = function getLayout({ page, pageProps }) {
  return ( {page}</AppLayout>)
}
 */}
export default SignUp;
