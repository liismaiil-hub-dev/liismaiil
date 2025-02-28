
'use client'
import { Ayah, StagePrismaType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import _ from 'lodash';
import { memo, useEffect } from "react";
import {  useDispatch, useSelector } from 'react-redux';
import SpaceButton from './SpaceButton';


function EvalOrdered() {
const dispatch = useDispatch()
    const {localStages, shuffeledAyahsContext, spaceStageAyahsContext,gridsStaged, blurContext, spaceStageSelected,
        reorderedAyahsContext, hideNbContext, orderedAyahsContext,stagedContext , }
     = useSelector((state: RootStateType) => state.stage)
     const { emptyGridsStaged, setOrderedAyahsContext }= stageActions
     
     useEffect(() => {
        const orderedAy = _.sortBy(shuffeledAyahsContext, ['numberInSurah']) 
        console.log({orderedAy, orderedAyahsContext, shuffeledAyahsContext});
        
        dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
         
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [shuffeledAyahsContext]);

     async function EmptyStageHandler() {
       dispatch(emptyGridsStaged())
          } 
    useEffect(() => {
     console.log({orderedAyahsContext});
    }, [orderedAyahsContext]);
      
    
    const _localStageIds = localStages?.map((stage : StagePrismaType)  => stage.stageId)
    return (<div className={cn((typeof blurContext !== 'undefined' && blurContext === true) && 'blur-lg', 
    `flex-col  border-1 border-blue-400/20 rounded-md  w-full justify-start p-1   items-stretch `)} >
        <div className="flex-col justify-start items-stretch    h-36 overflow-x-scroll ">
        <SpaceButton disabled={false} handlePress={EmptyStageHandler} title='Empty Stages' />
      
        {_localStageIds.includes(spaceStageSelected?.stageId) ? <div className="flex justify-center items-center   ">
        Stage persisted : &nbsp;[ {spaceStageSelected?.stageId} ]&nbsp;
        </div>:<div className="flex justify-center items-center   ">
        First time   : &nbsp;[ {spaceStageSelected?.stageId} ]&nbsp; will be persisted
        </div>
        }
        <div className="flex justify-start items-center  flex-wrap ">
          { gridsStaged && gridsStaged.length > 0 && gridsStaged[0]!= '' && gridsStaged.map((stage)  => <div key={stage} className="flex justify-center items-center  ">
          &nbsp;{`[ ${stage}]`}&nbsp;
            </div>)}
            </div>
        </div>
        {!stagedContext ?<div className="flex flex-col justify-start w-full items-stretch py-1 space-y-2">
            {orderedAyahsContext && orderedAyahsContext?.map((ayag: Ayah) => {
                if (typeof hideNbContext !== 'undefined' && !hideNbContext && typeof ayag!=='undefined') {
      
                    return <div key={`${ayag?.number}_${ayag?.juz}`} className=" fflex  hover:cursor-not-allowed  p-1
                                bg-emerald-100/30 justify-between 
                            items-center gap-1 border-b-1 border-green-300/25 hover:bg-sky-700 hover:text-natWarmheader
                            hover:mb-3   hover:text-2xl ">
                        <div className='flex justify-center  items-center'>{ayag?.numberInSurah}</div>
                        <div className=' flex text-right justify-end items-center  '>{ayag?.text}</div>
                    </div>
                } else if(typeof ayag !== 'undefined'){return (<div key={`${ayag?.number}_${ayag?.juz}`} className='flex justify-end  w-full  hover:text-2xl   bg-emerald-100/30  text-right space-x-2 p-2
            border-b-1 border-green-300/25 hover:cursor-not-allowed items-center   '>{ayag?.text}</div>)
                }})
            }
            </div>: <div className="flex flex-col justify-start w-full items-stretch py-1 space-y-2">
            {orderedAyahsContext && orderedAyahsContext?.map((ayag: Ayah) => {
                               return <div key={`${ayag?.number}_${ayag?.juz}`} className=" flex  hover:cursor-not-allowed  p-1
                                bg-emerald-100/30 justify-between 
                            items-center gap-1 border-b-1 border-green-300/25 hover:bg-sky-700 hover:text-natWarmheader
                            hover:mb-3   hover:text-2xl ">
                         <div className='flex justify-center  items-center'> {ayag?.numberInSurah} </div> 
                        <div className=' flex text-right justify-end items-center  hover:cursor-not-allowed'> {ayag?.text} </div>
                    </div>})
                 }</div>
}
</div>)
}

export default memo(EvalOrdered)