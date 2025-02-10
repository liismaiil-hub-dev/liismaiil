'use client'
import { GuestPrismaType } from '@/api/graphql/stage/stage.types';
import { guestPrismaActions } from '@/store/slices/guestPrismaSlice';
import { RootStateType } from '@/store/store';
import { cn } from "@/lib/cn-utility";
import _ from 'lodash';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

const GuestsFrontComp = ({ localsOnline }: { localsOnline: GuestPrismaType[] }) => {
    const dispatch = useDispatch()
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setGuestsOnLine } = guestPrismaActions
    useEffect(() => {

        dispatch(setGuestsOnLine({ guestsPrisma: localsOnline }))
    }, []);


    return <div className='flex flex-row border-2 gap-3 border-blue-600 items-center justify-start p-3    shadow-md shadow-blue-400 rounded-sm w-full h-full flex-wrap' >
        {localsOnline?.map((gust, index) => {
            console.log({ gust });

            return (<div key={`${gust.tokenId}`} className="flex-col justify-center items-center">
                <Link key={`${gust.tokenId}_${index}`} href={`/stages/${gust.tokenId}`} scroll={false}>
                    <div className={cn(gust?.tokenId !== 0 && gust?.tokenId === gust.tokenId && 'bg-green-300 shadow-md shadow-green-200',
                        "cursor-pointer hover:animate-zoomIn border-2 border-green-400 hover:border-indigo-600 flex items-stretch justify-stretch   rounded-full h-14 w-14")}>
                        <Image width={70} height={100} className='flex justify-center items-center rounded-full object-cover' src={`${gust.flag.startsWith('https') ? gust.flag : `/img/flags/${gust.flag}`}`} alt={'guest flag '} />
                    </div>
                </Link>
                <div className={cn(guestPrisma?.tokenId !== 0 && guestPrisma?.tokenId === gust.tokenId && 'justify-self-center text-center shadow-md')}>
                    {gust.tokenId}
                </div>
            </div>
            )
        })}
    </div>
}
function Guests(): ReactElement {
    const { guestsOnline } = useSelector((state: RootStateType) => state.guestPrisma)
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
            setGuestFoundState(-1)

        } //   console.log({ gust13: gust, url: `/space/${gust}` });
        // router.push(`/stages/${guestFoundState}`)
    }
    return (
        <div className="container  flex flex-col items-center w-full gap-3 justify-start p-3"  >
            <div className=" flex  justify-between items-center gap-3">
                <input type='text' onChange={(e) => setSearchId(parseInt(e.target.value))}
                    placeholder='tokenId' className="px-3 text-center w-full flex justify-center h-11 ring-1 ring-emerald-200/30 rounded-md" />
                <button onClick={() => handleGuestSearch()} className='btn rounded-md'  > Find guest</button>
            </div>{typeof guestsOnline !== 'undefined' && guestsOnline && guestsOnline.length > 0 && guestsOnline[0].tokenId !== -1 ?
                <div className="flex  justify-start  items-center w-full  h-full    ">
                    <GuestsFrontComp guests={guestsOnline} />
                </div> : <div className="flex  justify-center  items-center w-full  h-full ">
                    You must connect to your account to see your tokenId there
                </div>}
        </div >

    )
}

export default Guests