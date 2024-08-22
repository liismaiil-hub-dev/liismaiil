'use server'
import Board from "@/components/space/Board";
import GridCard from "@/components/stage/GridCard";


function StagePage() {

  return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >

    <GridCard />
    <Board />


  </section>
  )
}

export default StagePage