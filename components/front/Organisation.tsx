'use client'
import { CoordsType, ViewerTypeData } from '@/api/graphql/viewer/viewer.types'
import { viewerActions } from '@/store/slices/viewerSlice'
import { RootStateType } from '@/store/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchHost from "./SearchHost"
import react from 'react'

// eslint-disable-next-line react-hooks/exhaustive-deps

type CountryCityCoords = {
    country: string,
    addressGeo: string,
    state: string,
    host: string,
    coords: CoordsType
}

// -----------------------------COMPONENT-------------------------//
function Organisation({ organisation }: { organisation: ViewerTypeData }) {
    const dispatch = useDispatch()

    useSelector((state: RootStateType) => state.viewer)
    const [countries, setCountries] = useState(() => ['DZ', 'MA', 'FR']);

    const {  setOrganisation } = viewerActions

    const router = useRouter()

    const { organisationsContext, organisationContext } = useSelector((state: RootStateType) => state.viewer)
    const { states, viewers } = useSelector((state: RootStateType) => state.search)

    const countryRef = useRef('')
    const hostRef = useRef('')
    const searchRef = useRef('')
   
    function selectOrganisationHandler(org) {
        router.push(`/space/${org.uid}`)
    }
   

return ( 
        <div key={organisation._id} className='border-2  cursor-pointer hover:animate-zoomIn
                    border-slate-300 hover:border-indigo-300   flex flex-col gap-3 justify-start items-center
                     p-2 rounded-lg h-80 w-60'onClick={() => selectOrganisationHandler(organisation)} >
    <div className='h-52 w-full relative flex-col items-start justify-end rounded-lg'
        style={{ "backgroundImage": `url(${organisation.avatar})` }} >

    </div>
    <div className={`px-auto   text-center    w-full font-bold`}>
        {organisation.login}
    </div>
    <div className='px-auto  text-center  w-full'>
        {organisation.status}
    </div>
</div>)
}
export default react.memo(Organisation)