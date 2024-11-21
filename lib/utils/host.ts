import { GuestPrismaType } from "@/app/api/graphql/stage/stage.types"
import { createUrl } from "../tools"

export const getAllHosts = async (): Promise<GuestPrismaType[] | undefined | any> => {
   const res = await fetch(createUrl('/api/posts'), {
      method: 'GET'
   })
   if (res.ok) {
      const data = await res.json()
      return data.data

   }
}

export const postLesson = async ({ tokenId, title, cours, file }: { tokenId: number, title: string, cours: string, file: File }): Promise<GuestPrismaType[] | undefined | any> => {
   const res = await fetch(new Request(createUrl(`/api/hosts/${tokenId}`)), {
      method: 'POST',
      body: JSON.stringify({
         id, title, cours, file

      })
   })
   if (res.ok) {
      const data = await res.json()
      return data.data

   }
}
