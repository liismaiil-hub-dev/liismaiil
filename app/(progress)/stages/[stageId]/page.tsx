
import { redirect } from "next/navigation";
import StateOpenBoard from "@/components/stage/StateOpenBoard";
import SprintOpenBoard from "@/components/stage/SprintOpenBoard";
import { StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { getAllStageIdsForSprints, getStageForSprint } from "@/actions/stage";
import EvalSprintOrdered from "@/components/stage/EvalSprintOrdered";
import EvalSprintOrderedFace from "@/components/stage/EvalSprintOrderedFace";
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
   const _stage = await getStageForSprint(stageId)
   console.log({_stage});
   
    return (<div className="grid grid-cols-4">
      <div className="flex-col justify-center items-center col-span-1 h-full overflow-x-scroll">
      <EvalSprintOrderedFace  guest={false} />
      </div>
      <div className="flex justify-center items-center col-span-2 px-3 h-full  overflow-x-scroll"> 
      <SprintOpenBoard stage={_stage.stage} />
       </div>
       <div className="flex-col justify-center items-center col-span-1 h-full overflow-x-scroll">
      <EvalSprintOrdered guest={true} />
      </div>
       </div>
        )
    
} catch (error) {
  redirect('/stages')
}
  
}

