'use server'
import { getAllStagesForDashboard } from "@/actions/stage";
import Stages from "@/components/space/Stages";


export default async function Stage() {
  const stages = await getAllStagesForDashboard()
  console.log({ stages });

  return (<div id="stage" className="flex flex-col justify-start items-center  md:w-full mt-10  h-full" >
    <Stages />
  </div >
  )
}

