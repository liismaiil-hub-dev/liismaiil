
'use client'

import { GRIDS_NAME, GRIDS_TLD } from "@/store/constants/constants";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import {  Button,  } from "@heroui/button";
import {cn} from "@/lib/cn-utility";

import { useTransform } from "framer-motion";
import { startTransition, useEffect, useMemo, useState, useTransition } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {StagesSprintType} from "@/api/graphql/stage/stage.types";


//             _____COMPONENT_____________

const StageSteps = ({stages}:{stages: StagesSprintType[]}) => {

  const dispatch = useDispatch()
 //console.log({stages});
  
const [isPending, startTransition] = useTransition()
  const { setStagesSprintsContext,  setCatStages, setCategoryContext } = stageActions
  const { stagesSprintsContext, categoryContext,catStages } = useSelector((state: RootStateType) => state.stage)


  // creating chunks 
  const newTiwal: StagesSprintType[] = useMemo(() => stagesSprintsContext?.filter((gr: StagesSprintType) => {
    return gr.souraNb <= 7
  }), [stagesSprintsContext])
  const newMiin = useMemo(() => stagesSprintsContext?.filter((gr: StagesSprintType) => {
    return gr.souraNb! > 7 && gr.souraNb <= 18;
  }), [stagesSprintsContext])

  const newMathani = useMemo(() => stagesSprintsContext?.filter((gr: StagesSprintType) => {
    return gr.souraNb > 18 && gr.souraNb <= 48;
  }), [stagesSprintsContext])

  const newMofasal = useMemo(() => stagesSprintsContext?.filter((gr: StagesSprintType) => {
    return gr.souraNb > 48;
  }), [stagesSprintsContext])

  useEffect(() => {
    startTransition(()  =>{
      dispatch(setStagesSprintsContext({stages:stages}))
    }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages]);
useEffect(() => {
  dispatch(setCategoryContext({cat:GRIDS_NAME.MOFASAL}))
}, []);
  
const categoryHandler = (cat:GRIDS_NAME ) => {
 console.log({cat});
   dispatch(setCategoryContext({cat:cat}))
   switch (cat) {
    case ( GRIDS_NAME[GRIDS_TLD.TIWAL]):{
      dispatch(setCatStages({
       stages:newTiwal 
      })) 
      break;
    }case ( GRIDS_NAME[GRIDS_TLD.MIIN]):{
      dispatch(setCatStages({
       stages:newMiin 
      })) 
      break;
    }
    case ( GRIDS_NAME[GRIDS_TLD.MATHANI]):{
      dispatch(setCatStages({
       stages:newMathani 
      })) 
      break;
    }case ( GRIDS_NAME[GRIDS_TLD.MOFASAL]):{
   dispatch(setCatStages({
       stages:newMofasal 
      })) 
      break;
    }
  };}
console.log({categoryContext, catStages});

  return (<section  className="container  overflow-scroll w-full gap-1  grid grid-cols-4 items-center p-1 
    border-1 border-blue-200 rounded-md ">
              <div className={"flex justify-center py-3 w-full col-span-1 items-center text-center  "} >
            <Button className={cn(categoryContext === GRIDS_NAME[GRIDS_TLD.TIWAL] && "border-3 shadow-md shadow-green-300  border-green-200 \
                " ,"flex justify-center py-1 w-full  rounded-md items-center bg-blue-300 \
               text-green-700 ")}
             onPress={() => { categoryHandler(GRIDS_NAME[GRIDS_TLD.TIWAL]) }} 
             aria-label=  {`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`} 
             title=  {`${GRIDS_NAME[GRIDS_TLD.TIWAL]}   `}>
          {`${GRIDS_NAME[GRIDS_TLD.TIWAL]} [ 2 - 7 ]`}
        </Button>
        </div>
        <div className="flex justify-center w-full col-span-1 items-center text-center  ">
        <Button className={cn(categoryContext === GRIDS_NAME[GRIDS_TLD.MIIN] && "border-3 shadow-md shadow-green-300  border-green-200 \
                " ,"flex justify-center py-1 w-full  rounded-md items-center bg-blue-300 \
               text-green-700 ")} onPress={() => { categoryHandler(GRIDS_NAME[GRIDS_TLD.MIIN]) }} 
            aria-label=  {`${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title=  {`${GRIDS_NAME[GRIDS_TLD.MIIN]} `}>
         {`${GRIDS_NAME[GRIDS_TLD.MIIN]} [ 8 - 18 ]`}
       </Button>
       </div>
       <div className="flex justify-center w-full col-span-1 items-center text-center  ">
       <Button className={cn(categoryContext === GRIDS_NAME[GRIDS_TLD.MATHANI] 
       && "border-3 shadow-md shadow-green-300  border-green-200 \
                " ,"flex justify-center py-1 w-full  rounded-md items-center bg-blue-300 \
               text-green-700 ")} onPress={() => { categoryHandler(GRIDS_NAME[GRIDS_TLD.MATHANI]) }} 
         aria-label=  {`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title=  {`${GRIDS_NAME[GRIDS_TLD.MATHANI]} `}>
      {`${GRIDS_NAME[GRIDS_TLD.MATHANI]} [ 19 - 48 ]`}
    </Button>
    </div>
    <div className="flex justify-center w-full col-span-1 items-center text-center  ">
    <Button className={cn(categoryContext === GRIDS_NAME[GRIDS_TLD.MOFASAL] && "border-3 shadow-md shadow-green-300  border-green-200 \
                " ,"flex justify-center py-1 w-full  rounded-md items-center bg-blue-300 \
               text-green-700 ")} onPress={() => { categoryHandler(GRIDS_NAME[GRIDS_TLD.MOFASAL]) }} 
       aria-label=  {`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title=  {`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}  `}>
    {`${GRIDS_NAME[GRIDS_TLD.MOFASAL]} [ 49 - 114 ]`}
    </Button>
  </div>
  </section>
);
}

export default StageSteps