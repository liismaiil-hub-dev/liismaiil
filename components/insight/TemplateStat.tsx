'use client'
import { addGuestToStage, createNewStage, getInsightTemplateByNb } from '@/actions/stage';
import { Ayah, StatsTemplateType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import _ from 'lodash';
import { memo, use, useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import { useFormState, useFormStatus } from 'react-dom';
import {scaleLinear, max, ScaleBand, min, scaleBand} from "d3";
import { SECTIONS_SOURAS } from '@/store/constants/constants';
import { getStatTaysir } from '@/actions/sprint';
const dimentions = {
    width:600,
    height:350,
    margin :{
        top:20,
        right:20,
        bottom:20,
        left:20,}}

function TempalteStat() {
    const dispatch = useDispatch()
  //  const [isPending, startTransition] = useTransition()
   const {pending} =   useFormStatus()
    const { insightTemplate, statsTemplateContext,insightTemplateAyahsSelected} = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const {  setGridsStaged, setStatsTemplateContext } = stageActions
     const [errorNb, setErrorNb] = useState(0);
const [statZoom, setStatZoom] = useState([0, 100]);

function nextGridHandler() {
        setStatZoom((prev) =>  ([prev[0]+100,prev[1]+100]))
    }

const {height, margin, width } = dimentions
const boundedWidth = width - margin.left - margin.right
const boundedHeight = height -margin.top - margin.bottom

const [data, setData] = useState([{
    x:-1,
    y:-1,
    height: -1,
    fill:''
}]);

const xAccessorMax = (d:StatsTemplateType) => d.max 
const xAccessorMin = (d:StatsTemplateType) => d.min 
const yAccessor = (d:StatsTemplateType) => d.souraNb 
const [xscaleState, setXscaleState] = useState();
const [yscaleState, setYscaleState] = useState();
const xScale = scaleLinear([0,max(data, (d )=> d.max!)],[0,boundedWidth])
const yScale = scaleBand([0, yAccessor],[0,boundedHeight])

const xDataMax = statsTemplateContext?.map((d:StatsTemplateType) =>{
    //console.log({souraNb : d.souraNb,max : d.max})
    return ({souraNb : d.souraNb,max : d.max})
}
).sort((a,b)=> a.max - b.max )
const minAyahLabels = statsTemplateContext?.map((d:StatsTemplateType) =>{
    //console.log({souraNb : d.souraNb,max : d.max})
    return (
        <text fill='#fff' key={d.min} x={xScale(d.min)} textAnchor='end'  y={yScale(d.souraNb)}>
        {d.ayMin}</text>
        )
}
)

const gridLines = statsTemplateContext?.map((d:StatsTemplateType) =>{
    //console.log({souraNb : d.souraNb,max : d.max})
    return (
        <line stroke='#fff' key={d.min} y1={0} 
         textAnchor='end'  y2={boundedHeight} 
         x1={xScale(d.min)} x2={xScale(d.min)} >
        {d.ayMin}</line>
        )
}
)

const souarStatsRect = xDataMax?.map((souraStats, index )=>   <rect key={`${souraStats.souraNb}-${souraStats.max}`} 
     x={dimentions.margin}  
     y={yScale(souraStats.souraNb)}    
    transform={`translate(0,${xScale(souraStats.max)})`}
        fill='darkorange!' stroke='#fff' 
        width={xScale(souraStats.max)} 
        height={yScale.bandwidth()}/>
  )    

  function prevGridHandler() {
    if(statZoom[0] !== 0){
    setStatZoom((prev) =>  ([prev[0]-100,prev[1]-100]))
    }
   }
 async function getStat() {
    try {
      //  console.log({statZoom});
        
        const _statResp = await getStatTaysir({min:statZoom[0], max:statZoom[1]}) 
        if(_statResp && _statResp.success) {
           const _stats= JSON.parse(_statResp.message)
            console.log({_stats});
           
            dispatch(setStatsTemplateContext({stats:_stats}))
        }else {
            toast.warning('something went wrong')
        }
    } catch (error) {
        toast.error(`${error} occured`)
        }
 }  
 //const badWidth = yscaleState?.bandWidth()
     //   const  stageId = `${gridSelected.souraNb}-${gridSelected.grid}-${gridsContext.length}-${gridIndexContext}`;

   

/*    const _sourasFlatten = [...SECTIONS_SOURAS.TIWAL,...SECTIONS_SOURAS.MIIN, ...SECTIONS_SOURAS.MATHANI,...SECTIONS_SOURAS.MOFASAL]
            const souraNb =  _sourasFlatten.map((souraNbName) =>souraNbName.souraNb )
            console.log({_sourasFlatten});
        if(insightTemplateAyahsSelected) {
            const extents = d3.extent(insightTemplateAyahsSelected, d=>d.numberInSurah )
            const _extents = d3.extent(insightTemplateAyahsSelected, d=>d.number )
            console.log({extents, _extents});
            if(typeof _extents !== 'undefined' && _extents ){
            const xScale = d3.scaleLinear(souraNb, [0, boundedWidth])

            const yScale = d3.scaleLinear([0,6236],[0, boundedHeight] )
            const colorScale =  d3.scaleSequential([0,6236],d3.interpolateRdYlBu)
            const __val = insightTemplateAyahsSelected.map((ay: Ayah) => {
                return {
                    x:xScale(insightTemplate.souraNb),
                    y:yScale(ay.number!),
                    height: _extents[1]! - _extents[0]!,
                    fill: colorScale(ay.number!)
                }
            })
            setData(__val)
            console.log({__val,});
          */   
    
    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
      
                <div className="flex justify-evenly items-center ">
            
            <SpaceButton disabled={false} handlePress={prevGridHandler} title='Prev 100 templates' />
            <SpaceButton disabled={false} handlePress={nextGridHandler} title='Next 100 Template' />
            <SpaceButton disabled={pending} handlePress={getStat} title='Get Stats' />
            
        </div>
        <div className="flex flex-col justify-start items-stretch  space-y-2">
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} >
        <rect fill='gray' width={'100%'} height={'100%'}/>
        <g transform={`traslate(${margin.left},${margin.top})`}> 

      {statsTemplateContext && typeof xscaleState !== 'undefined'&& 
            souarStatsRect
        }
        {
            minAyahLabels 
        }
        {gridLines}
          </g> 
        <g transform={`translate(0,${boundedHeight})`}> 
        <rect fill='lime' width={'100%'} height={'5px'}/>
        
        </g> 
        </svg>

            </div>
    </div>}

export default memo(TempalteStat);
