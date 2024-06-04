'use client'
import { APP_ENV } from '@/store/constants/constants';



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
      return []
    } catch (err) {
      return []
    }
  }
}
export default function Board() {


  return (<div className="flex  justify-start items-start  w-full overflow-x-clip" >
    board
  </div >
  )
}

