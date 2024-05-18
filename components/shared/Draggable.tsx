
import React, { ReactElement, useEffect, useState } from 'react'
import * as _ from 'lodash'
import { useDraggable } from '@dnd-kit/core';

export function Draggable({ children, id }: { children: ReactElement, id: number }) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </button>
    );
}

