'use client'
import {  Ayah,AyahTabletType } from '@/api/graphql/stage/stage.types';
import { useEffect, useState } from 'react';

import { sprintActions } from '@/store/slices/sprintSlice';
import { RootStateType } from '@/store/store';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from '@/components/shared/SortableItem';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function EvalBoardSorted() {

    const dispatch = useDispatch()
    const { sprints, gridSelected, orderedAyahsContext, shuffeledAyahsContext , gridIndexContext } = useSelector((state: RootStateType) => state.sprint)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const { setSprints, setGridSelected  } = sprintActions

    
    
    // Drag end  function
    function handleDragEnd(event:DragEndEvent) {
        const { active, over } = event;
                 
            
            const oldIndex = _.findIndex(gridState,function(aywId) {
                
            return aywId.id === active.id
            })
            console.log({oldIndex});
            console.log({activeId:active.id});
             setGridState(arrayMove(gridState,oldIndex, parseInt(active!.id.toString()) -1 ))
        }  

function handleDragStart(event: { active: any; over: any; }) {
        const { active, over } = event;
        console.log({ activeStart: active, overStart :over })
      }


    function handleShuffle() {
    }
    function handleValidate() {
    }

    function handleDismiss() {
    }
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (<div id="Eval Board " className="flex flex-col 
    justify-between items-stretch   w-full   h-full " >
        <DndContext sensors={sensors}
            collisionDetection={closestCenter}
            autoScroll={true} 
            
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}>
            <SortableContext items={gridState} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col justify-start items-end space-y-1 w-full text-sm " >
                        {gridState && gridState.map((ayd: AyahWithId) => {
                       const ordered = false 
                       if(ayd.id === ayd.order + 1) {
                        console.log({ayd, ayId:ayd.id, order: ayd.order});
                        
                       }
                      return  <SortableItem ordered={ordered} min={orderedAyahs[0].order} key={`${ayd.order}`} id={ayd.id} ay={ayd}/>
                    }

                    )}
                </div>
            </SortableContext>

        </DndContext>
        <div className="flex  justify-evenly items-center w-full  border-3  bg-slate-300 font-light  border-teal-200 text-gray-600">
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={() => 
                handleDismiss()}>Dismiss </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={handleShuffle}> Shuffle </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={handleValidate}> Validate </button>
        </div>
    </div>

    )
}

