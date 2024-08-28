'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { sprintActions } from "@/store/slices/sprintSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import EvalClickBoardComp from "./EvalClickBoard";
import EvalDragOrderBoardComp from "./EvalDragOrderBoard";
import RadioButtonEvalState from "./RadioButtonEvalState";
import SpaceButton from './SpaceButton';

// REPERE
const RepereComp = () => {
  const dispatch = useDispatch()
  const { gridSelected, validContext, hideNbContext, orderedAyahsContext,} = useSelector((state: RootStateType) => state.sprint)
  const { setOrderedAyahsContext,} = sprintActions
console.log();

  function orderHandler(){
  dispatch(setOrderedAyahsContext({ayahs:orderedAyahsContext}))
}  
return <div className={cn((typeof validContext !== 'undefined' && validContext === true) && 'blur-lg', `flex  border-2 border-blue-400 rounded-md flex-col justify-start space-y-2 items-stretch `)} >
    <div className="flex-col justify-center items-center  ">
  
    <p className='text-center'>{gridSelected.arabName}</p>
    <p className='text-center'>Nb of groups &nbsp;{gridSelected.group}</p>
    <p className='text-center'>Grid &nbsp;{gridSelected.grid}</p>
    </div>
  
    <div className="CENTER ">

    <SpaceButton handlePress={orderHandler} title='Order Grid' />
    </div>
    <div className="flex flex-col justify-start items-stretch  space-y-2">
      {orderedAyahsContext && orderedAyahsContext?.map((ayag: Ayah) => {
           if(typeof hideNbContext !=='undefined' && !hideNbContext ){

           return <div key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2
        border-b-1 border-green-300/25 ">
          <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order}</div>
          <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
        </div>}else {

          return(
          <div  key={`${ayag.order}_${ayag.juz}`}className='flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2
        border-b-1 border-green-300/25
           hover:cursor-pointer 
           items-center   focus:border-red-500'>{ayag.text}</div>
      )
        }
          
      })
      }</div>
  </div>
}
//EVAL
 const EvalStageComp =  ({first}:{first: boolean}) => {
  const dispatch = useDispatch()
  const { gridSelected,   shuffeledAyahsContext, validContext,hideNbContext,  shuffeledFirstAyahsContext} = useSelector((state: RootStateType) => state.sprint)
  const { setShuffeledAyahsContext, setEvalIndex}  = sprintActions
  const [firstState, setFirstState] = useState(() => first);
  
function shuffleHandler(){
    const shuffeledAy = _.shuffle(shuffeledFirstAyahsContext)
dispatch(setShuffeledAyahsContext({ayahs:shuffeledAy}))
}
 function firstHandler(){
    setFirstState(true);
    dispatch(setShuffeledAyahsContext({ayahs:shuffeledFirstAyahsContext}))
}    

const [reorderedAyahs, setReorderedAyahs] = useState([-1]);
const [errorNb, setErrorNb] = useState(0);

const [validGrid, setValidGrid] = useState(false);

 function validAyahHandler(reord:number){
   if(hideNbContext && validContext) {

     if(reorderedAyahs[0] == -1) {
       console.log({firstReord : reorderedAyahs[0]});
       setReorderedAyahs([reord])
      }else {
        
        if(reorderedAyahs[reorderedAyahs.length - 1 ]! + 1  !== reord ){
          console.log({lastReordr : reorderedAyahs[reorderedAyahs.length - 1 ]! + 1,reord });
  toast.warning(`you made a mistake try again ${reord} is not in place${reorderedAyahs[reorderedAyahs.length - 1 ]! + 1 } !!! `)
setErrorNb((prev)=>prev +1 )
}else {
  console.log({lastReordr : reorderedAyahs[reorderedAyahs.length - 1 ]! + 1,reord });
  
        setReorderedAyahs([...reorderedAyahs,reord])
      }} 
}else {
  toast.warning('you must hide number and check valid !!! ')
}
    //dispatch(setShuffeledAyahsContext({ayahs:shuffeledFirstAyahsContext}))
}
useEffect(() => {
  console.log({reorderedAyahs});
  
}, [reorderedAyahs]);
function ayahInReordered(ord: number){
  console.log({reorderedAyahs, ord});
  
  return reorderedAyahs.some((el )=> el === ord)

} 

 function validAllHandler(){
 const ordered =  reorderedAyahs.sort((a, b) => a - b);
 if(ordered.every((value, index) => value === reorderedAyahs[index])){
  setValidGrid(true)
 }
}    
return <div className={ `flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch `} >
    <div className="flex-col justify-center items-center  ">
    <p className='text-center'>{gridSelected.arabName}</p>
    <p className='text-center'>Nb of groups &nbsp;{gridSelected.group}</p>
    <p className='text-center'>Grid &nbsp;{gridSelected.grid}</p>
    <p className='text-center'>reordered suits &nbsp;{reorderedAyahs[0] != -1 && reorderedAyahs.join(', ')}</p>
    <div className="flex justify-center items-center  ">

    <p className= {cn(errorNb == 1 && 'text-red-200',' text-center text-emerald-200')}>errors &nbsp;
    </p>
    <p className= {cn(errorNb == 2 &&  ' text-red-300',' text-center text-emerald-400')}>
    {errorNb}
    </p>
    </div>

    </div>
  <div className="flex justify-evenly items-center ">
    <div className={cn(firstState && 'shadow-lg shadow-emerald-300','CENTER')}>
<SpaceButton handlePress={firstHandler} title='First Grid'    />
    </div>
    <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
    <SpaceButton handlePress={validAllHandler} title='Valid Grid' />
        </div>
    <div className="flex flex-col justify-start items-stretch  space-y-2">
           {firstState && shuffeledFirstAyahsContext ? shuffeledFirstAyahsContext?.map((ayag: Ayah) => {
       if(typeof hideNbContext !=='undefined' && !hideNbContext ){
       
           return <div onClick={() => {validAyahHandler(ayag.order)} } key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between px-2
        items-center space-x-2
        border-b-1 border-green-300/25 ">
          <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order}</div>
          <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
        </div>}
        else {
       return(
          <div  onClick={() => {validAyahHandler(ayag.order)} } key={`${ayag.order}_${ayag.juz}`}className={ 'flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-b-1 border-green-300/25 hover:cursor-pointer  items-center   focus:border-red-500'}>{ayag.text}</div>
      )
        }}):shuffeledAyahsContext?.map((ayag: Ayah) => {
        if(typeof hideNbContext !=='undefined' && !hideNbContext ){
           return <div onClick={() => {validAyahHandler(ayag.order)} } key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2
        border-b-1 border-green-300/25 ">
          <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order}</div>
          <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
        </div>}else {
          return(
          <div  onClick={() => {validAyahHandler(ayag.order)} } key={`${ayag.order}_${ayag.juz}`}className='  flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-b-1 border-green-300/25 hover:cursor-pointer items-center   focus:border-red-500'>{ayag.text}</div>
          )
      }
      })}
    </div>
  </div>
}
/**
 * Board PRINCIPAL Component
 */
