'use client'

import { CoordsType, COUNTRY_ENUM, ViewerTypeData } from '@/api/graphql/viewer/viewer.types';
import { viewerActions } from '@/store/slices/viewerSlice';
import { RootStateType } from '@/store/store';
import { Button, cn } from '@nextui-org/react';
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
function SearchHost({ organisations }: { organisations:ViewerTypeData[] }) {
    const dispatch = useDispatch()

    useSelector((state: RootStateType) => state.viewer)
 
    const { setOrganisation, setCountry } = viewerActions

    const router = useRouter()

    const { organisationsContext, organisationContext } = useSelector((state: RootStateType) => state.viewer)
    const { states, viewers } = useSelector((state: RootStateType) => state.search)

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

            setCountryGuest(e.target.value) 
        
    }
    const [organHost, setOrganHost] = useState('');
    
    const handleHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (hostRef.current.value !== "") {
            const organisationContext = _.find(organisationsContext, (org: ViewerTypeData) => {
                
                return slug(org.login) === e.target.value
            })
            console.log({organisationContext,orgref : hostRef.current.value} );
            if (organisationContext) {
                setOrganHost(organisationContext.uid)
               // dispatch(setOrganisation({ organisation: organisationContext }))
            } else {
                toast.error('No organisation found')
            }

        }
    }




    return (<section className=" flex md:flex-row md:h-36 flex-col items-center justify-center  md:justify-center md:items-start  gap-3 ">
        <Button onClick={()  =>geolocation()}>
            Geolocate
        </Button>
        <div className="flex items-center md:flex-col outline-none justify-start gap-3 ">
            <label htmlFor="host">Choose  host :   </label>
            <select className='shadow-md' name="host" id="host" onChange={(e) => handleHostChange(e)}>
                <option value="">--choose a host--</option>
                {typeof organisations!== 'undefined' && organisations?.map((host: ViewerTypeData) => <option className='outline-none ' ref={hostRef} key={`${slug(host.login)}`}
                    value={`${slug(host.login)}`} >{host.login}</option>)}
            </select>
         <div  className={cn( organHost === '' &&  'hidden' ," flex text-green-600 text-center cursor-pointer")}>
            <Link key={`hosts`} href={`/hosts/${organHost}`}> {`host's stages`} 
            </Link>
        </div>      
        </div> 
       
                <div className="flex items-center md:flex-col outline-none justify-start gap-3 ">
            <label htmlFor="country">Choose country : </label>
            <select name="country" id="country" onChange={(e) => handleCountryChange(e)}>
                <option value="">--choose a country --</option>
                {Object.values( COUNTRY_ENUM).map((country: COUNTRY_ENUM) => <option  key={`${slug(country)}`}
                    value={country}>{country}</option>)}

            </select>
            <div  className={cn( !(countryGuest in  COUNTRY_ENUM) &&  'hidden' ," flex text-green-600 cursor-pointer")}>
            <Link key={`guests by country`} href={`/guests/${countryGuest}`}> {`${countryGuest} guests `} 
            </Link>
             
                </div>      
        </div>
       
    </section>)
}
export default react.memo(SearchHost)