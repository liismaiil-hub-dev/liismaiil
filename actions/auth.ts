'use server'
import { createTokenForGuest, signin, signup, signupPrisma } from '@/lib/authTools'
import { COOKIE_NAME } from '@/store/constants/constants'
import { cookies } from 'next/headers'
import { z } from 'zod'

const authSchema = z.object({
  host: z.string(),
  country: z.string(),
  password: z.string(),
  tokenId: z.string(),
  collaboratorId: z.string(),

})

export const registerGuest = async (prevState: any, formData: FormData) => {
  const data = authSchema.parse({
    country: formData.get('country'),
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
  const data = authSchema.parse({
    tokenId: formData.get('tokenId'),
    password: formData.get('password'),
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
export const registerGuestPrisma = async (prevState: any, formData: FormData, flag:string) => {
  const data = authSchema.parse({
    country: formData.get('tokenId'),
    host: formData?.get('host'),
    tokenId: formData.get('tokenId'),
    password: formData.get('password'),
    collaboratorId: 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
    flag: flag,
  })

  try {
    const { message } = await signupPrisma(data)
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

export const signinPrisma = async (prevState: any, formData: FormData, flag: string) => {
  const data = authSchema.parse({
    tokenId: formData.get('tokenId'),
    password: formData.get('password'),
    host: formData.get('host'),
  })

  try {
    console.log({ data });

    const { tokenId, collaboratorId, host, flag } = await signinPrisma(data)
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
