
'use client'
import { Ayah, StagePrismaType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import { memo } from "react";
import {  useSelector } from 'react-redux';


function TemplateOrdered() {

    const {insightTemplate, insightTemplateAyahsSelected}
     = useSelector((state: RootStateType) => state.stage)
console.log({insightTemplateAyahsSelected});
     
    
    return (<div className={ `flex  border-1 border-blue-400/20 rounded-md flex-col w-full justify-start p-2  space-y-2 items-stretch `} >
        <div className="flex-col justify-start items-stretch  mb-2  h-screen overflow-x-scroll ">
        Tamplate from ayah : &nbsp;[ {insightTemplateAyahsSelected[0].number} ] &nbsp; to : &nbsp;[ {insightTemplateAyahsSelected[insightTemplateAyahsSelected.length -1 ].number} ] &nbsp;
     
        {insightTemplateAyahsSelected && <div className="flex flex-col justify-start w-full items-stretch py-1 space-y-2">
            {insightTemplateAyahsSelected?.map((ayag: Ayah) => {
                    return <div key={`${ayag.number}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between hover:cursor-not-allowed 
        items-center space-x-2 hover:text-2xl hover:bg-sky-700 hover:text-natWarmheader border-b-1 border-green-300/25 ">
                        <div className='flex justify-left  items-center'>{ayag.number}</div>
                        <div className=' flex text-right justify-end items-center pr-2  '>{ayag.text}</div>
                    </div>
                } )
            }
            </div>
}
</div>
</div>
)
}

export default memo(TemplateOrdered)