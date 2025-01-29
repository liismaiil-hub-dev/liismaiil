
import { getOwnStages, } from '@/actions/host';
import { getAllSprints } from '@/actions/sprint';
import {getAllStagesForDashboard } from "@/actions/stage";

import { GuestPrismaType, SprintPrismaType } from '@/app/api/graphql/stage/stage.types';
import SprintsComponent from "@/components/insight/Sprints";
import { Button } from "@heroui/button";


export default async function Sprints() {
  try {
  
    const sprints = await getAllSprints()
    console.log({sprints});
    
   
    if (typeof sprints != 'undefined' && sprints?.length > 0) {
      return <div className="flex-col justify-start shadow-md py-2 items-center h-52 overflow-x-scroll">
                <div className=" bg-green-100/50   col-span-3 text-center text-blue-400 font-semibold " >
                    Staged Grids ready for sprints 
                </div >
      <div className="flex flex-col  justify-start items-start w-full  overflow-x-scroll ">
       
            <SprintsComponent  sprints={sprints} />
          
         </div>
         </div>
    }
    return (
      <Button type="submit" className='btn bg-blue-400
               text-yellow-100  text-center text-md p-1 
                rounded-md'>
        No sprints for that ayahs yet
      </Button>)
      
} catch (error) {
  return (
    <Button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-md p-1 
              rounded-md'>
      No stage projected
    </Button>)
}



}
