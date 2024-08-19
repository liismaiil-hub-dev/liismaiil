'use client'
import { GridJsoned } from "@/api/graphql/stage/stage.types";
import { sprintActions } from '@/store/slices/sprintSlice';
import { RootStateType } from '@/store/store';
import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function GridCard() {
    const dispatch = useDispatch()
    const {   gridSelected,spaceGridsSelected} = useSelector((state: RootStateType) => state.sprint)
console.log({spaceGridsSelected});

    const { setGridSelected } = sprintActions
    useEffect(() => {
console.log({gridSelected});
  
}, [gridSelected]);
const handleSetGridSelected = (grid: GridJsoned  )=> {
dispatch(setGridSelected({ grid: grid }))
}

    return <div className="flex justify-between items-center"> {spaceGridsSelected && spaceGridsSelected.map((grid: GridJsoned) => {
        return (
            <Card className="mx-6 border-2 border-blue-600 rounded-md px-6" key={grid.grid} shadow="sm" isPressable onPress={() => handleSetGridSelected(grid)}>
                <CardBody className="flex justify-start items-center  overflow-visible p-0 h-[140px]">
                    <p>{grid.arabName}. </p>
                    <p>grids : {grid.grid}. </p>
                    <p>groups : {grid.group}. </p>

                    <Button onPress={() => handleSetGridSelected(grid)} color="primary" variant="bordered" className= {`border-2 border-blue-600 rounded-md  ${grid.grid === gridSelected.grid ? 'bg-orange-200':'bg-slate-400'} ` }>
                        On board
                    </Button>  
                </CardBody>
            </Card>
        );
    })}</div>;
}

export default GridCard
;
