'use client'

import { CoordsType, COUNTRY_ENUM } from '@/api/graphql/viewer/viewer.types';
import { ProfileTypeData } from '@/app/api/graphql/profile/profile.types';
import { profileActions } from '@/store/slices/profileSlice';
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import _ from 'lodash';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { default as react, default as React, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import slug from 'slug';


// eslint-disable-next-line react-hooks/exhaustive-deps

type CountryCityCoords = {
    country: string,
    addressGeo: string,
    state: string,
    host: string,
    coords: CoordsType
}

// -----------------------------COMPONENT-------------------------//
function SelectHost( {countryHandler, hostHandler }:{countryHandler: (arg:string) => void, hostHandler:(host: number) => void,  }) {
    const dispatch = useDispatch()

    const router = useRouter()

    const { setCountry, setHostToken } = profileActions
   
    const { states, viewers } = useSelector((state: RootStateType) => state.search)
    const { liismaiilProfiles } = useSelector((state: RootStateType) => state.profile)
 
    const countryRef = useRef('')
    const hostRef = useRef('')
    const guestRef = useRef('')
  
    const searchEnterHandler = (e: React.KeyboardEvent) => {
        const key = e.key
        if (key === 'Enter') {
            const term = guestRef.current?.value
            console.log({ term })
            const params = new URLSearchParams()
            let searchQuery = ''
            if (countryRef.current.value !== '') {
                params.set('country', countryRef.current.value)
                //searchQuery = `${searchQuery}country=${countryRef.current}`
            } if (hostRef.current.value !== '') {
                params.set('host', hostRef.current.value)

                //                searchQuery = `${searchQuery}host=${hostRef.current}`
            }

            params.set('term', term)
         console.log({params});
         
            //   router.push(`/search/search?${params.toString()}`)
        }
    }


    const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log({ e, key: e.target.value })
    }
    
    const [countryGuest, setCountryGuest] = useState('');

    const handleCountryChange = (e) => {
        dispatch(setCountry({country:e.target.value}));
       countryHandler(e.target.value)
        //  setCountryGuest(e.target.value) 
        
    }
    const [organHost, setOrganHost] = useState(0);
    
    const handleHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(hostRef.current.value);
            console.log(liismaiilProfiles);
            
        if (hostRef.current.value !== "") {
            const organisationContext = _.find(liismaiilProfiles, (org: ProfileTypeData) => {
                
                return org.tokenId === parseInt(e.target.value)
            })
            if (organisationContext) {
            dispatch(setHostToken({hostToken:organisationContext.tokenId}))
                hostHandler(e.target.value)
               // dispatch(setOrganisation({ organisation: organisationContext }))
            } else {
                toast.error('No organisation found')
            }}
    }
    return (<section className=" flex md:flex-col md:h-25  flex-col items-center justify-center w-full md:justify-center md:items-start  gap-3 ">
     {/*    <Button onClick={()  =>geolocation()}>
            Geolocate
        </Button> */}
        <div className="flex w-full items-center md:flex-col   outline-none justify-stretch gap-3 ">
            
            <select className='shadow-md w-full outline-none  text-center text-green-500 border border-green-500 -800 rounded-md ' name="host" id="host" onChange={(e) => handleHostChange(e)}>
                <option   value="">--choose a host--</option>
                {typeof liismaiilProfiles!== 'undefined' && liismaiilProfiles?.map(
                    (host: ProfileTypeData, index: number) => <option  
                  //  ref={hostRef} 
                    key={ host?.login ? `${host?.login}-${index}`: ''}
                    value={`${host?.tokenId ? host?.tokenId: 0}`} >{host?.login}</option>)}
            </select>
         <div  className={cn( organHost === 0 &&  'hidden' ," flex text-green-600 text-center cursor-pointer")}>
            <Link key={`hosts`} href={`/hosts/${organHost}`}> {`host's stages`} 
            </Link>
        </div>      
        </div> 
       
                <div className="flex items-center md:flex-col outline-none justify-stretch w-full gap-3 ">
             <select className='shadow-md outline-none w-full text-center text-blue-600  border border-blue-800 rounded-md ' name="country" id="country" onChange={(e) => handleCountryChange(e)}>
                <option value="">--choose a country --</option>
                {typeof liismaiilProfiles!== 'undefined' && liismaiilProfiles?.map(
                    (host: ProfileTypeData) =>  <option  key={`${slug(host.addressGeo? host.addressGeo: '')}`}
                    value={host.addressGeo?.split(',').pop()}>{host.addressGeo?.split(',').pop()}</option>)}

            </select>
            <div  className={cn( !(countryGuest in  COUNTRY_ENUM) &&  'hidden' ," flex text-green-600 cursor-pointer")}>
            <Link key={`guests by country`} href={`/guests/${countryGuest}`}> {`${countryGuest} guests `} 
            </Link>
             
                </div>      
        </div>
       
    </section>)
}
export default react.memo(SelectHost)