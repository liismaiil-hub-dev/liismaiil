'use client'

import { signinGuestPrisma } from "@/actions/auth";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { z } from "zod";

const TokenIdSchema = z.object({
  tokenId: z.number().int().gte(0),
});
const HostSchema = z.object({
  host: z.number().int().lt(1000),
});
const PasswordSchema = z.object({
  password: z.string().min(3),
});


//______COMPONENT _______\\\
const SignIn = () => {
  const dispatch = useDispatch()
  const { pending, data } = useFormStatus()
  const [guest, setGuest] = useState({
    tokenId: 0, host: 0, password: ""
  });
  useEffect(() => {

    console.log({ dataFromAction: data, pending });

  }, [data, pending]);

  const [tokenId, setTokenId] = useState<number | undefined>(-1);
  const [host, setHost] = useState<number | undefined>(0);
  const [country, setCountry] = useState<string | undefined>('OM');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (host && host !== 0) {
      const { success, error, data } = HostSchema.safeParse({ host })
      if (error && !success) {
        toast.warning(`tokenId must be a number `)
      }
    }
  }, [host]);
  useEffect(() => {
    if (tokenId && tokenId !== -1) {
      const { success, error, data } = TokenIdSchema.safeParse({ tokenId })
      if (error && !success) {
        toast.warning(`tokenId must be a number inferior to 1000`)
      }
    }
  }, [tokenId]);
  useEffect(() => {
    if (password && password !== "") {
      const { success, error, data } = PasswordSchema.safeParse({ password })
      if (error && !success) {
        toast.warning(`password must be superior or equal to 3`)
      }
    }
  }, [password]);

  return (<div className='flex relative  flex-col w-full h-screen justify-center items-center gap-3'>
    <form action={signinGuestPrisma}>

      <div className='flex border-1 border-emerald-700/50 p-7 rounded-md flex-col w-full h-full justify-center items-left gap-3 shadow-md '>
        <div className='flex   justify-center items-center text-center rounded-md'>
          Sign In
        </div>
        <div className='flex   justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'token'} className="text-left w-28 "> tokenId: </label>
          <input onChange={(e) => setTokenId(parseInt(e.target.value))} type="text" name={'tokenId'} id={'token'} className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " required />
        </div>
        <div className='flex justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'host'} className="text-left w-28" > host: </label>
          <input onChange={(e) => setHost(parseInt(e.target.value))} type="text" name={'host'} id={'hostId'} className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " required />
        </div>
        <div className='flex justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'password'} className="text-left w-28 "> password:</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name={'password'} id={'password'} className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " required />
        </div>
        <div className='flex justify-center items-center '>

          <button type='submit' disabled={pending} className='btn bg-blue-400
             text-yellow-100  text-center text-2xl p-2
              rounded-md'> Sign In</button>
        </div>
        <div className='flex justify-center items-center '>

          <Link href={'/signUp'} className='text-blue-400
   text-center p-2'> {`If it s your first connexion, Get a guest account -> `}</Link>

        </div>
        {/*         {formState && formState?.tokenId &&
          toast.info(`${JSON.parse(formState.tokenId)['tokenId']} successfully signin`) && redirect(`/stages/${formState.tokenId}`)}
 */}
      </div>
    </form>
  </div>
  )
}

export default SignIn;
