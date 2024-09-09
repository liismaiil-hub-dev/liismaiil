'use client'

import { CoordsType, COUNTRY_ENUM } from '@/api/graphql/profile/profile.types';
import { CollaboratorProfileType } from '@/store/slices/profileSlice';
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
function SearchHost() {
    const dispatch = useDispatch()

    const { collaboratorProfiles } = useSelector((state: RootStateType) => state.profile)

    const router = useRouter()

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
            console.log({ params });

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
    const [organHost, setOrganHost] = useState(-1);

    const handleHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (hostRef.current.value !== "") {
            const collaboratorPrifile = _.find(collaboratorProfiles, (org: CollaboratorProfileType) => {

                return slug(org.login) === e.target.value
            })
            console.log({ collaboratorPrifile, orgref: hostRef.current.value });
            if (collaboratorPrifile) {
                setOrganHost(collaboratorPrifile.tokenId)
                // dispatch(setOrganisation({ organisation: organisationContext }))
            } else {
                toast.error('No organisation found')
            }

        }
    }
    return (<section className="   h-25 py-3 flex justify-evenly items-center  gap-3 ">
        {/*    <Button onClick={()  =>geolocation()}>
            Geolocate
        </Button> */}
        <div className="flex-col items-stretch justify-center w-full max-w-md   gap-3  ">

            <select className="px-3 text-center w-full flex justify-center h-11 ring-1 ring-emerald-200/30 rounded-md " name="host" id="host" onChange={(e) => handleHostChange(e)}>
                <option value="">--choose a host--</option>
                {typeof collaboratorProfiles !== 'undefined' && collaboratorProfiles?.map(
                    (host: CollaboratorProfileType) => <option
                        //  ref={hostRef} 
                        key={`${host?.name ? slug(host?.name) : ''}`}
                        value={`${host?.name ? slug(host?.name) : ''}`} >{host?.name}</option>)}
            </select>
            <div className={cn(organHost === -1 && 'hidden', "flex justify-center items-center text-green-600 text-center cursor-pointer")}>
                <Link key={`hosts`} href={`/hosts/${organHost}`}> {`host's stages`}
                </Link>
            </div>
        </div>
        <div className="flex-col items-stretch justify-start w-full max-w-md   gap-3 ">
            <select className="px-3  w-full flex justify-end h-11 ring-1 ring-emerald-200/30 rounded-md " name="country" id="country" onChange={(e) => handleCountryChange(e)}>
                <option value="">--choose a country --</option>
                {typeof collaboratorProfiles !== 'undefined' && collaboratorProfiles?.map(
                    (host: CollaboratorProfileType) => <option key={`${slug(host.addressGeo ? host.addressGeo : '')}`}
                        value={host.addressGeo?.split(',').pop()}>{host.addressGeo?.split(',').pop()}</option>)}

            </select>
            <div className={cn(!(countryGuest in COUNTRY_ENUM) && 'hidden', " flex justify-center items-center text-green-600 text-center cursor-pointer")}>
                <Link key={`guests by country`} href={`/guests/${countryGuest}`}> {`${countryGuest} guests `}
                </Link>

            </div>
        </div>

    </section>)
}
export default react.memo(SearchHost)