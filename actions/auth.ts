'use server'
import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import { createTokenForGuest, hashPassword, registerPrisma, signin, signinPrisma, signup } from '@/lib/authTools';
import { GuestType } from '@/app/api/graphql/profile/profile.types';
import { COOKIE_NAME } from '@/store/constants/constants';
import moment from 'moment';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const GuestRegisterSchema = z.object({
  tokenId: z.number().int().gte(1000),
  host: z.number().int().gte(100).lt(1000),
  password: z.string(),
  country: z.string().max(3),
});

const GuestSignInSchema = z.object({
  tokenId: z.number().int().gte(1000),
  host: z.number().int().gte(100).lt(1000),
  password: z.string(),

});


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
export const registerGuestPrisma = async (formData: FormData,) => {
  const data = GuestRegisterSchema.parse({
    tokenId: parseInt(formData?.get('tokenId') as string),
    host: parseInt(formData?.get('host') as string),
    country: formData.get('country'),
    password: formData.get('password'),
  })
  console.log({ data, formData });

  let redirection = '/'
  const hashedPass = await hashPassword(data.password) as string;
  try {
    const { host: dataHost, tokenId, country: dataCountry, password } = data;
    const guestRef = await dbFirestore.collection('guests').doc(`${tokenId}`).get();
    console.log({ data: guestRef.data(), exists: guestRef.exists });

    if (guestRef.exists) {
      try {
        const { host, tokenId, country, status, flag, startDate, endDate, collaboratorId } = guestRef.data() as GuestType
        if (host == dataHost) {
          const rep = await registerPrisma({ host, tokenId, country: country ?? dataCountry, password: hashedPass, collaboratorId: collaboratorId ?? 'O6cKgXEsuPNAuzCMTGeblWW9sWI3', status, flag, startDate: startDate ? startDate : new Date().toISOString(), endDate: endDate ? endDate : new Date(moment().add(3, 'months').toISOString()).toISOString() })
          if (rep?.success) {
            redirection = '/stages'
          }
        }
        //redirect(`/space/${slug(data.host)}`)
      } catch (e) {
        console.log({ e });
      }
    }
  } catch (e) {
    console.log({ e });

  } finally {
    redirect(redirection)
  }
}

export const signinGuestPrisma = async (formData: FormData) => {
  const data = GuestSignInSchema.parse({
    tokenId: parseInt(formData.get('tokenId') as unknown as string),
    password: formData.get('password'),
    host: parseInt(formData.get('host') as unknown as string),
  })
  console.log({ data });
  let direction = '/'
  try {
    const { tokenId, collaboratorId, host, flag, success } = await signinPrisma(data)
    if (typeof success == 'boolean' && success) {
      console.log({ flag, success });

      if (tokenId !== -1 && collaboratorId !== -1 && host !== -1) {
        cookies().set(COOKIE_NAME, createTokenForGuest(tokenId).toString())
        direction = '/stages'
        // return { message: JSON.stringify({ collaboratorId, flag, host, tokenId }) }
      }
    } else {
      direction = '/signUp'
    }
  } catch (e) {
    console.error(e)

  } finally {
    redirect(direction)
  }
}
