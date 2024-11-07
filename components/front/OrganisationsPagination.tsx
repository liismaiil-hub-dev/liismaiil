'use client'
import { GuestPrismaType } from '@/api/graphql/stage/stage.types'
import { ProfileTypeData } from '@/app/api/graphql/profile/profile.types'
import { guestPrismaActions } from '@/store/slices/guestPrismaSlice'
import { profileActions } from '@/store/slices/profileSlice'
import { RootStateType } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// eslint-disable-next-line react-hooks/exhaustive-deps

// -----------------------------COMPONENT-------------------------//
function OrganisationsPagination({ collaborators, guestPrisma }: { collaborators: ProfileTypeData[], guestPrisma: GuestPrismaType | null | undefined }) {
    const dispatch = useDispatch()

    const { setCollaboratorProfiles } = profileActions
    const { setGuestPrisma, } = guestPrismaActions
    const { collaboratorProfiles } = useSelector((state: RootStateType) => state.profile)

    useEffect(() => {
        const colProfiles = collaborators.map((col: ProfileTypeData) => {
            return {
                tokenId: col.tokenId,
                flag: col.avatar.url,
                coords: col.coords,
                addressGeo: col.addressGeo,
                name: col.login,
                email: col.email,
                phone: col.phone,

            }

        })
        console.log({ colProfiles, guestPrisma });
        dispatch(setCollaboratorProfiles({ profiles: colProfiles }))
        if (typeof guestPrisma != 'undefined' && guestPrisma) {
            dispatch(setGuestPrisma({ guestPrisma: guestPrisma }))
        }
    }, [])


    const [page, setPage] = useState(1);
    const pageSize = 6;
    const nbOfPages = Math.ceil(collaborators.length / pageSize);
    const pagesArr = new Array(nbOfPages)
    const handlePrevious = () => {
        if (collaborators.length > pageSize && (page - 1 > 0)) {
            setPage(page - 1)
        }
    }
    const handleNext = () => {
        if (collaborators.length > pageSize && (page + 1 < collaborators.length / pageSize)) {
            setPage(page + 1)
        }
    }
    const handlePage = (pge: number) => {
        if (collaborators.length > pageSize && (pge > Math.ceil(collaborators.length / pageSize))) {
            setPage(pge)
        }
    }

    return (
        <section className=" w-full  flex-col  space-y-1 items-stretch  p-1 justify-start " >

            {typeof collaboratorProfiles !== 'undefined' && collaboratorProfiles.length > pageSize &&
                <div className="flex justify-center ">

                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px text-sm">
                            <li onClick={() => { handlePrevious() }} >
                                <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            {typeof collaboratorProfiles !== 'undefined' && pagesArr.map((_, index) => {
                                return (<li key={index} onClick={() => { handlePage(collaboratorProfiles.length) }}>
                                    <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index}</a>
                                </li>)
                            })
                            }

                            <li onClick={() => { handleNext() }}>
                                <a className="flex items-center 
      justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            }

            {/* <MapComponent /> */}


        </section >
    )
}
export default React.memo(OrganisationsPagination)

