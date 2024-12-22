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
import { startTransition, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { cn } from '@nextui-org/react';
import { createNewSprint } from '@/actions/sprint';

export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}
const StageBoard = ({ stages }: { stages:StagePrismaType[] }) => {
  const dispatch = useDispatch()
  
  const { stageGridSelected, stageEvalContext, reorderedAyahs, firstStateContext, stageEvalIndexContext, stageHideNbContext, errorNbContext,
     stageShuffeledFirstAyahsContext, stageValidContext, stepIndexContext,   stageOrderedAyahsContext, stageShuffeledAyahsContext, stageGridsContext, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageOrderedAyahsContext, setStageShuffeledFirstAyahsContext, setStageHideNbContext, setStageGridsContext,  setStageShuffeledAyahsContext, setStageGridSelected ,
     setStageValidContext, setStepIndexContext, setFirstStateContext,setReorderedAyahs, setErrorNbContext } = stageActions
  

      
  useEffect(() => {
    if (typeof stages !== 'undefined' && typeof stages[0] != 'undefined' && stages?.length > 0) {
      console.log({ stages });
      const _stages = stages.map((st) => ({
        stageId: st?.stageId,
        createdAt: st?.createdAt ? st?.createdAt.toString() : new Date().toISOString(),
        souraName: st?.souraName,
        souraNb: st?.souraNb,
        grid: st?.grid,
        group: st?.group,
        ayahs: st?.ayahs,

      }))
      console.log({ _stages });
      dispatch(setStageGridsContext({ stages: _stages }))
      dispatch(setStepIndexContext({ index: 0 }))
      dispatch(setFirstStateContext({ first: true }))
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

  
  function shuffleHandler() {
      dispatch(setFirstStateContext({first: false}))
      const shuffeledAy = _.shuffle(stageShuffeledFirstAyahsContext)
      console.log({ shuffeledAy });

      dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
  }
  function firstHandler() {
    dispatch(setFirstStateContext({first: true}))
      dispatch(setErrorNbContext({errorNb:0}))
      dispatch(setReorderedAyahs({reorderedAyahs:[-1]}))
      
      dispatch(setStageShuffeledFirstAyahsContext({ ayahs: stageShuffeledFirstAyahsContext }))

  }
  /**
   * 
   * @param reord  index
   */
 
  const firstAyahIndex = useCallback(() => {
      if (firstStateContext ) {
          return (_.findIndex(stageShuffeledFirstAyahsContext, function (ay) {
              const minOrder = _.minBy(stageShuffeledFirstAyahsContext, 'order')!['order']
              console.log({ minOrder });

              return ay['order'] === minOrder
          }))
      } else {
          return (_.findIndex(stageShuffeledAyahsContext, function (ay) {
              const minOrder = _.minBy(stageShuffeledAyahsContext, 'order')!['order']
              return ay['order'] === minOrder
          }))
      }
  }, [firstStateContext, stageShuffeledAyahsContext, stageShuffeledFirstAyahsContext]);

  useEffect(() => {
      console.log({ reorderedAyahs });

  }, [reorderedAyahs]);

  useEffect(() => {
      console.log(stageShuffeledAyahsContext);

  }, [stageShuffeledAyahsContext]);

  function nextStepHandler() {

      dispatch(setStepIndexContext({ index: stepIndexContext + 1 }))

  }
  useEffect(() => {
      console.log({ stepIndexContext });
      if (stepIndexContext < stageGridsContext.length) {

          dispatch(setStageGridSelected({ stage: stageGridsContext[stepIndexContext] }))
      } else {
          dispatch(setStageGridSelected({ stage: stageGridsContext[0] }))

      }
  }, [stepIndexContext]);

  function getMax() {
      if (stageOrderedAyahsContext && stageOrderedAyahsContext.length > 0) {
          return stageOrderedAyahsContext[stageOrderedAyahsContext.length - 1].numberInSurah
      }
  }
  function getMin() {
      console.log({ stageOrderedAyahsContext, stepIndexContext });
      return stageOrderedAyahsContext[0].numberInSurah
  }


  function sprintHandler() {
      console.log({ reorderedAyahs, stageShuffeledFirstAyahsContext });
      try {
        if (reorderedAyahs.length === stageShuffeledFirstAyahsContext.length) {
              startTransition(() => createNewSprint({
                  sprintId: `${stageGridSelected.stageId}_${guestPrisma.tokenId}`,
                  createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                  stageId: stageGridSelected.stageId,
                  tokenId:guestPrisma.tokenId,
              }
              ))
          } else {
              toast.warning('you must at least order the grid once');
          }
      } catch (error) {
          toast.error(`${error}`)
      }
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
  
  useEffect(() => {
    console.log({ stageHideNbContext, stageEvalContext, stageEvalIndexContext, stageGridSelected });
  }, [stageHideNbContext, stageEvalIndexContext, stageValidContext, stageEvalContext, stageGridSelected]);

  return (
    <div className=" flex-col justify-start space-y-2 h-full py-2 items-center w-full ">
      <div className="flex-col   justify-start  items-stretch  gap-3 flex-wrap  ">
      <div className="flex justify-center items-center mt-2 p-3  ">
                <p className='text-center inline-flex '>Soura &nbsp;: [&nbsp;{stageGridSelected?.arabName ? stageGridSelected?.arabName : stageGridSelected?.souraName}&nbsp;]&nbsp;</p>
                <p className='text-center inline-flex '>&nbsp; Nb : [&nbsp;{stageGridSelected?.souraNb}&nbsp;] </p>
                <p className='text-center inline-flex'>&nbsp; Grid :[&nbsp;{stageGridSelected?.grid}&nbsp;]</p>
                <p className='text-center inline-flex' > &nbsp; Nb of Grids:  [&nbsp;{stageGridSelected?.group ? stageGridSelected?.group : 
               typeof stageGridSelected?.stageId != 'undefined' &&  stageGridSelected?.stageId.split('-')[2]}] </p>
            </div>
        <div className="flex-col  justify-start items-center  gap-3 text-center font-sans  " >
        <div className="flex justify-evenly items-center gap-1 ">
            <div className={cn(firstStateContext && 'shadow-lg shadow-emerald-300', ' my-2 CENTER')}>
                <SpaceButton handlePress={() => firstHandler()} title='First Grid' />
            </div>
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
            <SpaceButton handlePress={nextStepHandler} title='Next Step' />
            <SpaceButton handlePress={sprintHandler} title='Sprint ready' />
        </div>
        <div className="flex justify-evenly items-center gap-1 flex-wrap ">
          
          <div className="flex  justify-between items-center p-2  border border-green-300 rounded-md text-center font-sans " >
            <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
              type="checkbox"
              id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={stageHideNbContext} onChange={() => stageHideNbHandler()} />
            <label className='px-2' htmlFor='HIDE_NB'  >Hide nb</label>
          </div>
          <div className="flex  justify-center items-center p-2 border border-green-300 rounded-md text-center font-sans " >
            <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
              type="checkbox"
              id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' checked={stageValidContext} onChange={() => stageValidHandler()} />
            <label className='px-2' htmlFor='HIDE_NB' >valid</label>
          </div>
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
          
            <div className="flex justify-start items-center mt-1 p-3  ">
           
            <p className='text-center'>reordered suits &nbsp;{typeof reorderedAyahs != 'undefined'&& reorderedAyahs[0] != -1 && reorderedAyahs.map((e: number) => `[${e}]`).join(', ')}</p>
            </div>
            
            <div className="flex justify-between items-center mt-1 p-3  ">
            
            <div className="flex justify-center items-center  ">
              <p className={cn(errorNbContext < 1 ? 'text-green-500 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>errors &nbsp;
                </p>
                <p className={cn(errorNbContext < 1 ? 'text-blue-500 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>
                    {errorNbContext}
                </p>
              </div>

            <div className="flex justify-center items-center  ">
                <p className=' text-center text-emerald-500'>Step Index &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    {stepIndexContext + 1}/ {stageGridsContext.length}
                </p>
            </div>
            <div className="flex justify-center items-center  ">

                <p className=' text-center text-emerald-500'> Ayahs &nbsp;
                </p>
                <p className=' text-center text-blue-500'>
                    From {getMin()} To  {getMax()}
                </p>
            </div>
          </div>
      </div>

      {stageGridSelected && stageEvalContext === EVAL_STATE.EVAL ?
        <div className="flex flex-col justify-start  items-stretch w-full   ">
          <div className=" -order-last md:order-first flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div>
          <div className=" flex justify-stretch w-full flex-1 items-start m-1">
            <EvalSuits  />
          </div> </div> :
        stageEvalContext === EVAL_STATE.ORDER ?
          <EvalDragOrderBoardComp />
          : stageEvalContext === EVAL_STATE.CLICK && <EvalClickBoardComp
          />}
    </div>
  )
}

export default StageBoard