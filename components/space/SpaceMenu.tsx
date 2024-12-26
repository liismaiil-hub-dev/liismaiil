'use client'

import { STAGE_CATEGORY_ENUM } from "@/app/api/graphql/stage/stage.types";
import { GET_GRIDS_BY_NB } from "@/graphql/stage/queries";
import { GRIDS_TLD } from "@/store/constants/constants";
import { stageActions } from "@/store/slices/stageSlice";
import { useLazyQuery } from "@apollo/client";
import { Button, ScrollShadow } from "@nextui-org/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type GridMenu = {
  souraName: string;
  souraNb: number;
}
//             _____COMPONENT_____________

const SpaceMenu = ({ grids }: { grids: GridMenu[] }) => {
  const dispatch = useDispatch()
  const [GetGridsByNb, { data: dataGetGridsByNb, loading: loadingGetGridsByNb, error: errorGetGridsByNb }] = useLazyQuery(GET_GRIDS_BY_NB)
;
  const [selectedGrid, setSelectedGrid] = useState(0);
//console.log({grids});

  const { setSpaceGrids } = stageActions
  const newTiwal = useMemo(() => grids?.filter((gr: GridMenu) => {
    return gr.souraNb <= 7
  }), [grids]);
  const newMiin = useMemo(() => grids?.filter((gr: GridMenu) => {
    return gr.souraNb > 7 && gr.souraNb <= 18;
  }), [grids])
  const newMathani = useMemo(() => grids?.filter((gr: GridMenu) => {
    return gr.souraNb > 18 && gr.souraNb <= 48;
  }), [grids])
  const newMofasal = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb > 48;
  }), [grids])

  // creating chunks 
  useEffect(() => {
    //    console.log({ newMathani, newTiwal, newMiin, newMofasal });
  }, []);
  useEffect(() => {
    if (dataGetGridsByNb && dataGetGridsByNb.getGridsByNb && dataGetGridsByNb.getGridsByNb.success && dataGetGridsByNb.getGridsByNb.grids.length > 0) {
      dispatch(setSpaceGrids({ grids: dataGetGridsByNb.getGridsByNb.grids }))
    } else if (errorGetGridsByNb || !dataGetGridsByNb?.getGridsByNb.success) {
      toast.warning('can not reach the grid server, please check your internet connexion')
    }
  }, [dataGetGridsByNb, loadingGetGridsByNb, errorGetGridsByNb]);

  const selectGridHandler = (arg: number) => {
   // console.log({ arg });
    setSelectedGrid(arg)
    GetGridsByNb({
      variables: {
        souraNb: arg,
      }
    })

  }
  const selectedKeyHandler = (arg: number) => {
    setSelectedGrid(arg)
  }
  return (
    <section className="flex flex-col text-blue-800 justify-start items-stretch w-full h-full">

      <ScrollShadow >
        {typeof newTiwal !== 'undefined' && newTiwal && newTiwal.length > 0 &&
          <section className="flex flex-col justify-start items-start ">
            <div className="flex justify-center items-center bg-orange-200/90 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.TIWAL} &nbsp; [ 2 - 7 ]&nbsp; </div>
            {newTiwal?.map((grid: GridMenu) => {
//console.log({ grid });
              return <Button className="text-center bg-emerald-300/80 text-pretty w-3/4" onClick={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>
            })}
          </section>}
        {typeof newMiin !== 'undefined' && newMiin && newMiin.length > 0 &&

        <section className="flex flex-col justify-start items-center ">
            <div className="flex justify-center items-center bg-orange-200/70 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.MIIN} &nbsp; [ 8 - 18 ]&nbsp; </div>
            {newMiin?.map((grid) => {
              return <Button className="text-center text-pretty bg-emerald-300/60  w-3/4" onClick={() => 
              { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center items-center text-center">
                  {`[ ${grid.souraNb} ]   ${grid.souraName}  `}
                </div>
              </Button>
            }
            )}
          </section>
        }
        {typeof newMathani !== 'undefined' && newMathani && newMathani.length > 0 &&
          <section className="flex flex-col justify-start items-end ">
            <div className="flex justify-center items-center bg-orange-200/50 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.MATHANI} &nbsp; [ 19 - 48 ]&nbsp;</div>

            {newMathani?.map((grid) => {
              return <Button className="text-center text-pretty bg-emerald-300/40 w-3/4" onClick={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>
            }
            )}
          </section>
        }
        {newMofasal && newMofasal.length > 0 &&
          <section className="flex flex-col justify-start items-start ">
            <div className="flex justify-center items-center bg-orange-500/50 rounded-md w-full "> 
            {STAGE_CATEGORY_ENUM.MOFASAL} &nbsp; [ 49 - 114 ] &nbsp; </div>

            {newMofasal?.map((grid) => {
           if(grid.souraNb < 79) {
            
         return  <Button key={`${grid.souraName}-${grid.souraNb}`} className="text-center text-pretty  w-3/4 bg-green-500/50" 
          onClick={() => { selectGridHandler(grid.souraNb) }}  aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
               <div className="flex justify-center  text-center">
                 {`  ${grid.souraName}   :  ${grid.souraNb}`}
               </div>
             </Button> 
             }else if  (grid.souraNb < 92) { 
              return (<Button  key={`${grid.souraName}-${grid.souraNb}`} className="text-center text-pretty ml-4 w-3/4  bg-green-400/50" 
           onClick={() => { selectGridHandler(grid.souraNb) }}  aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>)
              }else {
                 return (<Button  key={`${grid.souraName}-${grid.souraNb}`} className="text-center text-pretty w-3/4 ml-8 bg-green-300/50" 
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