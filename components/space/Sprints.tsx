'use client'
import { getAllSprints } from "@/actions/sprint";
import {  SprintPrismaType, StagePrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sprints = () => {
  const dispatch =  useDispatch()
  const { guestPrisma:{tokenId} } = useSelector((state: RootStateType) => state.guestPrisma)
  const { sprintsContext} = useSelector((state: RootStateType) => state.stage)
  
    const { setOwnSprints, setSprintsContext } = stageActions
 
useEffect(() => {
  
const allSprints = async () => {

  const _sprints = await getAllSprints()
console.log({_sprints});

  dispatch(setSprintsContext({sprints:_sprints}))
}
  allSprints()
  
}, []);
 
  return (
    <div className="flex w-full flex-wrap  gap-2">
        {sprintsContext && sprintsContext.map((sprint:SprintPrismaType) => 
        <Link  key={sprint.stageId} href={`/stages/${sprint.sprintId}`} target="_blank">&nbsp;[ {sprint?.sprintId}]&nbsp;
    </Link>
        ) 
    }
    
    </div>
  )

}
export default Sprints