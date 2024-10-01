'use server'
import { GuestType, LIISMAIIL_STATUS_ENUM } from '@/app/api/graphql/profile/profile.types';
import prisma from "@/lib/prisma-db";
import { COOKIE_NAME } from '@/store/constants/constants';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { memoize } from "nextjs-better-unstable-cache";
const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!



export const getGuestFromCookies = memoize(async (): Promise<GuestType | undefined | null> => {
  try {
    const token = await cookies().get(COOKIE_NAME)
    if (typeof token !== 'undefined') {
      const _guest = jwt.verify(token.value, SECRET)
      //    console.log({ _guest });
      return _guest as GuestType
    }
    return null
  } catch (e) {
    console.error(e)
    return null
    //redirect(`/liismaiil/${slug(data.host)}`)
  }
}, {
  persist: true,
  revalidateTags: () => ['stages', 'sprints'],
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'getGuest'
}
)


export const getGuestFromTokenPrisma = async (token: number) => {
  try {
    console.log({ tokenGetGuestFromToken: token });
    const _guest = await prisma.guest.findFirst({ where: { tokenId: token } })
    try {
      if (_guest) {
        // const randomFlag = _.random(FLAG_FILES.length)

        const { tokenId, collaboratorId, host,flag } = _guest
        if (typeof tokenId === 'undefined' || tokenId === 0) {
          return null
        } else {
          return ({ collaboratorId, flag , host, tokenId, status: LIISMAIIL_STATUS_ENUM.GUEST });
        }
      } else {
        return null
      }

    } catch (error) {
      console.log({ error });
      return null
    }

  } catch (error) {
    console.log({ error });
    return null
  }
}