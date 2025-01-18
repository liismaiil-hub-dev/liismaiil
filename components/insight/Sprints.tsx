'use client'
import {  SprintPrismaType, StagePrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Stage = ({ sprints }: { sprints: SprintPrismaType[] }) => {
  const dispatch =  useDispatch()
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
  
    const { setLocalStages } = stageActions
useEffect(() => {
 console.log({sprints});
 
}, [sprints]);

  return (
    <div className="flex w-full flex-wrap  gap-2">
     Empty
     {/*    {stages && stages.map((stage:StagePrismaType) => <Link  key={stage.stageId} href={`/sprints/${stage.stageId}`} target="_blank">&nbsp;[ {stage?.stageId}]&nbsp;
    </Link>
        )
    } */}
    </div>
  )

}
export default Stage