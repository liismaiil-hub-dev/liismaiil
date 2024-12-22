'use server'
import { getAllGifts } from "@/actions/host";
import Gifts from "@/components/hosts/Gifts";


export default async function Stage() {
 try {
  const gifts = await getAllGifts()
  console.log({ gifts });

  return (<div id="stage" className="flex flex-col justify-start items-center  md:w-full mt-10  h-full" >
    <Gifts  gifts={gifts}/>
  </div >
  )
 } catch (error) {
  return null 
 }
}

