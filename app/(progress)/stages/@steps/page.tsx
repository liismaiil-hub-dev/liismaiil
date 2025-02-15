import {  getAllStagesIdsNbName } from "@/actions/stage";
import StageSteps from "@/components/stage/StageSteps";

export default async function StepsNav() {
  try {
      const stages = await getAllStagesIdsNbName() //(parseInt(_ImGuest?.tokenId!))
      console.log({stagesSteps: stages });
      if (typeof stages !== 'undefined' && stages ) {
       //h-[calc(100vh-7rem)]
        return (
          <div className="flex flex-col justify-start items-stretch    w-full h-full  " >
            <StageSteps  stages={stages} />
            {/* <SprintsComponent /> */}
          </div>
        )}
  } catch (error) {
   console.log({error});
  return null
   
  }

}