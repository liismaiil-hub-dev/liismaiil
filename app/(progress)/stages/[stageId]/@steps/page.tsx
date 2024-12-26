
import GridsComponent from "@/components/stage/StageGrids";
import prisma from "@/api/lib/prisma-db";
import { redirect } from "next/navigation";
import { getHostsForDashboard } from "@/actions/host";
import { getAllStagesForDashboard } from "@/actions/stage";
import StageSteps from "@/components/stage/StageSteps";


async function getStages(tokenId: number) {
  console.log({ tokenId });
  const _stagesRel = await prisma.guest.findUniqueOrThrow({
    where: { tokenId },
    select: {
      stages: {
        select: { stage: true }
      }
    }
  });
  //console.log({ _stagesRel: _stagesRel.stages });
  try {

    if (_stagesRel && _stagesRel.stages.length > 0) {

      return {
        success: true,
        _stages: _stagesRel.stages
      }

    } else {
      return {
        success: false,
        _stages: []
      }
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }

}

export default async function StepsNav() {
  try {
      const stages = await getAllStagesForDashboard() //(parseInt(_ImGuest?.tokenId!))
      //console.log({stages});
      
      if (typeof stages !== 'undefined' && stages ) {
       // console.log({ stages });
       //h-[calc(100vh-7rem)]

        return (
          <div className="flex flex-col justify-start items-center     w-full h-full  " >
            <StageSteps stages={stages} />
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