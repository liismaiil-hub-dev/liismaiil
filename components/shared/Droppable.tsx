'use client'

import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@nextui-org/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
export function Droppable({ ayd, id }: { ayd: Ayah, id: number }) {
    const { draggedIndex , blurContext} = useSelector((state: RootStateType) => state.stage)
    const { setBlurContext } = stageActions


    const { isOver, setNodeRef ,active} = useDroppable({ id, data: {numberInSurah : ayd.numberInSurah } });
    const style = {
        color: isOver ? 'back-ground: blue' : undefined,
    };
    useEffect(() => {
        
        
     if(active && typeof draggedIndex !== 'undefined' &&    ( active?.id === draggedIndex)&& active?.data?.current?.numberInSurah === draggedIndex){
        console.log({active,draggedIndex});
        }
     
    }, [active, draggedIndex]);
    

    return (<div ref={setNodeRef} style={style} role='button' className={cn( (typeof draggedIndex !== 'undefined' && active?.id === draggedIndex && 
     active?.data?.current?.numberInSurah === draggedIndex ) && `${!blurContext ? "p-2 flex  border border-blue-500 flex-row justify-end items-stretch  w-full  h-full":
      "p-2 flex  border border-blue-500 flex-row justify-end items-stretch  w-full  h-full"}  `,
      `${!blurContext ? "p-2 flex  border border-blue-500 flex-row justify-end items-stretch  w-full  h-full blur-none":
      "p-2 flex  border border-blue-500 flex-row justify-end items-stretch  w-full  h-full blur-sm"}  `, )} >
        <div className=' text-right select-all '>{` ${ayd.text} `}</div>
    </div>

    );
}
