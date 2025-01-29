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
import { cn } from '@/lib/cn-utility'
import * as d3 from "d3";
import StagesSprintableComponent from './StagesSprintable';
import StagesRehearsalComponent from './StagesRehearsal';
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
  
  return ( <div className=" flex-col justify-start space-y-2 h-full p-2 items-stretchw-full ">
      <div className="flex-col overflow-y-scroll p-2 justify-start h-1/2 items-stretch  gap-2  text-center font-sans">

    <StagesSprintableComponent />
      
    </div>
    <div className="flex-col p-2 justify-start overflow-y-scroll  h-1/2 items-stretch  gap-2  text-center 
    font-sans">
      <StagesRehearsalComponent />
      </div>

      </div>

  )
}
export default StateOpenBoard