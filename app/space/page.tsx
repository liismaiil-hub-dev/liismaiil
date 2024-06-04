'use server'
import Spaces from "@/components/space/Spaces";
import { APP_ENV } from '@/store/constants/constants';
import { readdir } from 'node:fs/promises';
import path from 'path';

const getTitles = async (): Promise => {
  'use server'
  if (process.env.APP_ENV === APP_ENV.BOX) {
    const stagesDirName = path.join(process.cwd(), '/store/shares/stages')
    try {
      const files = await readdir(stagesDirName);
      console.log({ files })
      return files
    } catch (err) {
      console.error(err);
      return []
    }

  } else {

  }
}
export default async function SpacePage() {

  const titles = await getTitles()
  console.log({ titles });


  return (<section id="space-page" className="flex border 
  border-violet-600  justify-start items-center w-full h-full" >

    <Spaces spaces={titles} />


  </section>
  )
}

