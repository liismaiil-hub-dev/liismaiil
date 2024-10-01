'use server'
import Board from "@/components/space/Board";

export default async function SpacePage() {

  return (<section id="space-page" className="flex flex-col justify-start items-center  w-full h-full" >

    <Board />


  </section>
  )
}

