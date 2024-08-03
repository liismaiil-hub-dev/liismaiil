'use client'
import { GuestType } from '@/api/graphql/sprint/sprint.types'
import { CoordsType, ViewerTypeData } from '@/api/graphql/viewer/viewer.types'
import MapComponent from "@/components/maps/Map"
import GoogleMapComponent from "@/components/maps/GoogleMapComponent"
import { guestActions, OrgCoordType } from '@/store/slices/guestSlice'
import { viewerActions } from '@/store/slices/viewerSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
function Organisations({ organisations, guests, guest }: { organisations: ViewerTypeData[], guests: GuestType[], guest: GuestType }) {
    const dispatch = useDispatch()

    const { setOrganisations, setOrganisation } = viewerActions
    const { setGuests, setGuest, setOrgCoords, } = guestActions

   const organisationsCoords:OrgCoordType[] = organisations.map((org)  => {
    console.log({coords:org.coords, address:org.addressGeo});
    
    return {coords:org.coords, addressGeo:org.addressGeo}
   } )
    useEffect(() => {
        dispatch(setOrganisations({ organisations }))
        dispatch(setGuests({ guests }))
        dispatch(setOrgCoords({orgCoords:organisationsCoords}))
        dispatch(setGuest({ guest }))
    }, [])

    return (
        <section className=" w-full h-full  scrollbar-hide  flex-col  space-y-1 items-center  p-1 justify-start " >
            <SearchHost organisations={organisations} />
            <div className="grid grid-col-1  md:grid  md:grid-cols-2 justify-items-start  md:justify-items-stretch md:items-center items-start gap-1 ">
            
            <div className="grid grid-cols-1 md:grid-cols-2  h-1/2 w-1/2  justify-items-stretch justify-start items-center flex-wrap gap-2 ">
                {typeof organisations !== 'undefined' && organisations.length > 0 &&
                    organisations.map((org: ViewerTypeData) => {
                        return (<div key={org._id} className="p-3 ">
                            <Organisation organisation={org} />
                        </div>

                        )
                    }
                    )}
            </div>
            <div className="flex  w-full justify-center items-center flex-grow ">
                <GoogleMapComponent /> 
            {/* <MapComponent /> */}
            </div>
            </div>

            </section >
    )
}
export default React.memo(Organisations)

