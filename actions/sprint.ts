'use server'
import { GuestPrismaType } from '@/app/api/graphql/stage/stage.types';
import prisma from '@/lib/prisma-db';
import { PrismaClientKnownRequestError } from "@prisma/client";

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
    const _stage = await prisma.stage.findUnique({ where: { stageId } })
    const _guest: GuestPrismaType = await prisma.guest.findUnique({ where: { tokenId } });
    if (_stage && _guest) {

      await prisma.guestStage.create({
        data: {
          stageId,
          tokenId,
        }
      })
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
    }

  } catch (error: PrismaClientKnownRequestError) {

    console.log({ ErrorCode: error.code, sprintActionError: error });
    throw error
  }
  revalidateTag('stages')
  revalidateTag('dashboard:stages')
}
