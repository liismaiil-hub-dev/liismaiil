'use client'
import { GuestPrismaType, StagePrismaType } from "@/api/graphql/stage/stage.types";
import { guestPrismaActions } from "@/store/slices/guestPrismaSlice";
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { Button, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


function StepsCaroussel({ currentGuest }: { currentGuest: GuestPrismaType }) {
    const dispatch = useDispatch()
    const { stageGridSelected, stageGridsContext } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setGuestPrisma } = guestPrismaActions
    // console.log({ stageGridsContext });
    console.log({ guestPrisma, currentGuest });

    const [stagesState, setStagesState] = useState({
        grid: -1,
        group: -1,
        souraNb: -1,
        arabName: '',
        souraName: '',
        ayahs: '',
        id: 0
    });
    const { setStageGridSelected } = stageActions
    useEffect(() => {
        console.log({ stageGridSelected });
        // setStagesState(stageGridSelected)

    }, [stageGridSelected]);
    const handleSetStageGridSelected = (grid: StagePrismaType) => {
        dispatch(setStageGridSelected({ stage: grid }))
    }

    return <ScrollShadow orientation="horizontal" className="h-full grid grid-cols-5 gap-1 p-2 flex-wrap">
        {stageGridsContext && stageGridsContext.map((grid: StagePrismaType, index) => {
            return (

                <Card className="mx-6 border-2 border-blue-600 rounded-md px-6" key={grid.stageId} shadow="sm" isPressable onPress={() => handleSetStageGridSelected(grid)}>
                    <CardBody className="flex justify-start items-center  overflow-visible p-0 h-[140px]">
                        <p>{grid.stageId}. </p>
                        <p>{grid.souraName}. </p>
                        <p>grids : {grid.grid}. </p>

                        <Button onPress={() => handleSetStageGridSelected(grid)} color="primary" variant="bordered" className={`border-2 border-blue-600 rounded-md  ${grid.grid === stageGridSelected?.grid ? 'bg-orange-200' : 'bg-slate-400'} `}>
                            On board
                        </Button>
                    </CardBody>
                </Card>
            );
        })}

    </ScrollShadow>
}

export default StepsCaroussel
    ;
