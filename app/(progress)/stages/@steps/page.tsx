
import prisma from "@/api/lib/prisma-db";
import { redirect } from "next/navigation";
import { getHostsForDashboard } from "@/actions/host";
import { getAllStagesForDashboard } from "@/actions/stage";
import StageSteps from "@/components/stage/StageSteps";



export default async function StepsNav() {
  try {
      const stages = await getAllStagesForDashboard() //(parseInt(_ImGuest?.tokenId!))
      // console.log({stagesSteps: stages });
      if (typeof stages !== 'undefined' && stages ) {
       //h-[calc(100vh-7rem)]

        return (
          <div className="flex flex-col justify-start items-center     w-full h-full  " >
            <StageSteps  stages={stages} />
            {/* <SprintsComponent /> */}
          </div>
        )
      }
/*     }else {
      redirect('/')
    }
 */  } catch (error) {
   console.log({error});
  return null
   
  }

}