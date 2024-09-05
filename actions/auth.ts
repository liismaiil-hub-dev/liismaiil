'use server'
import { createTokenForGuest, hashPassword, registerPrisma, signin, signinPrisma, signup } from '@/lib/authTools';

import { COOKIE_NAME } from '@/store/constants/constants';
import { FLAG_FILES } from '@/store/constants/flagArray';
import _ from 'lodash';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const GuestRegisterSchema = z.object({
  tokenId: z.number().int().lte(100),
  host: z.number().int().lte(100),
  password: z.string(),
  country: z.string().max(3),
});

const GuestSignInSchema = z.object({
  tokenId: z.number().int().lte(100),
  host: z.number().int().lte(100),
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
export const registerGuestPrisma = async (formData: FormData,): Promise<{ message: string; }> => {
  const randomFlag = FLAG_FILES[_.random(FLAG_FILES.length)]

  const data = GuestRegisterSchema.parse({
    tokenId: formData.get('tokenId'),
    host: formData?.get('host'),
    country: formData.get('country'),
    password: formData.get('password'),
  })

  console.log({
    data,
    tokenId: formData.get('tokenId'),
    host: formData?.get('host'),
    country: formData.get('country'),
    password: formData.get('password'),
  });
  const hashedPass = await hashPassword(data.password) as string;
  try {
    const { message } = await registerPrisma({ ...data, collaboratorId: 'O6cKgXEsuPNAuzCMTGeblWW9sWI3' })
    const { tokenId } = JSON.parse(message)
    console.log({ tokenId });

    cookies().set(COOKIE_NAME, createTokenForGuest(tokenId))
    return { message }

    //redirect(`/space/${slug(data.host)}`)
  } catch (e) {
    console.error(e)
    return { message: false }
    //redirect(`/liismaiil/${slug(data.host)}`)

  }
}

export const signinGuestPrisma = async (formData: FormData) => {
  const data = GuestSignInSchema.parse({
    tokenId: parseInt(formData.get('tokenId') as string),
    password: formData.get('password'),
    host: parseInt(formData.get('host') as string),
  })

  try {


    const { tokenId, collaboratorId, host, flag, message, success } = await signinPrisma(data)
    if (success) {
      console.log({ tokenId, collaboratorId, host, flag, message, success });

      if (tokenId !== -1 && collaboratorId !== -1 && host !== -1) {
        cookies().set(COOKIE_NAME, createTokenForGuest(tokenId).toString())
        redirect('/stages')
        // return { message: JSON.stringify({ collaboratorId, flag, host, tokenId }) }
      } else {
        redirect('/')

      }
    }
  } catch (e) {
    console.error(e)
    redirect(`/`);
    return {
      message: JSON.stringify({ tokenId: 0, collaboratorId: 0, flag: '', host: 0, error: e })
    }
  }
}
