import { revalidate } from './../app/page';
'use server'
import { GuestType } from '@/app/api/graphql/profile/profile.types';
import { createTokenForGuest, hashPassword,  signin, signinPrisma, signup } from '@/api/lib/authTools';
import { COOKIE_NAME } from '@/store/constants/constants';
import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';




export const registerGuest = async (prevState: any, formData: FormData) => {
  const data = GuestRegisterSchema.parse({
    country: formData.get('tokenId'),
    host: formData?.get('host'),
    tokenId: formData.get('tokenId'),
    password: formData.get('password'),
    collaboratorId: 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
  })

  try {
    const { message } = await signup(data)
    const { tokenId } = JSON.parse(message)
    console.log({ tokenId });

    cookies().set(COOKIE_NAME, createTokenForGuest(tokenId))
    return { message: true }

    //redirect(`/space/${slug(data.host)}`)
  } catch (e) {
    console.error(e)
    return { message: false }
    //redirect(`/liismaiil/${slug(data.host)}`)

  }
}

export const signinGuest = async (prevState: any, formData: FormData) => {
  const data = GuestSignInSchema.parse({
    tokenId: formData.get('tokenId'),
    password: formData.get('password'),
    host: formData.get('host'),
  })

  try {
    console.log({ data });

    const { tokenId, collaboratorId, host, flag } = await signin(data)
    if (tokenId !== 0 && collaboratorId !== 0 && host !== 0) {
      cookies().set(COOKIE_NAME, (tokenId).toString())

      return { collaboratorId, flag, host, tokenId }
    } else {
      return { tokenId: 0, collaboratorId: 0, flag: '', host: 0 }
    }
  } catch (e) {
    console.error(e)
    return {}
    // redirect(`/liismaiil/${slug(data.host)}`)
  }
}
// prisma seeding


