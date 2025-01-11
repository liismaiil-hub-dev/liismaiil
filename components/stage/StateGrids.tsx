'use client'

import {  StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import { Button, ScrollShadow } from "@nextui-org/react";
import { useEffect, useTransition } from "react";

import {deleteSprint, setSprintSession} from "@/actions/sprint";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
//             _____COMPONENT_____________

const StateGrids = ( ) => {
  const dispatch = useDispatch()
  const route =  useRouter()
  const [isPending, startTransition] = useTransition();
  const {categoryContext, catStages, stageGridSelected } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageGridSelected  } = stageActions
  
 const selectGridHandler =(grid:StagePrismaType ) =>{
  try {
    dispatch(setStageGridSelected({ stage: grid}))
/* const gridNb = grid.stageId.split('-')[1];
console.log({gridNb, url :`/stages/${stageGridSelected.stageId}`});

if(parseInt(gridNb) === 5) {
route.push(`/stages/${stageGridSelected.stageId}`)
  
  }else {
    toast.info(`stage ${grid.stageId} can not be sprintable`)
  } */
} catch (error) {
    console.log(error);
  }
 }

 const deleteGridHandler = async (grid:StagePrismaType ) =>{
  try {
    startTransition(async()=> {
      console.log({stageId: grid.stageId});
      
     const res =  await deleteSprint(`${grid.stageId}_${guestPrisma.tokenId}`, grid.stageId) 
    if(res.success) {
      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
    } )
    // dispatch(setStageGridSelected({ stage: grid}))
  } catch (error) {
    console.log(error);
  }
 }

  return (
      <ScrollShadow >
        {typeof catStages !== 'undefined' && catStages && catStages.length > 0 &&
          <section className="flex flex-col justify-start items-stretch text-blue-800 space-y-1 h-full border-1 border-green-200 shadow-sm overflow-x-scroll  ">
            <div className="flex justify-center items-center bg-orange-200/90 rounded-sm w-full ">  &nbsp; {categoryContext} &nbsp; </div>
          <div   className="grid grid-cols-3 gap-2 p-2 w-full flex-wrap ">
            {catStages?.map((grid: StagePrismaType, index: number) => {
//console.log({ grid });
              return( <div key={`${grid.stageId}_${index}`} className="flex items-center justify-center rounded-md col-span-1 ">
              <Button className=" text-center bg-emerald-300/80 text-pretty w-full" onClick={() => { selectGridHandler(grid); } } key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.stageId}`}
                </div>
              </Button>
              </div>)})}
                  </div>

                {/* 
              <Button className="text-center bg-emerald-300/80 text-pretty w-full" onClick={() => { sprintHandler(grid); } } key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                  <div className="flex justify-center  text-center">
                  Ready {`${guestPrisma.tokenId}`}
                  </div>
                </Button>                 
                <div   className="flex items-center justify-center col-span-1 rounded-md w-full  ">
              <Button className="text-center bg-emerald-300/80 text-pretty w-full" onClick={() => { deleteGridHandler(grid); } } key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                  <div className="flex justify-center  text-center">
                  Delete {`${guestPrisma.tokenId}`}
                  </div>
                </Button>                 
                </div> */}
                
          </section>}
       </ScrollShadow>
    )
}

export default StateGrids