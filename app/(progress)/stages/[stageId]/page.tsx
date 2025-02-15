
import {  getStageForSprint } from "@/actions/stage";
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
   //console.log({resp});
   if(resp && resp.success){
      return (<div className={`flex-col h-full  rounded-md  justify-start p-1  items-stretch w-full`} >
     <OpenBoardSprint stage={resp.stage}  />
      
</div>)}   
} catch (error) {
 // toast.error(`the error ${error} occured` )
console.log({_err : JSON.stringify(error)});

//  redirect('/stages')
}
  
}

