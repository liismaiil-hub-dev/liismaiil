'use client'
import { getHostsForDashboard } from "@/actions/host";
import { useEffect, useTransition } from "react";
import { getSprintGuests } from "@/actions/sprint";
import SprintGuests from "@/components/stage/SprintGuests";
import { useSelectedLayoutSegment } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";


export default function StepsNav() {
      // console.log({ stages });
       //h-[calc(100vh-7rem)]
       const stageId = useSelectedLayoutSegment('stageId')
      const dispatch = useDispatch()
      
      const [isPending, startTransition] = useTransition()
   
      const { setSprintGuests,} = stageActions
        const {  sprintGuests } = useSelector((state: RootStateType) => state.stage)
       console.log({stageId});
       useEffect(() => {
        if(stageId){
         const _sprintGuests = async () =>   await getSprintGuests(stageId)
         startTransition(( )=> {
          dispatch(setSprintGuests({guests:_sprintGuests}))
             
        } )
        _sprintGuests()
        }
       }, []);
       
  useEffect(() => {
  console.log({sprintGuests});
  
  }, [sprintGuests]);
  
        
       return (
          <div className="flex-col justify-start items-stretch     w-full h-full  " >
             <SprintGuests /> 
          </div>
        )
      }