'use client'
import { SprintPrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { Button, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function SprintsBoard({ sprints }: { sprints: SprintPrismaType[] }) {
    const dispatch = useDispatch()
    const { sprintsContext, sprintSelected } = useSelector((state: RootStateType) => state.stage)

    // console.log({ stageGridsContext });

    const { setSprintsContext, setSprintSelected } = stageActions
    useEffect(() => {
        console.log({ sprintsContext });
        dispatch(setSprintsContext({ sprints }))

    }, [sprints]);
    const handleSprintSelected = (sprt: SprintPrismaType) => {
        dispatch(setSprintSelected({ sprint: sprt }))
    }

    return <ScrollShadow orientation="vertical" className="h-full flex-wrap">
        <div className="flex justify-between items-center"> {sprintsContext && sprintsContext.map((sprt: SprintPrismaType, index) => {
            return (

                <Card className="mx-6 border-2 border-blue-600 rounded-md px-6" key={sprt.sprintId} shadow="sm" isPressable onPress={() => handleSprintSelected(sprt)}>
                    <CardBody className="flex justify-start items-center  overflow-visible p-0 h-[140px]">
                        <p>{sprt.sprintId}. </p>
                        <p>{sprt.stage?.souraName}. </p>
                        <p>grids : {sprt.stage?.grid}. </p>

                        <Button onPress={() => handleSprintSelected(sprt)} color="primary" variant="bordered" className={`border-2 border-blue-600 rounded-md  ${sprt?.stage?.grid === sprintSelected?.stage?.grid ? 'bg-orange-200' : 'bg-slate-400'} `}>
                            On board
                        </Button>
                    </CardBody>
                </Card>
            );
        })}
        </div>
    </ScrollShadow>
}

export default SprintsBoard
    ;
