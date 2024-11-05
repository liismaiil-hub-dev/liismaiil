'use client'

import { createNewSprint } from "@/actions/sprint";
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';

function EvalSuits({ first }: { first: boolean }) {
    const dispatch = useDispatch()
    const [isPending, startTransition] = useTransition()
    const { stageGridSelected, stageOrderedAyahsContext, stageShuffeledAyahsContext, stageGridsContext, stageValidContext, stageHideNbContext, stageShuffeledFirstAyahsContext, stepIndexContext } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setStageShuffeledAyahsContext, setStageShuffeledFirstAyahsContext, setStageValidContext, setStepIndexContext, setStageHideNbContext, setStageGridSelected } = stageActions
    const [firstState, setFirstState] = useState(() => first);
    const [reorderedAyahs, setReorderedAyahs] = useState([-1]);
    const [errorNb, setErrorNb] = useState(0);
    const [validGrid, setValidGrid] = useState(false);

    function shuffleHandler() {
        setFirstState(false)
        const shuffeledAy = _.shuffle(stageShuffeledFirstAyahsContext)
        console.log({ shuffeledAy });

        dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
    }
    function firstHandler() {
        setFirstState(true);
        setErrorNb(0)
        setReorderedAyahs([-1])
        console.log({ firstState });
        dispatch(setStageShuffeledFirstAyahsContext({ ayahs: stageShuffeledFirstAyahsContext }))

    }
    /**
     * 
     * @param reord  index
     */
    function ayahInReordered(ord: number) {
        console.log({ reorderedAyahs, ord, some: reorderedAyahs.some((el) => el === ord) });

        return reorderedAyahs.some((el) => el === ord)
    }

    const firstAyahIndex = useCallback(() => {
        if (firstState) {
            return (_.findIndex(stageShuffeledFirstAyahsContext, function (ay) {
                const minOrder = _.minBy(stageShuffeledFirstAyahsContext, 'order')!['order']
                console.log({ minOrder });

                return ay['order'] === minOrder
            }))
        } else {
            return (_.findIndex(stageShuffeledAyahsContext, function (ay) {
                const minOrder = _.minBy(stageShuffeledAyahsContext, 'order')!['order']
                return ay['order'] === minOrder
            }))
        }
    }, [firstState, stageShuffeledAyahsContext, stageShuffeledFirstAyahsContext]);

    useEffect(() => {
        console.log({ reorderedAyahs });

    }, [reorderedAyahs]);

    function validAyahHandler(reord: number) {
        console.log({ reord, reorderedAyahs });

        if (firstState && reorderedAyahs.length + 1 === stageShuffeledFirstAyahsContext.length) {
            toast.success(`It s  your last ayah on that grid of  ${stageShuffeledFirstAyahsContext.length} values`)
        }

        if (reorderedAyahs[0] == -1 && reord !== stageOrderedAyahsContext[0].numberInSurah) {
            toast.error(`You made a mistake on the first ayah its ${stageOrderedAyahsContext[0].numberInSurah}in the grid`)

        }
        else if (reorderedAyahs[0] == -1) {

            //console.log({ firstReord: reorderedAyahs[0] });
            setReorderedAyahs([reord])
        } else if (ayahInReordered(reord)) {
            toast.success(`You already selected ayah ${reord}`)
        } else if (reord === reorderedAyahs[reorderedAyahs.length - 1] + 1) {

            setReorderedAyahs([...reorderedAyahs, reord])
        } else {

            toast.warning(`you must select 
                 ${stageOrderedAyahsContext[reorderedAyahs.length].text} 
                 is next ayah `, {
                closeOnClick: true,
                autoClose: false
            })
            setErrorNb((prev) => prev + 1)
        }
        if (errorNb < 4) {
            console.log({ reorderedAyahs, stageShuffeledAyahsContext });

            if ((firstState && reorderedAyahs.length === stageShuffeledFirstAyahsContext.length && reorderedAyahs[0] !== -1) || (!firstState && reorderedAyahs.length === stageShuffeledAyahsContext.length && reorderedAyahs[0] !== -1)) {
                toast.success('it was the last ayas for that grid you can stage it')

            }

        } else {
            toast.warning(`you must rehearsal  !!! `)
            dispatch(setStageValidContext({ validCtxt: false }))
            dispatch(setStageHideNbContext({ hide: false }))
            setErrorNb(0)
            setFirstState(true)

        }
    }
    useEffect(() => {
        console.log(stageShuffeledAyahsContext);

    }, [stageShuffeledAyahsContext]);

    function nextStepHandler() {

        dispatch(setStepIndexContext({ index: stepIndexContext + 1 }))

    }
    useEffect(() => {
        console.log({ stepIndexContext });
        if (stepIndexContext < stageGridsContext.length) {

            dispatch(setStageGridSelected({ stage: stageGridsContext[stepIndexContext] }))
        } else {
            dispatch(setStageGridSelected({ stage: stageGridsContext[0] }))

        }
    }, [stepIndexContext]);

    function getMax() {
        if (stageOrderedAyahsContext && stageOrderedAyahsContext.length > 0) {
            return stageOrderedAyahsContext[stageOrderedAyahsContext.length - 1].numberInSurah
        }
    }
    function getMin() {
        console.log({ stageOrderedAyahsContext, stepIndexContext });
        return stageOrderedAyahsContext[0].numberInSurah
    }


    function sprintHandler() {
        console.log({ reorderedAyahs, stageShuffeledFirstAyahsContext });
        try {

            if (reorderedAyahs.length === stageShuffeledFirstAyahsContext.length) {
                startTransition(() => createNewSprint({
                    sprintId: `${stageGridSelected.stageId}_${guestPrisma.tokenId}`,
                    createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                    stageId: stageGridSelected.stageId,
                    tokenId:guestPrisma.tokenId,
                }
                ))
            } else {
                toast.warning('you must at least order the grid once');
            }
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
        <div className="flex-col justify-center items-center  ">
            <div className="flex justify-center items-center  ">
                <p className='text-center inline-flex '>[&nbsp;{stageGridSelected.arabName ? stageGridSelected.arabName : stageGridSelected.souraName}&nbsp;]&nbsp;</p>

                <p className='text-center inline-flex '>&nbsp; Nb : [&nbsp;{stageGridSelected.souraNb}&nbsp;] </p>
                <p className='text-center inline-flex' > &nbsp; Nb G:  [&nbsp;{stageGridSelected.group ? stageGridSelected.group : stageGridSelected.stageId.split('-')[2]}] </p>
                <p className='text-center inline-flex'>&nbsp; Grid :[&nbsp;{stageGridSelected.grid}&nbsp;]</p>
            </div>
            <p className='text-center'>reordered suits &nbsp;{reorderedAyahs[0] != -1 && reorderedAyahs.map((e: number) => `[${e}]`).join(', ')}</p>
            <div className="flex justify-center items-center  ">

                <p className={cn(errorNb < 1 ? 'text-green-200 !important' : errorNb > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>errors &nbsp;
                </p>
                <p className={cn(errorNb < 1 ? 'text-green-200 !important' : errorNb > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>
                    {errorNb}
                </p>

            </div>

            <div className="flex justify-center items-center  ">

                <p className=' text-center text-emerald-200'>Step Index &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    {stepIndexContext + 1}/ {stageGridsContext.length}
                </p>
            </div>
            <div className="flex justify-center items-center  ">

                <p className=' text-center text-emerald-200'> Ayahs &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    From {getMin()} To  {getMax()}
                </p>
            </div>


        </div>
        <div className="flex justify-evenly items-center my-2 ">
            <div className={cn(firstState && 'shadow-lg shadow-emerald-300', ' my-2 CENTER')}>
                <SpaceButton handlePress={() => firstHandler()} title='First Grid' />
            </div>
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
            <SpaceButton handlePress={nextStepHandler} title='Next Step' />
            <SpaceButton handlePress={sprintHandler} title='Sprint ready' />
        </div>
        <div className="flex flex-col justify-start items-stretch  space-y-2">
            {firstState && stageShuffeledFirstAyahsContext ? stageShuffeledFirstAyahsContext?.map((ayag: Ayah) => {
                if (typeof stageHideNbContext !== 'undefined' && !stageHideNbContext) {

                    return <div onClick={() => { validAyahHandler(ayag.numberInSurah!) }} key={`${ayag.numberInSurah}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between px-2
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag.numberInSurah! + 1}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                }
                else {
                    return (
                        <div onClick={() => { validAyahHandler(ayag.numberInSurah!) }} key={`${ayag.numberInSurah!}_${ayag.juz}`} className={'flex justify-end  w-full  p-2 bg-emerald-100/30  text-right space-x-2 border-1 border-green-300/25 hover:cursor-pointer  items-center   hover:border-red-500 hover:bg-emerald-100/70'}>{ayag.text}</div>
                    )
                }
            }) : stageShuffeledAyahsContext?.map((ayag: Ayah) => {
                console.log({ stageShuffeledAyahsContext });

                if (typeof stageHideNbContext !== 'undefined' && !stageHideNbContext) {
                    return <div onClick={() => { validAyahHandler(ayag.numberInSurah!) }} key={`${ayag.numberInSurah!}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag.numberInSurah! + 1}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                } else {
                    return (
                        <div onClick={() => { validAyahHandler(ayag.numberInSurah!) }} key={`${ayag.numberInSurah!}_${ayag.juz}`} className='  flex p-2 justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-1 border-green-300/25 hover:cursor-pointer items-center   focus:border-red-500'>{ayag.text}</div>
                    )
                }
            })}
        </div>
    </div>

}

export default memo(EvalSuits);
