'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { AyahTabletType } from '@/app/api/graphql/tablet/tablet.types';
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { useDraggable } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function Draggable({ gridAyah, id, hideNb }: { gridAyah: Ayah, id: number, hideNb: boolean }) {

    const { hideNbContext } = useSelector((state: RootStateType) => state.stage)
  
    const {isDragging, attributes, listeners, setNodeRef, transform } = useDraggable({ id, data: { numberInsurah: gridAyah.numberInSurah! } });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

useEffect(() => {
  if(isDragging){
    console.log({gridAyah, id,attributes });
   }
  
}, [isDragging,]);


    return (<div ref={setNodeRef} style={style} {...listeners} {...attributes} role='button' className=" p-2 flex border border-blue-500 flex-row justify-end gap-3 items-stretch  
    w-full  h-full  " >
        { !hideNb &&       <div className='text-center select-all w-7 h-7 bg-orange-200 '>{` ${gridAyah.numberInSurah} `}</div>}
        <div className='text-right select-all '>{` ${gridAyah.text} `}</div>
    </div>

    );
}

