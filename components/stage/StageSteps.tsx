
'use client'

import { StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { GRIDS_NAME, GRIDS_TLD } from "@/store/constants/constants";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!



const TiwalAccordion = ({ grids, handleSelectedStage }: {
  grids: StagePrismaType[],
  handleSelectedStage: (arg: StagePrismaType) => void
}) => {
  console.log({ gridsTiWal: grids });
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedStage(grd) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center w-full  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MiinAccordion = ({ grids, handleSelectedStage }: {
  grids: StagePrismaType[],
  handleSelectedStage: (arg: StagePrismaType) => void
}) => {
  return (
    <section id='miin_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedStage(grd!) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex w-full justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MathaniAccordion = ({ grids, handleSelectedStage }: {
  grids: StagePrismaType[],
  handleSelectedStage: (arg: StagePrismaType) => void
}) => {
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {
        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedStage(grd) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>
  )
}
const MofasalAccordion = ({ grids, handleSelectedStage }: {
  grids: StagePrismaType[],
  handleSelectedStage: (arg: StagePrismaType) => void
}) => {
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedStage(grd) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}
          </div>
        </Button>
      })}
    </section>
  )
}
//             _____COMPONENT_____________
type StagesStagePrismaType = {
  stage: StagePrismaType
}
const StageSteps = () => {

  const dispatch = useDispatch()

  const { setStageGridSelected } = stageActions
  const { stageGridsContext, } = useSelector((state: RootStateType) => state.stage)

  // creating chunks 
  const newTiwal: StagePrismaType[] = useMemo(() => stageGridsContext?.filter((gr: StagePrismaType) => {
    return gr.souraNb <= 7
  }), [stageGridsContext])
  const newMiin = useMemo(() => stageGridsContext?.filter((gr: StagePrismaType) => {
    return gr.souraNb! > 7 && gr.souraNb <= 18;
  }), [stageGridsContext])


  const newMathani = useMemo(() => stageGridsContext?.filter((gr: StagePrismaType) => {
    return gr.souraNb > 18 && gr.souraNb <= 50;
  }), [stageGridsContext])

  const newMofasal = useMemo(() => stageGridsContext?.filter((gr: StagePrismaType) => {
    return gr.souraNb > 50;
  }), [stageGridsContext])


  const selectStageHandler = (st: StagePrismaType) => {
    console.log({ st });

    try {
      dispatch(setStageGridSelected({ stage: st }))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log({ stageGridsContext });

  }, [stageGridsContext]);


  return (
    <section className=" flex-col text-blue-800 justify-start overflow-scroll items-center  text-center w-full  ">
      <div className={`flex-col justify-start  items-center gap-6 rounded-md`}>
        <Accordion className="overflow-y-auto ">
          <AccordionItem key={`${GRIDS_TLD.TIWAL}`} className="font-light" aria-label="souar tiwal"
            title={`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`}>
            <TiwalAccordion grids={newTiwal} handleSelectedStage={(arg) => selectStageHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MIIN}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title={`${GRIDS_NAME[GRIDS_TLD.MIIN]}`}>
            <MiinAccordion grids={newMiin} handleSelectedStage={(arg) => selectStageHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MATHANI}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title={`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`}>
            <MathaniAccordion grids={newMathani} handleSelectedStage={(arg: StagePrismaType) => selectStageHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MOFASAL}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title={`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`}>

            <MofasalAccordion grids={newMofasal}
              handleSelectedStage={(arg) => selectStageHandler(arg)} />

          </AccordionItem>
        </Accordion >
      </div>

    </section>);


}

export default StageSteps