'use client'
import { AyahTabletType, AyahWithId } from '@/api/graphql/sprint/sprint.types';
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

export default function EvalBoardSorted({ grid, evalIndex, hideNb, arabName }: { grid: AyahTabletType[], evalIndex: number, hideNb: boolean, arabName: string },) {

    const dispatch = useDispatch()
    const { sprints, spaceSprint, gridSelected, sprintsTitles, spaceStage } = useSelector((state: RootStateType) => state.sprint)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const { setSprints, setSprintsTitles, emptySprintsTitles, setGridsSelected, setGridSelected, setAyahArraySelected, hideAy, resetHidedAy, setMinMax } = sprintActions

    
    const [orderedAyahs, setOrderedAyahs] = useState<AyahTabletType[]>(() => _.sortBy(grid, 'order'))
    const [shuffeledAyahs, setShuffeleddAyahs] = useState<AyahTabletType[]>(() => _.shuffle(orderedAyahs))
    
    const [orderedGridForDnd, setOrderedGridForDnd] = useState<AyahWithId[]>(() =>
        orderedAyahs.map((ordG: AyahTabletType, index) => ({ ...ordG, id: index + 1 })));
    
    const [shuffeledGridForDnd, setShuffeledGridForDnd] = useState<AyahWithId[]>(() =>_.shuffle(orderedGridForDnd))
    
    const [gridState, setGridState] = useState<AyahWithId[]>(() => shuffeledAyahs.map((shuff: AyahTabletType, index) => ({
        ...shuff, id: shuff.order + 1 })));
        const [isFirst, setIsFirst] = useState(true);
        useEffect(() => {
        console.log({gridSelected});
        //setGridState(() => _.shuffle(orderedGridForDnd));
        setIsFirst(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // Drag end  function
    function handleDragEnd(event:DragEndEvent) {
        const { active, over } = event;
                 
        if(isFirst){
              toast.success("first ayah start step ")
        setIsFirst(false)
            } 
            
            const oldIndex = _.findIndex(gridState,function(aywId) {
                
            return aywId.id === active.id
            })
            console.log({oldIndex});
            console.log({activeId:active.id});
             setGridState(arrayMove(gridState,oldIndex, parseInt(active!.id.toString()) -1 ))
        }  
useEffect(() => {
  console.log({gridState});
  
}, [gridState]);

function handleDragStart(event: { active: any; over: any; }) {
        const { active, over } = event;
        console.log({ activeStart: active, overStart :over })
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

    function handleDismiss() {
        setOrderedGridForDnd( orderedAyahs.map((ordG: AyahTabletType, index) => ({ ...ordG, id: index })))
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

