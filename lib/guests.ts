'use server'
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import { db } from "@/db/db";
import { guests, stages } from "@/db/schema";
import { getGuestFromToken } from '@/lib/authTools';
import 'server-only';

import { COOKIE_NAME } from '@/store/constants/constants';
import { eq, sql } from "drizzle-orm";
import { cookies } from 'next/headers';
import { memoize } from "nextjs-better-unstable-cache";
import { cache } from 'react';

// caching per cookies request 

export const getCurrentGuest = cache(async () => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) return null
  console.log({ tokenCoukies: token.value });

  const guest = await getGuestFromToken(token.value)
  if (!guest) return null
  console.log({ guest });


  return guest as GuestType
})

export const getGuestsForDashboard = memoize(async (tokenId: number) => {

  const counts = await db.select({ totalAttendees: sql`count(distinct ${tokenId}) ` }).from(guests).leftJoin(stages, eq(stages.guestId, guests.tokenId)).groupBy(stages.id).execute();
  return counts;
}, {
  persist: true,
  revalidateTags: (tokenId) => ['dashboard:guests'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'dashboard: guests'
})

export const getStagesForDashboard = memoize(async (tokenId: number) => {

  const counts = await db.select({ totalAttendees: sql`count(distinct ${tokenId}) ` }).from(stages).leftJoin(guests, eq(stages.guestId, guests.tokenId)).where(eq(stages.createdById, tokenId)).groupBy(stages.id).execute();
  return counts;
}, {
  persist: true
})



export const getSprintsForDashboard = memoize(async (tokenId) => {

  const counts = await db.select({ totalAttendees: sql`count(distinct ${tokenId}) ` }).from(stages).leftJoin(guests, eq(stages.guestId, guests.tokenId)).where(eq(stages.createdById, tokenId)).groupBy(stages.id).execute();
  return counts;
}, {
  persist: true
})
