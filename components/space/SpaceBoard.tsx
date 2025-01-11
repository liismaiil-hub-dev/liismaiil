'use client'
import { Ayah, GridTypeData, GuestPrismaType } from '@/app/api/graphql/stage/stage.types';
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
import { getGridsByNb } from '@/actions/space';
import { toast } from 'react-toastify';

export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}
/**
 * Space board PRINCIPAL Component
 */

const SpaceBoard = () => {
  const dispatch = useDispatch()

  const { gridsContext, gridSelected, evalIndex, evalContext, hideNbContext,blurContext, spaceGridsSelected,spaceStageSelected,
    stagedContext, validContext, gridIndexContext, firstGridContext} = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setShuffeledFirstAyahsContext, setOrderedAyahsContext, setErrorNbContext, setSpaceStageAyahsContext ,
   setBlurContext, setStagedContext, setGridsContext, setHideNbContext, setGridIndexContext, setFirstGridContext, setGridsStaged } 
   = stageActions


  useEffect(() => {
    if (typeof spaceStageSelected !== 'undefined' && typeof spaceStageSelected.ayahs !== 'undefined' && 
      spaceStageSelected.ayahs  != '' ) {
      console.log({ grdSelected: spaceStageSelected.stageId });

//      const _grids: [[Ayah]] = gridSelected?.ayahs?.map((ay: string) => JSON.parse(ay) as [Ayah])
      // dispatch(setGridsContext({ grids: _grids }))
      dispatch(setGridIndexContext({ index: spaceStageSelected.stageId?.split('-')[3] as unknown as number })) 
      dispatch(setErrorNbContext({errorNb:0  }))

     // dispatch(setFirstGridContext({first:true}))
      dispatch(setGridsStaged({stageIds:['']}))
     // console.log({ currentGuest, guestPrisma });
    }
  }, []);
/* 
  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected.ayahs[0] != '' && typeof gridSelected.ayahs !== 'undefined') {
      console.log({ grdSelected: gridSelected?.ayahs[0] });
     
      const _grids:Ayah[][]|[[Ayah]] = gridSelected.ayahs?.map((ay: string) => JSON.parse(ay) as Ayah[])
      dispatch(setGridsContext({ grids: _grids }))
      dispatch(setGridIndexContext({ index: 0 }))
    }
  }, [gridSelected]);

  useEffect(() => {
    console.log({gridIndexContext, gridSelected, firstGridContext});
    
    if (typeof gridSelected !== 'undefined' && typeof gridSelected.ayahs !== 'undefined' && gridSelected.ayahs[0] != '' && 
      gridsContext.length > gridIndexContext) {
      const shuffeleledFirst = gridsContext[gridIndexContext].map((ordG: Ayah, index: number) => ({ ...ordG, index: gridIndexContext ? ordG.number! + gridIndexContext : ordG.number! }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext], ['numberInSurah'])].map((ordG: Ayah, index) => ({ ...ordG, index: gridIndexContext ? ordG.number! + gridIndexContext : ordG.number! }))
      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      dispatch(setFirstGridContext({first:true}))

    } else {
      const shuffeleledFirst = gridsContext[0].map((ordG: Ayah) => ({ ...ordG, index: gridIndexContext ? ordG.number! + gridIndexContext : ordG.number }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['numberInSurah'])].map((ordG: Ayah) => ({ ...ordG, index: gridIndexContext ? ordG.number! + gridIndexContext : ordG.number}))
      dispatch(setGridIndexContext({ index: 0 }))

      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))

      dispatch(setFirstGridContext({first:true}))
    }
  }, [gridIndexContext]);

  useEffect(() => {
    if (typeof gridSelected !== 'undefined' && gridSelected?.ayahs[0] != '' && typeof gridSelected.ayahs !== 'undefined') {
      const _grids = gridSelected.ayahs?.map((ay: string) => JSON.parse(ay))

      const shuffeleledFirst = gridsContext[gridIndexContext ?? 0]?.map((ordG: Ayah) => ({ ...ordG, index: gridIndexContext ? ordG.number! + gridIndexContext : ordG.number }));

      const orderedAy = [..._.sortBy(gridsContext[gridIndexContext ?? 0], ['numberInSurah'])].map((ordG: Ayah) => ({ ...ordG, index: gridIndexContext ? ordG.number! + gridIndexContext : ordG.number   }))

      dispatch(setShuffeledFirstAyahsContext({ ayahs: shuffeleledFirst }))

      dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
      dispatch(setFirstGridContext({first:true}))
    }
  }, [gridsContext]); */
/* const selectGridHandler = async (arg: number) => {
    try {
      const gridsByNb = await getGridsByNb(arg)
     
      if(typeof gridsByNb !== 'undefined' &&  gridsByNb.success){
      console.log({ grids: gridsByNb.grids });
       dispatch(setSpaceGrids({ grids: gridsByNb.grids }))
      }else {
      toast.warning('can not reach the grid server, please check your internet connexion')
    }
    } catch (error) {
      toast.error(`${error}`)
    }
} */
  async function nextSouraHandler() {
    if(gridSelected.souraNb !== -1 &&  gridSelected.souraNb < 114 ){
      console.log({souraNb:gridSelected.souraNb});

      await selectGridHandler(gridSelected.souraNb + 1)
   } else if(typeof spaceGridsSelected !== 'undefined' && spaceGridsSelected && spaceGridsSelected[0].souraNb !== -1 
     &&  spaceGridsSelected[0].souraNb   < 114 ){
      console.log({ fromSpaceGrid: spaceGridsSelected[0].souraNb});
       await selectGridHandler(spaceGridsSelected[0].souraNb  + 1)
      }  else {
      await selectGridHandler(1)
      } 
   // await selectGridHandler(gridSelected.souraNb + 1)
    
  }
  async function prevSouraHandler() {
    console.log({souraNb:gridSelected.souraNb, fromSpaceGrid: spaceGridsSelected[0].souraNb});
   if(gridSelected.souraNb !== -1 &&  gridSelected.souraNb >0 ){
    console.log({souraNb:gridSelected.souraNb});
     await selectGridHandler(gridSelected.souraNb - 1)
  } else if(typeof spaceGridsSelected !== 'undefined' && spaceGridsSelected && spaceGridsSelected[0].souraNb !== -1 
    &&  spaceGridsSelected[0].souraNb >0 ){
      console.log({ fromSpaceGrid: spaceGridsSelected[0].souraNb});
      await selectGridHandler(spaceGridsSelected[0].souraNb - 1)
      } else {
          await selectGridHandler(1)
    }
  }
  useEffect(() => {
    if(typeof spaceStageSelected != 'undefined' ){
   console.log({spaceStageSelected});
   
      dispatch(setSpaceStageAyahsContext({ayahs: JSON.parse(spaceStageSelected?.ayahs)}))
 } }, [spaceStageSelected]);
  

  function hideNbHandler() {
    dispatch(setHideNbContext({ hide: !hideNbContext }))
  }

  function blurHandler() {
    dispatch(setBlurContext({ blur: !blurContext }))
  }
  function stageContextHandler() {
    dispatch(setStagedContext({ stagedContext: !stagedContext }))
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

function setSpaceGrids(arg0: { grids: GridTypeData[]; }): any {
  throw new Error('Function not implemented.');
}
