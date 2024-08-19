import { db } from '@/db/db'
import { sprints } from '@/db/schema'
import { and, asc, eq } from 'drizzle-orm'
import { memoize } from 'nextjs-better-unstable-cache'
import 'server-only'
import { delay } from '../utils/delay'

export const getSprintsForDashboard = memoize(
  async (tokenId: number) => {
    await delay()

    const data = await db.query.sprints.findMany({
      where: eq(sprints.createdById, tokenId),
      columns: {
        sprintId: true,
        createdAt: true,
        souraName: true,
        souraNb: true,
        grid: true,
        startOn: true,
        createdById: true,
        attendeeId: true,
        rsvpId: true,
        country: true,
        status: true,
      },
      with: {
        rsvps: true,
      },
      limit: 5,
      orderBy: [asc(sprints.startOn)],
    })

    return data ?? []
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:events'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'dashboard:events',
  }
)

export const getAllSprints = memoize(
  async (tokenId: number) => {
    // await delay()
    return db.query.sprints.findMany({
      where: eq(sprints.attendeeId, tokenId),
      orderBy: [asc(sprints.startOn)],
    })
  },
  {
    persist: true,
    revalidateTags: () => ['events'],
    suppressWarnings: true,
    logid: 'events',
  }
)

export const getOneSprint = memoize(
  async (tokenId: number, sprintId: number) => {
    await delay()
    return db.query.sprints.findFirst({
      where: and(eq(sprints.createdById, tokenId), eq(sprints.sprintId, sprintId)),
    })
  },
  {
    persist: true,
    revalidateTags: (tokenId, sprintId) => ['sprint', sprintId],
    suppressWarnings: true,
    logid: 'sprint',
  }
)
