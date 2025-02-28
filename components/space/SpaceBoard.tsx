'use client'
import { Ayah, GridTypeData, GuestPrismaType } from '@/app/api/graphql/stage/stage.types';
import EvalOrderedComp from "@/components/space/EvalOrdered";
import EvalSuits from "@/components/space/EvalSuits";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EvalClickBoardComp from "./EvalClickBoard";
import EvalDragOrderBoardComp from "./EvalDragOrderBoard";
import RadioButtonEvalState from "./RadioButtonEvalState";
import SpaceButton from './SpaceButton';
import { getGridsByNb } from '@/actions/space';
import { toast } from 'react-toastify';
import { getLocalStagesByNb, getStageById } from '@/actions/stage';
import { EVAL_STATE} from "@/api/graphql/stage/stage.types";

const SpaceBoard = () => {
  const dispatch = useDispatch()

  const { spaceStages, gridSelected,hideEvenNbContext, hideOddNbContext, evalContext, blurContext, spaceStageSelected,
    stagedContext,} = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setShuffeledAyahsContext, setSpaceStages, setErrorNbContext, setHideEvenNbContext , setHideOddNbContext,setBlurContext,
     setEvalContext,  setHideNbContext,  setGridsStaged } = stageActions


  useEffect(() => {
      dispatch(setErrorNbContext({errorNb:0  }))
      dispatch(setGridsStaged({stageIds:['']}))
      dispatch(setEvalContext({eval:EVAL_STATE.DISCOVER}))
    }, []);
  
  async function nextSouraHandler() {
    if(spaceStages && spaceStages[0].souraNb !== -1 && typeof spaceStages !== 'undefined' && spaceStages[0]?.souraNb!  < 114 ){
         try {
           const stagesByNb = await getLocalStagesByNb(spaceStages[0].souraNb + 1 )
           
           if(typeof stagesByNb !== 'undefined' &&  stagesByNb.success){
           console.log({ grids: JSON.parse(stagesByNb.stages) });
            dispatch(setSpaceStages({ stages: JSON.parse(stagesByNb.stages) }))
           }else {
           toast.warning('can not reach the grid server, please check your internet connexion')
          }
         } catch (error) {
        toast.warning(`${error} occured`) 
        } }}
  async function prevSouraHandler() {
    if(spaceStages && spaceStages[0].souraNb !== -1 && spaceStages[0].souraNb  !== 1 ){
      try {
        const stagesByNb = await getLocalStagesByNb(spaceStages[0].souraNb! - 1 )
        if(typeof stagesByNb !== 'undefined' &&  stagesByNb.success){
        console.log({ grids: JSON.parse(stagesByNb.stages) });
         dispatch(setSpaceStages({ stages: JSON.parse(stagesByNb.stages) }))
        }else {
        toast.warning('can not reach the grid server, please check your internet connexion')
   }
      } catch (error) {
      }
  }
  }
const getAyahsStageId = useCallback(async() => {
  if(spaceStageSelected) {
    const _getStageAyahs = await getStageById(spaceStageSelected.stageId)


    if(_getStageAyahs && _getStageAyahs.success && _getStageAyahs.stage){
  const stageAyahs = JSON.parse(_getStageAyahs.stage)
  
  console.log({stageAyahs});
  
  dispatch(setShuffeledAyahsContext({ayahs:stageAyahs}))
  }else {
    toast.warning(_getStageAyahs.stage)
  }
  }
  }, [spaceStageSelected]);


useEffect(() => {
getAyahsStageId()
}, [spaceStageSelected]);
  
function hideOddNbHandler() {
    console.log({hideOddNbContext});
    dispatch(setHideOddNbContext({ hide: !hideOddNbContext }))
  }
  function hideEvenNbHandler() {
    console.log({hideEvenNbContext});
        dispatch(setHideEvenNbContext({ hide: !hideEvenNbContext }))
  }

  function blurHandler() {
    dispatch(setBlurContext({ blur: !blurContext }))
  }
 useEffect(() => {
  console.log({gridSelected, evalContext });
 }, [gridSelected, evalContext]);
 
  return (
    <div className=" flex-col justify-start space-y-2 h-full items-center w-full ">
      <div className="flex  justify-around  items-center  py-2 ">
        <SpaceButton disabled={false} handlePress={prevSouraHandler} title='Prev Soura' />
        <SpaceButton disabled={false} handlePress={nextSouraHandler} title='Next Soura' />
       <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
          <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
            type="checkbox"
            id='HIDE_EVEN' name='HIDE_EVEN' value='HIDE_EVEN' checked={hideEvenNbContext} onChange={() => hideEvenNbHandler()} />
          <label htmlFor='HIDE_EVEN' className='text-sm' >Hide even</label>
        </div>
        <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
          <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
            type="checkbox"
            id='HIDE_ODD_NB' name='HIDE_ODD_NB' value='HIDE_ODD_NB' checked={hideOddNbContext } onChange={() => hideOddNbHandler()} />
          <label htmlFor='HIDE_ODD_NB' className='text-sm' >Hide Odd</label>
        </div>
        
          <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
          <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
            type="checkbox"
            id=' BLUR_CTXT' name='BLUR_CTXT' value='BLUR_CTXT' checked={blurContext} onChange={() => blurHandler()} />
          <label htmlFor='BLUR_CTXT' className='text-sm' >Blur</label>
        </div>
        <RadioButtonEvalState
          evalState={EVAL_STATE.DISCOVER} title='Discover' />
        <RadioButtonEvalState
          evalState={EVAL_STATE.DRAGDROP} title='Drag & Drop' />
        </div>
      { evalContext === EVAL_STATE.DISCOVER ?
        <div className="grid  grid-cols-1 md:grid-cols-2 w-full ">
          <div className=" md:order-first  flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div>
          <div className=" order-first flex justify-stretch w-full flex-1 items-start m-1">
            <EvalSuits  />
          </div> 
          </div> :
        evalContext === EVAL_STATE.DRAGDROP &&
          <EvalDragOrderBoardComp />
          }
    </div>
  )
}

export default SpaceBoard
