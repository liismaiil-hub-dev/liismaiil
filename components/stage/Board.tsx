'use client'
import { AyahWithId } from '@/api/graphql/sprint/sprint.types';
import { AyahTabletType } from '@/api/graphql/tablet/tablet.types';
import { sprintActions } from "@/store/slices/sprintSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EvalClickBoardComp from "./EvalClickBoard";
import EvalDragOrderBoardComp from "./EvalDragOrderBoard";
import EvalSortComp from "./EvalSortBoard";
import RadioButtonEvalState from "./RadioButtonEvalState";
import SpaceButton from './SpaceButton';


const RepereComp = ({ grid, hideNb, arabName, nbGroup }: { grid: AyahTabletType[], hideNb: boolean, arabName: string, nbGroup: number }) => {
  const [gridContext, setGridContext] = useState(() =>grid);
  console.log({ grid });
  const orderHandler = () => {
    const _orderedGrid = _.sortBy(grid, 'order')
    setGridContext(_orderedGrid)
  }
  return <div className="flex  flex-1 border-2 border-blue-400 rounded-md flex-col justify-stretch items-stretch ">
    <p className='text-center'>{arabName}</p>
    <p className='text-center'>Nb of groups &nbsp;{nbGroup}</p>
    <SpaceButton handlePress={orderHandler} title='Order Grid' />

    <div className="flex flex-col flex-auto justify-stretch items-stretch  space-y-1">
      {grid && gridContext && gridContext?.map((ayag: AyahTabletType) => {
        return <div key={`${ayag.order}_${ayag.juz}`} className=" flex flex-row justify-end 
        items-stretch gap-3
        border-b-3 border-green-300/25">
           {!hideNb && <div className='self-start flex-auto'>{ayag.order}</div>} 
          <div className='justify-end flex-auto'>{ayag.text}</div>
        </div>
      })
      }</div>
  </div>
}
/* const EvalStageComp = ({ grid, evalIndex, arabName, hideNb }: { grid: AyahTabletType[], evalIndex: number, arabName: string, hideNb: boolean }) => {
  return <div className="flex flex-col justify-stretch items-stretch  border-2 border-blue-400 rounded-md">
    <p className='text-center'>{arabName}</p>
    <p className='text-center'>eval Index &nbsp;{evalIndex}</p>
    <div className="flex flex-col justify-stretch items-stretch ">

      {grid && grid?.map((ayag: AyahTabletType) => {

        return <div key={`${ayag.order}_${ayag.juz}`} className=" flex justify-end items-start  border-b-3 border-green-300">
          {!hideNb ? <div className='justify-self-start'>{ayag.order}</div> : null}
          <div className=' justify-self-end'>{ayag.text}</div>
        </div>
      })}
    </div>
  </div>
} */
/**
 * Board Component
 */
