
'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SpaceButton from './SpaceButton';

function EvalSprintOrdered({guest}: {guest: boolean}) {
    const dispatch = useDispatch()
    const { sprintRandomHidden, stageReorderedAyahsContext, stageValidContext,  stageOrderedAyahsContext, stageShuffeledAyahsContext} = useSelector((state: RootStateType) => state.stage)
    
    return <div className={cn((typeof stageValidContext !== 'undefined' && stageValidContext === true) && 'border-orange-400', `flex  border-2 border-blue-400 rounded-md 
        flex-col w-full justify-start p-2  space-y-2 items-stretch `)} >
                <div className="flex-col  justify-start items-end py-x space-y-1">
            {stageShuffeledAyahsContext && guest && stageOrderedAyahsContext?.map((ayag: Ayah, index) => {
               
                console.log({sprintRandomHidden, index});
                if(  typeof sprintRandomHidden !== 'undefined' &&!sprintRandomHidden?.includes(index)){
             return <div key={`${ayag.order}_${ayag.juz}`} className=" flex  p-2 bg-emerald-100/30 justify-start 
        items-center cursor-not-allowed border-b-1 border-green-300/25 ">
                        <div className='flex  focus:border-red-500 items-center'>{` [ ${ ayag.numberInSurah} ] `}</div>
                        <div className={'flex flex-1 text-right justify-end  items-center '}>{ayag.text}</div>
                    </div>}else {
                          return <div key={`${ayag.order}_${ayag.juz}`} className=" flex  p-2 bg-emerald-100/30 justify-start 
                          items-center cursor-not-allowed border-b-1 border-green-300/25 blur-sm ">
                                          <div className='flex  focus:border-red-500 items-center'>{` [ ${ ayag.numberInSurah} ] `}</div>
                                          <div className={'flex flex-1 text-right justify-end  items-center '}>{ayag.text}</div>
                                      </div>
                    }}
             )}           </div>
    </div>
}

export default memo(EvalSprintOrdered)