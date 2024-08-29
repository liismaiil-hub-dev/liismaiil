'use client'
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import EvalGridComp from "@/components/space/EvalGrid";
import EvalOrderedComp from "@/components/space/EvalOrdered";
import { sprintActions } from "@/store/slices/sprintSlice";
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
  const { gridSelected, evalIndex, evalContext, hideNbContext, orderedAyahsContext, validContext, gridIndexContext, } = useSelector((state: RootStateType) => state.sprint)
  const { setShuffeledFirstAyahsContext, setOrderedAyahsContext, setShuffeledAyahsContext, setEvalContext, setEvalIndex, setValidContext, setHideNbContext, setGridIndexContext } = sprintActions
  const [first, setFirst] = useState(() => true);

  const [gridsState, setGridsState] = useState(() => JSON.parse(gridSelected.ayahs) as [Ayah[]]);
  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs != '') {
      setGridsState(JSON.parse(gridSelected.ayahs))
    }
  }, []);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs != '') {
      setGridsState(JSON.parse(gridSelected.ayahs))
    }
  }, [gridSelected]);

  useEffect(() => {

    const gridSelectedLength = JSON.parse(gridSelected.ayahs)[gridIndexContext].length
    console.log({ hideNbContext, orderedAyahsContext, gridSelected, gridIndexContext, gridSelectedLength, ayahs: JSON.parse(gridSelected.ayahs) });
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs != '' && gridsState.length > 0) {
      const shuffeleledFirst = gridsState[gridIndexContext ?? 0].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsState[gridIndexContext ?? 0], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))

      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      setFirst(false)

    }
  }, [gridsState]);

  useEffect(() => {
    console.log({ gridIndexContext });
    if (typeof gridSelected !== 'undefined' && gridIndexContext >= 0 && (gridsState[gridIndexContext].length <= gridSelected.grid * gridSelected.grid)) {
      const firstAy = [...gridsState[gridIndexContext].map((ay: Ayah, index: number) => ({ ...ay, index: gridIndexContext != 0 ? ay.order + index : gridIndexContext * ay.order + index }))]
      const orderedAy = [..._.sortBy(gridsState[gridIndexContext], ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index: index + gridIndexContext }))
      console.log({ orderedAy });
      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
      dispatch(setShuffeledFirstAyahsContext({ ayahs: firstAy }))
    }
    setFirst(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridIndexContext]);


  function nextIndexHandler() {
    console.log({ evalIndex });
    console.log({ ayahs: JSON.parse(gridSelected.ayahs) });
    if (typeof evalIndex === 'undefined') {
      dispatch(setEvalIndex({ index: 0 }))
    } else if (evalIndex < JSON.parse(gridSelected.ayahs).length - 1) {
      dispatch(setEvalIndex({ index: evalIndex + 1 }))
    }
  }
  function prevIndexHandler() {
    dispatch(setGridIndexContext({ index: gridIndexContext < gridsState.length ? gridIndexContext + 1 : 0 }))
  }

  function hideNbHandler() {
    dispatch(setHideNbContext({ hide: !hideNbContext }))
  }
  function shuffelHandler() {
    dispatch(setShuffeledAyahsContext({ ayahs: _.shuffle(orderedAyahsContext) }))
  }
  function validHandler() {
    dispatch(setValidContext({ validCtxt: !validContext }))
    // setActualState(EVAL_STATE.EVAL)
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
    <div className=" flex-col justify-start space-y-2 h-full items-stretch w-full ">
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
        <div className="space-x-2 flex   justify-between  items-start ">
          <div className="CENTER m-1 ">
            <EvalOrderedComp />
          </div>
          <div className="CENTER m-1">

            <EvalGridComp first={first} />
          </div> </div> :
        evalContext === EVAL_STATE.ORDER ?
          <EvalDragOrderBoardComp />
          : evalContext === EVAL_STATE.CLICK && <EvalClickBoardComp
          />}
    </div>
  )
}

export default Board