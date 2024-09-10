'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
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
const Board = () => {
  const dispatch = useDispatch()

  const { gridsContext, gridSelected, evalIndex, evalContext, hideNbContext, shuffeledFirstAyahsContext, orderedAyahsContext, validContext, gridIndexContext, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setShuffeledFirstAyahsContext, setOrderedAyahsContext, setShuffeledAyahsContext, setEvalContext, setEvalIndex, setValidContext, setGridsContext, setHideNbContext, setGridIndexContext } = stageActions
  const [first, setFirst] = useState(() => true);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs != '') {
      dispatch(setGridsContext({ grids: JSON.parse(gridSelected.ayahs) }))
    }
  }, []);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs != '') {
      dispatch(setGridsContext({ grids: JSON.parse(gridSelected.ayahs) }))
    }
  }, [gridSelected]);
  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs != '' && gridsContext.length > gridIndexContext) {
      const shuffeleledFirst = gridsContext[gridIndexContext].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))
      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))
      
      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
      
      setFirst(false)
      
    }else{
      const shuffeleledFirst = gridsContext[ 0].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));
      
      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))
      dispatch(setGridIndexContext({index:0}))
      
      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      setFirst(false)

    } 

  }, [gridIndexContext]);


  useEffect(() => {
    const gridSelectedLength = JSON.parse(gridSelected.ayahs)[gridIndexContext]?.length
    console.log({ hideNbContext, orderedAyahsContext, gridSelected, gridIndexContext, gridSelectedLength, ayahs: JSON.parse(gridSelected.ayahs) });
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs != '' && gridsContext.length > 0) {
      const shuffeleledFirst = gridsContext[gridIndexContext ?? 0]?.map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))

      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      setFirst(false)

    }
  }, [gridsContext]);

  useEffect(() => {
    console.log({ gridIndexContext, gridsContext });
    if (typeof gridSelected !== 'undefined' && gridIndexContext >= 0 && (gridsContext[gridIndexContext]?.length <= gridSelected.grid * gridSelected.grid)) {
      const firstAy = [...gridsContext[gridIndexContext].map((ay: Ayah, index: number) => ({ ...ay, index: gridIndexContext != 0 ? ay.order + index : gridIndexContext * ay.order + index }))]
      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index: index + gridIndexContext }))
      console.log({ orderedAy });
      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
      dispatch(setShuffeledFirstAyahsContext({ ayahs: firstAy }))
    }
    setFirst(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridIndexContext]);


  function nextIndexHandler() {
    console.log({ gridIndexContext });
    console.log({ ayahs: gridsContext[gridIndexContext] });
    if (typeof evalIndex === 'undefined') {
      dispatch(setGridIndexContext({ index: 0 }))
    } else if (gridIndexContext < gridsContext.length - 1) {
      dispatch(setGridIndexContext({ index: gridIndexContext + 1 }))
    }
  }
  function prevIndexHandler() {
    dispatch(setGridIndexContext({ index: gridIndexContext < gridsContext.length && gridIndexContext !== 0 ? gridIndexContext + 1 : 0 }))
  }

  function hideNbHandler() {
    dispatch(setHideNbContext({ hide: !hideNbContext }))
  }
  function shuffelHandler() {
    dispatch(setShuffeledAyahsContext({ ayahs: _.shuffle(orderedAyahsContext) }))
  }
  function validHandler() {
    //dispatch(setValidContext({ validCtxt: !validContext }))
    // setEvalIndex((prev) => prev + 1)
  }
  function sprintHandler() {
    //setActualState(EVAL_STATE.CLICK)

    //    setEvalIndex((prev) => prev + 1)
  }


  useEffect(() => {
    console.log({ hideNbContext, evalContext, evalIndex, gridSelected, first });
  }, [hideNbContext, evalIndex, evalContext, gridSelected]);

  return (
    <div className=" flex-col justify-start space-y-2 h-full items-center w-full ">
      <div className="flex  justify-around  items-center  py-2 ">
        <SpaceButton handlePress={prevIndexHandler} title='Prev Grid' />
        <SpaceButton handlePress={nextIndexHandler} title='Next Grid' />
        <SpaceButton handlePress={shuffelHandler} title='Shuffel Grid' />
        <SpaceButton handlePress={validHandler} title='Validate' />
        <SpaceButton handlePress={sprintHandler} title='Sprint On' />

        <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
          <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
            type="checkbox"
            id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={validContext || hideNbContext} onChange={() => hideNbHandler()} />
          <label htmlFor='HIDE_NB' className='text-sm' >Hide nb</label>
        </div>
        <div className="flex  justify-between items-center  border border-green-400 text-center font-sans " >
          <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
            type="checkbox"
            id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' checked={validContext} onChange={() => validHandler()} />
          <label htmlFor='HIDE_NB' className='text-sm' >valid</label>
        </div>
        <RadioButtonEvalState
          evalState={EVAL_STATE.EVAL} title='Eval board' />
        <RadioButtonEvalState
          evalState={EVAL_STATE.ORDER} title='Order Grid' />
        <RadioButtonEvalState
          evalState={EVAL_STATE.CLICK} title='Click Grid' />
      </div>
      {gridSelected && evalContext === EVAL_STATE.EVAL ?
        <div className="flex justify-between  tems-start w-full   ">
          <div className=" -order-last md:order-first flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div>
          <div className=" flex justify-stretch w-full flex-1 items-start m-1">

            <EvalSuits first={first} />
          </div> </div> :
        evalContext === EVAL_STATE.ORDER ?
          <EvalDragOrderBoardComp />
          : evalContext === EVAL_STATE.CLICK && <EvalClickBoardComp
          />}
    </div>
  )
}

export default Board