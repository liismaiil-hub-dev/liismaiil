'use client'

import { GET_GRIDS_BY_NB } from "@/graphql/stage/queries";
import { GRIDS_TLD } from "@/store/constants/constants";
import { stageActions } from "@/store/slices/stageSlice";
import { useLazyQuery } from "@apollo/client";
import { Button, ScrollShadow } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

type GridMenu = {
  souraName: string;
  souraNb: number;
}
const TiwalAccordion = ({ grid, selectGridHandler }: {
  grid: GridMenu, handleSelectedGrid: (arg: number) => void
}) => {
  return <Button className="text-center text-pretty w-1/2" onClick={() => { handleSelectedGrid(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
    <div className="flex justify-center  text-center">
      {`  ${grid.souraName}   :  ${grid.souraNb}`}
    </div>
  </Button>
}
const MiinAccordion = ({ grids, handleSelectedGrid }: {
  grids: GridMenu[],
  handleSelectedGrid: (arg: number) => void
}) => {
  console.log({ grids });
  return (
    <section className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {
        return <Button className="text-center text-pretty w-1/2" onClick={() => { handleSelectedGrid(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}
          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MathaniAccordion = ({ grids, handleSelectedGrid }: {
  grids: GridMenu[],
  handleSelectedGrid: (arg: number) => void
}) => {
  console.log({ grids });
  return (
    <section className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {
        return <Button className="text-center text-pretty w-1/2" onClick={() => { handleSelectedGrid(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}
          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MofasalAccordion = ({ grids, handleSelectedGrid }: {
  grids: GridMenu[],
  handleSelectedGrid: (arg: number) => void
}) => {
  console.log({ grids });
  return (
    <section className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {
        return <Button className="text-center text-pretty w-1/2" onClick={() => { handleSelectedGrid(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}
          </div>
        </Button>
      }
      )}
    </section>)
}
//             _____COMPONENT_____________

const Grids = ({ grids }: { grids: GridMenu[] }) => {
  const dispatch = useDispatch()
  const [GetGridsByNb, { data: dataGetGridsByNb, loading: loadingGetGridsByNb, error: errorGetGridsByNb }] = useLazyQuery(GET_GRIDS_BY_NB)

  const [selectedKeys, setSelectedKeys] = useState(new Set([GRIDS_TLD.MOFASAL]));
  const [selectedGrid, setSelectedGrid] = useState(0);

  const { setSpaceGrids } = stageActions
  const newTiwal = useMemo(() => grids?.filter((gr: GridMenu) => {
    return gr.souraNb <= 7
  }), [grids]);
  const newMiin = useMemo(() => grids?.filter((gr: GridMenu) => {
    return gr.souraNb > 7 && gr.souraNb <= 18;
  }), [grids])
  const newMathani = useMemo(() => grids?.filter((gr: GridMenu) => {
    return gr.souraNb > 18 && gr.souraNb <= 50;
  }), [grids])
  const newMofasal = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb > 50;
  }), [grids])

  // creating chunks 
  useEffect(() => {
    //    console.log({ newMathani, newTiwal, newMiin, newMofasal });
  }, []);
  useEffect(() => {
    if (dataGetGridsByNb && dataGetGridsByNb.getGridsByNb && dataGetGridsByNb.getGridsByNb.success && dataGetGridsByNb.getGridsByNb.grids.length > 0) {
      dispatch(setSpaceGrids({ grids: dataGetGridsByNb.getGridsByNb.grids }))
    } else if (errorGetGridsByNb || !dataGetGridsByNb?.getGridsByNb.success) {
      console.log({ errorGetGridsByNb });
    }
  }, [dataGetGridsByNb, loadingGetGridsByNb, errorGetGridsByNb]);

  const selectGridHandler = (arg: number) => {
    console.log({ arg });
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
            {newTiwal?.map((grid: GridMenu) => {
              console.log({ grid });
              return <Button className="text-center bg-emerald-300/80 text-pretty w-3/4" onClick={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>
            })}
          </section>}
        {typeof newMiin !== 'undefined' && newMiin && newMiin.length > 0 &&
          <section className="flex flex-col justify-start items-center ">
            {newMiin?.map((grid) => {
              return <Button className="text-center text-pretty bg-emerald-300/60  w-3/4" onClick={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>
            }
            )}
          </section>
        }
        {typeof newMathani !== 'undefined' && newMathani && newMathani.length > 0 &&
          <section className="flex flex-col justify-start items-end ">
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
            {newMofasal?.map((grid) => {
              return <Button className="text-center text-pretty w-full" onClick={() => { selectGridHandler(grid.souraNb) }} key={`${grid.souraName}-${grid.souraNb}`} aria-label={`${grid.souraName}`} title={`${grid.souraName}`}>
                <div className="flex justify-center  text-center">
                  {`  ${grid.souraName}   :  ${grid.souraNb}`}
                </div>
              </Button>
            }
            )}
          </section>
        }
      </ScrollShadow>
    </section>)
}

export default Grids