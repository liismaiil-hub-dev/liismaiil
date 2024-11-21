'use client'
import { createNewStage } from "@/actions/stage";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import { useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SpaceButton from './SpaceButton';
import { toast } from "react-toastify";
import { Ayah } from "@/app/api/graphql/stage/stage.types";
import _ from "lodash";


// COPMPONENT
function HeaderEvalComponent() {


    const dispatch = useDispatch()
    const { errorNbContext, gridSelected, orderedAyahsContext, gridsContext,firstStateContext, shuffeledAyahsContext,
        shuffeledFirstAyahsContext, gridIndexContext, } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setGridIndexContext, setShuffeledAyahsContext, setErrorNbContext, setFirstStateContext, setShuffeledFirstAyahsContext,setOrderedAyahsContext} = stageActions
    const [reorderedAyahs, setReorderedAyahs] = useState([-1]);

    const [isPending, startTransition] = useTransition()

    function shuffleHandler() {
        dispatch(setFirstStateContext({first:false}))
        const shuffeledAy = _.shuffle(shuffeledFirstAyahsContext)
        console.log({ shuffeledAy });

        dispatch(setShuffeledAyahsContext({ ayahs: shuffeledAy }))
    }
   
    function firstHandler() {
        dispatch(setFirstStateContext({first: true}))
         const shuffeleledFirst = gridsContext[0].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      
     
     //      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))
     const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))
     dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

     dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
        dispatch(setErrorNbContext({errorNb:0}))
        setReorderedAyahs([-1])
        dispatch(setGridIndexContext({ index: 0 }))
        console.log({ firstStateContext });
    }
    function nextGridHandler() {
        if (gridIndexContext < gridSelected.group) {
            dispatch(setGridIndexContext({ index: gridIndexContext + 1 }))
            setReorderedAyahs([-1])

        } else {
            dispatch(setGridIndexContext({ index: 0 }))
            setReorderedAyahs([-1])

        }
    }
    function prevGridHandler() {
        if (gridIndexContext >= 1) {
            dispatch(setGridIndexContext({ index: gridIndexContext - 1 }))
            setReorderedAyahs([-1])
        } else {
            dispatch(setGridIndexContext({ index: 0 }))
            setReorderedAyahs([-1])
        }
    }

    function stageHandler() {
        console.log({ reorderedAyahs, shuffeledFirstAyahsContext });
        try {

            if (reorderedAyahs.length === shuffeledFirstAyahsContext.length) {
                startTransition(() => createNewStage({
                    ayahs: JSON.stringify(shuffeledFirstAyahsContext),
                    createdAt: new Date().toISOString(),
                    grid: gridSelected.grid,
                    createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                    souraName: gridSelected.souraName,
                    souraNb: gridSelected.souraNb,
                    stageId: `${gridSelected.souraNb}-${gridSelected.grid}-${gridsContext.length}-${gridIndexContext}`,
                    startOn: new Date().toISOString(),
                    tokenId: guestPrisma.tokenId ? guestPrisma.tokenId : 2,
                }
                ))
            } else {
                toast.warning('you must at least order the grid once');
            }
        } catch (error) {
            toast.error(`${error}`)
        }
    }
    return (<div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2 space-y-2  items-stretch w-full`} >
        <div className="flex justify-center items-center  ">
            <p className='text-center inline-flex '>{gridSelected.arabName}</p>

            <p className='text-center inline-flex '>&nbsp; &nbsp; {gridSelected.souraNb}</p>
            <p className='text-center inline-flex' > &nbsp; &nbsp; Nb of groups &nbsp;{gridSelected.group}</p>
            <p className='text-center inline-flex'>&nbsp; Grid &nbsp;{gridSelected.grid}</p>
        </div>

        <p className='text-center'>reordered suits &nbsp;{reorderedAyahs[0] != -1 && reorderedAyahs.map((e: number) => `[${e}]`).join(', ')}</p>
        <div className="flex justify-center items-center  ">

            <p className={cn(errorNbContext < 1 ? 'text-green-200 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>errors &nbsp;
            </p>
            <p className={cn(errorNbContext < 1 ? 'text-green-200 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>
                {errorNbContext}
            </p>
        </div>

        <div className="flex justify-center items-center  ">

            <p className=' text-center text-emerald-200'>Grid Index &nbsp;
            </p>
            <p className=' text-center text-blue-400'>
                {gridIndexContext + 1}/ {gridsContext.length}
            </p>
        </div>
        <div className="flex justify-center items-center  ">

            <p className=' text-center text-emerald-200'> Ayahs &nbsp;
            </p>
            <p className=' text-center text-blue-400'>
                From {orderedAyahsContext[0]['numberInSurah'] ? orderedAyahsContext[0]['numberInSurah'] : 0} To  {orderedAyahsContext ? orderedAyahsContext[orderedAyahsContext.length - 1]['numberInSurah'] : 1}
            </p>
        </div>



        <div className="flex justify-evenly items-center ">
            
            <div className={cn(firstStateContext && 'shadow-lg shadow-emerald-300', 'CENTER')}>
                <SpaceButton handlePress={() => firstHandler()} title='First Grid' />
            </div>
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
            <SpaceButton handlePress={prevGridHandler} title='Prev Grid' />
            <SpaceButton handlePress={nextGridHandler} title='Next Grid' />
            <SpaceButton handlePress={stageHandler} title='Stage Grid' />
        </div>
    </div >
    )
}

export default HeaderEvalComponent;