export enum EVAL_STATE  {
    EVAL = 'EVAL',
    ORDER = 'ORDER',
    CLICK = 'CLICK',
}
const Board = () => {
  const dispatch = useDispatch()
  const { gridSelected,   evalIndex, evalContext, hideNbContext, orderedAyahsContext, validContext,gridIndexContext, } = useSelector((state: RootStateType) => state.sprint)
  const {setShuffeledFirstAyahsContext, setOrderedAyahsContext, setShuffeledAyahsContext, setEvalContext,setEvalIndex, setValidContext,setHideNbContext, setGridIndexContext} = sprintActions
  const [first, setFirst] = useState(() => true);
  
  const [gridsState, setGridsState] = useState(() => JSON.parse(gridSelected.ayahs) as [Ayah[]]);
 useEffect(() => {
   if(typeof gridSelected !== 'undefined' && gridSelected.ayahs != ''){
   setGridsState(JSON.parse(gridSelected.ayahs))
  }
  }, []);

   useEffect(() => {
   if(typeof gridSelected !== 'undefined' && gridSelected.ayahs != ''){
   setGridsState(JSON.parse(gridSelected.ayahs))
  }
  }, [gridSelected]);

  useEffect(() => {
  
  const gridSelectedLength = JSON.parse(gridSelected.ayahs)[gridIndexContext].length
    console.log({hideNbContext, orderedAyahsContext, gridSelected, gridIndexContext, gridSelectedLength,ayahs: JSON.parse(gridSelected.ayahs)});
   if(typeof gridSelected !== 'undefined' && gridSelected.ayahs != ''&& gridsState.length > 0){
    const shuffeleledFirst = gridsState[gridIndexContext ?? 0].map((ordG: Ayah, index:number) => ({ ...ordG, index:  gridIndexContext ? ordG.order + gridIndexContext : ordG.order   })) ;

      const orderedAy = [..._.sortBy(gridsState[gridIndexContext ?? 0], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index:  gridIndexContext ? ordG.order + gridIndexContext : ordG.order})) 
        
  dispatch(setShuffeledFirstAyahsContext({ayahs: shuffeleledFirst}))
  
  dispatch(setOrderedAyahsContext({ayahs: orderedAy}))
  
  setFirst(false)

    }
  }, [gridsState]);

  useEffect(() => {
  console.log({ gridIndexContext });
    if(typeof gridSelected !== 'undefined' && gridIndexContext>=0 && (gridsState[gridIndexContext].length<= gridSelected.grid * gridSelected.grid  )  ){
    const firstAy = [...gridsState[gridIndexContext].map((ay: Ayah, index:number) => ({ ...ay, index:  gridIndexContext != 0 ? ay.order + index : gridIndexContext  * ay.order + index }))]  
    const orderedAy = [..._.sortBy(gridsState[gridIndexContext], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index: index + gridIndexContext })) 
        console.log({orderedAy });
    dispatch(setOrderedAyahsContext({ayahs:orderedAy}))
    dispatch(setShuffeledFirstAyahsContext({ayahs:firstAy}))}
    setFirst(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  gridIndexContext]);

  
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
}
function validHandler() {
  dispatch(setValidContext({validCtxt:!validContext}))
   // setActualState(EVAL_STATE.EVAL)
   // setEvalIndex((prev) => prev + 1)
  }
  function sprintHandler() {
    //setActualState(EVAL_STATE.CLICK)
  
//    setEvalIndex((prev) => prev + 1)
  }


