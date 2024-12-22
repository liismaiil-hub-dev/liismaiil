'use client'
import { Ayah, GuestPrismaType } from '@/app/api/graphql/stage/stage.types';
import EvalOrderedComp from "@/components/space/EvalOrdered";
import EvalSuits from "@/components/space/EvalSuits";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EvalClickBoardComp from "./EvalClickBoard";
import EvalDragOrderBoardComp from "./EvalDragOrderBoard";
import RadioButtonEvalState from "./RadioButtonEvalState";
import SpaceButton from './SpaceButton';


// REPERE
//EVAL

/**
 * Board PRINCIPAL Component
 */
export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}
const SpaceBoard = () => {
  const dispatch = useDispatch()

  const { gridsContext, gridSelected, evalIndex, evalContext, hideNbContext,blurContext, 
    stagedContext, validContext, gridIndexContext, firstGridContext} = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setShuffeledFirstAyahsContext, setOrderedAyahsContext, setErrorNbContext, 
   setBlurContext, setStageContext, setGridsContext, setHideNbContext, setGridIndexContext, setFirstGridContext, setGridsStaged } = stageActions


  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && typeof gridSelected.ayahs !== 'undefined' && gridSelected.ayahs && gridSelected?.ayahs[0] != '' && gridSelected?.ayahs.length > 0) {
      console.log({ grdSelected: gridSelected?.ayahs[0] });

//      const _grids: [[Ayah]] = gridSelected?.ayahs?.map((ay: string) => JSON.parse(ay) as [Ayah])
      // dispatch(setGridsContext({ grids: _grids }))
      dispatch(setGridIndexContext({ index: 0 })) 
      dispatch(setErrorNbContext({errorNb:0  }))

      dispatch(setFirstGridContext({first:true}))
      dispatch(setGridsStaged({stageIds:['']}))
     // console.log({ currentGuest, guestPrisma });
    }
  }, []);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs[0] != '' && typeof gridSelected.ayahs !== 'undefined') {
      const _grids:Ayah[][]|[[Ayah]] = gridSelected.ayahs?.map((ay: string) => JSON.parse(ay) as Ayah[])
      dispatch(setGridsContext({ grids: _grids }))
      dispatch(setGridIndexContext({ index: 0 }))
    }
  }, [gridSelected]);

  useEffect(() => {
    console.log({gridIndexContext, gridSelected, firstGridContext});
    
    if (typeof gridSelected !== 'undefined' && typeof gridSelected.ayahs !== 'undefined' && gridSelected.ayahs[0] != '' && 
      gridsContext.length > gridIndexContext) {
      const shuffeleledFirst = gridsContext[gridIndexContext].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))
      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      dispatch(setFirstGridContext({first:true}))

    } else {
      const shuffeleledFirst = gridsContext[0].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))
      dispatch(setGridIndexContext({ index: 0 }))

      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      dispatch(setFirstGridContext({first:true}))
    }
  }, [gridIndexContext]);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected?.ayahs[0] != '' && typeof gridSelected.ayahs !== 'undefined') {
      const _grids = gridSelected.ayahs?.map((ay: string) => JSON.parse(ay))

      const shuffeleledFirst = gridsContext[gridIndexContext ?? 0]?.map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))

      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
      dispatch(setFirstGridContext({first:true}))
    }
  }, [gridsContext]);
/* 
  useEffect(() => {
    //    console.log({ gridIndexContext, gridsContext });
    if (typeof gridSelected !== 'undefined' && gridIndexContext >= 0 && (gridsContext[gridIndexContext]?.length <= gridSelected.grid * gridSelected.grid)) {
      const firstAy = [...gridsContext[gridIndexContext].map((ay: Ayah, index: number) => ({ ...ay, index: gridIndexContext != 0 ? ay.order + index : gridIndexContext * ay.order + index }))]
      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: index + gridIndexContext }))
      console.log({ orderedAy });
      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
      dispatch(setShuffeledAyahsContext({ ayahs: firstAy }))
    }
    dispatch(setFirstGridContext({first:false}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridIndexContext]);
 */

  function nextSouraHandler() {
    //  console.log({ gridIndexContext });
    // console.log({ ayahs: gridsContext[gridIndexContext] });
    if (typeof evalIndex === 'undefined') {
      dispatch(setGridIndexContext({ index: 0 }))
    } else if (gridIndexContext < gridsContext.length - 1) {
      dispatch(setGridIndexContext({ index: gridIndexContext + 1 }))
    }
  }
  function prevSouraHandler() {
    dispatch(setGridIndexContext({ index: gridIndexContext > 1 ? gridIndexContext - 1 : 0 }))
  }

  function hideNbHandler() {
    dispatch(setHideNbContext({ hide: !hideNbContext }))
  }

  function blurHandler() {
    dispatch(setBlurContext({ blur: !blurContext }))
  }
  function stageContextHandler() {
    dispatch(setStageContext({ stagedContext: !stagedContext }))
  }
  
  
  /* useEffect(() => {
//    console.log({ hideNbContext, evalContext, gridIndexContext, evalIndex, gridSelected, first });
  }, [hideNbContext, evalIndex, gridIndexContext, evalContext, gridSelected]);
 */
  return (
    <div className=" flex-col justify-start space-y-2 h-full items-center w-full ">
      <div className="flex  justify-around  items-center  py-2 ">
        <SpaceButton disabled={false} handlePress={prevSouraHandler} title='Prev Soura' />
        <SpaceButton disabled={false} handlePress={nextSouraHandler} title='Next Soura' />

        <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
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
        </div> 
        <RadioButtonEvalState
          evalState={EVAL_STATE.EVAL} title='Eval board' />
        <RadioButtonEvalState
          evalState={EVAL_STATE.ORDER} title='Order Grid' />
        </div>
      {gridSelected && evalContext === EVAL_STATE.EVAL ?
        <div className="grid  grid-cols-1 md:grid-cols-2 w-full ">
          <div className=" md:order-first  flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div>
          <div className=" order-first flex justify-stretch w-full flex-1 items-start m-1">
            <EvalSuits  />
          </div> 
          </div> :
        evalContext === EVAL_STATE.ORDER ?
          <EvalDragOrderBoardComp />
          : evalContext === EVAL_STATE.CLICK && <EvalClickBoardComp
          />}
    </div>
  )
}

export default SpaceBoard