'use client'

import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/cn-utility'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function Droppable({ ayd, id }: { ayd: Ayah, id: number }) {
    const { draggedIndex , blurContext, hideNbContext, hideOddNbContext} = useSelector((state: RootStateType) => state.stage)

    const { isOver, setNodeRef ,active} = useDroppable({ id, data: {numberInSurah : ayd.numberInSurah } });
    const style = {
        color: isOver ? 'back-ground: blue' : undefined,
    };
    useEffect(() => {
     if(active && typeof draggedIndex !== 'undefined' &&    ( active?.id === draggedIndex)&& active?.data?.current?.numberInSurah === draggedIndex){
        console.log({active,draggedIndex});
        }
     }, [active, draggedIndex]);

    return (<div ref={setNodeRef} style={style}  role='button' className="select-none flex p-1 w-full 
       bg-emerald-100/30 rounded-md border-1 border-orange-300 justify-end items-center  hover:bg-sky-700 hover:text-natWarmheader hover:cursor-not-allowed
        hover:text-2xl" >
       
        <div className='select-all flex text-right  justify-end items-center w-full'>{` ${ayd.text} `}</div>
    </div>);

}
