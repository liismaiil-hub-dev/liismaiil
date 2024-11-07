'use client'
import { Ayah } from '@/api/graphql/stage/stage.types';
import { Draggable } from '@/components/shared/Draggable';
import { Droppable } from '@/components/shared/Droppable';
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as _ from 'lodash';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SpaceButton from './SpaceButton';

const SortableGrid = ({ ay, id }: { ay: Ayah, id: number }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="flex 
         content-center items-center">
            <p > {` ${ay.text} `} </p>
        </div>)
}

// Order Components space exercide
export default function EvalDragOrderBoard() {

    const dispatch = useDispatch()

    const { gridSelected, orderedAyahsContext, shuffeledAyahsContext, gridsContext, validContext, hideNbContext, shuffeledFirstAyahsContext, gridIndexContext } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setOrderedAyahsContext, setShuffeledAyahsContext, setEvalIndex, setValidContext, setGridIndexContext, setHideNbContext } = stageActions

    const [firstState, setFirstState] = useState(() => first);
    const [reorderedAyahs, setReorderedAyahs] = useState([-1]);
    const [errorNb, setErrorNb] = useState(0);

    function shuffelHandler() {
        dispatch(setShuffeledAyahsContext({ ayahs: [..._.shuffle(orderedAyahsContext)] }))
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragOver(event) {
        console.log({ event })
    }

    function handleDragEnd(event: { active: any; over: any; }) {
        const { active, over } = event;
        console.log({ active, over })
        if (active?.id === over?.id) {
            dispatch(setShuffeledAyahsContext({
                ayahs: [..._.filter(shuffeledAyahsContext, function (sh: Ayah) {
                    return sh.id !== active.id
                })]
            }))
            dispatch(setOrderedAyahsContext({
                ayahs: [..._.filter(orderedAyahsContext, function (sh: Ayah) {
                    return sh.id !== active.id
                })]
            }))
        }
    }
    console.log({ evalIndex });


    function handleShuffle() {
        const newGrid = _.shuffle(orderedAyahsContext)
        dispatch(setShuffeledAyahsContext({ ayahs: [..._.shuffle(orderedAyahsContext)] }))
    }

    function shuffleHandler() {
        setFirstState(false)
        const shuffeledAy = _.shuffle(shuffeledFirstAyahsContext)
        console.log({ shuffeledAy });

        dispatch(setShuffeledAyahsContext({ ayahs: shuffeledAy }))
    }
    function firstHandler() {
        setFirstState(true);
        setErrorNb(0)
        setReorderedAyahs([-1])
        dispatch(setGridIndexContext({ index: 0 }))
        console.log({ firstState });
    }
    /**
     * 
     * @param reord  index
     */
    function ayahInReordered(ord: number) {
        console.log({ reorderedAyahs, ord, some: reorderedAyahs.some((el) => el === ord) });

        return reorderedAyahs.some((el) => el === ord)
    }


    useEffect(() => {
        console.log({ reorderedAyahs });

    }, [reorderedAyahs]);

    function validAyahHandler(reord: number) {
        console.log({ reord, reorderedAyahs });

        if (firstState && reorderedAyahs.length + 1 === shuffeledFirstAyahsContext.length) {
            toast.success(`It s  your last ayah on that grid of  ${shuffeledFirstAyahsContext.length} values`)
        }

        if (reorderedAyahs[0] == -1 && reord !== orderedAyahsContext[0].numberInSurah) {
            toast.error(`You made a mistake on the first ayah its ${orderedAyahsContext[0].numberInSurah}in the grid`)

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
                 ${orderedAyahsContext[reorderedAyahs.length].text} 
                 is next ayah `, {
                closeOnClick: true,
                autoClose: false
            })
            setErrorNb((prev) => prev + 1)
        }
        if (errorNb < 4) {
            console.log({ reorderedAyahs, shuffeledAyahsContext });

            if ((firstState && reorderedAyahs.length === shuffeledFirstAyahsContext.length && reorderedAyahs[0] !== -1) || (!firstState && reorderedAyahs.length === shuffeledAyahsContext.length && reorderedAyahs[0] !== -1)) {
                toast.success('it was the last ayas for that grid you can stage it')

            }

        } else {
            toast.warning(`you must rehearsal  !!! `)
            dispatch(setValidContext({ validCtxt: false }))
            dispatch(setHideNbContext({ hide: false }))
            setErrorNb(0)
            setFirstState(true)

        }
    }
    useEffect(() => {
        console.log(shuffeledAyahsContext);

    }, [shuffeledAyahsContext]);

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

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (<div className="flex flex-col justify-items-start items-stretch  mt-3 w-full   h-full " >
        <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
            <div className="flex justify-center items-center  ">
                <p className='text-center inline-flex '>{gridSelected.arabName}</p>

                <p className='text-center inline-flex '>&nbsp; &nbsp; {gridSelected.souraNb}</p>
                <p className='text-center inline-flex' > &nbsp; &nbsp; Nb of groups &nbsp;{gridSelected.group}</p>
                <p className='text-center inline-flex'>&nbsp; Grid &nbsp;{gridSelected.grid}</p>
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
                <div className={cn(firstState && 'shadow-lg shadow-emerald-300', 'CENTER')}>
                    <SpaceButton handlePress={() => firstHandler()} title='First Grid' />
                </div>
                <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
                <SpaceButton handlePress={prevGridHandler} title='Prev Grid' />
                <SpaceButton handlePress={nextGridHandler} title='Next Grid' />
                <SpaceButton handlePress={stageHandler} title='Stage Grid' />
            </div>
        </div >

        <DndContext sensors={sensors}
            collisionDetection={closestCenter}
            autoScroll={true} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <div className="flex flex-row justify-between items-stretch   w-full  border-blue-600 border-3 
                 h-full " >
                <div className="flex   flex-col w-full items-center justify-start  gap-2">
                    {shuffeledAyahsContext && shuffeledAyahsContext.map((ayd: Ayah, index: number) => {
                        return (<Draggable key={`${ayd.order}-${index}`} id={ayd?.id!} gridAyah={ayd} hideNb={hideNbContext} />)
                    })}
                </div>
                <div className="flex flex-col items-center justify-start   h-full  w-full  gap-2  border-emerald-500  " >
                    {orderedAyahsContext && orderedAyahsContext?.length > 0 &&
                        orderedAyahsContext.map((ayd: Ayah, index: number) => {
                            return (<Droppable key={`${ayd.id}-${index}`} id={ayd.id!} ayd={ayd} />)
                        })}</div>
            </div>
        </DndContext>
        <div className="flex  justify-evenly items-center w-full  border-3  bg-slate-300 font-light  border-teal-200 text-gray-600">
            <button className=" px-5 py-3 border  rounded-md border-emerald-700/10" onClick={() => console.log('dismiss')}>Dismiss </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700/50" onClick={handleShuffle}> Shuffle </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700/70" onClick={handleValidate}> Validate </button>
        </div>
    </div>

    )
}

