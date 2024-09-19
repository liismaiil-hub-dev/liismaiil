
'use client'

import { GridMenu, StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { GET_GRIDS_BY_NB } from "@/graphql/stage/queries";
import { GRIDS_NAME, GRIDS_TLD } from "@/store/constants/constants";
import { stageActions } from "@/store/slices/stageSlice";
import { useLazyQuery } from "@apollo/client";
import { Accordion, AccordionItem, Button, ScrollShadow } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect, useMemo } from 'react';
import { useDispatch } from "react-redux";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!



const TiwalAccordion = ({ grids, handleSelectedSouraNb }: {
  grids: GridMenu[],
  handleSelectedSouraNb: (arg: number) => void
}) => {
  console.log({ gridsTiWal: grids });
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedSouraNb(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center w-full  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MiinAccordion = ({ grids, handleSelectedSouraNb }: {
  grids: GridMenu[],
  handleSelectedSouraNb: (arg: number) => void
}) => {
  return (
    <section id='miin_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedSouraNb(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex w-full justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MathaniAccordion = ({ grids, handleSelectedSouraNb }: {
  grids: GridMenu[],
  handleSelectedSouraNb: (arg: number) => void
}) => {
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {
        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedSouraNb(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>
  )
}
const MofasalAccordion = ({ grids, handleSelectedSouraNb }: {
  grids: GridMenu[],
  handleSelectedSouraNb: (arg: number) => void
}) => {
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedSouraNb(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
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

const Grids = ({ stages }: { stages: StagePrismaType[] }) => {
  console.log({ stages });
  Cookies.remove("souraMenu");
  console.log(`grids de stage --------${stages?.length}`);

  const dispatch = useDispatch()
 
  const { setSpaceGrids, setGridMenuSouraNb } = stageActions
  //const { grids } = useSelector((state: RootStateType) => state.stage)
  
  // creating chunks 
  const newTiwal: GridMenu[] = useMemo(() => stages.filter((gr: StagePrismaType) => {
    return gr.souraNb <= 7
  }), [stages])
  const newMiin = useMemo(() => stages.filter((gr: StagePrismaType) => {
    return gr.souraNb > 7 && gr.souraNb <= 18;
  }), [stages])


  const newMathani = useMemo(() => stages.filter((gr: StagePrismaType) => {
    return gr.souraNb > 18 && gr.souraNb <= 50;
  }), [stages])

  const newMofasal = useMemo(() => stages.filter((gr: StagePrismaType) => {
    return gr.souraNb > 50;
  }), [stages])

 
  const selectSouraHandler = (souraNb: number) => {
    console.log({ souraNb });

    try {
 dispatch(setStageGridSelected)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className=" flex-col text-blue-800 justify-start overflow-scroll items-center w-full   max-h-52 ">
      <div className={`flex-col justify-start items-center gap-6 rounded-md`}>
        <Accordion
        /* selectedKeys={selectedKeys}
        onSelectionChange={()  => setSelectedKeys() }
       */
        >
          <AccordionItem key={`${GRIDS_TLD.TIWAL}`} aria-label="souar tiwal"
            title={`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`}>
            <TiwalAccordion grids={newTiwal} handleSelectedSouraNb={(arg) => selectSouraHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MIIN}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title={`${GRIDS_NAME[GRIDS_TLD.MIIN]}`}>
            <MiinAccordion grids={newMiin} handleSelectedSouraNb={(arg) => selectSouraHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MATHANI}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title={`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`}>
            <MathaniAccordion grids={newMathani} handleSelectedSouraNb={(arg) => selectSouraHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MOFASAL}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title={`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`}>
            <ScrollShadow className=" h-[calc(100vh-20rem)]">
              <MofasalAccordion grids={newMofasal}
                handleSelectedSouraNb={(arg) => selectSouraHandler(arg)} />
            </ScrollShadow>

          </AccordionItem>
        </Accordion >
      </div>

    </section>);


}

export default Grids