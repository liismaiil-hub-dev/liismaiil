
'use client'

import { sprintActivate } from "@/actions/sprint";
import { SprintPrismaType, StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import { Button, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useDispatch, useSelector } from "react-redux";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!



const TiwalAccordion = ({ grids, handleSelectedSprint }: {
  grids: SprintPrismaType[],
  handleSelectedSprint: (arg: SprintPrismaType) => void
}) => {
  console.log({ gridsTiWal: grids });
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return < Button className="flex flex-col -center  w-full items-center " onClick={() => { handleSelectedSprint(grd) }} key={`${grd.stage.souraName}-${grd.stage.souraNb}`} aria-label={`${grd.stage.souraName}`} title={`${grd.stage.souraName}`}>
          <div className="flex justify-center w-full  text-center">
            {`  ${grd.stage.souraName}   :  ${grd.stage.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section >

  )
}
const MiinAccordion = ({ grids, handleSelectedSprint }: {
  grids: SprintPrismaType[],
  handleSelectedSprint: (arg: SprintPrismaType) => void
}) => {
  return (
    <section id='miin_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedSprint(grd!) }} key={`${grd.stage.souraName}-${grd.stage.souraNb}`} aria-label={`${grd.stage.souraName}`} title={`${grd.stage.souraName}`}>
          <div className="flex w-full justify-center  text-center">
            {`  ${grd.stage.souraName}   :  ${grd.stage.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MathaniAccordion = ({ grids, handleSelectedSprint }: {
  grids: SprintPrismaType[],
  handleSelectedSprint: (arg: SprintPrismaType) => void
}) => {
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {
        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedSprint(grd) }} key={`${grd?.stage.souraName}-${grd?.stage.souraNb}`} aria-label={`${grd?.stage.souraName}`} title={`${grd?.stage.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.stage.souraName}   :  ${grd.stage.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>
  )
}
const MofasalAccordion = ({ grids, handleSelectedSprint }: {
  grids: SprintPrismaType[],
  handleSelectedSprint: (arg: SprintPrismaType) => void
}) => {
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-center ">
      {grids?.map((grd) => {

        return <Button className="flex flex-col justify-center  w-full items-center " onClick={() => { handleSelectedSprint(grd) }} key={`${grd.stage.souraName}-${grd.stage.souraNb}`} aria-label={`${grd.stage.souraName}`} title={`${grd.stage.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.stage.souraName}   :  ${grd.stage.souraNb}`}
          </div>
        </Button>
      })}
    </section>
  )
}
type StageSprintPrismaType = {
  sprintId: string,
  createdAt: string,
  reatedById: string,

  guests: [{ tokenId: number }],

  stage: StagePrismaType,
};
type SprintSprintsType = {
  sprint: StageSprintPrismaType[] | [StageSprintPrismaType]
};
//             _____COMPONENT_____________
const SprintSteps = ({ sprints }: { sprints: SprintSprintsType[] }) => {

  const dispatch = useDispatch()
  const [isPending, startTransition] = useTransition()
  const { setSpaceGrids, setGridMenuSouraNb, setStageGridSelected } = stageActions
  const { stageGridsContext } = useSelector((state: RootStateType) => state.stage)
  const [_sprints, set_Sprints] = useState<StageSprintPrismaType[] | null>(null);

  // console.log({ sprints });

  // creating SPRINTS 
  const newTiwal: StageSprintPrismaType[] = useMemo(() => _sprints?.filter((gr: StageSprintPrismaType) => {

    return gr?.stage.souraNb <= 7
  }), [_sprints])
  const newMiin = useMemo(() => _sprints?.filter((gr: StageSprintPrismaType) => {
    return gr?.stage.souraNb! > 7 && gr.stage.souraNb <= 18;
  }), [_sprints])


  const newMathani = useMemo(() => _sprints?.filter((gr: StageSprintPrismaType) => {
    return gr?.stage.souraNb > 18 && gr.stage.souraNb <= 50;
  }), [_sprints])

  const newMofasal = useMemo(() => _sprints?.filter((gr: StageSprintPrismaType) => {
    return gr?.stage.souraNb > 50;
  }), [sprints])


  const selectStageHandler = (st: StageSprintPrismaType) => {
    console.log({ st });

    try {
      dispatch(setStageGridSelected({ stage: st.stage }))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (sprints && sprints.length > 0) {
      sprints.map((sp: SprintSprintsType) => {
        if (!_sprints) {
          console.log({ ...sp.sprint });

          set_Sprints([sp?.sprint!])
        } else {
          console.log({ sp });

          set_Sprints([..._sprints, sp.sprint]);
        }
      })
    }
  }, []);

  const activateSprintHandler = (sprId: string) => {

    console.log({ sprId });
    startTransition(() => {
      sprintActivate(sprId);
    })
  }

  const [selectedKeys, setSelectedKeys] = useState();

  function setSelectedKeysHandler(key: any): void {

    setSelectedKeys(key)
  }

  return (
    <section className=" flex-col text-blue-800 justify-start overflow-scroll items-center w-full   max-h-1/2 ">
      <ScrollShadow className=" h-[calc(100vh-20rem)]">

        {newTiwal && newTiwal.length > 0 &&
          <div className="flex flex-col justify-start items-center">
            <div className="CENTER">
              Tiwal
            </div>
            <div className="flex flex-col justify-start items-center">
              {newTiwal && newTiwal.length > 0 && newTiwal.map((spr) =>
                <Link key={spr.sprintId} href={`/sprints/${spr.sprintId}`} target="_blank" className="flex CENER">

                  <div key={spr.sprintId} className="flex justify-center items-center">
                    [&nbsp;{spr.sprintId}&nbsp;]-{spr.stage.souraName}-(&nbsp;{spr.guests.length}&nbsp;)
                  </div>
                </Link>
              )
              }
            </div>

          </div>}
        {newMiin && newMiin.length > 0 &&
          <div className="flex flex-col justify-start items-center">
            <div className="CENTER">
              Miin
            </div>
            <div className="flex flex-col justify-start items-center">
              {newMiin && newMiin.length > 0 && newMiin.map((spr) =>
                <Link target="_blank" key={spr.sprintId} href={`/sprints/${spr.sprintId}`} className="flex CENER">

                  <div key={spr.sprintId} className="flex justify-center items-center">
                    [&nbsp;{spr.sprintId}&nbsp;]-{spr.stage.souraName}-(&nbsp;{spr.guests.length}&nbsp;)
                  </div>
                </Link>

              )
              }
            </div>
          </div>}
        {newMathani && newMathani.length > 0 &&

          <div className="flex flex-col justify-start items-center">
            <div className="CENTER">
              Mathani
            </div>
            <div className="flex flex-col justify-start items-center">
              {newMathani && newMathani.length > 0 && newMathani.map((spr) =>
                <Link target="_blank" key={spr.sprintId} href={`/sprints/${spr.sprintId}`} className="flex CENER">

                  <div key={spr.sprintId} className="flex justify-center items-center">
                    [&nbsp;{spr.sprintId}&nbsp;]-{spr.stage.souraName}-(&nbsp;{spr.guests.length}&nbsp;)
                  </div>
                </Link>

              )
              }
            </div>
          </div>
        }
        {newMofasal && newMofasal.length > 0 &&

          <div className="flex flex-col justify-start items-center">
            <div className="CENTER">
              Mofasal
            </div>
            <div className="flex flex-col justify-start items-center">
              {newMofasal && newMofasal.length > 0 && newMofasal.map((spr) =>
                <Link key={spr.sprintId} href={`/sprints/${spr.sprintId}`} target="_blank" className="flex CENER">


                  <div key={spr.sprintId} className="flex justify-center items-center">
                    [&nbsp;{spr.sprintId}&nbsp;]-{spr.stage.souraName}-(&nbsp;{spr.guests.length}&nbsp;)
                  </div>
                </Link>

              )
              }
            </div>
          </div>
        }
      </ScrollShadow>
    </section>);


}

export default SprintSteps



/**
 *  <Accordion className="overflow-y-auto "
        selectedKeys={selectedKeys}
        onSelectionChange={(key) => setSelectedKeysHandler(key)}

      >
        <ScrollShadow className=" h-[calc(100vh-20rem)]">

          {newTiwal && newTiwal.length > 0 &&
            <AccordionItem key={`${GRIDS_TLD.TIWAL}`} className="font-light" aria-label="souar tiwal"
              title={`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`}>
              <TiwalAccordion grids={newTiwal} handleSelectedSprint={(arg) => selectStageHandler(arg)} />
            </AccordionItem>}
          {newMiin && newMiin.length > 0 &&
            <AccordionItem key={`${GRIDS_TLD.MIIN}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title={`${GRIDS_NAME[GRIDS_TLD.MIIN]}`}>
              <MiinAccordion grids={newMiin} handleSelectedSprint={(arg) => selectStageHandler(arg)} />
            </AccordionItem>}
          {newMiin && newMiin.length > 0 &&

            <AccordionItem key={`${GRIDS_TLD.MATHANI}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title={`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`}>
              <MathaniAccordion grids={newMathani} handleSelectedSprint={(arg: SprintPrismaType) => selectStageHandler(arg)} />
            </AccordionItem>
          }
          {newMiin && newMiin.length > 0 &&

            <AccordionItem key={`${GRIDS_TLD.MOFASAL}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title={`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`}>
              <MofasalAccordion grids={newMofasal}
                handleSelectedSprint={(arg) => selectStageHandler(arg)} />
            </AccordionItem>
          }
        </ScrollShadow>
      </Accordion >
 */