useEffect(() => {
    console.log({ hideNbContext , evalContext , evalIndex , gridSelected, first });
  }, [hideNbContext, evalIndex,evalContext,gridSelected ]);

  return (
    <div className=" flex-col justify-start space-y-2 h-full items-stretch w-full ">
      <div className="flex  justify-around  items-center  py-2 ">
        <SpaceButton  handlePress={prevIndexHandler} title='Prev Grid' />
        <SpaceButton handlePress={nextIndexHandler} title='Next Grid' />
        <SpaceButton  handlePress={shuffelHandler} title='Shuffel Grid' />
        <SpaceButton  handlePress={validHandler} title='Validate' />
        <SpaceButton  handlePress={sprintHandler} title='Sprint On' />
        
        <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
         <input className="flex  justify-center items-center  border border-blue-800 text-green-300" 
         type="checkbox" 
         id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={validContext || hideNbContext}  onChange={()  =>hideNbHandler()}/>
    <label htmlFor='HIDE_NB' className='text-sm' >Hide nb</label>
  </div>
  <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
         <input className="flex  justify-center items-center  border border-blue-800 text-green-300" 
         type="checkbox" 
         id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' checked={validContext}  onChange={()  =>validHandler()}/>
    <label htmlFor='HIDE_NB' className='text-sm' >valid</label>
  </div>
        <RadioButtonEvalState 
          evalState={EVAL_STATE.EVAL}   title='Eval board' />
        <RadioButtonEvalState 
          evalState={EVAL_STATE.ORDER}  title='Order Grid' />
        <RadioButtonEvalState 
          evalState={EVAL_STATE.CLICK}  title='Click Grid' />
         </div>
    {gridSelected && evalContext === EVAL_STATE.EVAL ?
    <div className="space-x-2 flex   justify-between  items-start ">
    <div className="CENTER m-1 ">
          <RepereComp  />
        </div>
    <div className="CENTER m-1">

          <EvalStageComp first={first}   />
        </div> </div>:  
         evalContext === EVAL_STATE.ORDER?
            <EvalDragOrderBoardComp  />
       :evalContext === EVAL_STATE.CLICK && <EvalClickBoardComp 
            />}
    </div>
  )
}

export default Board