'use client'
import { statTaysirPersist } from "@/actions/sprint";
import { Ayah, GridTypeData, StagePrismaType } from "@/api/graphql/stage/stage.types";
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import { Button, } from "@heroui/button";
import {Card, CardBody } from "@heroui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

function TemplateCard() {
    const dispatch = useDispatch()
    const { insightTemplate, gridSelected,spaceStages, spaceGridsSelected, spaceStageSelected } = useSelector((state: RootStateType) => state.stage)

    const {  setInsightTemplateAyahsSelected  } = stageActions
    const [templateSelected, setTemplateSelected] = useState(-1);
    
    useEffect(() => {
        console.log({insightTemplate});
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insightTemplate]);

    const handleSetGridSelected = (grid:Ayah[] ) => {
        console.log({grid,});
        
        dispatch(setInsightTemplateAyahsSelected({ ayahs: grid }))
    }
    const getStatAndPersist = async( {min, max , length, ayMin, ayMax}:{min:number, max: number , length: number, ayMin:string, ayMax:string}) => {
        const souraNb = insightTemplate.souraNb;
        console.log({ ayMin,ayMax});
        try {
            
            const resp = await statTaysirPersist({min, max, length,souraNb, ayMin,ayMax})
if(resp && resp.success) {
    toast.success(`stat for ${insightTemplate.souraNb}successfully persisted` )
        }
        } catch (error) {
    toast.warning(`error occured when trying to persist ${insightTemplate.souraNb} stat` )
            
        }

    }

    return <div className="flex justify-start gap-1 p-2 items-center overflow-hidden overflow-y-scroll flex-wrap h-40"> {
        insightTemplate && insightTemplate.ayahs.map((ayStri: string, index: number) => {
            const ayaParsed = JSON.parse(ayStri)
        return (
            <Card className="mx-1 border-2 border-blue-600/50 rounded-md px-3" key={index} shadow="sm" >
                <CardBody className="flex justify-start items-center  overflow-visible p-1">
                    <p>Nb Of Ayahs : {ayaParsed.length}. </p>
                    <p>from : {ayaParsed[0].number} to {ayaParsed[ayaParsed.length -1].number}  </p>
                   
                    <Button onPress={() => {
                        handleSetGridSelected(ayaParsed)
                        getStatAndPersist({min:ayaParsed[0].number,
                            max:ayaParsed[ayaParsed.length -1].number,
                            length: ayaParsed.length,
                        ayMin: ayaParsed[0].text,
                    ayMax: ayaParsed[ayaParsed.length -1].text} )
                        setTemplateSelected(index)
                    }} color="primary" 
                    variant="bordered" className={`border-2 border-blue-600 rounded-md  
                    ${templateSelected === index ? 'bg-orange-200' : 'bg-slate-400'} `}>
                        Insight
                    </Button>
                   
                </CardBody>
            </Card>
        );
    })}</div>;
}

export default TemplateCard
    ;
