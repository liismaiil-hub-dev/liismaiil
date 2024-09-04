'use server'
import { StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import Stages from "@/components/space/Stages";
import { getAllStagesForDashboard} from "@/lib/sprints";


export default async function Stage() {
  const stages = await getAllStagesForDashboard()
  console.log({ stages });

  return (<div id="stage" className="flex flex-col justify-start items-center  md:w-full mt-10  h-full" >
    <Stages  />
  </div >
  )
}

