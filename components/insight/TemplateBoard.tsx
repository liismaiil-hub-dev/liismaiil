'use client'

import TemplateOrdered from "@/components/insight/TemplateOrdered";

import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RadioButtonEvalState from "./RadioButtonInsight";
import SpaceButton from './SpaceButton';
import TemplateDistribution from './TemplateDistribution';
import StatSouraDialog from './StatSouraDialog';
import {useDisclosure} from "@heroui/modal";
import { getInsightTemplateByNb } from '@/actions/stage';
import { toast } from 'react-toastify';
import TemplateSouraStats from './TemplateSouraStats';
import TemplateSouarPanoramic from './TemplateSouarPanoramic';
import CatDialog from './CatDialog';
import TemplateCat from "@/components/insight/TemplateCat";



export enum INSIGHT_STATE {
  CAT = 'CAT',
  SOURA = 'SOURA',
  PANORAMIC = 'PANORAMIC',
}
/**
 * Space board PRINCIPAL Component
 */

const TemplateBoard = () => {
  const dispatch = useDispatch()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { insightTemplate,insightTemplateAyahsSelected, insightContext, insightWindow , windowContext} = useSelector((state: RootStateType) => state.stage)
  
  const {  setInsightWindow, setInsightTemplate, setInsightTemplateAyahsSelected, setInsightContext } = stageActions

  useEffect(() => {
    if (typeof insightTemplate !== 'undefined' && typeof insightTemplateAyahsSelected !== 'undefined' && 
      insightTemplateAyahsSelected.length > 0  ) {
        dispatch(setInsightContext({insight:INSIGHT_STATE.SOURA}))
        
      }
    }, []);
    
    async function nextSouraHandler() {
      if(typeof insightTemplate !== 'undefined'&& insightTemplate && insightTemplate.souraNb>0 && insightTemplate.souraNb <115){
        try {
          const templateByNb = await getInsightTemplateByNb(insightTemplate.souraNb +1 )
          console.log({templateByNb});
          
          if(typeof templateByNb !== 'undefined' &&  templateByNb.success){
            console.log({ grids: templateByNb.templates });
            dispatch(setInsightTemplate({ template: JSON.parse(templateByNb.templates)[0] }))
          }else if(!templateByNb.success){
            toast.warning(`${templateByNb.templates}`)
            
          }
        } catch (error) {
          toast.warning(`${error}`)
        } 
      }else {
        try {
          const templateByNb = await getInsightTemplateByNb(1)
          console.log({templateByNb});
          
          if(typeof templateByNb !== 'undefined' &&  templateByNb.success){
            console.log({ grids: templateByNb.templates });
            dispatch(setInsightTemplate({ template: JSON.parse(templateByNb.templates)[0] }))
        }else if(!templateByNb.success){
        toast.warning(`${templateByNb.templates}`)
  
        }
      } catch (error) {
        toast.warning(`${error}`)
      }
    }
  }
  async function nextGridHandler() {
    if(typeof insightTemplate !== 'undefined'&& insightTemplate && insightTemplate.souraNb>0 && insightTemplate.souraNb <115 && insightWindow<insightTemplate.ayahs.length ){
    dispatch(setInsightWindow({window:insightWindow + 1})) 
       }else {
        dispatch(setInsightWindow({window:0}))
        
      }
    }
    useEffect(() => {

      if(typeof insightTemplate !== 'undefined'&& insightTemplate && insightTemplate.souraNb>0 && insightTemplate.souraNb <115 
        && insightWindow<insightTemplate.ayahs.length ){

      console.log({insightWindow ,insightTemplateAyahsSelected, insightTemplate, ayahs: JSON.parse(insightTemplate.ayahs[insightWindow]) });
      dispatch(setInsightTemplateAyahsSelected({ayahs: JSON.parse(insightTemplate.ayahs[insightWindow])})) 
      }      
    }, [insightWindow, windowContext]);
    
     
  async function prevSouraHandler() {
    if(typeof insightTemplate !== 'undefined'&& insightTemplate && insightTemplate.souraNb>0 && insightTemplate.souraNb <115){
      try {
           const templateByNb = await getInsightTemplateByNb(insightTemplate.souraNb -1 )
           console.log({templateByNb});
           if(typeof templateByNb !== 'undefined' &&  templateByNb.success){
           console.log({ grids: templateByNb.templates });
            dispatch(setInsightTemplate({ template: JSON.parse(templateByNb.templates)[0] }))
           }else if(!templateByNb.success){
           toast.warning(`${templateByNb.templates}`)
          }
         } catch (error) {
           toast.warning(`${error}`)
         } 
        }else {
          try {
            const templateByNb = await getInsightTemplateByNb(1)
            console.log({templateByNb});
            if(typeof templateByNb !== 'undefined' &&  templateByNb.success){
            console.log({ grids: templateByNb.templates });
             dispatch(setInsightTemplate({ template: JSON.parse(templateByNb.templates)[0] }))
            }else if(!templateByNb.success){
            toast.warning(`${templateByNb.templates}`)
          }
          } catch (error) {
            toast.warning(`${error}`)
          }
        }
  }
  async function modalInsightHandler() {
    console.log({isOpen});
    
    onOpen()   
  }

  
  useEffect(() => {
      console.log({isOpen});

      if(typeof insightTemplateAyahsSelected != 'undefined' ){
       console.log({tempalteAyahs : insightTemplateAyahsSelected});
   
    //  dispatch(setInsightTemplateAyahsContext({ayahs: JSON.parse(insightTemplateAyahsSelected?.ayahs)}))
 } }, [insightTemplateAyahsSelected,isOpen]);
  
  return (
    <div className=" flex-col justify-start space-y-2 h-full items-center w-full ">
      <div className="flex  justify-around  items-center  py-2 ">
        <SpaceButton disabled={false} handlePress={prevSouraHandler} title='Prev Soura' />
        <SpaceButton disabled={false} handlePress={nextSouraHandler} title='Next Soura' />
        <SpaceButton disabled={false} handlePress={nextGridHandler} title='Next Window' />
        <SpaceButton disabled={false} handlePress={modalInsightHandler} title='Modal Screen' />

        <RadioButtonEvalState
          insightState={INSIGHT_STATE.CAT} title='Categories' />
        <RadioButtonEvalState
          insightState={INSIGHT_STATE.SOURA} title='Soura' />
          <RadioButtonEvalState
          insightState={INSIGHT_STATE.PANORAMIC} title='Panoramic' />
       
        </div>
      { typeof insightTemplateAyahsSelected  !== 'undefined' && insightTemplateAyahsSelected.length> 1  &&  isOpen && 
      insightContext === INSIGHT_STATE.SOURA  ?  
        <div className=" flex justify-center w-screen h-screen items-center p-2 overflow-scroll ">
           <StatSouraDialog isOpen={isOpen}  onOpen={onOpen} onClose={onClose}/>
         </div>: insightContext === INSIGHT_STATE.SOURA? 
         <div className="grid  grid-cols-1 md:grid-cols-2 w-full ">
          <div className=" md:order-first  flex justify-stretch w-full flex-1 items-start m-1 ">
            <TemplateOrdered />
          </div>
          <div className=" md:order-first  flex justify-stretch w-full flex-1 items-start m-1 ">
            <TemplateSouraStats />
          </div>
          </div> : isOpen && insightContext === INSIGHT_STATE.CAT ?  
          <div className=" flex justify-center w-full h-full items-center p-2 overflow-scroll ">
               <CatDialog isOpen={isOpen}  onOpen={onOpen} onClose={onClose}/>
          </div>
          :insightContext === INSIGHT_STATE.CAT ?
          
          <div className=" flex-col overflow-scroll row-span-1  justify-start items-stretch w-full flex-1 border-3 border-pink-500 
          shadow-md  m-1 p-1">
               <TemplateCat  /> 
          </div>: insightContext === INSIGHT_STATE.PANORAMIC? 
      <div className=" flex-col overflow-scroll row-span-1 justify-start items-stretch w-full border border-orange-200 shadow-md  flex-1  m-1 p-1">
            <TemplateSouarPanoramic  /> 
      </div>: null}   
    </div>
  )
}

export default TemplateBoard

