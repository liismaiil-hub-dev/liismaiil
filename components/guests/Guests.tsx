'use client'
import { memo } from "react";
import { RootStateType } from '@/store/store';
import { cn } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { GuestPrismaType } from "@/app/api/graphql/stage/stage.types";

const GuestsFrontComp = ({ guests, handleGuestSpace, tokenId }: { guests: GuestPrismaType[], handleGuestSpace: (arg: string) => void , tokenId: string}) => {
    
  return  <div className='flex flex-row border-2 gap-3 border-blue-600 items-center justify-start   
    shadow-md shadow-black/20 rounded-sm h-[100%] w-full flex-wrap' >
                

    </div>
}
function Guests({guests}:{guests : GuestPrismaType} ): ReactElement {
    const { guestPrisma:{tokenId} } = useSelector((state: RootStateType) => state.guestPrisma)
    const searchProgress =(state: RootStateType) => state.guestPrisma 
    const router = useRouter()
    const handleGuestSearch = (gust: string) => {
     //   console.log({ gust13: gust, url: `/space/${gust}` });
        router.push(`/stage/${gust}`)
    }



    return (
        <div className="container  flex flex-col   items-center  justify-start" >
            <form onSubmit={(e) => handleGuestSearch(e.target?.value!)}>
            <div className=" flex  justify-between items-center gap-2">

                <input style={{ border: 'solid blue 1px p-3' }} type='text' onChange={(e) => handleGuestSearch(e.target?.value!)}
                    placeholder='tokenId' className='input' />
                <button  className='btn p-3'  type="submit"> Find guest</button>
            </div>
            </form>
            <div className="flex pt-1 justify-stretch  items-stretch w-full  h-full    ">
            {typeof guests!=='undefined' && guests && guests?.length > 1 && guests?.map((guest: GuestPrismaType, index: number) => {
                    return (<Link key={`${guest.tokenId}_${index}`}  href={`/stage/${tokenId}`} scroll={false}>
                    <div  className={cn(guest.tokenId !== -1  && tokenId === guest.tokenId && 'bg-green-300' ,"cursor-pointer hover:animate-zoomIn border-2  border-green-400-300 hover:border-indigo-600 items-center justify-center shadow-md shadow-black/20 rounded-full h-12 w-12")}>
                    <Image width={70} height={70} className='flex justify-center items-center rounded-full object-cover' src={`/img/flags/${guest.flag}`} alt={'avatar flalg '}  />
            </div>
        </Link>)    
                })} 
            </div>
        </div >

    )
}
const MemoizedGuests = memo(Guests)
export default MemoizedGuests