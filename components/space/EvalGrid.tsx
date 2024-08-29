'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { sprintActions } from "@/store/slices/sprintSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import { createNewSprint} from "@/actions/sprint";

function EvalGrid({ first }: { first: boolean }) {
    const [ pending, useRegister] = useTransition()
    const dispatch = useDispatch()
    const { gridSelected, shuffeledAyahsContext, validContext, hideNbContext, shuffeledFirstAyahsContext } = useSelector((state: RootStateType) => state.sprint)
    const { setShuffeledAyahsContext, setEvalIndex, setValidContext, setHideNbContext } = sprintActions
    const [firstState, setFirstState] = useState(() => first);
    const [reorderedAyahs, setReorderedAyahs] = useState([-1]);
    const [errorNb, setErrorNb] = useState(0);
    const [validGrid, setValidGrid] = useState(false);

    function shuffleHandler() {
        const shuffeledAy = _.shuffle(shuffeledFirstAyahsContext)
        dispatch(setShuffeledAyahsContext({ ayahs: shuffeledAy }))
    }
    function firstHandler() {
        setFirstState(true);
        setErrorNb(0)
        setReorderedAyahs([-1])
        console.log({ firstState });
    }
    /**
     * 
     * @param reord  index
     */
    function ayahInReordered(ord: number) {
        console.log({ reorderedAyahs, ord });
        return reorderedAyahs.some((el) => el === ord)
    }

    const firstAyahIndex = useCallback(() => {
        if (firstState) {
            return (_.findIndex(shuffeledFirstAyahsContext, function (ay) {
                const minOrder = _.minBy(shuffeledFirstAyahsContext, 'order')!['order']
                console.log({ minOrder });

                return ay['order'] === minOrder
            }))
        } else {
            return (_.findIndex(shuffeledAyahsContext, function (ay) {
                const minOrder = _.minBy(shuffeledAyahsContext, 'order')!['order']
                return ay['order'] === minOrder
            }))
        }
    }, [firstState, shuffeledAyahsContext, shuffeledFirstAyahsContext]);

    const [firstAyahState, setFirstAyahState] = useState(() => firstAyahIndex());
    const [showFirstNb, setShowFirstNb] = useState(false);

    function validAyahHandler(reord: number) {
        if (firstState && ayahInReordered.length + 1 === shuffeledFirstAyahsContext.length) {
            toast.success(`It s  your last ayah on that grid of  ${shuffeledFirstAyahsContext.length} values`)
        }
        if (hideNbContext && validContext) {
            console.log({
                reord,
                shuffeledAyahsContextLEngth: shuffeledAyahsContext.length,
                shuffeledFirstAyahsContextLength: shuffeledFirstAyahsContext.length
            });

            if (reorderedAyahs[0] == -1 && reord !== 0) {
                toast.error(`You made a mistake on the first ayah its ${firstAyahIndex() + 1} ayahs in the grid`)

            }
            else if (reorderedAyahs[0] == -1) {
                //console.log({ firstReord: reorderedAyahs[0] });
                setReorderedAyahs([reord])
            } else if (ayahInReordered(reord)) {
                toast.success(`You already selected ayah ${reord + 1}`)

            } else if (reord === shuffeledAyahsContext.length - 1 || reord === shuffeledFirstAyahsContext.length - 1) {
                toast.success('it s the last ayas for that grid')

            }
            else if (errorNb < 4) {
                if (reorderedAyahs[reorderedAyahs.length - 1]! + 1 !== reord) {
                    console.log({ lastReordr: reorderedAyahs[reorderedAyahs.length - 1]! + 1, reord });
                    toast.warning(`you must try again its  ${reord + 1} ayahs you have selected !!! `)
                    setErrorNb((prev) => prev + 1)
                } else {
                    console.log({ lastReordr: reorderedAyahs[reorderedAyahs.length - 1]! + 1, reord });

                    setReorderedAyahs([...reorderedAyahs, reord])
                }
            } else {
                toast.warning(`you must rehearsal  !!! `)
                dispatch(setValidContext({ validCtxt: false }))
                dispatch(setHideNbContext({ hide: false }))
                setErrorNb(0)
                setFirstState(true)

            }
        } else {


            if (reorderedAyahs[0] == -1 && reord !== 0) {
                toast.error(`You made a mistake on the first ayah its ${firstAyahIndex() + 1} th ayahs on the grid`,
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    }
                )

            }
            else if (reorderedAyahs[0] == -1) {
                toast.warning(`you are on rehearsal mode if you want to register ?
        please check valid (checkbox) and hideNb (checkbox) either  !!! `, {
                    position: "top-right",

                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })

                //console.log({ firstReord: reorderedAyahs[0] });
                setReorderedAyahs([reord])
            } else if (ayahInReordered(reord)) {
                toast.success(`You already selected ayah ${reord + 1}`)

            }
            else if (reord === shuffeledAyahsContext.length - 1 || reord === shuffeledFirstAyahsContext.length - 1) {
                toast.success('it s the last ayas for that grid')

            }
            else if (errorNb < 4) {
                if (reorderedAyahs[reorderedAyahs.length - 1]! + 1 !== reord) {
                    console.log({ lastReordr: reorderedAyahs[reorderedAyahs.length - 1]! + 1, reord });
                    toast.warning(`you must try again its  ${reord + 1} ayahs you have selected !!! `)
                    setErrorNb((prev) => prev + 1)
                } else {
                    console.log({ lastReordr: reorderedAyahs[reorderedAyahs.length - 1]! + 1, reord });

                    setReorderedAyahs([...reorderedAyahs, reord])
                }
            } else {
                toast.warning(`you must rehearsal  !!! `)
                dispatch(setValidContext({ validCtxt: false }))
                dispatch(setHideNbContext({ hide: false }))
                setErrorNb(0)
                setFirstState(true)

            }
        }
        //dispatch(setShuffeledAyahsContext({ayahs:shuffeledFirstAyahsContext}))
    }
    useEffect(() => {
        console.log({ reorderedAyahs });

    }, [reorderedAyahs]);
    useEffect(() => {
    

    }, [validGrid]);

    function validAllHandler() {
         if(reorderedAyahs.length === shuffeledFirstAyahsContext.length){
             toast.success('You did well with that grid ')
             setValidGrid(true)
        } else {
             toast.warning(`You did well with that grid ${reorderedAyahs.length} reordered  from 
                ${shuffeledFirstAyahsContext.length} ones ` )
             setValidGrid(false)
        }}

    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch `} >
        <div className="flex-col justify-center items-center  ">
            <div className="flex justify-center items-center  ">
                <p className='text-center inline-flex '>{gridSelected.arabName}</p>
                <p className='text-center inline-flex' > &nbsp; &nbsp; Nb of groups &nbsp;{gridSelected.group}</p>
                <p className='text-center inline-flex'>&nbsp; Grid &nbsp;{gridSelected.grid}</p>
            </div>

            <p className='text-center'>reordered suits &nbsp;{reorderedAyahs[0] != -1 && reorderedAyahs.map((e: number) => e + 1).join(', ')}</p>
            <div className="flex justify-center items-center  ">

                <p className={cn(errorNb == 1 && 'text-red-200', ' text-center text-emerald-200')}>errors &nbsp;
                </p>
                <p className={cn(errorNb == 2 && ' text-red-300', ' text-center text-emerald-400')}>
                    {errorNb}
                </p>
            </div>

        </div>
        <div className="flex justify-evenly items-center ">
            <div className={cn(firstState && 'shadow-lg shadow-emerald-300', 'CENTER')}>
                <SpaceButton handlePress={() => firstHandler()} title='First Grid' />
            </div>
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
            <SpaceButton handlePress={validAllHandler} title='Valid Grid' />
        </div>
        <div className="flex flex-col justify-start items-stretch  space-y-2">
            {firstState && shuffeledFirstAyahsContext ? shuffeledFirstAyahsContext?.map((ayag: Ayah) => {
                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {

                    return <div onClick={() => { validAyahHandler(ayag.order) }} key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between px-2
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order + 1}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                }
                else {
                    return (
                        <div onClick={() => { validAyahHandler(ayag.order) }} key={`${ayag.order}_${ayag.juz}`} className={'flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-b-1 border-green-300/25 hover:cursor-pointer  items-center   hover:border-red-500 hover:bg-emerald-100/70'}>{ayag.text}</div>
                    )
                }
            }) : shuffeledAyahsContext?.map((ayag: Ayah) => {
                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {
                    return <div onClick={() => { validAyahHandler(ayag.order) }} key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                } else {
                    return (
                        <div onClick={() => { validAyahHandler(ayag.order) }} key={`${ayag.order}_${ayag.juz}`} className='  flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-1 border-green-300/25 hover:cursor-pointer items-center   focus:border-red-500'>{ayag.text}</div>
                    )
                }
            })}
        </div>
    </div>

}

export default memo(EvalGrid);
