'use client'
import { APP_ENV } from '@/store/constants/constants';


import { toast } from 'react-toastify';

type AyahWithIndex = {
  id: number;
  order: number;
  text: string;
  juz: number;
  slice?: string;
  _id?: string;
}
const getTitles = async () => {
  if (process.env.APP_ENV === APP_ENV.BOX) {
    try {
      // const allSprints: SprintType[] = [];
      const ftch = await fetch('/api/download-sprints', {
        method: 'GET', cache: 'force-cache'
      })
      const sprintsTitles = await ftch.json();
      const titlesFromJson = sprintsTitles.map(ttle => ttle?.split('.').shift())
      return titlesFromJson
    } catch (err) {
      toast.warning(`cant get sprint file title please verify 
         sprint files in the box repo
         ` )
    }
  }
}
export default function Board() {


  return (<div id="board" className="flex flex-col justify-start items-center gap-3 md:w-full mt-10  h-full " >
    <div className="flex flex-col justify-start items-center  w-full overflow-visible" >
      board
    </div >
  </div >
  )
}

