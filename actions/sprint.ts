'use server'
import { prisma } from '@/lib/prisma-db';
import { sprints } from '@/db/schema'
import { delay } from '@/lib/delay'
import { getCurrentGuest } from '@/lib/guests'

import { revalidateTag } from 'next/cache'

export const createNewStage = async () => {
  await delay(1000)
  const stage = await prisma.stage.create


  await db.insert(sprints).values({
    startOn: new Date().toUTCString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ' '),
  })

  revalidateTag('events')
  revalidateTag('dashboard:events')
}
 