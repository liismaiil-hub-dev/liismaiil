'use server'
import { getAllStagesForDashboard } from "@/actions/stage";
import Board from "@/components/stage/Board";
import CarousselComponent from "@/components/stage/StepsCaroussel";


export default async function GuestStagePage() {
  let stages = await getAllStagesForDashboard();
  return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >
    <div className="flex justify-start items-center">

      <CarousselComponent  />
    </div>

    <div className="flex justify-between items-start">
      <Board stages={stages?.stages!} />
    </div>


  </section>
  );
}

