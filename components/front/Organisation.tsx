'use client'
import { CoordsType, PROFILE_ENROLLMENT_NAMES_ENUM } from '@/api/graphql/viewer/viewer.types'
import { ProfileTypeData } from '@/app/api/graphql/profile/profile.types'
import { viewerActions } from '@/store/slices/viewerSlice'
import { RootStateType } from '@/store/store'
import { useRouter } from 'next/navigation'
import react, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// eslint-disable-next-line react-hooks/exhaustive-deps

type CountryCityCoords = {
    country: string,
    addressGeo: string,
    state: string,
    host: string,
    coords: CoordsType
}

// -----------------------------COMPONENT-------------------------//
function Organisation({ liismaiilProfile }: { liismaiilProfile: ProfileTypeData }) {
   
    useSelector((state: RootStateType) => state.viewer)
    const [countries, setCountries] = useState(() => ['DZ', 'MA', 'FR']);

    const { setOrganisation } = viewerActions

    const router = useRouter()

    function selectOrganisationHandler(org: ProfileTypeData) {
        router.push(`/space/${org.uid}`)
    }


    return (
        <div key={liismaiilProfile._id} className='border  cursor-pointer hover:animate-zoomIn
                    border-green-300  shadow-md shadow-green-300 
                    hover:border-indigo-300  
                     flex flex-col gap-1 
                     justify-start 
                     items-center
                     p-2 
                     rounded-lg
                      h-52 
                      w-60'onClick={() => selectOrganisationHandler(liismaiilProfile)} >
            <div className='h-36 w-full relative flex-col items-start justify-end rounded-lg'
                style={{ "backgroundImage": `url(${liismaiilProfile.avatar.url})` }} >

            </div>
            <div className={`px-auto   text-center text-xl   w-full font-light`}>
                {liismaiilProfile.login}
            </div>
            <div className='px-auto  text-xl text-center  capitalize w-full font-light'>
                {PROFILE_ENROLLMENT_NAMES_ENUM[liismaiilProfile.status]}
            </div>
        </div>)
}
export default react.memo(Organisation)