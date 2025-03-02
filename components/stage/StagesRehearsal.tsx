'use client'

import {  StagePrismaType, StagesSprintType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import { Button, } from "@heroui/button";
import {ScrollShadow } from "@heroui/scroll-shadow";

import { useEffect, useState, useTransition } from "react";

import {deleteSprint, setSprintSession} from "@/actions/sprint";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { cn } from "@/lib/cn-utility";
//             _____COMPONENT_____________

const StagesRehearsal = ( ) => {
  const dispatch = useDispatch()
  const route =  useRouter()
  const [isPending, startTransition] = useTransition();
  const {categoryContext, catStages, stageSprintSelected } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageSprintSelected  } = stageActions
  
 const selectRehearsalHandler =(grid:StagesSprintType ) =>{
  try {
    
    dispatch(setStageSprintSelected({ stage: grid}))
} catch (error) {
    console.log(error);
  }
 }
 
  return (
      <ScrollShadow >
        {typeof catStages !== 'undefined' && catStages && catStages.length > 0 &&
          <section className="flex flex-col justify-start items-stretch text-blue-800 space-y-1 h-full border-1 border-green-200 shadow-sm overflow-scroll  ">
            <div className="flex justify-center items-center bg-orange-200/90 rounded-sm w-full ">  
            &nbsp; {categoryContext} Stages &nbsp; </div>
          <div   className="grid grid-cols-3 gap-2 p-2 w-full flex-wrap ">
            {catStages && catStages?.map((grid: StagesSprintType, index: number) => {
              console.log({grid, stageSprintSelected});
              
           return( grid.arabName && grid.grid !== -1 && <div key={`${grid.stageId}_${index}`} className="flex items-center justify-center rounded-md col-span-1 ">
             <Button className={cn(stageSprintSelected.stageId === grid.stageId ? `bg-orange-400/80`:'bg-emerald-300/80 '," text-center text-pretty text-sm rounded-md w-full")} 
             onPress={() => { selectRehearsalHandler(grid); } } 
             key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex-col justify-start  text-center">
                <div className="flex justify-center  text-center">
      
                  {` ${grid.souraName}`}
                </div>
                <div className="flex justify-center  text-center">
            {` ${grid.stageId}`}
          </div>
            </div>
              </Button>
              </div>
            )})
            }</div>
</section>}
       </ScrollShadow>
    )
}

export default StagesRehearsal