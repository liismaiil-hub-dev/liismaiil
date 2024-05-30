'use client'
import { CoordsType, ViewerTypeData } from '@/api/graphql/viewer/viewer.types'
import { viewerActions } from '@/store/slices/viewerSlice'
import { RootStateType } from '@/store/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Organisation from './Organisation'
import SearchHost from "./SearchHost"

// eslint-disable-next-line react-hooks/exhaustive-deps

type CountryCityCoords = {
    country: string,
    addressGeo: string,
    state: string,
    host: string,
    coords: CoordsType
}

// -----------------------------COMPONENT-------------------------//
function Organisations({ organisations }: { organisations: ViewerTypeData[] }) {
    const dispatch = useDispatch()

    useSelector((state: RootStateType) => state.viewer)
    const { setOrganisations, setOrganisation } = viewerActions

    const { organisationsContext, organisationContext } = useSelector((state: RootStateType) => state.viewer)
    useEffect(() => {

        dispatch(setOrganisations({ organisations }))
    }, [])

    return (
        <section className="w-full flex flex-col gap-4 items-center p-5 justify-start " >
            <SearchHost />
            <div className="flex flex-row justify-start  items-center gap-4 ">
                {organisationsContext && organisationsContext.length > 0 &&
                    organisationsContext.map((org: ViewerTypeData) => {
                        return (<div key={org._id}>
                            <Organisation organisation={org} />
                        </div>

                        )
                    }
                    )}
            </div></section >
    )
}
export default React.memo(Organisations)

