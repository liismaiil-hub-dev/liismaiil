'use client'
import {  StagePrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Stage = ({ stages }: { stages: StagePrismaType[] }) => {
  const dispatch =  useDispatch()
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
  
    const { setLocalStages } = stageActions
useEffect(() => {
  
dispatch(setLocalStages({stages}))
}, [stages]);

  return (
    <div className="flex w-full flex-wrap  gap-2">
        {stages && stages.map((stage:StagePrismaType) => <Link  key={stage.stageId} href={`/sprints/${stage.stageId}`} target="_blank">&nbsp;[ {stage?.stageId}]&nbsp;
    </Link>
        )
    }
    </div>
  )

}
export default Stage