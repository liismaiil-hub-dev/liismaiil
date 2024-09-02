'use server'
import { StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import Stages from "@/components/space/Stages";
import prisma from "@/lib/prisma-db";

const getStages = async (): Promise<StagePrismaType[] | undefined | any> => {
  'use server'
  const stages = await prisma.stage.findMany({})
  return stages
}

export default async function Stage() {
  const stages = await getStages()
  console.log({ stages });

  return (<div id="stage" className="flex flex-col justify-start items-center  md:w-full mt-10  h-full" >
    <Stages stages={stages} />
  </div >
  )
}

