import { getCurrentGuest } from "@/lib/guests";

async function  StagePage() {
   try {
    const  guest = await  getCurrentGuest();
    console.log({guest});
    
   } catch (error) {
    console.log({error});
    
   }
    
    return (

        <div className="h-full w-full  bg-gray-200 p-10">
            <h2 className='text-4xl text-center my-10 font-semibold'> 
            stages</h2>

        </div>


    )
}

export default StagePage