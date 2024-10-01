'use server'
import { GuestPrismaType } from '@/app/api/graphql/stage/stage.types';
import prisma from '@/lib/prisma-db';
import moment from 'moment';
import { memoize } from "nextjs-better-unstable-cache";

import { revalidateTag } from 'next/cache';
export const getStages = memoize(async (tokenId: number): Promise<{ success: boolean, stages: [] } | undefined | null> => {
  console.log({ tokenId });
  const _stagesRel = await prisma.guestStage.findMany({
    where: { tokenId }, include: {
      stage: true,
    }
  });
  //console.log({ _stagesRel });
  try {
    if (_stagesRel && _stagesRel.length > 0) {

      return { success: true, stages: _stagesRel }

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
}, {
  persist: true,
  revalidateTags: () => ['stages', 'sprints'],
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'stages'
}
)

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

  } catch (error: unknown) {

    console.log({ ErrorCode: error?.code, sprintActionError: error });
    throw error
  }
  revalidateTag('stages')
}
export const createNewSprint = async ({
  sprintId,
  stageId,
  tokenId,
  createdById,
}: {
  sprintId: string,
  tokenId: number,
  createdById: string
  stageId: string
}) => {
  //const _guest = getCurrentGuest()
  console.log({
    sprintId,
    createdById,
    stageId,
    tokenId
  });
  try {
    const _sprint = await prisma.sprint.findUnique({ where: { sprintId } })
    if (_sprint) {
      await prisma.guestSprint.create({
        data: {
          sprintId,
          tokenId,
          addedAt: new Date().toISOString(),
        }
      })
      revalidateTag('sprints')
      revalidateTag('stages')

      return { success: true, message: JSON.stringify(_sprint) }

    } else {
      const _sprint = await prisma.sprint.create({
        data: {
          stageId,
          createdAt: new Date().toISOString(),
          startOn: new Date().toISOString(),
          finishOn: moment().add(1, 'months').toISOString(),
          published: true,
          sprintId,
          createdById,
        }
      })
      await prisma.guestSprint.create({
        data: {
          sprintId,
          tokenId,
          addedAt: new Date().toISOString(),
        }
      })
      revalidateTag('sprints')
      revalidateTag('stages')
      return { success: true, message: JSON.stringify(_sprint) }
    }

  } catch (error) {

    console.log({ ErrorCode: error.code, sprintActionError: error });
    throw error
  }
  revalidateTag('sprints')
}
