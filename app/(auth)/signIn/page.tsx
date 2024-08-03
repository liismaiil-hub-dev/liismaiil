'use client'
import organisations from "@/store/shares/organisations.json";
import { RootStateType } from '@/store/store';

import { signinGuest } from "@/actions/auth";
import Submit from "@/components/auth/Submit";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useRef } from 'react';
import { useFormState } from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import slug from "slug";

const initialState = {
  country: 'FR',
  token: '',
  host: 'liismaiil'
}

const SignIn = () => {
  const [formState, action] = useFormState<{
    country: string,
    token: string,
    host: string
  }>(signinGuest, initialState)
  const dispatch = useDispatch()
  const countryRef = useRef()
  const tokenRef = useRef()
  const hostRef = useRef()
  const { token, host } = useSelector((state: RootStateType) => state.guest)



  const handleCountry = (e) => {
    console.log({ e: e.target.value })

  }
  const handleHost = (e) => {
    console.log({ e: e.target.value })

  }

  const countries = organisations.map((org) => org.country)
  const hosts = organisations.map((org) => {
    return ({ login: org.login, uid: org.uid })
  })
  return (<div className='flex relative  flex-col w-full h-screen justify-center items-center gap-3'>
    <form className="loginForm" action={action}>
      <div className='flex flex-col w-full h-full justify-center items-left gap-3 '>
        <div className='  flex  justify-end items-center gap-6   rounded-md'>
          <select ref={countryRef} id="countries" defaultValue={'FR'}
            name="country" className="w-full bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-blue-500
         focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {countries.map(count => {

              return (<option key={count} value={count}>{count}</option>)
            })}
          </select>
        </div>
        <div className='flex  justify-end items-center gap-6 rounded-md'>
          <select ref={hostRef} name={"host"} id="host" defaultValue={hosts[0].login} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
         focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

            {hosts.map(host => {

              return (<option key={host.uid} id='country' value={host.uid}>{host.login}</option>)
            })}
          </select>
        </div>

        <div className='flex   justify-between items-center  gap-6 rounded-md'>
          <label id={'token'} className="text-center "> token: </label>
          <input ref={tokenRef} type="text" name={'tokenId'} id={'token'} className="border  w-full flex justify-end  rounded-md " required />
        </div>
        <div className='flex justify-center items-center '>
          <Submit label={'Sign In'} />


        </div>
        <div className='flex justify-center items-center '>

          <Link href={'/signUp'} className='text-blue-400
   text-center p-2'> {`Not have any account yet ? `}</Link>

        </div>
        {formState && formState?.message! &&
          toast.info(`${tokenRef?.current.value} successfully signin`) && redirect(`/liismaiil/${slug(hostRef.current.value)}`)}

      </div>
    </form>
  </div>
  )
}
{/* Login.getLayout = function getLayout({ page, pageProps }) {
  return ( {page}</AppLayout>)
}
 */}
export default SignIn;
