'use client'
import { memo, useEffect, useState } from "react";
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
import GuestEvolution from "./GuestEvolution";

const GuestsFrontComp = ({ guests, handleGuestSpace, tokenId }: { guests: GuestPrismaType[], handleGuestSpace: (arg: string) => void , tokenId: string}) => {
    return  <div className='flex flex-row border-2 gap-3 border-blue-600 items-center justify-start   
    shadow-md shadow-black/20 rounded-sm h-[100%] w-full flex-wrap' >
                

    </div>
}
function Guests({guests}:{guests : GuestPrismaType[]} ): ReactElement {
    const dispatch = useDispatch()
    const { guestPrisma:{tokenId},  guestStats } = useSelector((state: RootStateType) => state.guestPrisma)
     const [tokenIdSearched, setTokenIdSearched] = useState(-1);
     
     const { setGuestStats , setGuestsForConnexions } = guestPrismaActions
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

  useEffect(() => {
   dispatch(setGuestsForConnexions({guestsPrisma: guests}))
}, [guests]);
  
  return (<div className="container   flex-col   items-stretch  justify-start" >
            <div className="container   flex-col   items-stretch  justify-start    ">
             
            <div className=" flex justify-center p-1 items-center gap-1">
             <form onSubmit={(e) => handleGuestSearch(e)!} className="flex-col   items-center  h-full p-3 justify-center" >
                <input className=" border-1 border-blue-300 p-1" type='text' 
                onChange={(e) => setTokenIdSearched(parseInt(e.target?.value)!)}
                    placeholder='tokenId'  />
                <button  className='btn w-28 p-1 '  type="submit"> 
                    Find guest</button>
            </form>
            </div>

            <div className="flex p-1 justify-items-start  items-start w-full  h-36    ">
            {typeof guests!=='undefined' && guests && guests?.length > 1 && guests?.map((guest: GuestPrismaType, index: number) => {
                    return (<div key={`${guest.tokenId}-${index}`}  className="container  w-24 flex-col   items-center  justify-center    ">
                        <div className={cn(guest.tokenId !== -1  && tokenId === guest.tokenId && 
                        'bg-green-300' ,"cursor-pointer hover:animate-zoomIn border-1  border-green-400 hover:border-indigo-600  shadow-md\
                          shadow-black/20 rounded-md h-14 w-24")}>
                    <Image width={70} height={70} className='flex justify-center items-center rounded-md h-14 w-24 object-cover'
                         src={`/img/flags/${guest.flag}`} alt={'avatar flalg '}  />
                     </div>
        <div className="container   flex-col   items-center p-1 border-1 border-blue-300  justify-start text-center" >
                            {guest.tokenId}
            </div>
            </div>

                )    
                })} 
            </div>
            </div>
        <div className="container   flex-col   items-stretch  justify-start" >

        <GuestEvolution />
        </div >
        </div >
        
        
    )
}
const MemoizedGuests = memo(Guests)
export default MemoizedGuests