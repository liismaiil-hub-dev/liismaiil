'use client'
import { memo, useState } from "react";
import { RootStateType } from '@/store/store';
import { cn } from "@/lib/cn-utility";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuestPrismaType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { getGuestStats } from "@/actions/guest";
import { guestPrismaActions } from "@/store/slices/guestPrismaSlice";
import { toast } from "react-toastify";
import GuestStats from "./GuestStats";

const GuestsFrontComp = ({ guests, handleGuestSpace, tokenId }: { guests: GuestPrismaType[], handleGuestSpace: (arg: string) => void , tokenId: string}) => {
    return  <div className='flex flex-row border-2 gap-3 border-blue-600 items-center justify-start   
    shadow-md shadow-black/20 rounded-sm h-[100%] w-full flex-wrap' >
                

    </div>
}
function Guests({guests}:{guests : GuestPrismaType} ): ReactElement {
    const dispatch = useDispatch()
    const { guestPrisma:{tokenId},  guestStats } = useSelector((state: RootStateType) => state.guestPrisma)
     const [tokenIdSearched, setTokenIdSearched] = useState(-1);
     
     const { setGuestStats  } = guestPrismaActions
    const handleGuestSearch = async(e: Event) => {
        e.preventDefault()
        console.log({tokenIdSearched});
        try {
            if(tokenIdSearched && tokenIdSearched !== -1) {
            const resp = await getGuestStats(tokenIdSearched)
            if(resp && resp.success) {
           const statsParsed = JSON.parse(resp.guest)
           console.log({statsParsed});
           
                dispatch(setGuestStats({stats:statsParsed }))
            }else if( !resp.success){
               toast.warning(`your search end with error or can t find response`)
            }}
        } catch (error) {
            toast.warning(`your search end with error ${error}`)
            }
  }

  return (
        <div className="container   flex-col   items-stretch  justify-start" >
        <div className="container   flex-col   items-center  justify-center" >
             <form onSubmit={(e) => handleGuestSearch(e)!} className="flex-col   items-center  h-full p-3 justify-center" >
            <div className=" flex w-1/2 justify-between items-center gap-2">
                <input className=" border-1 border-blue-300 p-3" type='text' onChange={(e) => setTokenIdSearched(parseInt(e.target?.value)!)}
                    placeholder='tokenId'  />
                <button  className='btn p-3'  type="submit"> Find guest</button>
            </div>
            </form>
            <div className="flex pt-1 justify-stretch  items-stretch w-full  h-full    ">
            {typeof guests!=='undefined' && guests && guests?.length > 1 && guests?.map((guest: GuestPrismaType, index: number) => {
                    return (<Link key={`${guest.tokenId}_${index}`}  href={`/stage/${tokenId}`} scroll={false}>
                    <div  className={cn(guest.tokenId !== -1  && tokenId === guest.tokenId && 
                        'bg-green-300' ,
                        "cursor-pointer hover:animate-zoomIn\
                         border-2  border-green-400 hover:border-indigo-600 items-center justify-center shadow-md\
                          shadow-black/20 rounded-full h-12 w-12")}>
                    <Image width={70} height={70} className='flex justify-center items-center rounded-full object-cover' src={`/img/flags/${guest.flag}`} alt={'avatar flalg '}  />
            </div>
        </Link>)    
                })} 
            </div>
            </div>
        <div className="container   flex-col   items-stretch  justify-start" >

        <GuestStats />
        </div >
        </div >

    )
}
const MemoizedGuests = memo(Guests)
export default MemoizedGuests