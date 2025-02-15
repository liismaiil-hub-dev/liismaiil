'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { AyahTabletType } from '@/app/api/graphql/tablet/tablet.types';
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { useDraggable } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function Draggable({ gridAyah, id,  }: { gridAyah: Ayah, id: number,  }) {

    const { hideNbContext, hideOddNbContext } = useSelector((state: RootStateType) => state.stage)
  
    const {isDragging, attributes, listeners, setNodeRef, transform } = useDraggable({ id, data: { numberInsurah: gridAyah.numberInSurah! } });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

useEffect(() => {
  if(isDragging){
    console.log({gridAyah, id,attributes });
   }
  
}, [isDragging,]);
console.log({hideOddNbContext, hideNbContext});


    return (<div ref={setNodeRef} style={style} {...listeners} {...attributes} role='button' className="select-all flex p-1 w-full 
       bg-emerald-100/30 rounded-md border-1 border-orange-300 justify-end
                        items-center  hover:bg-sky-700 hover:text-natWarmheader
                        hover:cursor-pointer hover:text-1xl" >
       
        <div className='select-all flex text-right  justify-end items-center w-full'>{` ${gridAyah.text} `}</div>
    </div>);
}

