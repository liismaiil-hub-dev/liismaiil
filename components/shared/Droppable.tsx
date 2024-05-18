
import { ReactElement, useEffect, useState } from 'react'

import { sprintActions } from '@/store/slices/sprintSlice'
import { RootStateType } from '@/store/store'
import { useDroppable } from '@dnd-kit/core'
import { useDispatch, useSelector } from 'react-redux'
export function Droppable({ children, id }: { children: ReactElement, id: number }) {

    const dispatch = useDispatch()
    const { sprints, grid, gridsSelected, gridSelected, ayahArraySelected } = useSelector((state: RootStateType) => state.sprint)
    const [gridState, setGridState] = useState(null)
    const { setSprints, setGridsSelected, setGridSelected, setAyahArraySelected } = sprintActions

    const { isOver, setNodeRef } = useDroppable({
        id
    });


    useEffect(() => {
        if (isOver) {

            console.log({ id })
        }

    }, [isOver, id])

    const classStyle = `${isOver && "bg-green-200"} flex  justify-start items-center`
    return (<div className={classStyle}>
        {children}
    </div>)
}
