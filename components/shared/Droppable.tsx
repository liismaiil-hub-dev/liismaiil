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

    return (<div ref={setNodeRef} style={style}  role='button' className=" 
        select-all flex p-2 w-full  bg-emerald-100/30 justify-between rounded-md border-1 border-orange-300
        items-center  hover:bg-sky-700 hover:text-natWarmheader
        hover:cursor-pointer hover:scale-110 hover:text-1xl" >

        { typeof hideNbContext !== 'undefined' && hideNbContext && !hideOddNbContext ?
        <div className='flex justify-left items-center  w-7 h-7'>{ayd?.numberInSurah % 2 === 0 ? null: ayd?.numberInSurah!}</div>
               :   (typeof hideOddNbContext !== 'undefined' && hideOddNbContext &&
                 typeof hideNbContext !== 'undefined' && !hideNbContext) ? 
               <div className='flex justify-left items-center w-7 h-7'>{ayd?.numberInSurah % 2 === 0 ?  ayd?.numberInSurah!: null}</div>
        : hideNbContext && hideOddNbContext ?  <div className='flex justify-left items-center w-7 h-7 '>{null} </div>
        :<div className='flex justify-left items-center w-7 h-7 '>{` ${ayd.numberInSurah} `}</div>
        }
        <div className='select-all flex text-right  justify-items-end items-center '>{` ${ayd.text} `}</div>
        </div>

);
}
