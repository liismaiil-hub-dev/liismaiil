'use client'
import { GuestType } from '@/api/graphql/stage/stage.types';
import { RootStateType } from '@/store/store';
import { cn } from "@nextui-org/react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, ReactElement } from "react";
import { useSelector } from 'react-redux';

const GuestsFrontComp = ({ guests }: { guests: GuestType[]}) => {
console.log({guests});
 const { guest} = useSelector((state: RootStateType) => state.guest)
 
    
  return  <div className='flex flex-row border-2 gap-3 border-blue-600 items-center justify-start   
    shadow-md shadow-blue-400 rounded-sm w-full h-full flex-wrap' >
                {guests?.map((gust, index) => {
                    return (<Link key={`${gust.tokenId}_${index}`}  href={`/stage/${gust.tokenId}`} scroll={false}>
                    <div  className={cn(gust?.tokenId !== 0  && guest?.tokenId === gust.tokenId && 'bg-green-300 shadow-md shadow-green-200' ,
                    "cursor-pointer hover:animate-zoomIn border-2 border-green-400 hover:border-indigo-600 flex items-stretch justify-stretch   rounded-full h-14 w-14")}>
                        <Image width={70} height={100} className='flex justify-center items-center rounded-full object-cover' src={`/img/flags/${gust.flag ?gust.flag : 'pt.png'}`} alt={'avatar flalg '}  /> 
                    </div>
                    <div  className={cn(guest?.tokenId !== 0  && guest?.tokenId === gust.tokenId && 'justify-self-center text-center shadow-md')}>
                    {gust.tokenId}
                    </div>
                </Link>)
        })}
    </div>
}
function Guests(): ReactElement {
    const { guests, guest } = useSelector((state: RootStateType) => state.guest)
    const router = useRouter()
    const handleGuestSearch = (gust: number) => {
     //   console.log({ gust13: gust, url: `/space/${gust}` });
        router.push(`/stage/${gust}`)
    }
   return (
        <div className="container  flex flex-col   items-center w-full gap-3 justify-start" >
            <div className=" flex  justify-between items-center gap-3">
                <input style={{ border: 'solid blue 1px' }} type='text' onChange={(e) => handleGuestSearch(parseInt(e.target?.value)!)}
                    placeholder='tokenId' className='input' />
                <button onClick={() => handleGuestSearch(guest?.tokenId)} className='btn' > Find guest</button>
            </div>
            <div className="flex  justify-start  items-center w-full  h-full    ">
                <GuestsFrontComp guests={guests} />
            </div>
        </div >

    )
}
const MemoizedGuests = memo(Guests)
export default MemoizedGuests