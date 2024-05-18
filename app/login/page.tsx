'use client'
import { guestActions } from '@/store/slices/guestSlice'
import { RootStateType } from '@/store/store'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '@/components/Layout/index'
import {Toast} from "flowbite-react";

const Login = () => {
  const dispatch = useDispatch()
  const tokenRef = useRef(null)
  const hostRef = useRef(null)
  const router = useRouter()
  const { token, host } = useSelector((state: RootStateType) => state.guest)
  const { setGuest, connectGuest } = guestActions
  const [country, setCountry] = useState('FR')
  const [hostState, setHostState] = useState('lismaiil')

  const tokenHandler = () => {
    dispatch(connectGuest({
      guest: {
        token: tokenRef.current.value,
        host: hostRef.current.value
      }
    }))
  }

  useEffect(() => {
    if (host !== '' && token === 'hicham') {
      router.replace('/space')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host, token])
  const handleCountry = (e) => {
    console.log({ e: e.target.value })

  }
  const handleHost = (e) => {
    console.log({ e: e.target.value })


  }

  const countries = ['DZ', 'FR']
  const hosts = ['liismaiil', 'Omar al mokhtar', 'mohammad']
  return (
    <AppLayout title='login to liismaiil tools  ' >
      <div className='flex relative  flex-col w-full h-screen justify-center items-center gap-3'>
        <form className="loginForm">
          <div className='flex flex-col w-full h-full justify-center items-left gap-3 '>
            <div className='  flex  justify-end items-center gap-6   rounded-md'>
              <select onChange={handleCountry} value={country} id="countries" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
         focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>country</option>
                {countries.map(count => {

                  return (<option key={count} value={count}>{count}</option>)
                })}
              </select>
            </div>

            <div className='flex   justify-between items-center  gap-6 rounded-md'>
              <label id={'token'} className="text-center "> token: </label>
              <input ref={tokenRef} type="text" id={'token'} className="border  w-full flex justify-end  rounded-md " required />
            </div>
            <div className='flex  justify-end items-center gap-6 rounded-md'>
              <select onChange={handleHost} value={hostState} id="countries" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
         focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a host</option>
                {hosts.map(host => {

                  return (<option key={host} id='country' value={host}>{host}</option>)
                })}
              </select>
            </div>
            <div className='flex justify-between items-center gap-3'>

              <button onClick={tokenHandler} className='btn bg-blue-400
             text-yellow-100 font-ranga text-3xl p-2
              rounded-md'> login </button>

            </div>

          </div>
        </form>
      </div>
    </AppLayout>
  )
}
{/* Login.getLayout = function getLayout({ page, pageProps }) {
  return ( {page}</AppLayout>)
}
 */}
export default Login;
