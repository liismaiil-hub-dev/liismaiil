'use server'
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import { db } from "@/db/db";
import { getGuestFromToken } from '@/lib/authTools';

import { COOKIE_NAME } from '@/store/constants/constants';
import { cookies } from 'next/headers';
import { memoize } from "nextjs-better-unstable-cache";
import { cache } from 'react';

import 'server-only';

export const getCurrentGuest = cache(async () => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) return null
  console.log({ token });

  const guest = await getGuestFromToken(token.value)
  if (!guest) return null
 const { credential} =  guest

  return JSON.parse(credential) as GuestType
})

export const getGuestsForDashboard = cache(async (tokenId) => {

  const counts = await db.select({ totalAttendees: sql`count(distinct ${tokenId}) ` }).from('guests').leftJoin(stages, eq(stages.guestId, guests.tokenId)).groupBy(stages.id).execute();
  return counts;
})

export const getStagesForDashboard = cache(async (tokenId) => {

  const counts = await db.select({ totalAttendees: sql`count(distinct ${tokenId}) ` }).from('stages').leftJoin(guests, eq(stages.guestId, guests.tokenId)).where(eq(stages.createdById, tokenId)).groupBy(stages.id).execute();
  return counts;
})



export const getSprintsForDashboard = memoize(async (tokenId) => {

  const counts = await db.select({ totalAttendees: sql`count(distinct ${tokenId}) ` }).from('stages').leftJoin(guests, eq(stages.guestId, guests.tokenId)).where(eq(stages.createdById, tokenId)).groupBy(stages.id).execute();
  return counts;
})
