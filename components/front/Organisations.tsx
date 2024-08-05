'use client'
import { GuestType } from '@/api/graphql/stage/stage.types'
import { ProfileTypeData } from '@/app/api/graphql/profile/profile.types'
import GoogleMapComponent from "@/components/maps/GoogleMapComponent"
import { guestActions, OrgCoordType } from '@/store/slices/guestSlice'
import { profileActions } from '@/store/slices/profileSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Organisation from './Organisation'
import SearchHost from "./SearchHost"

// eslint-disable-next-line react-hooks/exhaustive-deps

// -----------------------------COMPONENT-------------------------//
function Organisations({ collaborators, guests, guest }: { collaborators: ProfileTypeData[], guests: GuestType[], guest?: GuestType | null | undefined}) {
    const dispatch = useDispatch()

    const { setLiismaiilProfiles } = profileActions
    const { setGuests, setGuest, setOrgCoords, } = guestActions

   const collaboratorsCoords:OrgCoordType[] = collaborators.map((org)  => {
    //console.log({coords:org.coords, address:org.addressGeo});
    
    return {coords:org.coords, addressGeo:org.addressGeo}
   } )

    useEffect(() => {
        dispatch(setLiismaiilProfiles({ profiles:collaborators }))
        dispatch(setGuests({ guests }))
     // console.log({collaboratorsCoords});
      
        dispatch(setOrgCoords({orgCoords:collaboratorsCoords}))
        dispatch(setGuest({ guest }))
    }, [])

    return (
        <section className=" w-full h-full  scrollbar-hide  flex-col  space-y-1 items-start  p-1 justify-start " >
            <SearchHost  />
            <div className="grid grid-col-1  md:grid  md:grid-cols-2 justify-items-center  md:justify-items-start  items-start gap-1 ">
            
            <div className="grid grid-cols-1 md:grid-cols-2  justify-items-stretch justify-start items-center flex-wrap gap-2 ">
                {typeof collaborators !== 'undefined' && collaborators.length > 0 &&
                    collaborators.map((org: ProfileTypeData) => {
                        return (<div key={org._id} className="p-3 ">
                            <Organisation liismaiilProfile={org} />
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

