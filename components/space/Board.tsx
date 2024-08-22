'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { sprintActions } from "@/store/slices/sprintSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EvalClickBoardComp from "./EvalClickBoard";
import EvalDragOrderBoardComp from "./EvalDragOrderBoard";
import RadioButtonEvalState from "./RadioButtonEvalState";
import SpaceButton from './SpaceButton';


const RepereComp = () => {
  const dispatch = useDispatch()
  const { gridSelected,  hideNbContext, orderedAyahsContext,} = useSelector((state: RootStateType) => state.sprint)
  const { setOrderedAyahsContext,} = sprintActions

  function orderHandler(){
  dispatch(setOrderedAyahsContext({ayahs:orderedAyahsContext}))
}  
return <div className="flex  border-2 border-blue-400 rounded-md flex-col justify-start items-stretch ">
    <p className='text-center'>{gridSelected.arabName}</p>
    <p className='text-center'>Nb of groups &nbsp;{gridSelected.group}</p>
    <p className='text-center'>Grid &nbsp;{gridSelected.grid}</p>
    <div className="flex justify-center items-center ">

    <SpaceButton handlePress={orderHandler} title='Order Grid' />
    </div>
    <div className="flex flex-col flex-auto justify-stretch items-stretch  space-y-1">
      {orderedAyahsContext && orderedAyahsContext?.map((ayag: Ayah) => {
        return (<div key={`${ayag.order}_${ayag.juz}`} className=" flex flex-row justify-stretch 
        items-stretch ">
           {typeof hideNbContext !=='undefined' && !hideNbContext ? 
           <div key={`${ayag.order}_${ayag.juz}`} className=" flex flex-row justify-between 
        items-center gap-3
        border-b-3 border-green-300/25 my-2">
          <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order}</div>
          <div className=' text-right  justify-self-stretch
           hover:bg-emerald-200 
           hover:cursor-pointer 
            bg-slate-300  focus:border-red-500'>{ayag.text}</div>
        </div>:
          <div key={`${ayag.order}_${ayag.juz}`} className=" flex text-right flex-row justify-start 
        items-center gap-3
        border-b-3 border-green-300/25 my-2">
          <div className='flex justify-start
           hover:bg-emerald-200 
           hover:cursor-pointer 
           items-center bg-slate-300  focus:border-red-500'>{ayag.text}</div>
        </div>
           } 
        </div>
        )
      })
      }</div>
  </div>
}
 const EvalStageComp = () => {
  const dispatch = useDispatch()
  const { gridSelected, shuffeledFirstAyahsContext,  hideNbContext, orderedAyahsContext, gridIndexContext, shuffeledAyahsContext} = useSelector((state: RootStateType) => state.sprint)
 const { setShuffeledAyahsContext, setEvalIndex}  = sprintActions
  
  function shuffleHandler(){
    const shuffeledAy = _.shuffle(shuffeledFirstAyahsContext)
dispatch(setShuffeledAyahsContext({ayahs:shuffeledAy}))
}    
  function firstHandler(){
    dispatch(setShuffeledAyahsContext({ayahs:shuffeledFirstAyahsContext}))
}    

return <div className="flex  border-2 border-blue-400 rounded-md flex-col justify-start items-stretch ">
    <p className='text-center'>{gridSelected.arabName}</p>
    <p className='text-center'>Nb of groups &nbsp;{gridSelected.group}</p>
    <p className='text-center'>Grid &nbsp;{gridSelected.grid}</p>
    <div className="flex justify-evenly items-center ">

    <SpaceButton handlePress={firstHandler} title='First Grid' />
    <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
        </div>
     <div className="flex flex-col flex-auto justify-stretch items-stretch  space-y-1">
    {shuffeledAyahsContext && shuffeledAyahsContext?.map((ayag: Ayah) => {
        return (<div key={`${ayag.order}_${ayag.juz}`} className=" flex flex-row justify-stretch 
        items-stretch ">
           {typeof hideNbContext !=='undefined' && !hideNbContext ? 
           <div key={`${ayag.order}_${ayag.juz}`} className=" flex flex-row justify-between 
        items-stretch gap-3
        border-b-3 border-green-300/25 my-2">
          <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order}</div>
          <div className='flex justify-center text-right
           hover:bg-emerald-200 
           hover:cursor-pointer 
           items-center bg-slate-300  focus:border-red-500'>{ayag.text}</div>
        </div>:
          <div key={`${ayag.order}_${ayag.juz}`} className=" flex text-right flex-row justify-end 
        items-center gap-3
        border-b-3 border-green-300/25 my-2">
          <div className='flex justify-center text-right
           hover:bg-emerald-200 
           hover:cursor-pointer 
           items-center bg-slate-300  focus:border-red-500'>{ayag.text}</div>
        </div>
           } 
    </div>
      )})}
    </div>
  </div>
}
 const EvalFirstStageComp = ({first}:{first: boolean}) => {
  const dispatch = useDispatch()
  const { gridSelected,   evalIndex, evalContext, hideNbContext, orderedAyahsContext, gridIndexContext, shuffeledFirstAyahsContext} = useSelector((state: RootStateType) => state.sprint)
  const { setShuffeledAyahsContext, setEvalIndex}  = sprintActions
  
  function shuffleHandler(){
    const shuffeledAy = _.shuffle(shuffeledFirstAyahsContext)
dispatch(setShuffeledAyahsContext({ayahs:shuffeledAy}))
}
 function firstHandler(){
    dispatch(setShuffeledAyahsContext({ayahs:shuffeledFirstAyahsContext}))
}    


return <div className="flex  border-2 border-blue-400 rounded-md flex-col justify-start items-stretch ">
    <p className='text-center'>{gridSelected.arabName}</p>
    <p className='text-center'>Nb of groups &nbsp;{gridSelected.group}</p>
    <p className='text-center'>Grid &nbsp;{gridSelected.grid}</p>
  <div className="flex justify-evenly items-center ">
    <SpaceButton handlePress={firstHandler} title='First Grid' />
    <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
        </div>
    <div className="flex flex-col flex-auto justify-stretch items-stretch  space-y-1">
  
      {shuffeledFirstAyahsContext && shuffeledFirstAyahsContext?.map((ayag: Ayah) => {
        return <div key={`${ayag.order}_${ayag.juz}`} className=" flex flex-row justify-between 
        items-stretch gap-3
        border-b-3 border-green-300/25 my-2">
           {typeof hideNbContext !=='undefined' && !hideNbContext && <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order}</div>} 
          <div className='flex justify-center text-right
           hover:bg-emerald-200 
           hover:cursor-pointer 
           items-center bg-slate-300  focus:border-red-500'>{ayag.text}</div>
        </div>
      })}
    </div>
  </div>
}
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
  const { gridSelected,   evalIndex, evalContext, hideNbContext, orderedAyahsContext, gridIndexContext, shuffeledAyahsContext} = useSelector((state: RootStateType) => state.sprint)
  const {setShuffeledFirstAyahsContext, setOrderedAyahsContext, setShuffeledAyahsContext, setEvalContext,setEvalIndex, setHideNbContext, setGridIndexContext} = sprintActions
  const [first, setFirst] = useState(() => true);
  
  const [gridsState, setgridsState] = useState(() => JSON.parse(gridSelected.ayahs) as []);
 useEffect(() => {
  
  const gridSelectedLength = JSON.parse(gridSelected.ayahs)[gridIndexContext]
    console.log({hideNbContext, orderedAyahsContext, gridSelected, gridIndexContext, gridSelectedLength,ayahs: JSON.parse(gridSelected.ayahs)});
   if(typeof gridSelected !== 'undefined' && gridSelected.ayahs != ''&& gridSelectedLength !== orderedAyahsContext.length){
    const shuffeleledFirst = JSON.parse(gridSelected.ayahs)[gridIndexContext ?? 0].map((ordG: Ayah, index:number) => ({ ...ordG, id: index + 1 })) ;

      const orderedAy = [..._.sortBy(JSON.parse(gridSelected.ayahs)[gridIndexContext ?? 0], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, id: index + 1 })) 
        console.log({orderedAy });
  dispatch(setShuffeledFirstAyahsContext({ayahs: shuffeleledFirst}))
  
  dispatch(setOrderedAyahsContext({ayahs: orderedAy}))
  
  setFirst(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
   //console.log({gridSelectedAy : gridSelected.ayahs});
    }
  }, []);
