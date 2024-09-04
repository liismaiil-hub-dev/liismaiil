'use server'
//import { db } from "@/db/db";
import prisma from "@/lib/prisma-db";
import 'server-only';

import { memoize } from "nextjs-better-unstable-cache";


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

export const getAllSprintsForDashboard = memoize(async () => {

  const sprints = await prisma.sprint.findMany({
    orderBy: { souraNb: 'asc' },
  })
  return sprints;
}, {
  persist: true,
  revalidateTags: [`dashboard:sprints`],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: `dashboard:sprints`,
})

export const getOneSprintById = memoize(
  async (sprintId: string) => {
    const sprints = await prisma.sprint.findFirst({
      where: { sprintId: { equals: sprintId } },
    })
    return sprints;
  },
  {
    persist: true,
    revalidateTags: (sprintId) => ['sprint', sprintId],
    suppressWarnings: true,
    logid: 'sprint',
  }
)
