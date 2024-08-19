'use client'
import { Ayah } from '@/api/graphql/stage/stage.types';

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

import { sprintActions } from '@/store/slices/sprintSlice';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

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
    const { gridSelected, evalIndex, shuffeledAyahsContext, orderedAyahsContext, hideNbContext } = useSelector((state: RootStateType) => state.sprint)
   const { setShuffeledAyahsContext, setOrderedAyahsContext} = sprintActions 

    function shuffelHandler() {
    dispatch(setShuffeledAyahsContext({ayahs: [..._.shuffle(orderedAyahsContext)]}))
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
    dispatch(setShuffeledAyahsContext({ayahs: [..._.filter(shuffeledAyahsContext,function(sh: Ayah){return sh.id !== active.id
            } )]}))
    dispatch(setOrderedAyahsContext({ayahs: [..._.filter(orderedAyahsContext,function(sh: Ayah){return sh.id !== active.id
            } )]}))
            }}
            console.log({evalIndex});
            

    function handleShuffle() {
        const newGrid = _.shuffle(orderedAyahsContext )
    dispatch(setShuffeledAyahsContext({ayahs: [..._.shuffle(orderedAyahsContext)]}))
    }
    function handleValidate() {
      //  const newGrid = _.shuffle(gridState)
     
    //    setGridState(newGrid)
    }
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (<div  className="flex flex-col justify-items-start items-stretch  mt-3 w-full   h-full " >
            <div  className="flex   flex-row justify-between items-center   w-full   h-32  " >
            <div  className="flex   justify-center items-center   w-full   h-full " >
                Soura  :&nbsp;&nbsp;{gridSelected.arabName}
            </div>
            <div  className="flex   justify-center items-center   w-full   h-full " >
                groups  :&nbsp;&nbsp;{gridSelected.group}
            </div>
            <div  className="flex   justify-center items-center   w-full   h-full " >Eval :&nbsp;&nbsp;{evalIndex}
            </div>
           <div  className="flex   justify-center items-center   w-full   h-full " >grids :&nbsp;&nbsp;{gridSelected.grid * gridSelected.grid}
           </div>
            <div  className="flex   justify-center items-center   w-full   h-full " >Nb Faults :&nbsp;&nbsp;{orderedAyahsContext?.length}
            </div>
            <div  className="flex   justify-center items-center   w-full   h-full " >Nb Corrects :&nbsp;&nbsp;{orderedAyahsContext?.length}
            </div>
           </div>
        <DndContext sensors={sensors}
            collisionDetection={closestCenter}
            autoScroll={true} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                <div  className="flex flex-row justify-between items-stretch   w-full  border-blue-600 border-3 
                 h-full " >
           <div  className="flex   flex-col w-full items-center justify-start  gap-2">
        {shuffeledAyahsContext && shuffeledAyahsContext.map((ayd: AyahWithId, index: number) => {
                return (<Draggable key={`${ayd.order}-${index}`} id={ayd.id} gridAyah={ayd}  hideNb={hideNbContext}/>)
        })}
        </div>
        <div className="flex flex-col items-center justify-start   h-full  w-full  gap-2  border-emerald-500  " >
            {orderedAyahsContext && orderedAyahsContext ?.length > 0 &&
                    orderedAyahsContext .map((ayd: AyahWithId) => {
                        return (   <Droppable  key={`${ayd.id}`} id={ayd.id}  ayd={ayd}/>)
                    })  }</div>
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

