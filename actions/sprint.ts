'use server'
import prisma from '@/lib/prisma-db';

import { revalidateTag } from 'next/cache';

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
    const stage = await prisma.stage.create({
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

  } catch (error) {
    throw error
  }



  revalidateTag('stages')
  revalidateTag('dashboard:stages')
}
