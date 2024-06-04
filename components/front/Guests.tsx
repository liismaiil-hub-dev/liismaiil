'use client'
import { memo } from "react";

import { GuestType } from '@/api/graphql/sprint/sprint.types';
import { RootStateType } from '@/store/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

const GuestsFrontComp = ({ guests, handleGuestSpace }: { guests: GuestType[], handleGuestSpace: (arg: string) => void }) => {
    return guests.map((gust, index) => {

        return (<div key={index} className='border cursor-pointer hover:animate-zoomIn
                border-slate-300 hover:border-indigo-300  items-center justify-center   shadow-md shadow-black/10 rounded-full h-30 w-30'
            onClick={() => {


                handleGuestSpace(gust.tokenId.toString())
            }
            } >

            <Image className='rounded-full' src={`/img/flags/${gust.flag}`} alt={'avatar flalg '} width="40" height="40" />

        </div >)
    })
}
function Guests(): ReactElement {
    const [guest, setGuest] = useState('')
    const { guests } = useSelector((state: RootStateType) => state.guest)
    const router = useRouter()
    const handleGuestSpace = (gust: string) => {
        console.log({ gust13: gust, url: `/space/${gust}` });
        router.push(`/space/${gust}`)
    }



    return (
        <div className="container border-2 border-green-300 flex flex-col  -mt-['30px'] items-center justify-start  " >
            <div className=" flex  justify-between items-center gap-2">
                <input style={{ border: 'solid blue 1px' }} type='text' onChange={(e) => setGuest(e.target?.value!)}
                    placeholder='tokenId' className='input' />
                <button onClick={() => handleGuestSpace(guest)} className='btn' > Find guest</button>
            </div>
            <div className="flex mt-4 justify-start w-full px-4 h-36 flex-wrap
             flex-row items-center gap-4  py-3">
                <GuestsFrontComp guests={guests} handleGuestSpace={(gust) => {
                    handleGuestSpace(gust)
                }} />
            </div>
        </div >

    )
}
const MemoizedGuests = memo(Guests)
export default MemoizedGuests