/* 
  useEffect(() => {
   if(typeof orderedAyahsContext !== 'undefined' && orderedAyahsContext.length >0  ){
    dispatch(setShuffeledAyahsContext({ayahs:[..._.shuffle(orderedAyahsContext)]}))}

  }, [orderedAyahsContext]);
 */
  useEffect(() => {
  console.log({ gridSelected, gridIndexContext });
    if(typeof gridSelected !== 'undefined' && gridIndexContext>=0 && gridSelected.ayahs != ''  && JSON.parse(gridSelected.ayahs)[gridIndexContext].length>=0 ){
    const firstAy = [...JSON.parse(gridSelected.ayahs)[gridIndexContext].map((ay: Ayah, index:number) => ({ ...ay, id: index + 1 }))]  
    const orderedAy = [..._.sortBy(JSON.parse(gridSelected.ayahs)[gridIndexContext], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, id: index + 1 })) 
        console.log({orderedAy });

    dispatch(setOrderedAyahsContext({ayahs:orderedAy}))
    dispatch(setShuffeledFirstAyahsContext({ayahs:firstAy}))}
    setFirst(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ gridSelected, gridIndexContext]);

  
  function nextIndexHandler() {
    console.log({evalIndex});
    console.log({ayahs: JSON.parse(gridSelected.ayahs)});
    if(typeof evalIndex === 'undefined') {
     dispatch(setEvalIndex({index:0}))
    }else  if(evalIndex < JSON.parse(gridSelected.ayahs).length - 1) {
     dispatch(setEvalIndex({index:evalIndex+1}))
    }
  }
