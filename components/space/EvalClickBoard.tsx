'use client'
import { Ayah } from '@/api/graphql/stage/stage.types';
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import {
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AyahButton from './AyahButton';

export default function EvalClickBoard() {


    const dispatch = useDispatch()
    const { gridSelected, evalIndex, shuffeledAyahsContext, orderedAyahsContext, hideNbContext } = useSelector((state: RootStateType) => state.stage)
    const { setShuffeledAyahsContext, setOrderedAyahsContext } = stageActions

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
    function pressHandler(ord: number) {

        //  const newGrid = _.shuffle(gridState)

        //    setGridState(newGrid)
    }

    function validateHandler(ord: number) {

        //  const newGrid = _.shuffle(gridState)

        //    setGridState(newGrid)
    }


    function repeatHandler(ord: number) {

        //  const newGrid = _.shuffle(gridState)

        //    setGridState(newGrid)
    }




    return (<div id="Eval Board " className="flex flex-col 
    justify-between items-stretch   w-full   h-full " >
        <div id="Eval Board " className="flex grid-cols-1 md:grid-cols-2 
    justify-between items-stretch   w-full   h-full " >
            <div className="flex flex-col w-full items-end justify-center">
                {shuffeledAyahsContext && shuffeledAyahsContext.map((ayd: Ayah, index: number) => {
                    return (
                        <AyahButton key={`${ayd.order}-${index}`} id={ayd.id} handlePress={() => pressHandler(ayd.order)}  >
                            <p tabIndex={ayd.order}>{!hideNbContext && `${ayd.order}`} &nbsp; {` ${ayd.text} `} </p>
                        </AyahButton>
                    )
                })}
            </div>
            <div className="flex flex-col items-end justify-center h-full  w-full border  border-emerald-700 text-sm " >
                {orderedAyahsContext && orderedAyahsContext?.length > 0 &&
                    orderedAyahsContext.map((ay, index) => {
                        return (<AyahButton handlePress={() => { toast.info(`ordered ${ay.order}`) }} key={`${ay.order}`} id={index} >
                            <p className=' text-blue-900 text-opacity-50'>{` ${ay.text}  `} &nbsp;</p>
                        </AyahButton>
                        )
                    })
                }
            </div>
        </div>
        <div className="flex  justify-evenly items-center w-full  border-3  bg-slate-300 font-light  border-teal-200 text-gray-600">
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={repeatHandler}>Repeat </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={handleShuffle}> Shuffle </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={validateHandler}> Validate </button>
        </div>
    </div>

    )
}

