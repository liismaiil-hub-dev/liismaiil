import { redirect } from "next/navigation";
import StateOpenBoard from "@/components/stage/StateOpenBoard";
import SprintOpenBoard from "@/components/stage/SprintOpenBoard";
import { getAllStageIdsForSprints, getStageForSprint } from "@/actions/stage";
import {getSprintGuests} from "@/actions/sprint";

import EvalSprintOrdered from "@/components/stage/EvalSprintOrdered";
import EvalSprintOrderedFace from "@/components/stage/EvalSprintOrderedFace";
import { toast } from "react-toastify";
import SpaceButton from "@/components/insight/SpaceButton";
import { Radio, RadioGroup } from "@heroui/radio";
import OpenBoardSprint from "@/components/stage/OpenBoardSprint";
/* 
export async function generateStaticParams() {
  try {
    
  const sprintIds = await getAllStageIdsForSprints()
  console.log({sprintIds});
  
  if(typeof sprintIds !=='undefined' && sprintIds && sprintIds.length > 0){
    return sprintIds.map((sprintId: string) => ({
      stageId: sprintId
    }))
  }
  } catch (error) {
   console.log({error});
   //redirect('/stages')

  }
} */
export default async function GuestStagePage({params}: {
  params: Promise<{ stageId: string }>
} ) {
  
  const stageId =  (await params).stageId;
    
  
  try {
    /* let currentGuest = await getGuestFromCookies();
    */
   const resp = await getStageForSprint(stageId)
   console.log({resp});
   if(resp && resp.success){
      return (<div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
     <OpenBoardSprint  />
      
</div>)}   
} catch (error) {
 // toast.error(`the error ${error} occured` )
console.log({_err : JSON.stringify(error)});

//  redirect('/stages')
}
  
}

