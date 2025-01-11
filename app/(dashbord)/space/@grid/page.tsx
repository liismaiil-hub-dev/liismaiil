
import GridCard from "@/components/space/GridCard";


export default async function GridNav() {
  //console.log({ grids });
    return (<div className="flex-col justify-start  py-2 items-center">
                <div className=" bg-green-100/50  col-span-3 text-center text-blue-400 font-semibold " >
                    Select Grid 
                </div >
       
      <GridCard />
      </div>
    )

 
}

