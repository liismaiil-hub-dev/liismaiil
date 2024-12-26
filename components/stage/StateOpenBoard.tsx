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
import * as d3 from "d3";
import StateGrids from './StateGrids';
import { useSearchParams } from 'next/navigation';

export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}
const StateOpenBoard = ( ) => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const stageId = searchParams.get('stageId');
  console.log({stageId});
  
  const { stageGridSelected, stageEvalContext,  stageEvalIndexContext, stageHideNbContext, categoryContext,
      stageValidContext, stepIndexContext,   stageOrderedAyahsContext, stageShuffeledAyahsContext, stageGridsContext,catStages } = useSelector((state: RootStateType) => state.stage)
      
   
  useEffect(() => {
    if (typeof stageGridSelected !== 'undefined' && stageGridSelected.ayahs != '' && typeof stageGridSelected.ayahs !== 'undefined') {
      console.log({ stageGridSelected });
      let nbOfAyahs: number[] = []
      stageGridsContext.forEach((grd:StagePrismaType) => {
        const grdArray = JSON.parse(grd.ayahs)
        nbOfAyahs.push(grdArray.map((ay:Ayah) =>ay.numberInSurah))
    });
    console.log(nbOfAyahs);
    }
  }, [stageGridSelected]);


  useEffect(() => {
    console.log({ stageHideNbContext, stageEvalContext, stageEvalIndexContext, stageGridSelected });
  }, [stageHideNbContext, stageEvalIndexContext, stageValidContext, stageEvalContext, stageGridSelected]);

  return ( <div className=" flex-col justify-start space-y-2 h-full py-2 items-center w-full ">
      { typeof catStages !== 'undefined' && catStages.length > 0 && categoryContext && typeof categoryContext !=='undefined' && 
      <><div className="flex justify-center items-center mt-2 p-3  ">
      <p className='text-center inline-flex '>Category &nbsp;: [&nbsp;{categoryContext}&nbsp;]&nbsp;</p>
    </div><div className="flex-col px-2 justify-start items-center  gap-3 space-y-2 text-center font-sans  ">
        <StateGrids />
      </div></>
}
      </div>

  )
}
export default StateOpenBoard