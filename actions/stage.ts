'use server'
import prisma from '@/lib/prisma-db';
import { memoize } from "nextjs-better-unstable-cache";

import { revalidateTag } from 'next/cache';


export const getAllStagesForDashboard = memoize(async () => {

  const stages = await prisma.stage.groupBy({
    by: 'souraNb',
  })

  return stages;
}, {
  persist: true,
  revalidateTags: ['dashboard:stages'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'dashboard: stages'
})
export const createNewStage = async ({
  stageId,
  createdAt,
  souraName,
  souraNb,
  grid,
  startOn,
  createdById,
  ayahs,
  tokenId
}: {
  stageId: string,
  createdAt: string
  souraName: string,
  souraNb: number,
  tokenId: number,
  grid: number,
  startOn: string,
  createdById: string
  ayahs: string
}) => {
  //const _guest = getCurrentGuest()
  console.log({
    stageId,
    createdAt,
    souraName,
    souraNb,
    grid,
    startOn,
    createdById,
    ayahs,
    tokenId
  });
  try {
    const _stage = await prisma.guestStage.findFirst({ where: { stageId, tokenId } })
    if (_stage) {
      return { success: true, message: JSON.stringify(_stage) }

    } else {
      const _stage = await prisma.stage.create({
        data: {
          stageId,
          createdAt,
          souraName,
          souraNb,
          grid,
          startOn,
          createdById,
          ayahs,
        }
      })
      await prisma.guestStage.create({
        data: {
          stageId,
          tokenId,
        }
      })
      return { success: true, message: JSON.stringify(_stage) }

    }

  } catch (error: unknown) {
    return { success: false, message: JSON.stringify(error) }


    return
  }
  revalidateTag('stages')
}
