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


    return (<div ref={setNodeRef} style={style} {...listeners} {...attributes} role='button' className=" 
                        select-all flex p-2 w-full  bg-emerald-100/30 justify-between rounded-md border-1 border-orange-300
                        items-center  hover:bg-sky-700 hover:text-natWarmheader
                        hover:cursor-pointer hover:scale-110 hover:text-1xl" >
        
        { typeof hideNbContext !== 'undefined' && hideNbContext && !hideOddNbContext ?
         <div className='flex justify-left items-center  w-7 h-7'>{gridAyah?.numberInSurah % 2 === 0 ? null: gridAyah?.numberInSurah!}</div>
                       :   (typeof hideOddNbContext !== 'undefined' && hideOddNbContext &&
                         typeof hideNbContext !== 'undefined' && !hideNbContext) ? 
                       <div className='flex justify-left items-center w-7 h-7'>{gridAyah?.numberInSurah % 2 === 0 ?  gridAyah?.numberInSurah!: null}</div>
: hideNbContext && hideOddNbContext ?  <div className='flex justify-left items-center w-7 h-7 '>{null} </div>
:
            <div className='flex justify-left items-center w-7 h-7 '>{` ${gridAyah.numberInSurah} `}</div>
            }
        <div className='select-all flex text-right  justify-items-end items-center '>{` ${gridAyah.text} `}</div>
    </div>

    );
}

