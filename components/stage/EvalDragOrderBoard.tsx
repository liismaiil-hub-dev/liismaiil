'use client'
import { AyahTabletType } from '@/api/graphql/sprint/sprint.types';
import { useEffect, useState } from 'react';

import { Draggable } from '@/components/shared/Draggable';
import { Droppable } from '@/components/shared/Droppable';
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
import { useDispatch, useSelector } from 'react-redux';
type AyahWithId = {
    order: number;
    text: string;
    juz: number;
    slice?: string;
    id: number
}
const SortableGrid = ({ ay, id }: { ay: AyahWithId, id: number }) => {
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

// Order 
export default function EvalDragOrderBoard({ evalIndex, hideNb, arabName }: {
    evalIndex: number, hideNb: boolean,
    arabName: string
}) {

    const dispatch = useDispatch()
    const { gridsAyahsSelected } = useSelector((state: RootStateType) => state.stage)

    const [orderedAyahs, setOrderedAyahs] = useState<AyahTabletType[]>(() => _.sortBy(gridsAyahsSelected, 'order'))

    const [orderedGridForDnd, setOrderedGridForDnd] = useState<AyahWithId[]>(() =>
        orderedAyahs.map((ordG: AyahTabletType, index) => ({ ...ordG, id: index + 1 })));

    const [shuffeledAyahs, setShuffeleddAyahs] = useState<AyahTabletType[]>(() => _.shuffle(orderedAyahs))

    const [gridState, setGridState] = useState<AyahWithId[]>(() => shuffeledAyahs.map((shuff: AyahTabletType, index) => ({
        ...shuff, id: index + 1
    })));

    const [shuffeledGridForDnd, setShuffeledGridForDnd] = useState<AyahWithId[]>(() => _.shuffle(orderedGridForDnd))

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    useEffect(() => {
        console.log({ gridsAyahsSelected })
    }, [gridsAyahsSelected]);

    function handleDragOver(event) {
        console.log({ event })
    }

    function handleDragEnd(event: { active: any; over: any; }) {
        const { active, over } = event;
        console.log({ active, over })
        if (active?.id === over?.id) {
            setShuffeledGridForDnd(_.filter(shuffeledGridForDnd, function (sh: AyahWithId) {
                return sh.id !== active.id
            }))
            setOrderedGridForDnd(_.filter(orderedGridForDnd, function (sh: AyahWithId) {
                return sh.id !== active.id
            }))

        }

    }

    function handleShuffle() {
        const newGrid = _.shuffle(gridState)
        console.log({ newGrid })
        setGridState(newGrid)
    }
    function handleValidate() {
        const newGrid = _.shuffle(gridState)
        console.log({ newGrid })
        setGridState(newGrid)
    }
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (<div className="flex flex-col flex-none  items-stretch   w-full   h-full " >
        <div className="flex   flex-auto justify-between items-center   w-full   h-full " >
            <div className="flex   justify-center items-center   w-full   h-full " >
                Soura  :&nbsp;&nbsp;{arabName}
            </div>
            <div className="flex   justify-center items-center   w-full   h-full " >Eval :&nbsp;&nbsp;{evalIndex}
            </div>

            <div className="flex   justify-center items-center   w-full   h-full " >Nb Ayah left :&nbsp;&nbsp;{orderedGridForDnd.length}

            </div>
        </div>
        <DndContext sensors={sensors}
            collisionDetection={closestCenter}
            autoScroll={true} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <div className="flex flex-initial grid-cols-1 md:grid-cols-2 gap-2 justify-between items-stretch   w-full   h-full " >

                <div className="flex flex-grow-0   flex-col w-full items-stretch  gap-2">
                    {shuffeledGridForDnd && shuffeledGridForDnd.map((ayd: AyahWithId, index: number) => {
                        return (<Draggable key={`${ayd.order}-${index}`} id={ayd.id} gridAyah={ayd} hideNb={hideNb} />)
                    })}
                </div>
                <div className="flex flex-col items-end justify-center h-full  w-full  gap-2  border-emerald-500  " >
                    {orderedGridForDnd && orderedGridForDnd?.length > 0 &&
                        orderedGridForDnd.map((ayd: AyahWithId) => {
                            return (<Droppable key={`${ayd.id}`} id={ayd.id} ayd={ayd} />)
                        })}</div>
            </div>
        </DndContext>
        <div className="flex  justify-evenly items-center w-full  border-3  bg-slate-300 font-light  border-teal-200 text-gray-600">
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={() => console.log('dismiss')}>Dismiss </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={handleShuffle}> Shuffle </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={handleValidate}> Validate </button>
        </div>
    </div>

    )
}

