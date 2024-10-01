
'use client'

import { sprintActivate } from "@/actions/sprint";
import { SprintPrismaType, StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import { Button } from "@nextui-org/react";
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
  useEffect(() => {
    console.log({ _sprints });

  }, [_sprints]);

  const activateSprintHandler = (sprId: string) => {

    console.log({ sprId });
    startTransition(() => {
      sprintActivate(sprId);
    })
  }


  return (
    <section className=" flex-col text-blue-800 justify-start overflow-scroll items-center w-full   max-h-1/2 ">
      <div className={`flex-col justify-start  items-center gap-6 rounded-md`}>
        {newTiwal && newTiwal.map((spr) => {

          return <div onClick={() => activateSprintHandler(spr.sprintId)} key={spr.sprintId} className="flex cursor-pointer justify-center items-center">
            {spr.sprintId}
          </div>
        }
        )
        }
        {/*  <Accordion className="overflow-y-auto "
         selectedKeys={selectedKeys}
        onSelectionChange={()  => setSelectedKeys() }
       
        >
          <AccordionItem key={`${GRIDS_TLD.TIWAL}`} className="font-light" aria-label="souar tiwal"
            title={`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`}>
            <TiwalAccordion grids={newTiwal} handleSelectedSprint={(arg) => selectStageHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MIIN}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title={`${GRIDS_NAME[GRIDS_TLD.MIIN]}`}>
            <MiinAccordion grids={newMiin} handleSelectedSprint={(arg) => selectStageHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MATHANI}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title={`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`}>
            <MathaniAccordion grids={newMathani} handleSelectedSprint={(arg: SprintPrismaType) => selectStageHandler(arg)} />
          </AccordionItem>
          <AccordionItem key={`${GRIDS_TLD.MOFASAL}`} className="font-light" aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title={`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`}>
            <ScrollShadow className=" h-[calc(100vh-20rem)]">
              <MofasalAccordion grids={newMofasal}
                handleSelectedSprint={(arg) => selectStageHandler(arg)} />
            </ScrollShadow>
          </AccordionItem>
        </Accordion > */}
      </div>

    </section>);


}

export default SprintSteps