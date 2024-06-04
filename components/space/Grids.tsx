'use client'

import { GRIDS_NAME, GRIDS_TLD } from "@/store/constants/constants";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {useQuery} from "@apollo/client";
import {GET_GRIDS_BY_NB} from "@/graphql/sprint/queries";

type GridMenu = {
  souraName: string;
  souraNb: number;
}
const TiwalAccordion = ({ grids, handleSelectedGrid }: {
  grids: GridMenu[],
  handleSelectedGrid: (arg: number) => void
}) => {
  console.log({ gridsTiWal: grids });

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
const Grids = ({ grids }: { grids: GridMenu[] }) => {
  useEffect(() => {
    console.log({ grids });

  }, [grids]);


  const newTiwal: GridMenu[] = grids.filter((gr: GridMenu) => {
    return gr.souraNb <= 7
  })

  // sprints = await GridModel.find({ author}).where('souraNb').gt(7).lte(18).sort({souraNb:1}).lean().exec();
  const newMiin = grids.filter((gr: GridMenu) => {
    return gr.souraNb > 7 && gr.souraNb <= 18;
  })


  const newMathani = grids.filter((gr: GridMenu) => {
    return gr.souraNb > 18 && gr.souraNb <= 50;
  });

  const newMofasal = grids.filter((gr: GridMenu) => {
    return gr.souraNb > 50;
  });

  const [selectedKeys, setSelectedKeys] = useState(new Set([GRIDS_TLD.TIWAL]));
  const [selectedGrid, setSelectedGrid] = useState(0);


  const selectedGridHandler = (arg: number) => {
    try {
      
      const blob = new Blob([JSON.stringify()], { type: "text/json" });
      const link = document.createElement("a");
      const filename = `${stages[0].title}-stage-${input.title}-sprint.json`
  
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
      
    }
setSelectedGrid(arg)
  }
  const selectedKeyHandler = (arg: number) => {
    setSelectedGrid(arg)
  }

  const defaultContent = " ut aliquip ex ea commodo consequat."
  return (
    <section className="flex flex-col text-blue-800 justify-start items-center w-full h-full">
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem key={`${GRIDS_TLD.TIWAL}`} aria-label="souar tiwal" title={`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`}>
          <TiwalAccordion grids={newTiwal} selectedKeys={selectedKeys} handleSelectedGrid={(arg) => selectedGridHandler(arg)} />

        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MIIN}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title={`${GRIDS_NAME[GRIDS_TLD.MIIN]}`}>
          <MiinAccordion grids={newMiin} selectedKeys={selectedKeys} handleSelectedGrid={(arg) => selectedGridHandler(arg)} />

        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MATHANI}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title={`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`}>
          <MathaniAccordion grids={newMathani} selectedKeys={selectedKeys} handleSelectedGrid={(arg) => selectedGridHandler(arg)} />
        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MOFASAL}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title={`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`}>
          <MofasalAccordion grids={newMofasal} selectedKeys={selectedKeys} handleSelectedGrid={(arg) => selectedGridHandler(arg)} />
        </AccordionItem>
      </Accordion >

      {/* <Accordion>
        {grids.map((grd) => {
          return 
        }
        )}
         <AccordionMiin />
        <AccordionTiwal />
          <AccordionMathani />
          <AccordionMofasal /> 
      */}
    </section>)


}

export default Grids