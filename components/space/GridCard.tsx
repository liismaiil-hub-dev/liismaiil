'use client'
import { GridTypeData } from "@/api/graphql/stage/stage.types";
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function GridCard() {
    const dispatch = useDispatch()
    const { gridSelected, spaceGridsSelected } = useSelector((state: RootStateType) => state.stage)

    const { setGridSelected } = stageActions
    useEffect(() => {
        console.log({ spaceGridsSelected, gridSelected });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spaceGridsSelected]);

    const handleSetGridSelected = (grid: GridTypeData) => {
        dispatch(setGridSelected({ grid: grid }))
    }

    return <div className="flex justify-evenly gap-1 py-2 items-center"> {spaceGridsSelected && spaceGridsSelected.map((grid: GridTypeData) => {
        return (
            <Card className="mx-1 border-2 border-blue-600/50 rounded-md px-3" key={grid.grid} shadow="sm" isPressable onPress={() => handleSetGridSelected(grid)}>
                <CardBody className="flex justify-start items-center  overflow-visible p-0 h-[140px]">
                    <p>{grid.arabName}.Nb: {grid.souraNb}  </p>
                    <p>grid : {grid.grid}. </p>
                    <p>groups : {grid.group}. </p>

                    <Button onPress={() => handleSetGridSelected(grid)} color="primary" 
                    variant="bordered" className={`border-2 border-blue-600 rounded-md  ${grid.grid === gridSelected.grid ? 'bg-orange-200' : 'bg-slate-400'} `}>
                        On board
                    </Button>
                   
                </CardBody>
            </Card>
        );
    })}</div>;
}

export default GridCard
    ;