function prevIndexHandler() {
       dispatch(setGridIndexContext( {index: gridIndexContext  < gridsState.length ? gridIndexContext +1 :0  }))
    }

function hideNbHandler() {
    dispatch(setHideNbContext({hide:!hideNbContext}))
  }
  function shuffelHandler() {
    dispatch(setShuffeledAyahsContext({ayahs:_.shuffle(orderedAyahsContext)}))
}/* 
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
  } */
useEffect(() => {
    console.log({ hideNbContext , evalContext , evalIndex , gridSelected, first });
  }, [hideNbContext, evalIndex,evalContext,gridSelected ]);

  return (
    <div className="flex flex-col justify-stretch gap-3 h-full items-stretch w-full ">
      <div className="flex  justify-around flex-row items-center ">
        <SpaceButton  handlePress={prevIndexHandler} title='Prev Grid' />
        <SpaceButton handlePress={nextIndexHandler} title='Next Grid' />
        <SpaceButton  handlePress={shuffelHandler} title='Shuffel Grid' />
        
        <div className="flex  justify-center items-center  border border-green-400 text-center font-sans " >
         <input className="flex  justify-center items-center  border border-blue-800 text-green-300" 
         type="checkbox" 
         id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={hideNbContext}  onChange={()  =>hideNbHandler()}/>
    <label htmlFor='HIDE_NB' className='text-sm' >Hide nb</label>
  </div>
        <RadioButtonEvalState 
          evalState={EVAL_STATE.EVAL}   title='Eval board' />
        <RadioButtonEvalState 
          evalState={EVAL_STATE.ORDER}  title='Order Grid' />
        <RadioButtonEvalState 
          evalState={EVAL_STATE.CLICK}  title='Click Grid' />
         </div>
    {gridSelected && evalContext === EVAL_STATE.EVAL ?
    <div className="gap-2 flex   justify-between  items-start ">
          <RepereComp  />
          {first ? <EvalFirstStageComp   first={first} />:
           <EvalStageComp   />
}

</div>:   evalContext === EVAL_STATE.ORDER?
            <EvalDragOrderBoardComp  />
       :evalContext === EVAL_STATE.CLICK && <EvalClickBoardComp 
            />}
    </div>
  )
}

export default Board