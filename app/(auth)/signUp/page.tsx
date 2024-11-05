'use client'
import { FormEvent, useEffect, useState } from 'react';
//import organisations from "@/store/shares/organisations.json";


import { registerGuestPrisma } from "@/actions/auth";
import { ADD_GUEST_PRISMA } from "@/graphql/stage/mutations";
import { guestPrismaActions } from '@/store/slices/guestPrismaSlice';
import { RootStateType } from '@/store/store';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { SiCrunchyroll, SiProgress } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
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


const CountrySchema = z.object({
  country: z.string().max(3, 'the country code length is less than 3 characters'),
});



const SignUp = () => {
  const dispatch = useDispatch()
  const { guestPrisma, } = useSelector((state: RootStateType) => state.guestPrisma)
  const { setGuestPrisma } = guestPrismaActions
  const [AddGuestPrisma, { data, loading, error }] = useMutation(ADD_GUEST_PRISMA)
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [host, setHost] = useState<number | null>(0);
  const [country, setCountry] = useState<string | null>('OM');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log({ host });

    if (host && host !== 0) {
      const { success, error, data } = HostSchema.safeParse({ host })
      if (error && !success) {
        toast.warning(`${error.message}`)
      }
    }
  }, [host]);
  useEffect(() => {
    console.log({ tokenId });

    if (tokenId && tokenId !== -1) {
      const { success, error, data } = TokenIdSchema.safeParse({ tokenId })
      if (error && !success) {
        toast.warning(`${error.message}`)
      }
    }
  }, [tokenId]);
  useEffect(() => {
    console.log({ password });

    if (password && password !== "") {
      const { success, error, data } = PasswordSchema.safeParse({ password })
      if (error && !success) {
        toast.warning(`${error.message}`)
      }
    }
  }, [password]);
  useEffect(() => {
    if (country && country !== "") {
      const { success, error, data } = CountrySchema.safeParse({ country })
      if (error && !success) {
        toast.warning(`${error.message}`)
      }
    }
  }, [country]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const guest = {
        tokenId,
        host,
        password,
        country
      }

      AddGuestPrisma({
        variables: {
          input: {
            tokenId,
            host,
            password,
            country,
            collaboratorId: 'O6cKgXEsuPNAuzCMTGeblWW9sWI3'
          }
        }
      })

    } catch (error) {
      console.log({ error });
    }
  }
  useEffect(() => {
    console.log({ data, error, loading });
    if (typeof data != 'undefined' && data.addGuestPrisma && !error && !loading) {
      dispatch(setGuestPrisma({ guestPrisma: data.addGuestPrisma }))

    }

  }, [loading, data, error]);

  useEffect(() => {
    if (typeof guestPrisma != 'undefined' && guestPrisma) {
      console.log({ guestPrisma });
    }

  }, [guestPrisma]);


  const [open, setOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);

  if (typeof guestPrisma != 'undefined' && guestPrisma.tokenId) {

    return (<div className='flex relative  flex-col w-full font-thin text-2xl h-screen justify-center items-center gap-3'>
      <Link prefetch={true} key={`stage`} href={`/stages/${guestPrisma.tokenId}`} >
        <div className={'navig-mobile-svg'}  >
          <SiProgress />
        </div>
        <div className={'nanvig-mobile-txt'}  >
          Stages
        </div>
      </Link>
      <Link prefetch={true} key={`sprints`} href={`/sprints/${guestPrisma.tokenId}`}>
        <div className={'navig-mobile-svg'}  >
          <SiCrunchyroll />

        </div>
        <div className={'nanvig-mobile-txt'}  >
          Sprints
        </div>
      </Link>
    </div>
    )
  }
  return (<div className='flex relative  flex-col w-full h-screen justify-center items-center gap-3'>
    <div className='flex   justify-center items-center text-center rounded-md'>
      Sign Up
    </div>
    <form action={registerGuestPrisma} /* action={action} */>
      <div className='flex border-1 border-emerald-700/50 p-7 rounded-md flex-col w-full h-full justify-center items-left gap-3 shadow-md '>
        {/* <SelectHost countryHandler={(country: string) => handleCountry(country)} hostHandler={(host: number) => handleHost(host)} /> */}
        <div className='flex   justify-between items-center  gap-6 rounded-md'>
          <label htmlFor={'tokenId'} className="text-left w-28"> tokenId: </label>
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
          <input type="text" name={'country'} id={'country'} placeholder='2 character country ISO code' onChange={(e) => setCountry(e.target.value)} className="h-11 ring-1 ring-emerald-200/30 px-3 w-full flex justify-end  rounded-md " required />
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
