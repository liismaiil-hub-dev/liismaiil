import { groupBy } from 'lodash';
'use server'
import { GuestType, LIISMAIIL_STATUS_ENUM } from "@/app/api/graphql/profile/profile.types";
//import { db } from "@/db/db";
import { getGuestFromTokenPrisma } from '@/lib/authTools';
import prisma from "@/lib/prisma-db";
import 'server-only';

import { COOKIE_NAME } from '@/store/constants/constants';
import { cookies } from 'next/headers';
import { memoize } from "nextjs-better-unstable-cache";
import { cache } from 'react';

// caching per cookies request 

export const getCurrentGuest = cache(async () => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) return null
  console.log({ tokenCoukies: token.value });

  const guest = await getGuestFromTokenPrisma(parseInt(token.value))
  if (!guest) return null
  console.log({ guest });
  return guest as GuestType
})

export const getHostsForDashboard = memoize(async () => {

  const guests = await prisma.guest.findMany({
    where: { status: LIISMAIIL_STATUS_ENUM.HOST }
  })
  return guests;
}, {
  persist: true,
  revalidateTags: ['dashboard:guests'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'dashboard: guests'
})

export const getOwnStagesForDashboard = memoize(async (tokenId: number) => {

  const stages = await prisma.stage.findMany({
    where:{
      guests:{some:{
        tokenId
      }}
    },
    orderBy: {souraNb:'asc'}
  })
  return stages;
}, {
  persist: true,
  revalidateTags: ['dashboard:stages'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'dashboard: stages'
})

// sprints for Guest
export const getOwnSprintsForDashboard = memoize(async (tokenId: number) => {

  const sprints = await prisma.sprint.findMany({

    orderBy: { souraNb: 'asc' },
    where: {
      guests: {
        some: { tokenId }
      }
    }
  })
  return sprints;
}, {
  persist: true,
  revalidateTags: (tokenId) => [`${tokenId}dashboard:sprints`],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: `dashboard:sprints`,
})


