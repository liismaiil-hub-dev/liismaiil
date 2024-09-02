'use client'
import organisations from "@/store/shares/organisations.json";
import { RootStateType } from '@/store/store';

import { registerGuest } from "@/actions/auth";
import SelectHost from "@/components/auth/SelectHost";
import Submit from "@/components/auth/Submit";
import { Button } from "@nextui-org/react";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useState } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const initialState = {
  message: null,
}

const SignUp = () => {
  const [formState, action] = useFormState<{
    message: string,
  }>(registerGuest, initialState)
  const { liismaiilProfiles } = useSelector((state: RootStateType) => state.profile)
  const { pending } = useFormStatus()


  const [host, setHost] = useState(0);
  const [country, setCountry] = useState('Select from the list ');
  const [open, setOpen] = useState(false);

  const handleCountry = (countr: string) => {
    console.log({ countr })
    setCountry(countr)

  }
  const handleHost = (hos: number) => {
    console.log({ hos })
    setHost(hos)
  }

  const handleOpen = () => {

    setOpen((open) => !open)
  }


  const countries = organisations.map((org) => org.country)
  const hosts = organisations.map((org) => {
    return ({ login: org.login, uid: org.uid })
  })

  return (<div className='flex relative  flex-col w-full h-screen justify-center items-center gap-2'>
    <form className="loginForm" action={action}>
      <div className='flex flex-col w-full h-full justify-center items-left gap-1 '>
        <SelectHost countryHandler={(country: string) => handleCountry(country)} hostHandler={(host: number) => handleHost(host)} />
        <div className='flex   justify-between items-center  gap-2 rounded-md'>
          <label htmlFor={'token'} className="text-left w-28 "> token: </label>
          <input type="text" name={'token'} id={'token'} className="border  w-full flex justify-end  rounded-md " required />
        </div>
        <div className='flex justify-between items-center  gap-2 rounded-md'>
          <label htmlFor={'password'} className="text-left  w-28"> password:</label>
          <input type="password" name={'password'} id={'password'} className="border  w-full flex justify-end  rounded-md " required />
        </div>
        <div className={`${open ? 'flex justify-between items-center  gap-2 rounded-md' : 'hidden'} `}>
          <label htmlFor={'host'} className="text-left w-28"> Host: </label>
          <input type="text" name={'host'} id={'token'} value={host} className="border  w-full flex justify-end  rounded-md " required />
        </div>

        <div className='flex justify-center items-center '>
          <Submit label={'Host Sign Up'} />

          <Button onPress={handleOpen} type="submit" isLoading={pending} className='btn bg-blue-400
             text-yellow-100  text-center text-2xl p-2
              rounded-md'>
            {'Open Sign Up'}
          </Button>


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
