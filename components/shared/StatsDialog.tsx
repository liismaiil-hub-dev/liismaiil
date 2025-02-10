'use client'
import { Ayah, StatsTemplateType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';

import _ from 'lodash';
import { ElementRef, ElementType, memo, ReactNode, use, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter,  useDisclosure} from "@heroui/modal";
import {Button} from "@heroui/button";
import {Radio, RadioGroup} from "@heroui/radio";

import {  useFormStatus } from 'react-dom';
import {scaleLinear,BaseType,select, 
     scaleSequential, 
    interpolateRainbow,
    axisLeft,
     axisTop,
     format,
     min,
     max,
     axisBottom} from "d3";

import { getStatTaysir } from '@/actions/sprint';
import { getInsightTemplateByNb } from '@/actions/stage';

const dimentions = {
    width:1000,
    height:500,
    margin :{
        top:25,
        right:45,
        bottom:25,
        left:25,}}

enum OrderEnum { 
    ASC ='ASC',
    DESC =  'DESC'
}

const {height, margin, width } = dimentions
const boundedWidth = width  - margin.right - margin.left -25
const boundedHeight = height  - margin.top   
const drawSoura = ({
    SVG,
    minAySelected,
    maxAySelected, 
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    minAySelected: boolean,
    maxAySelected: boolean, 
    data:StatsTemplateType[]
}) => {
    console.log({data});
    const colorScale =scaleSequential([0,data.length ], ['blue', "green"]).interpolator(interpolateRainbow)
    try {
        const WIND_max = data.map((wind)=> wind.max )
        const WIND_min = data.map((wind)=> wind.min )

     const WINDOW_AY_MAX = Math.max(...WIND_max)
     const WINDOW_AY_MIN = Math.min(...WIND_min)
console.log(
    {WINDOW_AY_MIN,WINDOW_AY_MAX, diff:WINDOW_AY_MAX -WINDOW_AY_MIN }
);
    const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .rangeRound([margin.left , boundedWidth]).clamp(true)
  
                    
const _yScale = scaleLinear()
                .domain([ 0,data.length +1 ])
                .rangeRound([   margin.bottom, boundedHeight])
                .clamp(true)
const yScaleAxis = scaleLinear()
                .domain([1,data.length ])
                .rangeRound([  boundedHeight, margin.top])
                .clamp(true)
const xScaleAxis = scaleLinear()
                .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                .rangeRound([0, boundedWidth]).clamp(true)

               const _xticks =   xScaleAxis.ticks(WINDOW_AY_MAX - WINDOW_AY_MIN) 
                const _yticks =   yScaleAxis.ticks(data.length) 
  //.interpolate(interpolateHclLong)
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
   /*   const _svgWindow = SVG?.selectAll('rect')
                .data(data, async function(d, i ,n){
                    return d})
                .join('rect')
                .attr('width',function(d, i ){
                  console.log({min:d.max-d.min, xscMin:_xScale(d.min),xscMax:_xScale(d.max) });
                    
                  return (50 )
                   })
                .attr('height', function(d){
                    return 8
                })
                .attr('x', function(d, i){
                  //  console.log({ min:d.min});
                    return _xScale(d.min)  
                }).attr('transform','translate(-27,-15)')
                .attr('y', function(d, i){
                    return _yScale(i)+ (i + 11)* 2 
                })
                    .attr('fill', (d,i ) => colorScale(i))
                    .attr('rx', '2')
                    .attr('ry', '2')
    */               
  // g1
  const _svgWindow = SVG?.select('g:nth-of-type(1)').selectAll('line')
        .data(data, async function(d, i ,n){
            return d})
        .join('line')
        .attr('height', function(d){
            return 8
        })
        .attr('x1', function(d, i){
            console.log({ min:d.min});
            return _xScale(d.min)  
        }).attr('x2', function(d, i){
          //  console.log({ min:d.min});
            return _xScale(d.max)  
        }).attr('y1', function(d, i){
            console.log({ yscal:d.i});
          return boundedHeight- _yScale(i  )//+ ((i + 1) * 6)  
        }).attr('y2', function(d, i){
          //  console.log({ min:d.min});
          return boundedHeight-  _yScale(i )//+ ((i + 1) * 6)
        })
        .style('stroke', (d,i ) => colorScale(i))
        .style('hight', (d,i ) => d.max-d.min)
           // .attr('fill', (d,i ) => colorScale(i))
            .attr('rx', '2')
            .attr('ry', '2')
            .attr('transform',`translate(${margin.left+10},0)`)    

const formatFn = format('_>4') 

 const _ayMinWind =   SVG?.select('g:nth-of-type(2)').selectAll('text')
.data(data)
.join('text')
.text(function(d, i){
  console.log({d, min:d.min, pos: _xScale(d.min) });
        return  minAySelected ?`${d.ayMin}:${d.min}`: ''
     })
.attr('x', (d, i ) => {
      console.log({d, min:d.min, pos: _xScale(d.min) });
      return _xScale(d.min)
    }    )
.attr('y', function(d, i){
      return boundedHeight - _yScale(i) -margin.bottom
   })
.style('fill',(d,i ) => colorScale(i)) 
    .style('font-size','17px')
    .style('font-weight','light')
    .attr('transform',`translate(${margin.left+10},0)`)    

  
  const _ayMaxWind =   SVG?.select('g:nth-of-type(3)').selectAll('text')
 .data(data)
 .join('text')
 .text(function(d,i){
  return   maxAySelected ?`${d.ayMax}:${d.max}`: ''
  // return  `${formatFn(d.max)}`
  //     return `${d.max}-${d.ayMax}`
    })
    .attr('x', (d, i ) => {
    return _xScale(d.max)
    })
    .attr('y', function(d, i){
      return boundedHeight - _yScale(i)-margin.bottom - margin.top 
   })
    .style('fill',(d,i ) => colorScale(i)) 
        .style('font-size','17px')
        .style('font-weight','light') 
        .attr('transform',(d)  =>`translate(${ - margin.right - (5*d.ayMax.length) },0)`)    

        //   .attr('transform','rotate(45)')
//  console.log({_svgWindow, _ayMinWind, scalPo: scalePow().exponent()});
 
const _yAxisLeft = axisLeft(yScaleAxis)
const _displayYAxisG = SVG.select('g:nth-of-type(4)')
                .attr('id','yAxisLeftG')
               .attr('transform',`translate(${margin.left +20},0)`)    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

const _xAxisTop = axisBottom(xScaleAxis)
const _displayXAxisT = SVG.select('g:nth-of-type(5)')
                .attr('id','xAxisTop')
               .attr('transform',`translate(${margin.left +20},${boundedHeight})`)    
             //   .attr('margin', '10')
               _xAxisTop(_displayXAxisT)
}catch(error) {
console.log({error});

}}
export default function StatsDialog({isOpen,  onOpen, onClose}:{isOpen:boolean,  onOpen:()=> void,  onClose:()=> void}) {
    const dispatch = useDispatch()
  //  const [isPending, startTransition] = useTransition()
  
   const {pending} =   useFormStatus()
    const { insightTemplate, statsTemplateContext,insightTemplateAyahsSelected} = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const {  setGridsStaged, setStatsTemplateContext, setInsightTemplate } = stageActions
  const svgRef = useRef();
        const svgSoura = useRef();
     
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
      async function getStat() {
         try {
             const _statResp = await getStatTaysir({min:0, max:350}) 
             if(_statResp && _statResp.success) {
                const _stats= await JSON.parse(_statResp.message)
                 console.log({_stats});
                 dispatch(setStatsTemplateContext({stats:_stats}))
             } else if(!_statResp.success) {
             toast.warning(`something went wrong ${error}`)
     
             }  
         }catch(error) {
           toast.warning(`something went wrong ${error}`)
          }
        } 
        const [statsSoura, setStatsSoura] = useState([{}]);
        const [minBehavior, setMinBehavior] = useState("min");
        
        const [sprintUnder, setSprintUnder] = useState(-1);
     useEffect(() => {
         if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
         const _svgSoura =  select(svgSoura.current!)
         
         console.log({
             width: document?.querySelector('svg')?.clientWidth,
             hight: document?.querySelector('svg')?.clientHeight,
         });
         console.log({statsTemplateContext, insightTemplate});
         
         const  _dataSoura = statsTemplateContext.filter((wiAy)=> wiAy.souraNb == insightTemplate.souraNb)
         console.log({_dataSoura});
         const _diFFLastSprint = _dataSoura[_dataSoura.length -1].max -  _dataSoura[_dataSoura.length -1].min
         
         if(_diFFLastSprint   <25) {
          setSprintUnder(_diFFLastSprint +1)
        } 
        console.log({dMax:_dataSoura[_dataSoura.length -1].max, dMin:_dataSoura[_dataSoura.length -1].min, diFF:_dataSoura[_dataSoura.length -1].max - _dataSoura[_dataSoura.length -1].min })
        
            setStatsSoura(_dataSoura)
            drawSoura({SVG:_svgSoura, minAySelected:minBehavior==='min' , maxAySelected:minBehavior!=='min', data:_dataSoura  })
         
         }
     
         }, [statsTemplateContext, insightTemplate]);
    useEffect(() => {
  if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
    const _svgSoura =  select(svgSoura.current!)
    
    console.log({
        width: document?.querySelector('svg')?.clientWidth,
        hight: document?.querySelector('svg')?.clientHeight,
    });
    console.log({statsTemplateContext, insightTemplate});
    
    const  _dataSoura = statsTemplateContext.filter((wiAy)=> wiAy.souraNb == insightTemplate.souraNb)
    console.log({_dataSoura});
    
       setStatsSoura(_dataSoura)
    drawSoura({SVG:_svgSoura, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min', data:_dataSoura  })
  }
 }, [minBehavior]);
 
 console.log({sprintUnder});
 
   
    return       <Modal backdrop={'blur'} isOpen={isOpen} size={'full'} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-blue-700">{`
            ${insightTemplate.souraNb} - ${insightTemplate.arabName}-${insightTemplate.souraName}-
            ${statsSoura[statsSoura.length - 1]?.max! - statsSoura[0].min! } Ayahs
            From Ayah ${statsSoura[0]?.min} To Ayah ${statsSoura[statsSoura.length-1]?.max}
            {  ${sprintUnder !== -1 ? statsSoura.length -1  : statsSoura.length  } sprint of 25 Ayahs 
            ${sprintUnder !== -1 ? `and ${sprintUnder -1} ayahs`:'!' }  }
            `}</ModalHeader>
            <ModalBody>
            <div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
               <div className="flex justify-evenly items-center ">
                <SpaceButton  handlePress={prevSouraHandler} title='Prev ' />
                <SpaceButton  handlePress={nextSouraHandler} title='Next' />
                <SpaceButton  handlePress={getStat} title='Get Stats' />
            
        </div>
        <div className="h-full p-2  flex-col justify-start items-stretch border-2 border-violet-500  space-y-2">
        <svg ref={svgSoura!}   >
        <g /> 
        <g /> 
        <g /> 
        <g /> 
        <g /> 
        </svg>
        </div>
    </div>
            </ModalBody>
            <ModalFooter>
            <RadioGroup
                    orientation="horizontal"
                    value={minBehavior}
                    onValueChange={setMinBehavior}
                >
        <div className="flex  p-2  rounded-md justify-center items-center border-2 border-violet-500  space-y-2">
                  <Radio value="min">Min Ay</Radio>
                  <Radio value="max">Max Ay</Radio>
        </div>
              
              </RadioGroup>            
              </ModalFooter>
          
          </>
        )}
      </ModalContent>
    </Modal>
}
