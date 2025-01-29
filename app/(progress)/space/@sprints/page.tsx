
import {getSpaceSprintable } from "@/actions/stage";
import StagedComponent from "@/components/space/Sprints";
import { Button } from "@heroui/button";


export default async function Stage() {
  try {
  
   
      return <div className="flex-col justify-start shadow-md py-2 items-center h-52 overflow-x-scroll">
                <div className=" bg-green-100/50   col-span-3 text-center text-blue-400 font-semibold " >
                    Ready Sprints 
                </div >
                <div className="flex flex-col  justify-start items-start w-full  overflow-x-scroll ">
                  <StagedComponent   />
                </div>
         </div>
    
    
} catch (error) {
  return (
    <Button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-md p-1 
              rounded-md'>
      No stage projected
    </Button>)}
}
