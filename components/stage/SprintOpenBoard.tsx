'use client'
import { Ayah, AyahPrismaType, GuestPrismaType, SprintGuest, StagePrismaType } from '@/app/api/graphql/stage/stage.types';
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
import { cn } from '@/lib/cn-utility'
import { createNewSprint } from '@/actions/sprint';
import {EVAL_STATE} from "@/api/graphql/stage/stage.types";



const randomAyahsHidden = (nb: number) =>{
  let _hidenAys = [];
  for (let i = 0; i < nb; i++) {
    const randomNumber = Math.ceil(Math.random() * 25);
    _hidenAys.push(randomNumber)
  }
 
  return _hidenAys;
}
const SprintOpenBoard = ({stage, guests}: {stage: StagePrismaType, guests:SprintGuest[]} ) => {
  const dispatch = useDispatch()
  console.log({guests});
  
  const { stageEvalContext, validContext, stageReorderedAyahsContext,  stageEvalIndexContext, stageHideNbContext, errorNbContext,
    stageShuffeledFirstAyahsContext, stageValidContext,  stageShuffeledAyahsContext, sprintRandomHidden  } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setSprintGuests, setSprintRandomHiddenContext, setStageOrderedAyahsContext, setStageShuffeledFirstAyahsContext, setStageHideNbContext, setStageGridsContext,  setStageShuffeledAyahsContext, setStageGridSelected ,
     setStageValidContext, setStepIndexContext, setFirstStateContext,setStageReorderedAyahsContext, setErrorNbContext } = stageActions
     
  useEffect(() => {
  dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]}))
   const _shuffeleledFirst = JSON.parse(stage?.ayahs).map((ordG: Ayah, index: number) => ({ ...ordG, index }));
   console.log({ _shuffeleledFirst });

   const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index }))
   console.log({ _orderedAy });
   setGridIndex(stage.stageId.split('-')[stage.stageId.split('-').length - 1 ])
   dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
   dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
  } , []);
  const [gridIndex, setGridIndex] = useState('0');
      
  function shuffleHandler() {
      dispatch(setFirstStateContext({first: false}))
      const shuffeledAy = _.shuffle(stageShuffeledFirstAyahsContext)
      console.log({ shuffeledAy });

      dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
  }/* 
  function firstHandler() {
      dispatch(setFirstStateContext({first: true}))
      dispatch(setErrorNbContext({errorNb:0}))
      dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]}))
      
      dispatch(setStageShuffeledFirstAyahsContext({ ayahs: stageShuffeledFirstAyahsContext }))

  }
  */
  useEffect(() => {
      console.log({ stageReorderedAyahsContext });

  }, [stageReorderedAyahsContext]);

  useEffect(() => {
      console.log(stageShuffeledAyahsContext);

  }, [stageShuffeledAyahsContext]);

 
  function getMax() {
      if (stage && JSON.parse(stage.ayahs).length > 0 && JSON.parse(stage.ayahs)[0].numberInSurah !== -1 ) {
          const _numbers =  JSON.parse(stage.ayahs).map((e: Ayah)=> e.numberInSurah)
        return  _.max(_numbers) as string
      
        }else return ''
  }
  function getMin() {
  //    console.log({ stageOrderedAyahsContext, stepIndexContext });
  if (stage && JSON.parse(stage.ayahs).length > 0 && JSON.parse(stage.ayahs)[0].numberInSurah !== -1 ) {
    const _numbers =  JSON.parse(stage.ayahs).map((e: Ayah)=> e.numberInSurah)
  return  _.min(_numbers) as string
  }else return ''
  }


  function sprintHandler() {
      console.log({ stageReorderedAyahsContext, stageShuffeledFirstAyahsContext });
      try {

          if (stageReorderedAyahsContext.length === stageShuffeledFirstAyahsContext.length) {
              createNewSprint({
                  sprintId: `${stage.stageId}_${guestPrisma.tokenId}`,
                  createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                  stageId: stage.stageId,
                  tokenId:guestPrisma.tokenId,
              }
              )
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
  function sprintHideRandomNHandler() {
    const _randHidden = randomAyahsHidden(5)

    dispatch(setSprintRandomHiddenContext({ randomHidden: _randHidden }))
  }
  function shuffelHandler() {
    console.log({ stageShuffeledFirstAyahsContext });

    dispatch(setStageShuffeledFirstAyahsContext({ ayahs: _.shuffle(stageShuffeledFirstAyahsContext) }))
  }
  function stageValidHandler() {
    dispatch(setStageValidContext({ validCtxt: !stageValidContext }))
    sprintHideRandomNHandler()
    // setEvalIndex((prev) => prev + 1)
  }
  
  useEffect(() => {
 
    console.log({ stageHideNbContext, stageEvalContext, stageEvalIndexContext,  stageValidContext, stageReorderedAyahsContext });
  }, [stageHideNbContext, stageEvalIndexContext, stageValidContext, stageEvalContext,  stageReorderedAyahsContext]);


  return (
    <div className=" flex-col justify-start space-y-2 h-full py-2 items-center w-full  ">
      <div className="flex-col   justify-start  items-stretch  gap-3 flex-wrap  ">
      <div className='justify-center items-center text-center inline-flex '>StageId &nbsp; : {stage?.stageId}</div>
      
      <div className="flex justify-center items-center mt-2 p-3  ">
                <p className='text-center inline-flex '>Soura &nbsp;: [&nbsp;{stage?.arabName ? stage?.arabName : stage?.souraName}&nbsp;]&nbsp;</p>
                <p className='text-center inline-flex '>&nbsp; Nb : [&nbsp;{stage?.souraNb}&nbsp;] </p>
                <p className='text-center inline-flex'>&nbsp; Grid :[&nbsp;{stage?.grid}&nbsp;]</p>
                <p className='text-center inline-flex' > &nbsp; Nb of Grids:  [&nbsp;{stage?.group ?
                 stage?.group : stage?.stageId.split('-')[2]}] </p>
            </div>
        <div className="flex-col  justify-start items-center  gap-3 text-center font-sans  " >
        <div className="flex justify-evenly items-center gap-1 ">
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
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
              type="checkbox"id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' checked={stageValidContext} onChange={() => stageValidHandler()} />
            <label className='px-2' htmlFor='VALID_CTXT' >valid</label>
          </div>
            <div className="CENTER border border-green-300 rounded-md  p-2 text-center font-sans " >
               <RadioButtonEvalState
                evalState={EVAL_STATE.DISCOVER} title='Discover Board' />
            </div>
            <div className="CENTER  border border-blue-300 rounded-md p-2 text-center font-sans " >
              <RadioButtonEvalState
                evalState={EVAL_STATE.DRAGDROP} title='Drag & Drop' />
            </div>
           
          </div>
          </div>
          
            <div className="flex justify-start items-center mt-1 p-3  ">
           
            <p className='text-center'>reordered suits &nbsp;{typeof stageReorderedAyahsContext != 'undefined'&& stageReorderedAyahsContext[0] != -1 && stageReorderedAyahsContext.map((e: number) => `[${e}]`).join(', ')}</p>
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
                <p className=' text-center text-emerald-500'>Grid Index &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    {gridIndex}
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

      {stage && stageEvalContext === EVAL_STATE.DISCOVER ?
        <div className="flex flex-col justify-start  items-stretch w-full   ">
          {/* <div className=" -order-last md:order-first flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div> */}
          <div className=" flex justify-stretch w-full flex-1 items-start m-1">
            <EvalSuits  />
          </div> </div> :
        stageEvalContext === EVAL_STATE.DRAGDROP &&
          <EvalDragOrderBoardComp />
         // : stageEvalContext === EVAL_STATE.CLICK && <EvalClickBoardComp/>
          }
    </div>
  )
}
export default SprintOpenBoard