'use client'

import {  StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import { Button, ScrollShadow } from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
//             _____COMPONENT_____________

const StateGrids = ( ) => {
  const dispatch = useDispatch()
  
  const {categoryContext, catStages } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageGridSelected  } = stageActions
  
 const selectGridHandler =(grid:StagePrismaType ) =>{
  try {
    dispatch(setStageGridSelected({ stage: grid}))
  } catch (error) {
    console.log(error);
  }
 }

  return (
    
      <ScrollShadow >
        {typeof catStages !== 'undefined' && catStages && catStages.length > 0 &&
          <section className="flex flex-col justify-start items-stretch text-blue-800 space-y-1">
            <div className="flex justify-center items-center bg-orange-200/90 rounded-sm w-full ">  &nbsp; {categoryContext} &nbsp; </div>
            {catStages?.map((grid: StagePrismaType, index: number) => {
//console.log({ grid });
              return(<div  key={`${grid.stageId}_${index}`} className="flex justify-center items-center space-x-2 rounded-md w-full ">
                <Button className="text-center bg-emerald-300/80 text-pretty xs:w-3/4 sm:w-1/2" onClick={() => { selectGridHandler(grid); } } key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.stageId}`}
                </div>
              </Button><Button className="text-center bg-emerald-300/80 text-pretty xs:w-3/4 sm:w-1/2" onClick={() => { selectGridHandler(grid); } } key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                  <div className="flex justify-center  text-center">
                  Ready {`${guestPrisma.tokenId}`}
                  </div>
                </Button>                 
                </div>)

            })}
          </section>}
       
        
      </ScrollShadow>
    )
}

export default StateGrids