'use server'
import Board from "@/components/space/Board";
import Stage from "@/components/space/Stage";
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


  return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-full" >

    <Stage />
    <Board />


  </section>
  )
}

