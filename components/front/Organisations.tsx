'use client'
import { GuestType } from '@/api/graphql/sprint/sprint.types'
import { CoordsType, ViewerTypeData } from '@/api/graphql/viewer/viewer.types'
import { guestActions } from '@/store/slices/guestSlice'
import { viewerActions } from '@/store/slices/viewerSlice'
import { RootStateType } from '@/store/store'
import React, { useEffect } from 'react'
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
function Organisations({ organisations, guests }: { organisations: ViewerTypeData[], guests: GuestType[] }) {
    const dispatch = useDispatch()

    const { setOrganisations, setOrganisation } = viewerActions
    const { setGuests } = guestActions

    const { organisationsContext, organisationContext } = useSelector((state: RootStateType) => state.viewer)

    useEffect(() => {
        dispatch(setOrganisations({ organisations }))
        dispatch(setGuests({ guests }))
    }, [])

    return (
        <section className=" bg-green-100 w-screen scrollbar-hide flex flex-col  space-y-1 items-center p-5 justify-start " >
            <SearchHost organisations={organisations} />
            <div className="flex  flex-row justify-start  items-center space-x-4 ">
                {typeof organisations !== 'undefined' && organisations.length > 0 &&
                    organisations.map((org: ViewerTypeData) => {
                        return (<div key={org._id} className=" bg-green-100/10 ">
                            <Organisation organisation={org} />
                        </div>

                        )
                    }
                    )}
            </div></section >
    )
}
export default React.memo(Organisations)

