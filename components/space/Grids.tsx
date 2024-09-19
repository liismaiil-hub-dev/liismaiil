'use client'

import { GET_GRIDS_BY_NB } from "@/graphql/sprint/queries";
import { GRIDS_NAME, GRIDS_TLD } from "@/store/constants/constants";
import { stageActions } from "@/store/slices/stageSlice";
import { useLazyQuery } from "@apollo/client";
import { Accordion, AccordionItem, Button, ScrollShadow } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

type GridMenu = {
  souraName: string;
  souraNb: number;
}
const TiwalAccordion = ({ grids, handleSelectedGrid }: {
  grids: GridMenu[],
  handleSelectedGrid: (arg: number) => void
}) => {
  //  console.log({ gridsTiWal: grids });

  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {

        return <Button onClick={() => { handleSelectedGrid(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MiinAccordion = ({ grids, handleSelectedGrid }: {
  grids: GridMenu[],
  handleSelectedGrid: (arg: number) => void
}) => {
  return (
    <section id='miin_accordion' className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {

        return <Button onClick={() => { handleSelectedGrid(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
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
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {

        return <Button onClick={() => { handleSelectedGrid(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
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
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {

        return <Button onClick={() => { handleSelectedGrid(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>
  )
}
//             _____COMPONENT_____________

const Grids = ({ grids }: { grids: GridMenu[] }) => {
  //console.log({ grids });

  const dispatch = useDispatch()

  const [GetGridsByNb, { data: dataGetGridsByNb, loading: loadingGetGridsByNb, error: errorGetGridsByNb }] = useLazyQuery(GET_GRIDS_BY_NB)

  const [selectedKeys, setSelectedKeys] = useState(new Set([GRIDS_TLD.TIWAL]));
  const [selectedGrid, setSelectedGrid] = useState(0);

  const { setSpaceGrids } = stageActions

  // creating chunks 
  const newTiwal: GridMenu[] = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb <= 7
  }), [grids])
  const newMiin = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb > 7 && gr.souraNb <= 18;
  }), [grids])


  const newMathani = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb > 18 && gr.souraNb <= 50;
  }), [grids])

  const newMofasal = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb > 50;
  }), [grids])

  useEffect(() => {
    if (dataGetGridsByNb && dataGetGridsByNb.getGridsByNb && dataGetGridsByNb.getGridsByNb.success && dataGetGridsByNb.getGridsByNb.grids.length > 0) {
      dispatch(setSpaceGrids({ grids: dataGetGridsByNb.getGridsByNb.grids }))
      try {
        const blob = new Blob([JSON.stringify(dataGetGridsByNb.getGridsByNb.grids)], { type: "text/json" });
        const link = document.createElement("a");
        const filename = `${dataGetGridsByNb.getGridsByNb.grids[0].souraNb}.json`

        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ["text/json", link.download, link.href].join("_");

        const evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });

        link.dispatchEvent(evt);
        link.remove()
      } catch (error) {
        console.log({ error });

      }
    } else if (errorGetGridsByNb || !dataGetGridsByNb?.getGridsByNb.success) {
      console.log({ errorGetGridsByNb });

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetGridsByNb, loadingGetGridsByNb, errorGetGridsByNb]);

  const selectedGridHandler = (arg: number) => {
    setSelectedGrid(arg)
    GetGridsByNb({
      variables: {
        input: {
          souraNb: arg,
          author: "3jtczfl93BWlud2t3Q44KdC0EVJ3"
        }
      }
    })

  }
  const selectedKeyHandler = (arg: number) => {
    setSelectedGrid(arg)
  }
  return (
    <section className="flex flex-col text-blue-800 justify-start items-center w-full h-full">
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem key={`${GRIDS_TLD.TIWAL}`} aria-label="souar tiwal" title={`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`}>
          <TiwalAccordion grids={newTiwal} handleSelectedGrid={(arg) => selectedGridHandler(arg)} />

        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MIIN}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title={`${GRIDS_NAME[GRIDS_TLD.MIIN]}`}>
          <MiinAccordion grids={newMiin} handleSelectedGrid={(arg) => selectedGridHandler(arg)} />
        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MATHANI}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title={`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`}>
          <MathaniAccordion grids={newMathani} handleSelectedGrid={(arg) => selectedGridHandler(arg)} />
        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MOFASAL}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title={`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`}>
          <ScrollShadow className=" h-[calc(100vh-20rem)]">
            <MofasalAccordion grids={newMofasal}
              handleSelectedGrid={(arg) => selectedGridHandler(arg)} />
          </ScrollShadow>

        </AccordionItem>
      </Accordion >

      {/* import React from "react";
import {ScrollShadow} from "@nextui-org/react";
import {Content} from "./Content";

export default function App() {
  return (
    <ScrollShadow className="w-[300px] h-[400px]">
      <Content />
  );
}

      */}
    </section>)


}

export default Grids