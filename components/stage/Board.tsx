'use client'
import { Ayah, StagePrismaType } from '@/app/api/graphql/stage/stage.types';
import EvalClickBoardComp from "@/components/stage/EvalClickBoard";
import EvalDragOrderBoardComp from "@/components/stage/EvalDragOrderBoard";
import EvalOrderedComp from "@/components/stage/EvalOrdered";
import EvalSuits from "@/components/stage/EvalSuits";
import RadioButtonEvalState from "@/components/stage/RadioButtonEvalState";
import SpaceButton from "@/components/stage/SpaceButton";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type StagesStagePrismaType = {
  stage: StagePrismaType
}
export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}
const StageBoard = ({ stages }: { stages: StagesStagePrismaType[] }) => {
  const dispatch = useDispatch()
  const { stageGridSelected, stageEvalContext, stageEvalIndexContext, stageHideNbContext, stageShuffeledFirstAyahsContext, stageValidContext, stepIndexContext, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageOrderedAyahsContext, setStageShuffeledFirstAyahsContext, setStageHideNbContext, setStageGridsContext, setStageEvalContext, setStageValidContext, setStepIndexContext } = stageActions
  const [first, setFirst] = useState(() => true);

  useEffect(() => {
    if (typeof stages !== 'undefined' && typeof stages[0] != 'undefined' && stages?.length > 0) {
      console.log({ stages });
      const _stages = stages.map((st) => ({
        stageId: st.stage?.stageId,
        createdAt: st.stage?.createdAt ? st.stage?.createdAt.toString() : new Date().toISOString(),
        souraName: st.stage?.souraName,
        souraNb: st.stage?.souraNb,
        grid: st.stage?.grid,
        group: st.stage?.group,
        ayahs: st.stage?.ayahs,

      }))
      console.log({ _stages });

      dispatch(setStageGridsContext({ stages: _stages }))
      dispatch(setStepIndexContext({ index: 0 }))
    }
  }, []);

  useEffect(() => {
    if (typeof stageGridSelected !== 'undefined' && stageGridSelected.ayahs != '' && typeof stageGridSelected.ayahs !== 'undefined') {
      console.log({ stageGridSelected });

      const _shuffeleledFirst = JSON.parse(stageGridSelected.ayahs).map((ordG: Ayah, index: number) => ({ ...ordG, index }));
      console.log({ _shuffeleledFirst });

      const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index }))
      console.log({ _orderedAy });

      dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
      dispatch(setStageShuffeledFirstAyahsContext({ ayahs: _shuffeleledFirst }))

    }
  }, [stageGridSelected]);


  function nextIndexHandler() {
    /* console.log({ stageGridIndexContext });
    console.log({ ayahs: stageGridsContext[stageGridIndexContext] });
    if (typeof evalIndex === 'undefined') {
      dispatch(setStepIndexContext({ index: 0 }))
    } else if (stageGridIndexContext < stageGridsContext.length - 1) {
      dispatch(setStepIndexContext({ index: stageGridIndexContext + 1 }))
    } */
  }
  function prevStepHandler() {
    //dispatch(setStepIndexContext({ index: stageGridIndexContext > 1 ? stageGridIndexContext - 1 : 0 }))
  }

  function stageHideNbHandler() {
    dispatch(setStageHideNbContext({ hide: !stageHideNbContext }))
  }
  function shuffelHandler() {
    console.log({ stageShuffeledFirstAyahsContext });

    dispatch(setStageShuffeledFirstAyahsContext({ ayahs: _.shuffle(stageShuffeledFirstAyahsContext) }))
  }
  function stageValidHandler() {
    dispatch(setStageValidContext({ validCtxt: !stageValidContext }))
    // setEvalIndex((prev) => prev + 1)
  }
  function sprintHandler() {
    //setActualState(EVAL_STATE.CLICK)

    //    setEvalIndex((prev) => prev + 1)
  }


  useEffect(() => {
    console.log({ stageHideNbContext, stageEvalContext, stageEvalIndexContext, stageGridSelected, first });
  }, [stageHideNbContext, stageEvalIndexContext, stageValidContext, stageEvalContext, stageGridSelected]);

  return (
    <div className=" flex-col justify-start space-y-2 h-full py-2 items-center w-full ">
      <div className="flex-col   justify-start  items-stretch  gap-3  ">

        <div className="flex  justify-between items-center  gap-3 text-center font-sans " >
          <SpaceButton handlePress={prevStepHandler} title='Prev Step' />
          <SpaceButton handlePress={nextIndexHandler} title='Next Step' />
          <SpaceButton handlePress={shuffelHandler} title='Random Step' />
          {/* <SpaceButton handlePress={validHandler} title='Validate' /> */}
          <SpaceButton handlePress={sprintHandler} title='Sprint On' />
        </div>

        <div className="flex  justify-between items-center  gap-3 text-center font-sans " >

          <div className="flex  justify-between items-center p-2  border border-green-300 rounded-md text-center font-sans " >
            <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
              type="checkbox"
              id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={stageHideNbContext} onChange={() => stageHideNbHandler()} />
            <label className='px-2' htmlFor='HIDE_NB'  >Hide nb</label>
          </div>
          <div className="flex  justify-between items-center p-2 border border-green-300 rounded-md text-center font-sans " >
            <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
              type="checkbox"
              id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' checked={stageValidContext} onChange={() => stageValidHandler()} />
            <label className='px-2' htmlFor='HIDE_NB' >valid</label>
          </div>
          <div className="flex  justify-between  gap-3 items-center   text-center font-sans " >
            <div className="CENTER border border-green-300 rounded-md  p-2 text-center font-sans " >

              <RadioButtonEvalState
                evalState={EVAL_STATE.EVAL} title='Eval board' />
            </div>
            <div className="CENTER  border border-blue-300 rounded-md p-2 text-center font-sans " >
              <RadioButtonEvalState
                evalState={EVAL_STATE.ORDER} title='Order Grid' />
            </div>
            <div className="CENTER  border border-violet-300 rounded-md p-2 text-center font-sans " >
              <RadioButtonEvalState
                evalState={EVAL_STATE.CLICK} title='Click Grid' />
            </div>
          </div>

        </div>
      </div>

      {stageGridSelected && stageEvalContext === EVAL_STATE.EVAL ?
        <div className="flex justify-between  tems-start w-full   ">
          <div className=" -order-last md:order-first flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div>
          <div className=" flex justify-stretch w-full flex-1 items-start m-1">

            <EvalSuits first={first} />
          </div> </div> :
        stageEvalContext === EVAL_STATE.ORDER ?
          <EvalDragOrderBoardComp />
          : stageEvalContext === EVAL_STATE.CLICK && <EvalClickBoardComp
          />}
    </div>
  )
}

export default StageBoard