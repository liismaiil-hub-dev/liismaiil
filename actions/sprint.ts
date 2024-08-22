'use server'

import { db } from '@/db/db'
import { sprints } from '@/db/schema'
import { delay } from '@/lib/delay'
import { getCurrentGuest } from '@/lib/guests'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'

export const createNewSprint = async () => {
  await delay(1000)
  const user = await getCurrentGuest()

  await db.insert(sprints).values({
    startOn: new Date().toUTCString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ' '),
  })

  revalidateTag('events')
  revalidateTag('dashboard:events')
}
 