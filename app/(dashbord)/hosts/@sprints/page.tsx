

import { SprintPrismaType } from "@/api/graphql/stage/stage.types";

import Sprints from "@/components/space/Sprints";
import prisma from '@/lib/prisma-db';


import { Button } from '@nextui-org/react';

const getSprints = async (): Promise<SprintPrismaType[] | undefined> => {
  try {

    'use server'
    const sprints = await prisma.sprint.findMany({})
    return sprints


  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
}

export default async function Sprint() {
  const sprints = await getSprints()
  console.log({ sprints });

  if (typeof sprints != 'undefined' && sprints?.length > 0) return <Sprints sprints={sprints} />
  return (
    <Button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-xl p-2 h-full
              rounded-md'>
      No sprint projected
    </Button>)
}
