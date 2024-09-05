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
  const [hostState, setHostState] = useState(100);
  //const [GetAllHosts, { data, loading, error}] =  useQuery(GET_ALL_HOSTS)
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
        <div className='flex border-1 border-emerald-700/50 p-7 rounded-md flex-col w-full h-full justify-center items-left gap-3 shadow-md '>
          <div className='flex   justify-between items-center  gap-6 rounded-md'>

            <label htmlFor={'country'} className="text-left w-28"> token: </label>
            <select onChange={(e) => { setCountryState(e.target.value) }} value={countryState}
              name="country" id="country" className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md ">
              {countries.map(count => {

                return (<option key={count} value={count}>{count}</option>)
              })}
            </select>
          </div>
          <div className='flex   justify-between items-center  gap-6 rounded-md'>

            <label htmlFor={'host'} className="text-left w-28"> token: </label>
            <select onChange={(e) => { setHostState(parseInt(e.target.value)) }} name={"host"} id="host" value={hostState}
              className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md ">

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
