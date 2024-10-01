'use server'
import Stages from "@/components/space/Stages";


export default async function Stage() {
  return (<div id="stage" className="flex flex-col justify-start items-center  md:w-full mt-10  h-full " >
    <Stages />
  </div >
  )
}

