
'use client'

import { StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { GRIDS_NAME, GRIDS_TLD } from "@/store/constants/constants";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from "@/store/store";
import {  AccordionItem, Button, cn } from "@nextui-org/react";
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";



const StageStepsIn = ({ stageCat ,grids, handleSelectedStage }: {
  grids: StagePrismaType[],stageCat: string,
  handleSelectedStage: (arg: StagePrismaType) => void
}) => {
  console.log({ gridsTiWal: grids });
  return (
    <section id={`${stageCat}`} className="flex p-3 justify-start items-start gap-2 overflow-scroll flex-wrap ">
      {grids?.map((grd, index) => {

        return <Button 
        className="flex  justify-center   items-center p-2" onClick={() => { 
          console.log({grd});
           handleSelectedStage(grd) }}
         key={`${grd.stageId}-${index}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center w-full  text-center">
            {`  ${grd.souraName} : {${grd.stageId}}  [${grd.group}]`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
//             _____COMPONENT_____________
type StagesStagePrismaType = {
  stage: StagePrismaType
}
const StageSteps = ({stages}:{stages: StagePrismaType[]}) => {

  const dispatch = useDispatch()
 //console.log({stages});
  

  const { setStageGridSelected, setStageGridsContext, setCatStages, setCategoryContext } = stageActions
  const { stageGridsContext, catStages, categoryContext, showStepsContext} = useSelector((state: RootStateType) => state.stage)

  // creating chunks 
  const newTiwal: StagePrismaType[] = useMemo(() => stageGridsContext?.filter((gr: StagePrismaType) => {
    return gr.souraNb <= 7
  }), [stageGridsContext])
  const newMiin = useMemo(() => stageGridsContext?.filter((gr: StagePrismaType) => {
    return gr.souraNb! > 7 && gr.souraNb <= 18;
  }), [stageGridsContext])


  const newMathani = useMemo(() => stageGridsContext?.filter((gr: StagePrismaType) => {
    return gr.souraNb > 18 && gr.souraNb <= 48;
  }), [stageGridsContext])

  const newMofasal = useMemo(() => stageGridsContext?.filter((gr: StagePrismaType) => {
    return gr.souraNb > 48;
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
    dispatch(setStageGridsContext({stages:stages}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages]);
  
  useEffect(() => {
    console.log({ stageGridsContext });

  }, [stageGridsContext]);
 
  
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
   
  };
}

  return (
    <div className="flex-col items-stretch justify-center gap-3">

    <section  className="container  overflow-scroll w-svw gap-3  grid grid-cols-4 items-center p-1 
    border-3 border-gray-500 rounded-md space-x-3">
              <div className={"flex justify-center py-3 w-full col-span-1 items-center text-center  "} >
            <Button className={cn(categoryContext === GRIDS_NAME[GRIDS_TLD.TIWAL] && "border-3 shadow-md shadow-green-300  border-green-200 \
                " ,"flex justify-center py-1 w-full  rounded-md items-center bg-blue-300 \
               text-green-700 ")}
             onClick={() => { categoryHandler(GRIDS_NAME[GRIDS_TLD.TIWAL]) }} 
             aria-label=  {`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`} 
             title=  {`${GRIDS_NAME[GRIDS_TLD.TIWAL]}   `}>
          {`${GRIDS_NAME[GRIDS_TLD.TIWAL]} [ 2 - 7 ]`}

        </Button>
        </div>
        <div className="flex justify-center w-full col-span-1 items-center text-center  ">
        <Button className={cn(categoryContext === GRIDS_NAME[GRIDS_TLD.MIIN] && "border-3 shadow-md shadow-green-300  border-green-200 \
                " ,"flex justify-center py-1 w-full  rounded-md items-center bg-blue-300 \
               text-green-700 ")} onClick={() => { categoryHandler(GRIDS_NAME[GRIDS_TLD.MIIN]) }} 
            aria-label=  {`${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title=  {`${GRIDS_NAME[GRIDS_TLD.MIIN]} `}>
         {`${GRIDS_NAME[GRIDS_TLD.MIIN]} [ 8 - 18 ]`}

       </Button>
       </div>
       <div className="flex justify-center w-full col-span-1 items-center text-center  ">
       <Button className={cn(categoryContext === GRIDS_NAME[GRIDS_TLD.MATHANI] 
       && "border-3 shadow-md shadow-green-300  border-green-200 \
                " ,"flex justify-center py-1 w-full  rounded-md items-center bg-blue-300 \
               text-green-700 ")} onClick={() => { categoryHandler(GRIDS_NAME[GRIDS_TLD.MATHANI]) }} 
         aria-label=  {`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title=  {`${GRIDS_NAME[GRIDS_TLD.MATHANI]} `}>
      {`${GRIDS_NAME[GRIDS_TLD.MATHANI]} [ 19 - 48 ]`}

    </Button>
    </div>
    <div className="flex justify-center w-full col-span-1 items-center text-center  ">
    <Button className={cn(categoryContext === GRIDS_NAME[GRIDS_TLD.MOFASAL] && "border-3 shadow-md shadow-green-300  border-green-200 \
                " ,"flex justify-center py-1 w-full  rounded-md items-center bg-blue-300 \
               text-green-700 ")} onClick={() => { categoryHandler(GRIDS_NAME[GRIDS_TLD.MOFASAL]) }} 
       aria-label=  {`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title=  {`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}  `}>
    {`${GRIDS_NAME[GRIDS_TLD.MOFASAL]} [ 49 - 114 ]`}
    </Button>
  </div>
  </section>
    {/* <section  className=" rounded-md ">
      
      {categoryContext === GRIDS_NAME[GRIDS_TLD.TIWAL] && newTiwal && newTiwal.length > 1 && showStepsContext &&
            <StageStepsIn stageCat= {`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`} grids={newTiwal} handleSelectedStage={(arg) => selectStageHandler(arg)} />
        }
      {categoryContext === GRIDS_NAME[GRIDS_TLD.MIIN] && newMiin && newMiin.length > 1 && showStepsContext &&
            <StageStepsIn stageCat= {`${GRIDS_NAME[GRIDS_TLD.MIIN]}`} grids={newMiin} handleSelectedStage={(arg) => selectStageHandler(arg)} />
        }   
     {categoryContext === GRIDS_NAME[GRIDS_TLD.MATHANI] &&newMathani && newMathani.length > 1 && showStepsContext &&
        <StageStepsIn stageCat= {`${GRIDS_NAME[GRIDS_TLD.MIIN]}`} grids={newMathani} handleSelectedStage={(arg) => selectStageHandler(arg)} />
        }
 {categoryContext === GRIDS_NAME[GRIDS_TLD.MOFASAL] &&newMofasal && newMofasal.length > 1 && showStepsContext &&
     <StageStepsIn stageCat= {`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} grids={newMofasal} handleSelectedStage={(arg) => selectStageHandler(arg)} />
  }
</section> */}
</div>

    );


}

export default StageSteps