'use client'

import {  StagePrismaType, StagesSprintType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import { Button, ScrollShadow } from "@nextui-org/react";
import { useEffect, useState, useTransition } from "react";

import {deleteSprint, setSprintSession} from "@/actions/sprint";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import _ from "lodash";
//             _____COMPONENT_____________

const StagesRehearsal = ( ) => {
  const dispatch = useDispatch()
  const route =  useRouter()
  const [isPending, startTransition] = useTransition();
  const {categoryContext, catStages, stageGridSelected } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageSprintSelected  } = stageActions
  
 const selectRehearsalHandler =(grid:StagesSprintType ) =>{
  try {
    
    dispatch(setStageSprintSelected({ stage: grid}))
} catch (error) {
    console.log(error);
  }
 }
 const [rehearsalStages, setRehearsalStages] = useState(() => _.filter(catStages , (spr:StagesSprintType)  => spr.grid != 5 ));
 
   
 useEffect(() => {
   const _rehearsal = _.filter(catStages , (spr:StagesSprintType)  => spr.grid != 5)
   setRehearsalStages(_rehearsal)
 }, [catStages]);
 
 
 
  return (
      <ScrollShadow >
        {typeof catStages !== 'undefined' && catStages && catStages.length > 0 &&
          <section className="flex flex-col justify-start items-stretch text-blue-800 space-y-1 h-full border-1 border-green-200 shadow-sm overflow-x-scroll  ">
            <div className="flex justify-center items-center bg-orange-200/90 rounded-sm w-full ">  &nbsp; {categoryContext} &nbsp; </div>
          <div   className="grid grid-cols-3 gap-2 p-2 w-full flex-wrap ">
            {rehearsalStages && rehearsalStages?.map((grid: StagesSprintType, index: number) => {
//console.log({ grid });
              return( <div key={`${grid.stageId}_${index}`} className="flex items-center justify-center rounded-md col-span-1 ">
              <Button className=" text-center bg-emerald-300/80 text-pretty w-full" onClick={() => { selectRehearsalHandler(grid); } } key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  
                  {`  ${grid.souraName}   :  ${grid.stageId}`}
                </div>
              </Button>
              </div>)})}
                  </div>

              
          </section>}
       </ScrollShadow>
    )
}

export default StagesRehearsal