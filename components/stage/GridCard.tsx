'use client'
import { StagePrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function GridCard() {
    const dispatch = useDispatch()
    const { stageGridSelected, stageGridsContext } = useSelector((state: RootStateType) => state.stage)
    console.log({ stageGridsContext });

    const { setStageGridSelected } = stageActions
    useEffect(() => {
        console.log({ stageGridSelected });

    }, [stageGridSelected]);
    const handleSetStageGridSelected = (grid: StagePrismaType) => {
        dispatch(setStageGridSelected({ grid }))
    }

    return <div className="flex justify-between items-center"> {stageGridsContext && stageGridsContext.map((grid: StagePrismaType) => {
        return (
            <Card className="mx-6 border-2 border-blue-600 rounded-md px-6" key={grid.grid} shadow="sm" isPressable onPress={() => handleSetStageGridSelected(grid)}>
                <CardBody className="flex justify-start items-center  overflow-visible p-0 h-[140px]">
                    <p>{grid.souraName}. </p>
                    <p>grids : {grid.grid}. </p>

                    <Button onPress={() => handleSetStageGridSelected(grid)} color="primary" variant="bordered" className={`border-2 border-blue-600 rounded-md  ${grid.grid === stageGridSelected.grid ? 'bg-orange-200' : 'bg-slate-400'} `}>
                        On board
                    </Button>
                </CardBody>
            </Card>
        );
    })}</div>;
}

export default GridCard
    ;
