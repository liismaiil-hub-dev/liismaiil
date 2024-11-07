'use server'
import { getAllStagesForDashboard } from "@/actions/stage";
import Board from "@/components/stage/Board";
import CarousselComponent from "@/components/stage/StepsCaroussel";
import { getGuestFromCookies } from "@/lib/authTools";


export default async function GuestStagePage() {
let currentGuest = await getGuestFromCookies();
console.log({currentGuest});

  let stages = await getAllStagesForDashboard();
  return (<section id="stages-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-full" >
     <div className="flex justify-start items-center">
        <CarousselComponent currentGuest={currentGuest} />
    </div> 
    {typeof stages !== 'undefined' && stages && stages.length > 0
      && <div className="flex justify-center items-start">
        <Board stages={stages} />
      </div>}


  </section>
  );
}

