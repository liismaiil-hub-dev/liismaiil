
'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import { memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SpaceButton from './SpaceButton';

function EvalOrdered() {
    const dispatch = useDispatch()
    const { stageGridSelected, stageValidContext, stageHideNbContext, stageOrderedAyahsContext, stageGridIndexContext, stageGridsContext } = useSelector((state: RootStateType) => state.stage)
    const { setStageOrderedAyahsContext, } = stageActions
    function orderHandler() {
        dispatch(setStageOrderedAyahsContext({ ayahs: stageOrderedAyahsContext }))
    }
    return <div className={cn((typeof stageValidContext !== 'undefined' && stageValidContext === true) && 'blur-lg', `flex  border-2 border-blue-400 rounded-md flex-col w-full justify-start p-2  space-y-2 items-stretch `)} >
        <div className="flex-col justify-center items-center mb-2  ">

            <p className='text-center'>{stageGridSelected?.arabName ? stageGridSelected?.arabName : stageGridSelected?.souraName}</p>
            <p className='text-center'>Nb of groups &nbsp;{stageGridSelected.stageId.split('-')[2]}</p>
            <p className='text-center'>Grid &nbsp;{stageGridSelected.grid}</p>
            <p className='text-center'>Actual Grid &nbsp;{stageGridSelected.stageId.split('-')[3]}</p>
            <div className="flex justify-center items-center  ">

                <p className=' text-center text-emerald-200'>Grid Index &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    {stageGridIndexContext + 1}/ {stageGridsContext.length}
                </p>
            </div>
            <div className="CENTER  my-2">
                <SpaceButton handlePress={orderHandler} title='Order Grid' />
            </div>
        </div>
        <div className="flex flex-col justify-start items-stretch py-1 space-y-2">
            {stageOrderedAyahsContext && stageOrderedAyahsContext?.map((ayag: Ayah) => {
                if (typeof stageHideNbContext !== 'undefined' && !stageHideNbContext) {

                    return <div key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order + 1}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                } else {

                    return (
                        <div key={`${ayag.order}_${ayag.juz}`} className='flex  p-2 justify-end  w-full   bg-emerald-100/30  text-right space-x-2
        border-b-1 border-green-300/25
           hover:cursor-pointer 
           items-center   focus:border-red-500'>{ayag.text}</div>
                    )
                }

            })
            }</div>
    </div>
}

export default memo(EvalOrdered)