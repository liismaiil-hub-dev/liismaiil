'use client'
import { GridTypeData, StagePrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

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

    return <div className="flex justify-evenly gap-1 py-2 items-center"> {spaceStages && spaceStages.map((stage: StagePrismaType) => {
        return (
            <Card className="mx-1 border-2 border-blue-600/50 rounded-md px-3" key={stage.stageId} shadow="sm" >
                <CardBody className="flex justify-start items-center  overflow-visible p-0 h-[140px]">
                    <p>stageId : {stage.stageId}. </p>
                   
                    <Button onPress={() => handleSetGridSelected(stage)} color="primary" 
                    variant="bordered" className={`border-2 border-blue-600 rounded-md  
                    ${stage.stageId === spaceStageSelected.stageId ? 'bg-orange-200' : 'bg-slate-400'} `}>
                        On board
                    </Button>
                   
                </CardBody>
            </Card>
        );
    })}</div>;
}

export default GridCard
    ;
