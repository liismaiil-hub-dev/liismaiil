import { GuestPrismaType } from "@/app/api/graphql/stage/stage.types"
import prisma from "../prisma-db"
import { LIISMAIIL_STATUS_ENUM } from "@/app/api/graphql/profile/profile.types"
import { createUrl } from "../tools"

export const getAllHosts = async (): Promise<GuestPrismaType[] | undefined | any> => {
   const res =  await fetch(createUrl('/api/posts'), {
    method:'GET'
   })
   if(res.ok) {
    const data = await  res.json()
    return data.data   

   }
}
