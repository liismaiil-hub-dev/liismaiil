'use client'
import { GridType } from '@/api/graphql/sprint/sprint.types';
import { AyahTabletType } from '@/api/graphql/tablet/tablet.types';
import { sprintActions } from '@/store/slices/sprintSlice';
import { RootStateType } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpaceButton from './SpaceButton';

const RepereComp = ({ grid, gridIndex }: { grid: GridType, gridIndex: number }) => {
  return <div className="flex flex-col justify-start items-center">
    <p>{grid.arabName}</p>
    <p>Nb of groups &nbsp;{grid.ayahs.length}</p>
    <div className="flex flex-col justify-normal items-end">
      {grid && grid.ayahs && grid.ayahs[gridIndex].map((ayag: AyahTabletType) => {
        return <div key={`${ayag.order}_${ayag.juz}`} className=" flex justify-around items-center">
          <div>{ayag.order}</div>&nbsp;&nbsp;&nbsp;&nbsp;
          <div>{ayag.text}</div>
        </div>

      })
      }
    </div>
  </div>


}
const Board = () => {
  const dispatch = useDispatch()
  const { gridSelected, boardGridIndex } = useSelector((state: RootStateType) => state.sprint)
  const [gridIndex, setGridIndex] = useState(0);

  const { setGridSelected } = sprintActions
  function nextIndexHandler() {
    if (gridIndex < gridSelected.ayahs.length - 1) {

      setGridIndex((prev) => prev + 1)
    }
  }
  function prevIndexHandler() {
    if (gridIndex > 0) {

      setGridIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col justify-start items-center w-full ">
      <div className="flex justify-between gap-x-10 items-center">
        <SpaceButton handlePress={prevIndexHandler} title='Prev Grid' />
        <SpaceButton handlePress={nextIndexHandler} title='Next Grid' />
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-1 border-3 w-full border-orange-400">

        {gridSelected && <div className="gap-2 grid md:grid-cols-2 grid-cols-1">
          <RepereComp grid={gridSelected} gridIndex={gridIndex} />
        </div>}
      </div>
    </div>
  )
}

export default Board