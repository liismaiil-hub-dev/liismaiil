'use client'
import { FormEvent, useEffect, useState } from 'react';
//import organisations from "@/store/shares/organisations.json";


import { ADD_GUEST_PRISMA } from "@/graphql/stage/mutations";
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const initialState = {
  message: null,
  /*  success: false,
   tokenId: null,
   country: null,
   host: null,
  */
}

export const GuestRegisterSchema = z.object({
  tokenId: z.number().int().lte(100),
  host: z.number().int().lte(100),
  password: z.string(),
  country: z.string().max(3),
});



const SignUp = () => {
  /* const [formState, action] = useFormState<{
    message: string,
    /*     success: boolean,
        tokenId: number,
        country: string,
        host: number,
   }>(registerGuestPrisma, initialState)
   */
  //const { liismaiilProfiles } = useSelector((state: RootStateType) => state.profile)
  const { pending } = useFormStatus()
  const [AddGuestPrisma, { data, loading, error }] = useMutation(ADD_GUEST_PRISMA)
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [host, setHost] = useState<number | null>(0);
  const [country, setCountry] = useState<string | null>('OM');
  const [password, setPassword] = useState('');
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const guest = {
        tokenId,
        host,
        password,
        country
      }
      console.log({ guest });
      const { success, error, data } = GuestRegisterSchema.safeParse(guest)
      console.log({ data: GuestRegisterSchema.safeParse(guest) });
      if (!success) {
        console.log({ error });

      } else {

        AddGuestPrisma({
          variables: {
            input: {
              tokenId,
              host,
              password,
              country
            }
          }
        })
        // toast.success('all fields are valid')
      }
      //  toast.success('all fields are valid')

    } catch (error) {
      console.log({ error });
    }
  }
  useEffect(() => {
    console.log({ data, error, loading });

  }, [loading, data, error]);

  const [open, setOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const handleValidate = () => {
    try {
      const guest = {
        tokenId,
        host,
        password,
        country
      }
      console.log({ guest });

      const { success, error, data } = GuestRegisterSchema.safeParse(guest)
      console.log({ data: GuestRegisterSchema.safeParse(guest) });
      if (!success) {
        console.log({ error });

      } else {
        setIsValid(true)
        toast.success('all fields are valid')
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return (<div className='flex relative  flex-col w-full h-screen justify-center items-center gap-3'>
    <form className="loginForm" onSubmit={(e) => handleSubmit(e)} /* action={action} */>
      <div className='flex border-1 border-emerald-700/50 p-7 rounded-md flex-col w-full h-full justify-center items-left gap-3 shadow-md '>
        {/* <SelectHost countryHandler={(country: string) => handleCountry(country)} hostHandler={(host: number) => handleHost(host)} /> */}
        <div className='flex   justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'tokenId'} className="text-left w-28"> token: </label>
          <input onChange={(e) => setTokenId(parseInt(e.target.value))} type="text" name={'tokenId'} id={'tokenId'} className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " required />
        </div>
        <div className='flex justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'password'} className="text-left "> password: </label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} name={'password'} id={'password'} className="px-3  w-full flex justify-end  rounded-md h-11 ring-1 ring-emerald-200/30" required />
        </div>
        <div className={`${open ? 'flex justify-between items-center gap-6 rounded-md' : 'hidden'}`}>
          <label htmlFor={'host'} className="text-left w-28 "> Host: </label>
          <input onChange={(e) => setHost(parseInt(e.target.value))} type="text" name={'host'} id={'host'} className="px-3 h-11 ring-1 ring-emerald-200/30  w-full flex justify-end  rounded-md " required />
        </div>
        <div className={`${open ? 'flex justify-between items-center gap-6 rounded-md' : 'hidden'}`}>
          <label htmlFor={'country'} className="text-left w-28 "> Country: </label>
          <input type="text" name={'country'} id={'country'} placeholder='2 character ISO code' onChange={(e) => setCountry(e.target.value)} className="h-11 ring-1 ring-emerald-200/30 px-3 w-full flex justify-end  rounded-md " required />
        </div>
        <div className='flex justify-center gap-3 items-center '>
          {/* <button onClick={() => handleValidate()} disabled={pending} className='btn bg-emerald-300 
             text-blue-700  text-center text-2xl p-2
              rounded-md'>
            {'Validate'}
          </button> */}
          <button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-2xl p-2
              rounded-md'>
            Sign Up
          </button>



        </div>
        <div className='flex justify-center items-center '>

          <Link href={'/signIn'} className='text-blue-400
   text-center p-2'> {`You have an account  ? `}</Link>

        </div>
        {/*         {formState && formState?.message! &&
          toast.info(`${JSON.parse(formState.message)} successfully signin`) && redirect(`/stages/${JSON.parse(formState?.message)['tokenId']}`)}
 */}
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
