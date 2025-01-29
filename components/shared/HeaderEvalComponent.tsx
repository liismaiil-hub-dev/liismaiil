'use client'
import { createNewStage } from "@/actions/stage";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import { useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SpaceButton from './SpaceButton';
import { toast } from "react-toastify";
import { Ayah } from "@/app/api/graphql/stage/stage.types";
import _ from "lodash";


// COPMPONENT
function HeaderEvalComponent() {

    const dispatch = useDispatch()
    const {spaceStageSelected,reorderedAyahsContext,spaceStages, errorNbContext, gridSelected, orderedAyahsContext, gridsContext,firstStateContext, shuffeledAyahsContext,
        shuffeledFirstAyahsContext, gridIndexContext, } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const {setReorderedAyahsContext, setGridIndexContext, setShuffeledAyahsContext, setErrorNbContext, setFirstStateContext, setShuffeledFirstAyahsContext,setOrderedAyahsContext} = stageActions
 

    const [isPending, startTransition] = useTransition()

    function shuffleHandler() {
          const shuffeledAy = _.shuffle(shuffeledAyahsContext)
        console.log({ shuffeledAy });

        dispatch(setShuffeledAyahsContext({ ayahs: shuffeledAy }))
    }
   
    function nextGridHandler() {
        if (gridIndexContext < spaceStageSelected?.group!) {
            dispatch(setGridIndexContext({ index: gridIndexContext + 1 }))
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))

        } else {
            dispatch(setGridIndexContext({ index: 0 }))
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))

        }
    }
    function prevGridHandler() {
        if (gridIndexContext >= 1) {
            dispatch(setGridIndexContext({ index: gridIndexContext - 1 }))
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
        } else {
            dispatch(setGridIndexContext({ index: 0 }))
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
        }
    }

   async function stageHandler() {
        console.log({ reorderedAyahsContext, shuffeledFirstAyahsContext });
        try {

            if (reorderedAyahsContext.length === shuffeledFirstAyahsContext.length) {
                await  createNewStage({
                    ayahs: JSON.stringify(shuffeledFirstAyahsContext),
                    createdAt: new Date().toISOString(),
                    grid: spaceStageSelected.grid,
                    createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                    souraName: spaceStageSelected.souraName,
                    souraNb: spaceStageSelected.souraNb,
                    stageId: `${spaceStageSelected.souraNb}-${spaceStageSelected.grid}-${gridsContext.length}-${gridIndexContext}`,
                    startOn: new Date().toISOString(),
                    tokenId: guestPrisma.tokenId ? guestPrisma.tokenId : 2,
                })
            } else {
                toast.warning('you must at least order the grid once');
            }
        } catch (error) {
            toast.error(`${error}`)
        }
    }
    return (<div className={`flex  border-1 border-blue-400 rounded-md flex-col justify-start p-2 space-y-2  items-stretch w-full`} >
        <div className="flex justify-center items-center  ">
            <p className='text-center inline-flex '>{spaceStageSelected.arabName}</p>

            <p className='text-center inline-flex '>&nbsp; &nbsp; {spaceStageSelected.souraNb}</p>
            <p className='text-center inline-flex' > &nbsp; &nbsp; Nb of groups &nbsp;{spaceStageSelected.group}</p>
            <p className='text-center inline-flex'>&nbsp; Grid &nbsp;{spaceStageSelected.grid}</p>
        </div>

        <p className='text-center'>Reordered Suits &nbsp;{reorderedAyahsContext[0] != -1 && reorderedAyahsContext.map((e: number) => `[${e}]`).join(', ')}</p>
        <div className="flex justify-center items-center  ">

            <p className={cn(errorNbContext < 1 ? 'text-green-200 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>errors &nbsp;
            </p>
            <p className={cn(errorNbContext < 1 ? 'text-green-200 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>
                {errorNbContext}
            </p>
        </div>

        <div className="flex justify-center items-center  ">

            <p className=' text-center text-emerald-200'>Stage id &nbsp;
            </p>
            <p className=' text-center text-blue-400'>
                {spaceStageSelected.stageId}
            </p>
        </div>
        <div className="flex justify-center items-center  ">

            <p className=' text-center text-emerald-200'> Ayahs &nbsp;
            </p>
            {typeof orderedAyahsContext !== 'undefined' && orderedAyahsContext && orderedAyahsContext.length > 0 &&
            <p className=' text-center text-blue-400'>
                From {orderedAyahsContext[0]['numberInSurah'] ? orderedAyahsContext[0]['numberInSurah'] : 0} To  {orderedAyahsContext ? orderedAyahsContext[orderedAyahsContext.length - 1]['numberInSurah'] : 1}
            </p>}
        </div>



        <div className="flex justify-evenly items-center ">
            
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Stage' />
            <SpaceButton handlePress={prevGridHandler} title='Prev Stage' />
            <SpaceButton handlePress={nextGridHandler} title='Next Stage' />
            <SpaceButton handlePress={stageHandler} title='Staged' />
        </div>
    </div >
    )
}

export default HeaderEvalComponent;


