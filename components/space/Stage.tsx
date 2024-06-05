'use client'
import { GridType } from "@/api/graphql/sprint/sprint.types";
import { sprintActions } from '@/store/slices/sprintSlice';
import { RootStateType } from '@/store/store';
import { Button, Card, CardBody } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';

function Stage() {
    const dispatch = useDispatch()
    const { sprints, spaceGridsSelected, gridSelected } = useSelector((state: RootStateType) => state.sprint)

    const { setGridSelected } = sprintActions

    console.log({ spaceGridsSelected });

    return <div className="gap-2 grid grid-cols-2 sm:grid-cols-4"> {spaceGridsSelected && spaceGridsSelected.map((grid: GridType) => {
        return (
            <Card key={grid.grid} shadow="sm" isPressable onPress={() => dispatch(setGridSelected({ grid: grid }))}>
                <CardBody className="overflow-visible p-0 h-[140px]">
                    <p>{grid.arabName}. </p>
                    <p>grids : {grid.grid}. </p>
                    <p>groups : {grid.group}. </p>

                    <Button onPress={() => { console.log('pressed') }} color="primary" variant="bordered" className="border-2 border-blue-600 rounded-md">
                        On board
                    </Button>


                </CardBody>
            </Card>
        );
    })}</div>;
}

export default Stage;
