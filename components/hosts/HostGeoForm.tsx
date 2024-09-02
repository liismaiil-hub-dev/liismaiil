'use client'
import organisations from "@/store/shares/organisations.json";
import { RootStateType } from '@/store/store';

import { getDataLayerUrls } from "@/actions/host";
import { COUNTRY_ENUM } from "@/api/graphql/viewer/viewer.types";
import Submit from "@/components/auth/Submit";

import { GuestPrismaType } from "@/app/api/graphql/stage/stage.types";
import { useCallback, useEffect, useState } from 'react';
import { useFormState } from "react-dom";
import { useDispatch, useSelector } from 'react-redux';

const fatickCenter = {
  lat: 14.346076882072916,
  long: -16.408125736499372

};
const initialState = {
  host: '',
  country: 'SE',

}

const GeoForm = ({ hosts }: { hosts: GuestPrismaType[] }) => {

  const dispatch = useDispatch()

  const { token, host } = useSelector((state: RootStateType) => state.guest)
  const [hostsState, setHostsState] = useState(() => hosts.map((host) => {
    return ({ tokenId: host.tokenId, flag: host.flag, country: host.country, onLine: host.onLine, })
  }));
  const [hostState, setHostState] = useState({ tokenId: 100, flag: '', country: 'DZ', onLine: false });

  const [countryState, setCountryState] = useState(() => organisations[0]?.country);

  const [formState, action] = useFormState<{ country: string, host: string }>(getDataLayerUrls, initialState)
  const handleCountry = (e) => {
    console.log({ e: e.target.value })

  }
  const handleHost = (e) => {
    console.log({ e: e.target.value })

  }
  useEffect(() => {
    console.log({ hostState, countryState });

  }, [countryState, hostState]);


  const countries = Object.keys(COUNTRY_ENUM).map((org) => org)
  const uniCo = ["🐀", "🌏", "🌎", "🌍",]
  const [logImg, setLogImg] = useState(0);

  const globLog = useCallback(() => {
    const intervalID = setInterval(() => {
      setLogImg((logImg) => {
        if (logImg + 1 > uniCo.length) {
          return 0
        } else return logImg + 1
      })
    }, 500);
    return clearInterval(intervalID);
  }, [])


  return (
    <div className='flex relative   w-full h-30 justify-center items-center gap-3'>

      <form className="loginForm" action={action}>
        <div className='flex flex-col w-full h-full justify-center items-left gap-3 '>
          <div className='  flex  justify-end items-center gap-6   rounded-md'>
            <select onChange={(e) => { setCountryState(e.target.value) }} id="country" value={countryState}
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
            <select onChange={(e) => { setHostState(e.target.value) }} name={"host"} id="host" value={hostState}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
         focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

              {hostsState.map(host => {

                return (<option key={host.tokenId} id='host' value={host.tokenId}>{host.tokenId}</option>)
              })}
            </select>
          </div>

          <div className='flex justify-center items-center '>
            <Submit label={' Get Geo information '} />


          </div>
          {/*  <div className='flex justify-center items-center '>

          <Link href={'/signUp'} className='text-blue-400
   text-center p-2'> {`Not have any account yet ? `}</Link>

        </div>
        {formState && formState?.! &&
          toast.info(`${tokenRef?.current.value} successfully signin`) && redirect(`/liismaiil/${slug(hostRef.current.value)}`)} */}

        </div>
      </form>
    </div>
  )
}
{/* Login.getLayout = function getLayout({ page, pageProps }) {
  return ( {page}</AppLayout>)
}
 */}
export default GeoForm;
