'use client'

import { AyahTabletType } from '@/app/api/graphql/tablet/tablet.types';
import { useDroppable } from '@dnd-kit/core';
export function Droppable({ayd , id }: { ayd: AyahTabletType, id: number }) {
 const {setNodeRef} = useDroppable({id, data:{order:ayd.order}});
  
     return (
             <div ref={setNodeRef} className="flex flex-row justify-end items-center text-xl  w-full   h-full border-2 border-emerald-500" >
                            {` ${ayd.text} `} 
                            </div>
    )
}
