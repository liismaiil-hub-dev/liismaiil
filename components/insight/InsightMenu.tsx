'use client'

import { getGridsByNb } from "@/actions/space";
import { STAGE_CATEGORY_ENUM, StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { useLazyQuery } from "@apollo/client";
import { Button}from "@heroui/button";
import {ScrollShadow} from "@heroui/scroll-shadow";
import { Fragment, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { SECTIONS_SOURAS, GRIDS_TLD} from "@/store/constants/constants";
import { getInsightTemplateByNb, getLocalStagesByNb } from "@/actions/stage";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/store/store";

type GridMenu = {
  souraName: string;
  souraNb: number;
}
//             _____COMPONENT_____________

const InsightMenu = () => {
  const dispatch = useDispatch()
 // const [selectedGrid, setSelectedGrid] = useState(0);
console.log({SECTIONS_SOURAS});

const { gridsContext, gridSelected, evalIndex, evalContext, hideNbContext,blurContext, spaceGridsSelected,spaceStageSelected,
  stagedContext, validContext, gridIndexContext, firstGridContext} = useSelector((state: RootStateType) => state.stage)
const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

const { setInsightTemplate }  = stageActions


  const { setSpaceGrids } = stageActions
  const newTiwal =  SECTIONS_SOURAS[GRIDS_TLD.TIWAL]
    const newMiin = SECTIONS_SOURAS[GRIDS_TLD.MIIN]
  const newMathani = SECTIONS_SOURAS[GRIDS_TLD.MATHANI]
  const newMofasal = SECTIONS_SOURAS[GRIDS_TLD.MOFASAL]

  const selectGridHandler = async (arg: number) => {
    console.log({ arg });
    //setSelectedGrid(arg)
    try {
      const templateByNb = await getInsightTemplateByNb(arg)
      console.log({templateByNb});
      
      if(typeof templateByNb !== 'undefined' &&  templateByNb.success){
      console.log({ grids: templateByNb.templates });
       dispatch(setInsightTemplate({ template: JSON.parse(templateByNb.templates)[0] }))
      
      }else if(!templateByNb.success){
      toast.warning(`${templateByNb.templates}`)

      }
    } catch (error) {
      toast.warning(`${error}`)
    }
}
  return (
    <section className="flex flex-col text-blue-800 justify-start space-y-1 gap-1 items-stretch w-full h-full">

      <ScrollShadow >
        {typeof newTiwal !== 'undefined' && newTiwal && newTiwal.length > 0 &&
          <section className="flex flex-col justify-start gap-1 items-start ">
            <div className="flex justify-center items-center mt-1 bg-orange-200/90 mx-1 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.TIWAL} &nbsp; [ 2 - 7 ]&nbsp; </div>
            {newTiwal?.map((grid: GridMenu) => {
//console.log({ grid });
              return <Button className="text-start bg-emerald-300/80 mx-1 rounded-md text-pretty  w-3/4" onPress={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-start  items-center text-start">
                {`  ${grid.souraName.length<10 ? `${grid.souraName.substring(0,10)}`:`${grid.souraName.substring(0,10)}.`}:  ${grid.souraNb}`}
                </div>
              </Button>
            })}
          </section>}
        {typeof newMiin !== 'undefined' && newMiin && newMiin.length > 0 &&

        <section className="flex flex-col justify-start gap-1 space-y-1 mt-1 items-center ">
            <div className="flex justify-center items-center bg-orange-200/70 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.MIIN} &nbsp; [ 8 - 18 ]&nbsp; </div>
            {newMiin?.map((grid) => {
              return <Button className="text-start text-pretty mx-1 rounded-md bg-emerald-300/60  w-3/4" onPress={() => 
              { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-start items-center text-center mx-1 ">
                {`  ${grid.souraName.length<10 ? `${grid.souraName.substring(0,10)}`:`${grid.souraName.substring(0,10)}.`}:  ${grid.souraNb}`}
                </div>
              </Button>
            }
            )}
          </section>
        }
        {typeof newMathani !== 'undefined' && newMathani && newMathani.length > 0 &&
          <section className="flex flex-col justify-start gap-1  space-y-1 items-end ">
            <div className="flex justify-center items-center mx-1 bg-orange-200/50 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.MATHANI} &nbsp; [ 19 - 48 ]&nbsp;</div>

            {newMathani?.map((grid) => {
              return <Button className="text-start text-pretty mx-1 rounded-md bg-emerald-300/40 w-3/4" onPress={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-start mx-1 text-center">
                {`  ${grid.souraName.length<10 ? `${grid.souraName.substring(0,10)}`:`${grid.souraName.substring(0,10)}.`}:  ${grid.souraNb}`}
                </div>
              </Button>
            }
            )}
          </section>
        }
        {newMofasal && newMofasal.length > 0 &&
          <section className="flex flex-col gap-1 space-y-1  justify-start items-start ">
            <div className="flex justify-start items-center mx-1 mt-1 bg-orange-500/50 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.MOFASAL} &nbsp; [49-114] &nbsp; </div>

            {newMofasal?.map((grid) => {
           if(grid.souraNb < 80) {
            
         return(   <Button key={`${grid.souraName}-${grid.souraNb}`} className="text-start mx-1 rounded-md text-pretty  w-3/4 bg-green-500/50" 
          onPress={() => { selectGridHandler(grid.souraNb) }}  aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
               <div className="flex justify-start  mx-1 text-start">
               {`  ${grid.souraName.length<10 ? `${grid.souraName.substring(0,10)}`:`${grid.souraName.substring(0,10)}.`}:  ${grid.souraNb}`}
               </div>
             </Button>) 
             }else if  (grid.souraNb < 93) { 
              return (<Button  key={`${grid.souraName}-${grid.souraNb}`} className="text-start text-pretty rounded-md mx-1 ml-4 w-3/4  bg-green-400/50" 
           onPress={() => { selectGridHandler(grid.souraNb) }}  aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-start mx-1 text-start">
     {`  ${grid.souraName.length<10 ? `${grid.souraName.substring(0,10)}`:`${grid.souraName.substring(0,10)}.`}:  ${grid.souraNb}`}
                </div>
              </Button>)
              }else {
                 return (<Button  key={`${grid.souraName}-${grid.souraNb}`} className="text-start text-pretty mx-1 rounded-md w-3/4 ml-8 bg-green-300/50" 
                  onPress={() => { selectGridHandler(grid.souraNb) }}  aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                       <div className="flex justify-start  mx-1 text-start">
          {`  ${grid.souraName.length<10 ? `${grid.souraName.substring(0,10)}`:`${grid.souraName.substring(0,10)}.`}:  ${grid.souraNb}`}
                       </div>
                     </Button>)
              }
            })} 
            </section>
        }
      </ScrollShadow>
    </section>)
}

export default InsightMenu

