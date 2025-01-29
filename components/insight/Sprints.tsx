'use client'
import {  SprintPrismaType, StagePrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sprints = ({ sprints }: { sprints: SprintPrismaType[] }) => {
  const dispatch =  useDispatch()
  const { sprintsContext} = useSelector((state: RootStateType) => state.stage)
  
  const { setOwnSprints, setSprintsContext } = stageActions

  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
  
  useEffect(() => {
 console.log({sprints});
 if(typeof sprintsContext == 'undefined'&& !sprintsContext){

   dispatch(setSprintsContext({sprints:sprints}))
 }
 
}, [sprints]);

  return (
    <div className="flex w-full flex-wrap  gap-2">
         {sprints && sprints.map((sprint:SprintPrismaType) => <Link  key={sprint.sprintId} href={`/stages/${sprint.sprintId}`} 
         target="_blank">&nbsp;[ {sprint?.sprintId}]&nbsp;
    </Link>
        )
    } 
    </div>
  )

}
export default Sprints