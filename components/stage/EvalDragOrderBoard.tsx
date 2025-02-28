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

import { stageActions } from '@/store/slices/stageSlice';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import HeaderEvalComponent from './HeaderEvalComponent';
import { useEffect } from 'react';

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
    const {  reorderedAyahsContext, stageShuffeledAyahsContext, orderedAyahsContext, stageOrderedAyahsContext } = useSelector((state: RootStateType) => state.stage)
    const {setStageReorderedAyahsContext, setStageShuffeledAyahsContext, setStageOrderedAyahsContext } = stageActions

useEffect(() => {
    dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]}))

}, []);

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
        console.log({ active, over, stageShuffeledAyahsContext, numberInSurah:active.data.current.numberInSurah })
         if (active?.id === over?.id) {
           if(reorderedAyahsContext[0] !== -1) {
            dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[active.id]}))
        }else {
            dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[...reorderedAyahsContext, active.id]}))

        }
            dispatch(setStageShuffeledAyahsContext({
                ayahs: [..._.filter(stageShuffeledAyahsContext, function (sh: Ayah) {
                    return sh.numberInSurah !== active.id
                })]
            }))
            dispatch(setStageOrderedAyahsContext({
                ayahs: [..._.filter(stageShuffeledAyahsContext, function (sh: Ayah) {
                    
                    return sh.numberInSurah !== over.id
                })]}));
              }
        }
    


    return (
        <div className="flex-col justify-start items-stretch  w-full gap-1 p-1   h-full " >
      
        <DndContext sensors={sensors}
            collisionDetection={closestCenter}
            autoScroll={true} onDragOver={handleDragOver}
             onDragEnd={handleDragEnd}>
            <div className="flex justify-between items-stretch gap-1 p-1 w-full  border-blue-400 border-1 rounded-md  
                 h-full " >
                <div className="flex   flex-col w-full items-stretch justify-start p-2 gap-2">
                    { typeof stageShuffeledAyahsContext !== 'undefined' && 
                    stageShuffeledAyahsContext.length > 0 && stageShuffeledAyahsContext.map && stageShuffeledAyahsContext?.map((ayd: Ayah, index: number) => {
                     // console.log({ayId:ayd, nbSurah: ayd.numberInSurah, index});
                        
                        return (<Draggable  key={`${ayd.order}-${index}`} id={ayd?.numberInSurah!} gridAyah={ayd}  />)
                    })}
                </div>
                <div className="flex flex-col items-center justify-start   h-full  w-full  gap-2 p-2 border-emerald-500  " >
                    {orderedAyahsContext && orderedAyahsContext?.length > 0 &&
                        stageOrderedAyahsContext.map((ayd: Ayah, index: number) => {
                          //  console.log({ayd, nbA: ayd.numberInSurah});
                            
                            return (<Droppable key={`${ayd.order}-${index}`} id={ayd.numberInSurah!} ayd={ayd} />)
                        })}</div>
            </div>
        </DndContext>
       
    </div>)
}

