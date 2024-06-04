'use server'
import { signin, signup } from '@/lib/authTools'
import { COOKIE_NAME } from '@/store/constants/constants'
import { cookies } from 'next/headers'
import { z } from 'zod'

const authSchema = z.object({
  host: z.string(),
  tokenId: z.string(),
  country: z.string(),
})

export const registerGuest = async (prevState: any, formData: FormData) => {
  const data = authSchema.parse({
    collaboratorId: formData.get('host'),
    tokenId: formData.get('tokenId'),
    country: formData.get('country'),
  })

  try {
    const { token } = await signup(data)
    console.log({ token });

    cookies().set(COOKIE_NAME, token)
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
    collaboratorId: formData.get('host'),
    tokenId: formData.get('tokenId'),
    country: formData.get('country'),
  })

  try {
    console.log({ data });

    const { token } = await signin(data)
    cookies().set(COOKIE_NAME, token)
    return { message: true }

    //  redirect(`/space/${slug(data.host)}`)

  } catch (e) {
    console.error(e)
    return { message: false }
    // redirect(`/liismaiil/${slug(data.host)}`)
  }
}
