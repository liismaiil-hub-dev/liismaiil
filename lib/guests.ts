'use server'
import { getGuestFromToken } from '@/lib/authTools'
import { COOKIE_NAME } from '@/store/constants/constants'
import { cookies } from 'next/headers'
import { cache } from 'react'
import {memoize} from "nextjs-better-unstable-cache";

import 'server-only'

export const getCurrentGuest = cache(async () => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) return null

  const guest = await getGuestFromToken(token)
  if (!guest) return null

  return guest
})


export const getGuestStages = cache(async (tokenId) => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) return null

  const guest = await getGuestFromToken(token)
  if (!guest) return null

  return guest
})


export const getGuestSprints = memoize(async (tokenId) => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) return null

  const guest = await getGuestFromToken(token)
  if (!guest) return null

  return guest
})
