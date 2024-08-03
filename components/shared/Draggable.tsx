'use client'
import { AyahTabletType } from '@/app/api/graphql/tablet/tablet.types';
import { useDraggable } from '@dnd-kit/core';

export function Draggable({ gridAyah, id, hideNb }: { gridAyah: AyahTabletType ,id: number, hideNb: boolean }) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({id, data:{order: gridAyah.order}});
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (<div ref={setNodeRef}  style={style} {...listeners} {...attributes} role='button' className="flex border-3 
    border-blue-500 flex-row justify-end items-stretch  w-full  h-full  " >
            <div className='flex-end text-lg select-all '>{` ${gridAyah.text} `}</div>
            </div> 
        
    );
}

