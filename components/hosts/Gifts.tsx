'use client'
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import { cn, Pagination } from "@nextui-org/react";
import Image from "next/image";
import Link from 'next/link';
import {COUNTRY_CODES} from "@/store/constants/flagArray";
import { ReactNode } from "react";
import { ProductTypeData } from "@/api/graphql/product/product.types";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/store/store";
import { stageActions } from "@/store/slices/stageSlice";
import { GiftType } from "@/app/api/graphql/stage/stage.types";


const GiftsComponent = ({ gifts }: { gifts: GiftType[] }) => {
const dispatch = useDispatch()
    console.log({gifts});

  const { gridsContext, gridSelected, evalIndex, evalContext, hideNbContext,blurContext, 
    shuffeledFirstAyahsContext, orderedAyahsContext, validContext, gridIndexContext, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { selecteGifts } = stageActions

//grid grid-cols-4  h-[calc(100vh-7rem)] relative
return <div className="flex-col  h-screen  w-full p-3   justify-start items-center gap-3 ">
<div className="flex   w-full p-3   justify-start items-start gap-3 ">

{gifts.map((gift: GiftType) =>{

return <div key={gift.titleSlug} className='flex-col items-center justify-between shadow-md shadow-blue-400 rounded-md w-32 h-32 gap-2  ' >
        <button key={`${gift.titleSlug}_`} onClick={()=> { dispatch(selecteGifts({gift:gift})) }} >
        <div className='hover:animate-zoomIn shadow-md cursor-pointer  flex justify-center items-center'>
                <Image width={70} height={70} className={'border-green-400 border-3  shadow-green-200  rounded-full object-cover aspect-square '} 
                src={`${gift.image.url}` } alt={'gift image '} />
            </div>
            
        </button>
            <div className={'mt-2 p-2 text-center shadow-md'}>
                {gift.title}
             </div>
</div>
})
}
</div>

<div className="flex  h-14 w-full p-3   justify-center items-center gap-3 ">

<Pagination boundaries={3} color="secondary" total={gifts.length} />
</div>
</div>

}


export default GiftsComponent  