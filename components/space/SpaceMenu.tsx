'use client'

import { getGridsByNb } from "@/actions/space";
import { STAGE_CATEGORY_ENUM, StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { useLazyQuery } from "@apollo/client";
import { Button, ScrollShadow } from "@nextui-org/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SECTIONS_SOURAS, GRIDS_TLD} from "@/store/constants/constants";
import { getLocalStagesByNb } from "@/actions/stage";

type GridMenu = {
  souraName: string;
  souraNb: number;
}
//             _____COMPONENT_____________

const SpaceMenu = () => {
  const dispatch = useDispatch()
  //const [GetGridsByNb, { data: dataGetGridsByNb, loading: loadingGetGridsByNb, error: errorGetGridsByNb }] = useLazyQuery(GET_GRIDS_BY_NB)
;
  const [selectedGrid, setSelectedGrid] = useState(0);
console.log({SECTIONS_SOURAS});

  const { setSpaceGrids } = stageActions
  const newTiwal =  SECTIONS_SOURAS[GRIDS_TLD.TIWAL]
    const newMiin = SECTIONS_SOURAS[GRIDS_TLD.MIIN]
  const newMathani = SECTIONS_SOURAS[GRIDS_TLD.MATHANI]
  const newMofasal = SECTIONS_SOURAS[GRIDS_TLD.MOFASAL]
  /* id: number;
  arabName: string;
  title: string;
  souraNb: number;
  souraName: string;
  ayahs: [string];
  grid: number;
  group: number */
  // creating chunks 
  useEffect(() => {
    //    console.log({ newMathani, newTiwal, newMiin, newMofasal });
  }, []);/* 
  useEffect(() => {
    if (dataGetGridsByNb && dataGetGridsByNb.getGridsByNb && dataGetGridsByNb.getGridsByNb.success && dataGetGridsByNb.getGridsByNb.grids.length > 0) {
        dispatch(setSpaceGrids({ grids: gridsByNb.grids }))
   
    } else if (errorGetGridsByNb || !dataGetGridsByNb?.getGridsByNb.success) {
      toast.warning('can not reach the grid server, please check your internet connexion')
    }
  }, [dataGetGridsByNb, loadingGetGridsByNb, errorGetGridsByNb]);
   */
  const selectGridHandler = async (arg: number) => {
    console.log({ arg });
    setSelectedGrid(arg)
    try {
      const gridsByNb = await getLocalStagesByNb(arg)
      console.log({gridsByNb});
      
      if(typeof gridsByNb !== 'undefined' &&  gridsByNb.success){
      console.log({ grids: gridsByNb.stages });
       dispatch(setSpaceStages({ grids: JSON.parse(gridsByNb.stages) }))
      }else {
      toast.warning('can not reach the grid server, please check your internet connexion')

      }
    } catch (error) {
      //toast.warning(`${error}`)
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
              return <Button className="text-center bg-emerald-300/80 mx-1 text-pretty  w-3/4" onClick={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>
            })}
          </section>}
        {typeof newMiin !== 'undefined' && newMiin && newMiin.length > 0 &&

        <section className="flex flex-col justify-start gap-1 space-y-1 mt-1 items-center ">
            <div className="flex justify-center items-center bg-orange-200/70 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.MIIN} &nbsp; [ 8 - 18 ]&nbsp; </div>
            {newMiin?.map((grid) => {
              return <Button className="text-center text-pretty mx-1 bg-emerald-300/60  w-3/4" onClick={() => 
              { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center items-center text-center mx-1 ">
                  {`[ ${grid.souraNb} ]   ${grid.souraName}  `}
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
              return <Button className="text-center text-pretty mx-1 bg-emerald-300/40 w-3/4" onClick={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center mx-1 text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>
            }
            )}
          </section>
        }
        {newMofasal && newMofasal.length > 0 &&
          <section className="flex flex-col gap-1 space-y-1  justify-start items-start ">
            <div className="flex justify-center items-center mx-1 mt-1 bg-orange-500/50 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.MOFASAL} &nbsp; [ 49 - 114 ] &nbsp; </div>

            {newMofasal?.map((grid) => {
           if(grid.souraNb < 80) {
            
         return(   <Button key={`${grid.souraName}-${grid.souraNb}`} className="text-center mx-1 text-pretty  w-3/4 bg-green-500/50" 
          onClick={() => { selectGridHandler(grid.souraNb) }}  aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
               <div className="flex justify-center  mx-1 text-center">
                 {`  ${grid.souraName}   :  ${grid.souraNb}`}
               </div>
             </Button>) 
             }else if  (grid.souraNb < 93) { 
              return (<Button  key={`${grid.souraName}-${grid.souraNb}`} className="text-center text-pretty mx-1 ml-4 w-3/4  bg-green-400/50" 
           onClick={() => { selectGridHandler(grid.souraNb) }}  aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>)
              }else {
                 return (<Button  key={`${grid.souraName}-${grid.souraNb}`} className="text-center text-pretty mx-1 w-3/4 ml-8 bg-green-300/50" 
                  onClick={() => { selectGridHandler(grid.souraNb) }}  aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                       <div className="flex justify-center  text-center">
                         {`  ${grid.souraName}   :  ${grid.souraNb}`}
                       </div>
                     </Button>)
              }
            })} 
            </section>
        }
      </ScrollShadow>
    </section>)
}

export default SpaceMenu

function setSpaceStages(arg0: { grids: StagePrismaType[]; }): any {
  throw new Error("Function not implemented.");
}
