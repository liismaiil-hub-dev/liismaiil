'use client'
import { GuestPrismaType } from '@/api/graphql/stage/stage.types';
import { RootStateType } from '@/store/store';
import { cn } from "@nextui-org/react";
import _ from 'lodash';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, ReactElement, useState } from "react";
import { useSelector } from 'react-redux';

const GuestsFrontComp = ({ guests }: { guests: GuestPrismaType[] }) => {
    console.log({ guests });
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)


    return <div className='flex flex-row border-2 gap-3 border-blue-600 items-center justify-start   
    shadow-md shadow-blue-400 rounded-sm w-full h-full flex-wrap' >
        {guests?.map((gust, index) => {
            return (<Link key={`${gust.tokenId}_${index}`} href={`/stage/${gust.tokenId}`} scroll={false}>
                <div className={cn(gust?.tokenId !== 0 && gust?.tokenId === gust.tokenId && 'bg-green-300 shadow-md shadow-green-200',
                    "cursor-pointer hover:animate-zoomIn border-2 border-green-400 hover:border-indigo-600 flex items-stretch justify-stretch   rounded-full h-14 w-14")}>
                    <Image width={70} height={100} className='flex justify-center items-center rounded-full object-cover' src={`/img/flags/${gust.flag ? gust.flag : 'pt.png'}`} alt={'avatar flalg '} />
                </div>
                <div className={cn(guestPrisma?.tokenId !== 0 && guestPrisma?.tokenId === gust.tokenId && 'justify-self-center text-center shadow-md')}>
                    {gust.tokenId}
                </div>
            </Link>)
        })}
    </div>
}
function Guests(): ReactElement {
    const { guestsOnline, guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const router = useRouter()
    const [guestFoundState, setGuestFoundState] = useState(-1);
    const [searchId, setSearchId] = useState(-1);
    console.log({ guestsOnline });

    const handleGuestSearch = () => {
        const guestFound = _.find(guestsOnline, (e) => {
            return e.tokenId === searchId
        })
        if (typeof guestFound !== 'undefined') {
            setGuestFoundState(guestFound?.tokenId)
        } else {
            setGuestFoundState('none')

        } //   console.log({ gust13: gust, url: `/space/${gust}` });
        // router.push(`/stages/${guestFoundState}`)
    }
    return (
        <div className="container  flex flex-col   items-center w-full gap-3 justify-start" >
            <div className=" flex  justify-between items-center gap-3">
                <input type='text' onChange={(e) => setSearchId(parseInt(e.target.value))}
                    placeholder='tokenId' className="px-3 text-center w-full flex justify-center h-11 ring-1 ring-emerald-200/30 rounded-md" />
                <button onClick={() => handleGuestSearch()} className='btn rounded-md'  > Find guest</button>
            </div>{typeof guestsOnline !== 'undefined' && guestsOnline ?
                <div className="flex  justify-start  items-center w-full  h-full    ">
                    <GuestsFrontComp guests={guestsOnline} />
                </div> : <div className="flex  justify-center  items-center w-full  h-full ">
                    You must connect to your account to see your tokenId there
                </div>}
        </div >

    )
}
const MemoizedGuests = memo(Guests)
export default MemoizedGuests