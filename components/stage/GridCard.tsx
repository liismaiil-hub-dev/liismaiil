'use client'
import { GridType } from "@/api/graphql/sprint/sprint.types";
import { sprintActions } from '@/store/slices/sprintSlice';
import { RootStateType } from '@/store/store';
import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function GridCard() {
    const dispatch = useDispatch()
    const {  gridSelected,spaceGridsSelected, } = useSelector((state: RootStateType) => state.sprint)

    const { setGridSelected } = sprintActions
    useEffect(() => {
console.log({gridSelected});
  
}, [gridSelected]);
const handleSetGridSelected = (grid: GridType)=> {
dispatch(setGridSelected({ grid: grid }))
}

    return <div className="gap-2 grid grid-cols-2 sm:grid-cols-4"> {spaceGridsSelected && spaceGridsSelected.map((grid: GridType) => {
        return (
            <Card key={grid.grid} shadow="sm" isPressable onPress={() => handleSetGridSelected(grid)}>
                <CardBody className="overflow-visible p-0 h-[140px]">
                    <p>{grid.arabName}. </p>
                    <p>grids : {grid.grid}. </p>
                    <p>groups : {grid.group}. </p>

                    <Button onPress={() => handleSetGridSelected(grid)} color="primary" variant="bordered" className="border-2 border-blue-600 rounded-md">
                        On board
                    </Button>  
                </CardBody>
            </Card>
        );
    })}</div>;
}

export default GridCard
;
