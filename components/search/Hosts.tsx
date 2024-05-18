import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import slug from 'slug'
import { CoordsType, ViewerTypeData } from '@/api/viewer/viewer.types'
import _ from 'lodash'
import { dmSans, roboto400 } from '@/styles/fonts'
import { useRouter } from 'next/router'
import { searchActions } from '@/store/slices/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '@/store/store'
import { menuActions } from '@/store/slices/menuSlice'
type CountryCityCoords = {
    country: string,
    addressGeo: string,
    state: string,
    host: string,
    coords: CoordsType
}

/*        const reg = new RegExp(organisationRef.current.value, 'g')
       const searchFilter = _.filter(organisations, (org: ViewerTypeData) => {
           console.log({ org })
           return (reg.test(org?.login) || reg.test(org.email))

       })
       href={{ pathname: 'about', query: { name: 'leangchhean' } }}>
       console.log({ searchFilter })
       setOrganisationsFront(searchFilter) */
// -----------------------------COMPONENT-------------------------//
export default function Hosts({hosts}) {
    const { push } = useRouter()
    const dispatch = useDispatch()
    //const { organisationsContext } = useSelector((state: RootStateType) => state.viewer)
    const { states, viewers } = useSelector((state: RootStateType) => state.search)
    const { countriesContext, hostsContext } = useSelector((state: RootStateType) => state.menu)
    const { setGuests } = searchActions
    const { setCountries, setHosts, setCountry, setHost } = menuActions
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
            push(`/search/search?${params.toString()}`)
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
            dispatch(setHost({ host: e.target.value }))

        }
    }
    const hostSelect = () => {
        return (<>
            <label htmlFor="city">Choose  city:</label>
            <select name="city" id="city" onChange={(e) => handleHostChange(e)}>
                <option value="">--Please choose a city--</option>
                {hostsContext.map((city: string) => <option key={`${slug(city)}`}
                    value={`${slug(city)}`} >{city}</option>)}

            </select>
        </>
        )
    }
    const countrySelect = () => {
        return (<>
            <label htmlFor="country">Choose country:</label>
            <select name="country" id="country" onChange={(e) => handleCountryChange(e)}>
                <option value="">--Please choose a coutry option--</option>
                {countriesContext.map((country: string) => <option key={`${slug(country)}`}
                    value={`${slug(country)}`} >{country}</option>)}

            </select>
        </>
        )
    }

    function selectOrganisationHandler(org) {
        router.push(`/space/${org.uid}`)
    }
    console.log({ countriesContext })
    useEffect(() => {
        dispatch(setHosts({ hosts: ['liismaiil'] }))
        dispatch(setCountries({ countries: ['DZ', 'MA', 'FR'] }))

    }, [])

    console.log({ hostsContext })
    console.log({ countriesContext })
    /** h-[calc(100vh-600px)] */
    return (
        <div className="mx-20 backdrop-blur-md flex flex-col gap-4 items-center justify-start min-h-[400px]  " >
            <div className="my-4 flex items-center justify-evenly gap-2 ">
                <div className="flex flex-col items-center justify-start gap-1 ">
                    <label htmlFor="host">Choose  host:</label>
                    <select name="host" id="host" onChange={(e) => handleHostChange(e)}>
                        <option value="">--choose a host--</option>
                        {hostsContext?.map((host: string) => <option key={`${slug(host)}`}
                            value={`${slug(host)}`} >{host}</option>)}

                    </select>
                </div>
                <div className="flex flex-col items-center justify-start gap-1 ">
                    <label htmlFor="country">Choose country:</label>
                    <select name="country" id="country" onChange={(e) => handleCountryChange(e)}>
                        <option value="">--choose a coutry --</option>
                        {countriesContext?.map((country: string) => <option key={`${slug(country)}`}
                            value={`${slug(country)}`} >{country}</option>)}

                    </select>
                </div>
                <div className="flex flex-col items-center justify-start gap-1 ">
                    <label htmlFor="host">Search:</label>

                    <input type="text" ref={searchRef}
                        name="token_or_host" id="searched-text" onKeyDown={searchEnterHandler}
                        placeholder={'token or host'} className="text-center " />

                </div>
            </div>
            <div className="flex flex-row justify-start  items-center gap-4 ">

                {
                    organisationsContext?.map((org) => <div key={org._id}
                        className=' border  cursor-pointer hover:animate-zoomIn
                    border-slate-300 hover:border-indigo-300
                     p-0 rounded-lg h-80 w-60 bottom-0 '
                        onClick={() => selectOrganisationHandler(org)} >
                        <div className='h-52 w-full flex-col items-center justify-center  rounded-lg'
                            style={{ "backgroundImage": `url(${org.avatar})` }} >

                            <div className={`${dmSans.className} px-[25%]  pt-56  h-auto w-full font-bold`}>
                                {org.login}
                            </div>
                            <div className=' pt-55 h-auto w-full'>
                                {org.status}
                            </div>
                        </div>
                    </div>)
                }


            </div>

        </div >

    )
}

