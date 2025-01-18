'use client'
import { Ayah, GridTypeData, GuestPrismaType } from '@/app/api/graphql/stage/stage.types';
import TemplateOrdered from "@/components/insight/TemplateOrdered";
import TemplateStat from "@/components/insight/TemplateStat";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EvalClickBoardComp from "./EvalClickBoard";
import EvalDragOrderBoardComp from "./EvalDragOrderBoard";
import RadioButtonEvalState from "./RadioButtonEvalState";
import SpaceButton from './SpaceButton';
import { getGridsByNb } from '@/actions/space';
import { toast } from 'react-toastify';
import {SECTIONS_SOURAS} from "@/store/constants/constants";

export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}
/**
 * Space board PRINCIPAL Component
 */

const TemplateBoard = () => {
  const dispatch = useDispatch()

  const { insightTemplate,insightTemplateAyahsSelected, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const {  setErrorNbContext, setSpaceStageAyahsContext ,
   setBlurContext, setStagedContext, setGridsContext, setHideNbContext, setGridIndexContext, setFirstGridContext, setGridsStaged } 
   = stageActions


  useEffect(() => {
    if (typeof insightTemplate !== 'undefined' && typeof insightTemplateAyahsSelected !== 'undefined' && 
      insightTemplateAyahsSelected.length > 0  ) {
      console.log({ insightTemplateAyahsSelected, insightTemplate });

//      const _grids: [[Ayah]] = gridSelected?.ayahs?.map((ay: string) => JSON.parse(ay) as [Ayah])
      // dispatch(setGridsContext({ grids: _grids }))
     // dispatch(setGridIndexContext({ index: spaceStageSelected.stageId?.split('-')[3] as unknown as number })) 
      dispatch(setErrorNbContext({errorNb:0  }))

     // dispatch(setFirstGridContext({first:true}))
      dispatch(setGridsStaged({stageIds:['']}))
     // console.log({ currentGuest, guestPrisma });
    }
  }, []);
  async function nextSouraHandler() {
 /*    if(gridSelected.souraNb !== -1 &&  gridSelected.souraNb < 114 ){
      console.log({souraNb:gridSelected.souraNb});

      await selectGridHandler(gridSelected.souraNb + 1)
   } else if(typeof spaceGridsSelected !== 'undefined' && spaceGridsSelected && spaceGridsSelected[0].souraNb !== -1 
     &&  spaceGridsSelected[0].souraNb   < 114 ){
      console.log({ fromSpaceGrid: spaceGridsSelected[0].souraNb});
       await selectGridHandler(spaceGridsSelected[0].souraNb  + 1)
      }  else {
      await selectGridHandler(1)
      } 
  */  // await selectGridHandler(gridSelected.souraNb + 1)
    
  }
  async function prevSouraHandler() {
 /*    console.log({souraNb:gridSelected.souraNb, fromSpaceGrid: spaceGridsSelected[0].souraNb});
   if(gridSelected.souraNb !== -1 &&  gridSelected.souraNb >0 ){
    console.log({souraNb:gridSelected.souraNb});
     await selectGridHandler(gridSelected.souraNb - 1)
  } else if(typeof spaceGridsSelected !== 'undefined' && spaceGridsSelected && spaceGridsSelected[0].souraNb !== -1 
    &&  spaceGridsSelected[0].souraNb >0 ){
      console.log({ fromSpaceGrid: spaceGridsSelected[0].souraNb});
      await selectGridHandler(spaceGridsSelected[0].souraNb - 1)
      } else {
          await selectGridHandler(1)
    } */
  }
  useEffect(() => {
    if(typeof insightTemplateAyahsSelected != 'undefined' ){
   console.log({tempalteAyahs : insightTemplateAyahsSelected});
   
    //  dispatch(setInsightTemplateAyahsContext({ayahs: JSON.parse(insightTemplateAyahsSelected?.ayahs)}))
 } }, [insightTemplateAyahsSelected]);
  
  
  
  /* useEffect(() => {
//    console.log({ hideNbContext, evalContext, gridIndexContext, evalIndex, gridSelected, first });
  }, [hideNbContext, evalIndex, gridIndexContext, evalContext, gridSelected]);
 */
  return (
    <div className=" flex-col justify-start space-y-2 h-full items-center w-full ">
      <div className="flex  justify-around  items-center  py-2 ">
        <SpaceButton disabled={false} handlePress={prevSouraHandler} title='Prev Soura' />
        <SpaceButton disabled={false} handlePress={nextSouraHandler} title='Next Soura' />

       {/*  <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
          <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
            type="checkbox"
            id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={validContext || hideNbContext} onChange={() => hideNbHandler()} />
          <label htmlFor='HIDE_NB' className='text-sm' >Hide nb</label>
        </div>
        
          <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
          <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
            type="checkbox"
            id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' checked={blurContext} onChange={() => blurHandler()} />
          <label htmlFor='HIDE_NB' className='text-sm' >Blur</label>
        </div>
        
        <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
          <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
            type="checkbox"
            id='STAGED_CTXT' name='STAGED_CTXT' value='STAGED_CTXT' checked={stagedContext} onChange={() => stageContextHandler()} />
          <label htmlFor='STAGED_CTXT' className='text-sm' >Stageable</label>
        </div> */} 
        <RadioButtonEvalState
          evalState={EVAL_STATE.EVAL} title='Eval board' />
        <RadioButtonEvalState
          evalState={EVAL_STATE.ORDER} title='Order Grid' />
        </div>
      {  typeof insightTemplateAyahsSelected  !== 'undefined' && insightTemplateAyahsSelected.length> 1 && 
        <div className="grid  grid-cols-1 md:grid-cols-2 w-full ">
          <div className=" md:order-first  flex justify-stretch w-full flex-1 items-start m-1 ">
            <TemplateOrdered />
          </div>
          <div className=" order-first flex justify-stretch w-full flex-1 items-start m-1">
            <TemplateStat  />
          </div> 
          </div> }
    </div>
  )
}

export default TemplateBoard

