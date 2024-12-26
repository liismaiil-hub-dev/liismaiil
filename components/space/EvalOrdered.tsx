
'use client'
import { Ayah, StagePrismaType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import { memo } from "react";
import {  useSelector } from 'react-redux';


function EvalOrdered() {

    const { gridSelected,localStages, gridsContext,gridIndexContext,gridsStaged, blurContext, reorderedAyahsContext, hideNbContext, orderedAyahsContext,stagedContext }
     = useSelector((state: RootStateType) => state.stage)
     
     console.log({stagedContext, reorderedAyahsContext, gridsStaged});
     
     const  stageId = `${gridSelected.souraNb}-${gridSelected.grid}-${gridsContext.length}-${gridIndexContext}`;
    const _localStageIds = localStages.map((stage : StagePrismaType)  => stage.stageId)
    return (<div className={cn((typeof blurContext !== 'undefined' && blurContext === true) && 'blur-lg', `flex  border-1 border-blue-400/20 rounded-md flex-col w-full justify-start p-2  space-y-2 items-stretch `)} >
        <div className="flex-col justify-start items-center mb-2  ">
        {_localStageIds.includes(stageId) ? <div className="flex justify-center items-center   ">
        Stage persisted : &nbsp;[ {stageId} ]&nbsp;
        </div>:<div className="flex justify-center items-center   ">
        First time   : &nbsp;[ {stageId} ]&nbsp; will be persisted
        </div>
        }
        <div className="flex justify-start items-center  min-h-36 flex-wrap overflow-hidden  overflow-x-scroll">
          { gridsStaged && gridsStaged.length > 0 && gridsStaged[0]!= '' && gridsStaged.map((stage)  => <div key={stage} className="flex justify-center items-center  ">
          &nbsp;{`[ ${stage}]`}&nbsp;
            </div>)}
            </div>
        </div>
        {!stagedContext ?<div className="flex flex-col justify-start w-full items-stretch py-1 space-y-2">
            {orderedAyahsContext && orderedAyahsContext?.map((ayag: Ayah) => {
                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {

                    return <div key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2 hover:text-2xl hover:bg-sky-700 hover:text-natWarmheader
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center  items-center'>{ayag.numberInSurah}</div>
                        <div className=' flex text-right justify-end items-center
           
           hover:cursor-pointer 
            '>{ayag.text}</div>
                    </div>
                } else {

                    return (
                        <div key={`${ayag.order}_${ayag.juz}`} className='flex justify-end  w-full  hover:text-2xl   bg-emerald-100/30  text-right space-x-2 p-2
        border-b-1 border-green-300/25 hover:cursor-pointer  items-center   '>{ayag.text}</div>
                    )
                }

            })
            }</div>:
            <div className="flex flex-col justify-start w-full items-stretch py-1 space-y-2">
            {orderedAyahsContext && orderedAyahsContext?.map((ayag: Ayah) => {
               
                    if(reorderedAyahsContext.includes(ayag.numberInSurah!)){
                        return <div key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2 hover:text-2xl hover:bg-sky-700 hover:text-natWarmheader
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center  items-center'>{ayag.numberInSurah}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            '>{ayag.text}</div>
                    </div>
                }
                    })
                 }
    </div>
}
</div>)
}

export default memo(EvalOrdered)