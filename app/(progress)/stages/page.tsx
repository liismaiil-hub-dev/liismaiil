'use server'
import { redirect } from "next/navigation";
import StateOpenBoard from "@/components/stage/StateOpenBoard";
import OpenBoard from "@/components/stage/OpenBoard";
//import StageStepsComponent from "@/components/stage/StageSteps";



export default async function GuestStagePage() {
try {
  /* let currentGuest = await getGuestFromCookies();
  console.log({currentGuest});
   */

    return (<div className="grid grid-cols-3">
      <div className="flex-col justify-start items-stretch col-span-1  h-screen overflow-x-scroll">
      <StateOpenBoard  />
      </div>
      <div className="flex justify-center items-center col-span-2 px-3 h-screen  overflow-x-scroll"> 
      <OpenBoard  />
       </div>
       </div>
        );  
      } catch (error) {
  redirect('/')
}
  
}

