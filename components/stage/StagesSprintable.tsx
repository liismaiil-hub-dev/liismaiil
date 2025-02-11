'use client'

import {  StagePrismaType, StagesSprintType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import { Button, } from "@heroui/button";
import {ScrollShadow } from "@heroui/scroll-shadow";
import { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import _ from "lodash";
//             _____COMPONENT_____________

const StagesSprintable = ( ) => {
  const dispatch = useDispatch()
  const route =  useRouter()
  const [isPending, startTransition] = useTransition();
  const {categoryContext, catStages, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageSprintSelected  } = stageActions
  const [catSprints, setCatSprints] = useState(() => _.filter(catStages , (spr:StagesSprintType)  => spr.grid === 5));
  
useEffect(() => {
  const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.grid === 5)
  setCatSprints(_sprints)
}, [catStages]);


 const selectGridHandler =(grid:StagesSprintType ) =>{
  try {
    dispatch(setStageSprintSelected({ stage: grid}))
} catch (error) {
    console.log(error);
  }
 }
  return (
      <ScrollShadow >
        {typeof catSprints !== 'undefined' && catSprints && catSprints.length > 0 &&
          <section className="flex flex-col justify-start items-stretch text-blue-800 space-y-1 h-full border-1 border-green-200 shadow-sm overflow-x-scroll  ">
            <div className="flex justify-center items-center
             bg-orange-200/90 rounded-sm w-full ">  &nbsp; {categoryContext} Sprints &nbsp;  </div>
          <div   className="grid grid-cols-3 gap-2 p-2 w-full flex-wrap ">
            {catSprints?.map((grid: StagesSprintType, index: number) => {
//console.log({ grid });
              return( <div key={`${grid.stageId}_${index}`} className="flex items-center justify-center rounded-md col-span-1 ">
              <Button className=" text-center bg-emerald-300/80 text-pretty text-sm rounded-md w-full" 
              onPress={() => { selectGridHandler(grid); } 
              } 
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
              </div>)})}
                  </div>

                
          </section>}
       </ScrollShadow>
    )
}

export default StagesSprintable