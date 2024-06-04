'use server'
import { getGuestFromToken } from "@/lib/authTools";
import { COOKIE_NAME } from '@/store/constants/constants';
import { cookies } from 'next/headers';


export const getGuest = async (prevState: any) => {
  try {
    const token = cookies().get(COOKIE_NAME)

    console.log({ token });
    if (typeof token !== 'undefined') {

      const guest = getGuestFromToken(token)
      return guest
    }
    return null


    //redirect(`/space/${slug(data.host)}`)
  } catch (e) {
    console.error(e)
    return null
    //redirect(`/liismaiil/${slug(data.host)}`)

  }
}
