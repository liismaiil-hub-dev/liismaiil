'use client'
import GridCard from "@/components/space/GridCard";
import {  useSelector } from 'react-redux';
import { RootStateType } from '@/store/store';


export default  function GridNav() {
  //console.log({ grids });
  const {spaceStages, } = useSelector((state: RootStateType) => state.stage)
  const gridThree = spaceStages.filter(st=> st.grid === 3)
  const gridFour = spaceStages.filter(st=> st.grid === 4)
  const gridFive = spaceStages.filter(st=> st.grid === 5)
    return (<div className="flex-col justify-start  py-2 items-center overflow-x-scroll">
                <div className=" bg-green-100/50   text-center text-blue-400 font-semibold " >
                    {`Select Grid From soura ${spaceStages[0].souraName}  Nb {${spaceStages[0].souraNb}} : ${spaceStages.length} grids     `} 
                    {`    {${gridThree.length} == 9   //  ${gridFour.length} == 16   //  ${gridFive.length} == 25   }`} 
                </div >
                <div className=" bg-green-100/75    text-blue-400 " >
                  <GridCard />
              </div>
      </div>
    )

 
}

