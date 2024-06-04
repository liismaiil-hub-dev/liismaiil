'use server'
import Stages from "@/components/space/Stages";
import { APP_ENV } from '@/store/constants/constants';
import { readdir } from 'node:fs/promises';
import path from 'path';

const getTitles = async (): Promise<string[] | undefined> => {
  'use server'
  if (process.env.APP_ENV === APP_ENV.BOX) {
    const sprintsDirName = path.join(process.cwd(), '/store/shares/stages')
    try {
      const files = await readdir(sprintsDirName);
      console.log({ files });

      return files

    } catch (err) {
      console.error(err);
      return []
    }

  } else {

  }
}
export default async function Stage() {
  const titles = await getTitles()
  return (<div id="stage" className="flex flex-col justify-start items-center  md:w-full mt-10  h-full " >
    <Stages stages={titles} />
  </div >
  )
}

