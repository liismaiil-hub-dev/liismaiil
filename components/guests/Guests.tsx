'use client'
import { memo } from "react";

import { GuestType } from '@/api/graphql/sprint/sprint.types';
import { RootStateType } from '@/store/store';
import { cn } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

const GuestsFrontComp = ({ guests, handleGuestSpace, tokenId }: { guests: GuestType[], handleGuestSpace: (arg: string) => void , tokenId: string}) => {
    
  return  <div className='flex flex-row border-2 gap-3 border-blue-600 items-center justify-start   
    shadow-md shadow-black/20 rounded-sm h-[100%] w-full flex-wrap' >
                {guests.map((gust, index) => {
                    return (<Link key={`${gust.tokenId}_${index}`}  href={`/stage/${tokenId}`} scroll={false}>
                    <div  className={cn(tokenId !== ''  && tokenId === gust.tokenId && 'bg-green-300' ,"cursor-pointer hover:animate-zoomIn border-2  border-green-400-300 hover:border-indigo-600 items-center justify-center shadow-md shadow-black/20 rounded-full h-12 w-12")}>
                    <Image width={70} height={70} className='flex justify-center items-center rounded-full object-cover' src={`/img/flags/${gust.flag}`} alt={'avatar flalg '}  />
            </div>
        </Link>)
        })}
    </div>
}
function Guests(): ReactElement {
    const { guests, guest } = useSelector((state: RootStateType) => state.guest)
    const router = useRouter()
    const handleGuestSearch = (gust: string) => {
     //   console.log({ gust13: gust, url: `/space/${gust}` });
        router.push(`/stage/${gust}`)
    }



    return (
        <div className="container  flex flex-col   items-center  justify-start" >
            <div className=" flex  justify-between items-center gap-2">
                <input style={{ border: 'solid blue 1px' }} type='text' onChange={(e) => handleGuestSearch(e.target?.value!)}
                    placeholder='tokenId' className='input' />
                <button onClick={() => handleGuestSearch(guest.tokenId)} className='btn' > Find guest</button>
            </div>
            <div className="flex pt-1 justify-stretch  items-stretch w-full  h-full    ">
                <GuestsFrontComp guests={guests} tokenId={guest && guest.tokenId !==''?guest.tokenId: '' } handleGuestSpace={(gust) => {
                    
                }} />
            </div>
        </div >

    )
}
const MemoizedGuests = memo(Guests)
export default MemoizedGuests