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
const SpaceBoard = ({ currentGuest }: { currentGuest: GuestPrismaType }) => {
  const dispatch = useDispatch()

  const { gridsContext, gridSelected, evalIndex, evalContext, hideNbContext,blurContext, 
    shuffeledFirstAyahsContext, orderedAyahsContext, validContext, gridIndexContext, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setShuffeledFirstAyahsContext, setOrderedAyahsContext, setShuffeledAyahsContext, setErrorNbContext, 
   setBlurContext, setEvalContext, setEvalIndex, setValidContext, setGridsContext, setHideNbContext, setGridIndexContext } = stageActions
  const [first, setFirst] = useState(() => true);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && typeof gridSelected.ayahs !== 'undefined' && gridSelected.ayahs && gridSelected?.ayahs[0] != '' && gridSelected?.ayahs.length > 0) {
      console.log({ grdSelected: gridSelected?.ayahs[0] });

//      const _grids: [[Ayah]] = gridSelected?.ayahs?.map((ay: string) => JSON.parse(ay) as [Ayah])
      // dispatch(setGridsContext({ grids: _grids }))
      dispatch(setGridIndexContext({ index: 0 })) 
      dispatch(setErrorNbContext({errorNb:0  }))

      console.log({ currentGuest, guestPrisma });
    }
  }, []);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs[0] != '' && typeof gridSelected.ayahs !== 'undefined') {
      const _grids:[[Ayah]] = gridSelected.ayahs?.map((ay: string) => JSON.parse(ay))
      dispatch(setGridsContext({ grids: _grids }))
      dispatch(setGridIndexContext({ index: 0 }))
    }
  }, [gridSelected]);
  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && typeof gridSelected.ayahs !== 'undefined' && gridSelected.ayahs[0] != '' && gridsContext.length > gridIndexContext) {
      const shuffeleledFirst = gridsContext[gridIndexContext].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))
      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      setFirst(false)

    } else {
      const shuffeleledFirst = gridsContext[0].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))
      dispatch(setGridIndexContext({ index: 0 }))

      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      setFirst(false)
    }
  }, [gridIndexContext]);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected?.ayahs[0] != '' && typeof gridSelected.ayahs !== 'undefined') {
      const _grids = gridSelected.ayahs?.map((ay: string) => JSON.parse(ay))

      const gridSelectedLength = _grids?.length

      const shuffeleledFirst = gridsContext[gridIndexContext ?? 0]?.map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.order + gridIndexContext : ordG.order }))

      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
      setFirst(false)
    }
  }, [gridsContext]);

  useEffect(() => {
    //    console.log({ gridIndexContext, gridsContext });
    if (typeof gridSelected !== 'undefined' && gridIndexContext >= 0 && (gridsContext[gridIndexContext]?.length <= gridSelected.grid * gridSelected.grid)) {
      const firstAy = [...gridsContext[gridIndexContext].map((ay: Ayah, index: number) => ({ ...ay, index: gridIndexContext != 0 ? ay.order + index : gridIndexContext * ay.order + index }))]
      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: index + gridIndexContext }))
      console.log({ orderedAy });
      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
      dispatch(setShuffeledFirstAyahsContext({ ayahs: firstAy }))
    }
    setFirst(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridIndexContext]);


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
  function shuffelHandler() {
    dispatch(setShuffeledAyahsContext({ ayahs: _.shuffle(orderedAyahsContext) }))
  }

  function sprintHandler() {

  }

  useEffect(() => {
    console.log({ hideNbContext, evalContext, gridIndexContext, evalIndex, gridSelected, first });
  }, [hideNbContext, evalIndex, gridIndexContext, evalContext, gridSelected]);

  return (
    <div className=" flex-col justify-start space-y-2 h-full items-center w-full ">
      <div className="flex  justify-around  items-center  py-2 ">
        <SpaceButton handlePress={prevSouraHandler} title='Prev Soura' />
        <SpaceButton handlePress={nextSouraHandler} title='Next Soura' />

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
            id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' checked={blurContext} onChange={() => blurHandler()} />
          <label htmlFor='HIDE_NB' className='text-sm' >Blur</label>
        </div> 
        <RadioButtonEvalState
          evalState={EVAL_STATE.EVAL} title='Eval board' />
        <RadioButtonEvalState
          evalState={EVAL_STATE.ORDER} title='Order Grid' />
        <RadioButtonEvalState
          evalState={EVAL_STATE.CLICK} title='Click Grid' />
      </div>
      {gridSelected && evalContext === EVAL_STATE.EVAL ?
        <div className="flex justify-between  tems-start w-full ">
          <div className="  md:order-first flex justify-stretch w-full flex-1 items-start m-1 ">
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

export default SpaceBoard