export enum EVAL_STATE  {
    EVAL = 'EVAL',
    ORDER = 'ORDER',
    CLICK = 'CLICK',
}
const Board = () => {
  const dispatch = useDispatch()
  const { gridsAyahsSelected, gridSelected, boardGridIndex } = useSelector((state: RootStateType) => state.sprint)
  const [gridIndex, setGridIndex] = useState(0);
  const [evalIndex, setEvalIndex] = useState(0);
  const [hideNb, setHideNb] = useState(false);
  const [_actualGrid, setActualGrid] = useState(() => gridSelected.ayahs[gridIndex])
 const {setGridsAyahsSelected} = sprintActions
  
  useEffect(() => {
    console.log({ gridSelected });
    
    dispatch(setGridsAyahsSelected({gridsAyahsSelected:gridSelected.ayahs[gridIndex]}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_actualGrid, gridSelected, gridIndex]);
  useEffect(() => {
    console.log({ gridsAyahsSelected });
     }, [gridsAyahsSelected]);
  
    
  const [isFirst, setIsFirst] = useState(true);
  
  
  const [orderedAyahs, setOrderedAyahs] = useState<AyahTabletType[]>(() => _.sortBy(_actualGrid, 'order'))
  
  const [orderedGridForDnd, setOrderedGridForDnd] = useState<AyahWithId[]>(() =>
    orderedAyahs.map((ordG: AyahTabletType, index) => ({ ...ordG, id: index + 1 })));
  
  const [shuffeledAyahs, setShuffeleddAyahs] = useState<AyahTabletType[]>(() => _.shuffle(orderedAyahs))

  const [gridState, setGridState] = useState<AyahWithId[]>(() => shuffeledAyahs.map((shuff: AyahTabletType, index) => ({
    ...shuff, id: index + 1 })));
      
      const [shuffeledGridForDnd, setShuffeledGridForDnd] = useState<AyahWithId[]>(() =>_.shuffle(orderedGridForDnd))
      
      const [actualState, setActualState] = useState(() =>EVAL_STATE.ORDER);
      
      //  const { setGridSelected } = sprintActions
  function nextIndexHandler() {
    if (gridIndex < gridSelected.ayahs.length - 1) {
      setGridIndex((prev) => prev + 1)
    }
  }
  function prevIndexHandler() {
    if (gridIndex > 0) {
      setGridIndex((prev) => prev - 1)
    }}
function hideNbHandler() {
    console.log({ hideNb });
    setHideNb((hideNb) => !hideNb)
  }
  function shuffelHandler() {
    setGridState(_.shuffle(orderedGridForDnd))
}
function evalHandler() {
    setActualState(EVAL_STATE.EVAL)
    setEvalIndex((prev) => prev + 1)
  }
  function clickHandler() {
    setActualState(EVAL_STATE.CLICK)
  
    setEvalIndex((prev) => prev + 1)
  }

function orderBoardHandler() {
        setActualState(EVAL_STATE.ORDER)
setEvalIndex((prev) => prev + 1)
  }
useEffect(() => {
    console.log({ hideNb });
    console.log({ evalIndex });
    console.log({ gridSelected });
  }, [hideNb, evalIndex,gridSelected ]);

  return (
    <div className="flex flex-col justify-stretch gap-3 h-full items-stretch w-full ">
      <div className="flex  justify-around flex-row items-center ">
        <SpaceButton  handlePress={prevIndexHandler} title='Prev Grid' />
        <SpaceButton handlePress={nextIndexHandler} title='Next Grid' />
        <SpaceButton  handlePress={shuffelHandler} title='Shuffel Grid' />
        
        <div className="flex  justify-center items-center  border border-green-400 text-center font-sans " >
         <input className="flex  justify-center items-center  border border-blue-800 text-green-300" 
         type="checkbox" 
         id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={hideNb}  onChange={()  =>hideNbHandler()}/>
    <label htmlFor='HIDE_NB' className='text-sm' >Hide nb</label>
  </div>
        <RadioButtonEvalState actualState={actualState}
          evalState={EVAL_STATE.EVAL}  handleRadioCheck={evalHandler} title='Eval board' />
        <RadioButtonEvalState actualState={actualState}
          evalState={EVAL_STATE.ORDER}  handleRadioCheck={orderBoardHandler} title='Order Grid' />
        <RadioButtonEvalState actualState={actualState}
          evalState={EVAL_STATE.CLICK}  handleRadioCheck={clickHandler} title='Click Grid' />
         </div>
    {gridSelected && actualState === EVAL_STATE.EVAL ?
    <div className="gap-2 grid md:grid-cols-2  justify-stretch  items-stretch grid-cols-1">
          <RepereComp hideNb={hideNb} grid={orderedAyahs} arabName={`${gridSelected.arabName}`} nbGroup={gridSelected.ayahs.length} />
           <EvalSortComp  grid={shuffeledGridForDnd} evalIndex={evalIndex} hideNb={true} arabName={`${gridSelected.arabName}`} />

</div>:   actualState === EVAL_STATE.ORDER?
            <EvalDragOrderBoardComp 

            evalIndex={evalIndex} hideNb={hideNb}
             arabName={`${gridSelected.arabName}`} />
       :actualState === EVAL_STATE.CLICK && <EvalClickBoardComp 
            grid={gridState} 
            hideNb={hideNb}
            evalIndex={evalIndex} 
             arabName={`${gridSelected.arabName}`} />}
    </div>
  )
}

export default Board