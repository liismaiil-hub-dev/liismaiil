'use client'

import { sprintActivate } from "@/actions/sprint";
import { SprintPrismaType, StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";

import {ScrollShadow } from "@heroui/scroll-shadow";
import Link from "next/link";
import {  useState, useTransition } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { useSelectedLayoutSegment } from 'next/navigation'
const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!


//             _____COMPONENT_____________
const SprintGuests = () => {

  const dispatch = useDispatch()

  const [isPending, startTransition] = useTransition()
  const { setSpaceGrids, setGridMenuSouraNb, setStageGridSelected } = stageActions
  const { stageGridsContext } = useSelector((state: RootStateType) => state.stage)
  //const [_sprints, set_Sprints] = useState<StageSprintPrismaType[] | null>(null);
 const loginSegment = useSelectedLayoutSegment('')
  // console.log({ sprints });

  // creating SPRINTS 
  const selectStageHandler = (st: SprintPrismaType) => {
    console.log({ st });

    try {
      dispatch(setStageGridSelected({ stage: st.stage }))
    } catch (error) {
      console.log(error);
    }
  }
  
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

        {/* {sprintGuests && sprintGuests.length > 0 && */}
          <div className="flex flex-col justify-start items-center">
            <div className="CENTER">
              Tiwal
            </div>
            <div className="flex flex-col justify-start items-center">
              {/* {sprintGuests && sprintGuests.length > 0 && sprintGuests.map((guest) =>
                <Link key={spr.sprintId} href={`/sprints/${spr.sprintId}`} target="_blank" className="flex CENER">

                  <div key={spr.sprintId} className="flex justify-center items-center">
                    [&nbsp;{spr.sprintId}&nbsp;]-{spr.stage.souraName}-(&nbsp;{spr.guests.length}&nbsp;)
                  </div>
                </Link>
              )
              }
 */}            </div>

          </div>
          
      </ScrollShadow>
    </section>);


}

export default SprintGuests

