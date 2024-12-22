'use server'
import { getAllStagesForDashboard } from "@/actions/stage";
import Board from "@/components/stage/Board";
//import CarousselComponent from "@/components/stage/StepsCaroussel";

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
      <div className="flex-col justify-center items-center col-span-1 h-full overflow-x-scroll">
      <StateOpenBoard  />
      </div>
      <div className="flex justify-center items-center col-span-2 px-3 h-full  overflow-x-scroll"> 
      <OpenBoard  />
       </div>
       </div>
        );  
      {/* <section id="stages-page" className="flex gap-y-3 flex-col justify-start items-stretch border-2
     border-blue-300 w-full h-full" >
      
      {/* <div className="flex justify-start items-center">
         <CarousselComponent currentGuest={currentGuest} />
     </div>  
     {typeof stages !== 'undefined' && stages && stages.length > 0
       && <div className="flex justify-center items-start">
         <Board stages={stages} />
       </div>}
 
 
   </section> */}
    
} catch (error) {
  redirect('/')
}
  
}

