'use client'
import { CoordsType, ViewerTypeData } from '@/api/graphql/viewer/viewer.types'
import { viewerActions } from '@/store/slices/viewerSlice'
import { RootStateType } from '@/store/store'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { default as react, default as React, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import slug from 'slug'

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
    const [countries, setCountries] = useState(() => ['DZ', 'MA', 'FR']);

    const { setOrganisation, setCountry } = viewerActions

    const router = useRouter()

    const { organisationsContext, organisationContext } = useSelector((state: RootStateType) => state.viewer)
    const { states, viewers } = useSelector((state: RootStateType) => state.search)

    const countryRef = useRef('')
    const hostRef = useRef('')
    const searchRef = useRef('')
    const searchEnterHandler = (e: React.KeyboardEvent) => {
        const key = e.key
        if (key === 'Enter') {
            const term = searchRef.current?.value
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
    const organisationHandler = () => {
        let searchQuery = ''
        if (countryRef.current.value !== '') {
            searchQuery = `${searchQuery}country=${countryRef.current}`
        } if (hostRef.current.value !== '') {
            searchQuery = `${searchQuery}country=${hostRef.current}`
        }
        push({
            pathname: '/search',
            query: { searchQuery },
        })
    }

    const handleCountryChange = (e) => {
        if (e.target.value !== "") {
            dispatch(setCountry({ country: e.target.value }))
        }
    }
    const handleHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            const organisationContext = _.find(organisationsContext, (org: ViewerTypeData) => {
                console.log({ slug: slug(org.login), val: e.target.value });

                return slug(org.login) === e.target.value
            })
            if (organisationContext) {

                dispatch(setOrganisation({ organisation: organisationContext }))
            } else {
                toast.error('No organisation found')
            }

        }
    }




    return (<section className="flex items-center justify-evenly gap-2 ">
        <div className="flex flex-col items-center justify-start gap-1 ">
            <label htmlFor="host">Choose  host:</label>
            <select name="host" id="host" onChange={(e) => handleHostChange(e)}>
                <option value="">--choose a host--</option>
                {typeof organisations!== 'undefined' && organisations?.map((host: ViewerTypeData) => <option ref={hostRef} key={`${slug(host.login)}`}
                    value={`${slug(host.login)}`} >{host.login}</option>)}

            </select>
        </div>
        <div className="flex flex-col items-center justify-start gap-1 ">
            <label htmlFor="country">Choose country:</label>
            <select name="country" id="country" onChange={(e) => handleCountryChange(e)}>
                <option value="">--choose a coutry --</option>
                {countries?.map((country: string) => <option ref={countryRef} key={`${slug(country)}`}
                    value={`${slug(country)}`} >{country}</option>)}

            </select>
        </div>
        <div className="flex flex-col items-center justify-start gap-1 ">
            <label htmlFor="host">Search:</label>

            <input type="text" ref={searchRef}
                name="token_or_host" id="searched-text" onKeyDown={searchEnterHandler}
                placeholder={'token or host'} className="text-center " />

        </div>
    </section>)
}
export default react.memo(SearchHost)