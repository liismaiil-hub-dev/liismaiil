import React, { ReactElement, useEffect, useRef, useState } from 'react'

import { ViewerTypeData } from '@/api/viewer/viewer.types'
import _ from 'lodash'
import { dmSans, dmSerif } from '@/styles/fonts'
import { useRouter } from 'next/router'
export default function Organisations({ organisations }: { organisations: ViewerTypeData[] }): ReactElement {
const router = useRouter()
    const [organisationsFront, setOrganisationsFront] = useState(organisations)

    const countryRef = useRef('')
    const cityRef = useRef('')

    const organisationHandler = () => {
        /*        const reg = new RegExp(organisationRef.current.value, 'g')
               const searchFilter = _.filter(organisations, (org: ViewerTypeData) => {
                   console.log({ org })
                   return (reg.test(org?.login) || reg.test(org.email))
       
               })
               console.log({ searchFilter })
               setOrganisationsFront(searchFilter) */
        let search = '/search?'
        if (countryRef.current !== '') {
            search = `${search}country=${countryRef.current}`
        } if (cityRef.current !== '') {
            search = `${search}country=${cityRef.current}`
        }
        router.push(search)
    }
    const selectOrganisationHandler = (org) => {
    }

    /** h-[calc(100vh-600px)] */
    return (
        <div className="mx-20 backdrop-blur-md flex flex-col gap-4 items-center justify-start min-h-[400px]  " >
            <div className="my-4 flex gap-2 ">
                <input type='text' ref={countryRef} placeholder='country' className='input' />
                <input type='text' ref={cityRef} placeholder=' city' className='input' />

                <div onClick={organisationHandler} className='btn' > search </div>
            </div>
            <div className="flex flex-row justify-start  items-center gap-4 ">

                {
                    organisationsFront.map((org) => <div key={org._id}
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

