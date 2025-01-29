'use client'
import { useEffect } from "react";
import { GridTypeData, StagePrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                import { Button } from "@heroui/button";
import {Card, CardBody } from "@heroui/card";
function GridCard() {
    const dispatch = useDispatch()
    const { gridSelected,spaceStages, spaceGridsSelected, spaceStageSelected } = useSelector((state: RootStateType) => state.stage)

    const { setGridSelected, setSpaceStageSelected  } = stageActions
    
    
    useEffect(() => {
        console.log({spaceStages});
        console.log({spaceStages, spaceGridsSelected, gridSelected });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spaceGridsSelected, gridSelected, spaceStages]);

    const handleSetGridSelected = (grid: StagePrismaType) => {
        console.log({grid,});
        
        dispatch(setSpaceStageSelected({ grid: grid }))
    }

    return <div className="grid grid-cols-5 gap-1 p-2 items-center h-full flex-wrap w-full overflow-y-scroll"> 
    {spaceStages && spaceStages.map((stage: StagePrismaType, index) => {
        return (
            <Card className=" col-span-1 border-2 border-blue-600/50 rounded-md h-16 p-1" key={stage.stageId} shadow="sm" >
                <CardBody className="flex-col justify-start items-stretch  p-1 ">
                   
                    <Button onPress={() => handleSetGridSelected(stage)} color="primary" 
                    variant="bordered" className={`border-2 border-blue-600 rounded-md font-semibold 
                    ${stage.stageId === spaceStageSelected?.stageId ? 'bg-orange-200' : 'bg-slate-300'} `}>
                        {`With :  ${stage.stageId}`} 
                    </Button>
                   
                </CardBody>
            </Card>
        );
    })}</div>;
}

export default GridCard
    ;
