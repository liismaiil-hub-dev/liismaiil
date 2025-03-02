'use client'
import { Ayah, StatsTemplateType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import _ from 'lodash';
import { ElementRef, ElementType, memo, ReactNode, use, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import { useFormState, useFormStatus } from 'react-dom';
import {selectAll,scaleLinear, axisBottom, axisRight, extent, min, max, scaleOrdinal, 
    select,schemeRdYlGn, schemeRdYlBu, schemeCategory10,schemeYlOrBr, axisLeft, BaseType,
    schemeGreens} from "d3";
import { SECTIONS_SOURAS } from '@/store/constants/constants';
import { getStatTaysir } from '@/actions/sprint';

const dimentions = {
    width:600,
    height:550,
    margin :{
        top:20,
        right:20,
        bottom:20,
        left:60,}}

const {height, margin, width } = dimentions
const boundedWidth = width - margin.right
const boundedHeight = height - margin.bottom


const drawChart = ({
    SVG,chartData, data, souraNbArr,height, width 
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    chartData: [],
    data: [], 
    souraNbArr:[number],
    height: number,
    width: number 
}) => {
    console.log({souraNbArr});

const xScale = scaleLinear([min(data, (d)  => d?.min!), max(data, (d)  => d?.max!)],[margin.left,boundedWidth])
const yScale = scaleLinear([0,max(data, (d)  => d?.souraNb!)],[boundedHeight, margin.top])
const colorScale = scaleOrdinal(souraNbArr, schemeCategory10).unknown(null)  
const scdRec = select('rect:nth-of-type(3)')
console.log({scdRec});
scdRec.style('background-color', 'brown')

SVG?.selectAll('rect')
.data(data).select(function(d, i, n){
    console.log({d, i, n});
     //select(this).attr('width', d => d.max)
    return this
})
.attr('x', (d:StatsTemplateType)  => xScale(d.min ))
.attr('width', (d:StatsTemplateType)  => d.max )
.attr('y', (d:StatsTemplateType)  => yScale(d.souraNb ))    
.style('fill',(d:StatsTemplateType)  => colorScale(d.souraNb) )
.transition()
.duration(500)
    

    console.log({SVG});
    // axis 
SVG?.append('g')
    .call(axisLeft(yScale).ticks(114))
    .attr('transform', `translate(${margin.left},0)`)
    .call((g)=> g.select('.domain').remove())    
    SVG?.append('g')
    .call(axisBottom(xScale).ticks(10))
    .attr('transform', `translate(0,${boundedHeight})`)
    .call((g)=> g.select('.domain').remove())    
    
    scdRec.select(function(d, i, n){
    console.log({d, i, n});
    
    })
}


 
function TempalteDistribution() {
    const dispatch = useDispatch()
  //  const [isPending, startTransition] = useTransition()
   const {pending} =   useFormStatus()
    const { insightTemplate, statsTemplateContext,insightTemplateAyahsSelected} = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const {  setGridsStaged, setStatsTemplateContext } = stageActions
 
const [statZoom, setStatZoom] = useState([0, 100]);

const svgRef = useRef();
function nextGridHandler() {
        setStatZoom((prev) =>  ([prev[0]+100,prev[1]+100]))
    }

/* const minAyahLabels = statsTemplateContext?.map((d:StatsTemplateType) =>{
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
) */
useEffect(() => {
    const xDataMax = statsTemplateContext?.map((stTem:StatsTemplateType)=> stTem ).sort((a,b)=> a.max - b.max )
    const _souraNb = statsTemplateContext?.map((d:StatsTemplateType) => d.souraNb).sort((a,b) => a-b )
    const chartData = statsTemplateContext?.map((d:StatsTemplateType) => d.ayMax)
    const souraNbArr = [...new Set(_souraNb)];
    console.log({souraNbArr,xDataMax});
    if(typeof xDataMax !== 'undefined' && xDataMax.length > 0){
    console.log({xDataMax});
    
        drawChart({SVG:select(svgRef.current), data:xDataMax, souraNbArr, height, width,chartData })
    }
}, [statsTemplateContext]);

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
            xmlns='http://www.w3.org/2000/svg' width={width} height={height} 
          */   
    
    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
      
                <div className="flex justify-evenly items-center ">
            
            <SpaceButton disabled={false} handlePress={prevGridHandler} title='Prev 100 templates' />
            <SpaceButton disabled={false} handlePress={nextGridHandler} title='Next 100 Template' />
            <SpaceButton disabled={pending} handlePress={getStat} title='Get Stats' />
        </div>
        <h1 className="text-green-300"> Bismai ALLAH
        </h1>

        <div className="flex flex-col justify-start items-stretch  space-y-2">
        <svg ref={svgRef!} viewBox={`0 0 ${width} ${height}`}  >
        <circle cx={boundedWidth - boundedWidth/2} cy={boundedHeight - boundedHeight/2} r={15} fill='green' />
        <g transform={`traslate(${margin.left},${margin.top})`}> 
      {statsTemplateContext && statsTemplateContext.map((sts, index)  => <rect className='bars' key={sts.max} fill='#fff'
       width={'100%'} height={'15px'}/>) 
        }


    </g> 
        </svg>

            </div>
    </div>}

export default memo(TempalteDistribution);
