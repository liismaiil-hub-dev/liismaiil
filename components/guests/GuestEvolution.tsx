'use client'
import {  GuestPrismaType,  } from '@/app/api/graphql/stage/stage.types';
import { guestPrismaActions} from "@/store/slices/guestPrismaSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { memo, use, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Button} from '@heroui/button';
import {  useFormStatus } from 'react-dom';
import {scaleLinear,BaseType, select,  
     scaleSequential,
   interpolateRainbow,
     axisLeft,
    axisBottom,
    hierarchy,
    tree,
    stratify,
    group} from "d3";
import { Radio, RadioGroup } from '@heroui/radio';
import { getPrismaGuests } from '@/actions/guest';

enum OrderEnum { 
    ASC ='ASC',
    DESC =  'DESC'
}
const dimentions = {
    width:900,
    height:300,
    margin :{
        top:15,
        right:30,
        bottom:30,
        left:30,}}


const {height, margin, width } = dimentions
const boundedWidth = width  - margin.right -margin.left
const boundedHeight = height  - margin.top -margin.bottom  
const drawConnexions = ({
    SVG,
       data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    data:Map<string, []>
}) => {
  console.log({data})

  //let dataStructure = hierarchy(data)
 //console.log({dataStructure});
 //const treeLayout =  tree().size([dimentions.width, dimentions.height])
 //const information =treeLayout(dataStructure)
  
 //const colorScale =scaleSequential([0,data.length ], ['blue', "green"]).interpolator(interpolateRainbow)
   
  try {
/* 
        const TOKENIDS_ARR = data.map((guest)=> guest.tokenId )
      
     const TOKEN_MAX = Math.max(...TOKENIDS_ARR)
     const TOKEN_MIN = Math.min(...TOKENIDS_ARR)

    const _xScale = scaleLinear()
                    .domain([0  ,data.length ])
                    .rangeRound([margin.left , boundedWidth]).clamp(true) */
  
                    /* 
const _yScale = scaleLinear()
                .domain([ 0,_statCat.length +1 ])
                .rangeRound([   margin.bottom, boundedHeight])
                .clamp(true)
const yScaleAxis = scaleLinear()
                .domain([0,_statCat.length ])
                .rangeRound([  boundedHeight, margin.top])
                .clamp(true)
const xScaleAxis = scaleLinear()
                .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                .rangeRound([0, boundedWidth]).clamp(true)
 */
    //           const _xticks =   xScaleAxis.ticks(WINDOW_AY_MAX - WINDOW_AY_MIN) 
//                const _yticks =   yScaleAxis.ticks(_statCat.length) 
  //.interpolate(interpolateHclLong)
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
  // text
    const _souraLength =   SVG?.select('g:nth-of-type(1)').selectAll('text')
   .data(_statCat)
   .join('text')
   .text(function(d, i){
     console.log({d, min:d.min, pos: _xScale(d.min) });
           return  `${d.souraNb}-${d.max -d.min +1}`
        })
   .attr('x', (d, i ) => {

    if(i===0){
     return  _xScale(d.max - d.min + _xScale(d.min))- 10     

    }else if(d.souraNb>7 ) {

      return  _xScale(d.max - d.min + _xScale(d.min))+(i*28)    
    }else {
      return  _xScale(d.max - d.min + _xScale(d.min))+27    

    }
   }    )
   .attr('y', function(d, i){
    if(d.souraNb > 7){
     return boundedHeight - _yScale(i) -15//+ ((i + 1) * 6)  
    }else {
     return boundedHeight - _yScale(i) +25//+ ((i + 1) * 6)  

    }  })
   .style('fill',(d,i ) => colorScale(i)) 
       .style('font-size','8px')
       .style('font-weight','bold')
       .attr('transform',`translate(10,0)`)    
                   
// Circles
const _svgWindow = SVG?.select('g').selectAll('circle')
        .data(_statCat, async function(d, i ,n){
            return d})
        .join('circle')
        .attr('troke-width', function(d){
            return 8
        })
        .attr('cx', function(d, i){
            console.log({ _xmin:_xScale(d.min),min:d.min, max:d.max,_xmax : _xScale(d.max),  _xsc: _xScale(d.max - d.min )});
            
            return  _xScale(d.max - d.min )    +_xScale(d.min)
        }).attr('cy', function(d, i){
          console.log({ min:d.min, _ysc: _yScale(i)});
            console.log({ yscal:d.i});
          return boundedHeight - _yScale(i  )//+ ((i + 1) * 6)  
        }).attr('r', function(d, i){
          //  console.log({ min:d.min});
          return (d.max - d.min +1)/7
        })
       // .style('fill', 'rgb(240,240,240)')
        .style('fill', (d,i ) => colorScale(i))
           // .attr('fill', (d,i ) => colorScale(i))
            /* .attr('rx', '2')
            .attr('ry', '2')
            .attr('transform',`translate(${margin.left+10},0)`)    
 */
  
/*   const _ayMaxWind =   SVG?.select('g:nth-of-type(2)').selectAll('text')
 .data(data)
 .join('text')
 .text(function(d,i){
  return  maxAySelected ?`${formatFn(d.max)}`: ''
 
  // return  `${formatFn(d.max)}`
  //     return `${d.max}-${d.ayMax}`
    })
    .attr('x', (d, i ) => {
    return _xScale(d.max)
    })
    .attr('y', function(d, i){
      return boundedHeight - _yScale(i  )
   })
    .style('fill',(d,i ) => colorScale(i)) 
        .style('font-size','17px')
        .style('font-weight','light') 
        .attr('transform',`translate(${margin.left+10},0)`)    
 */
        //   .attr('transform','rotate(45)')
//  console.log({_svgWindow, _ayMinWind, scalPo: scalePow().exponent()});
 
const _yAxisLeft = axisLeft(yScaleAxis)
const _displayYAxisG = SVG.select('g:nth-of-type(3)')
                .attr('id','yAxisLeftG')
               .attr('transform',`translate(${margin.left},0)`)    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

const _xAxisBottom = axisBottom(xScaleAxis)
const _displayXAxisT = SVG.select('g:nth-of-type(4)')
                .attr('id','xAxisTop')
               .attr('transform',`translate(0,${boundedHeight})`)    
             //   .attr('margin', '10')
               _xAxisBottom(_displayXAxisT)
}catch(error) {
console.log({error});

}}

// COMPNENT GUEST CONNEXIONS EVOLUTION
function GuestEvolution() {
    const dispatch = useDispatch()
   const {pending} =   useFormStatus()
    const {   guestsForConnexions} = useSelector((state: RootStateType) => state.guestPrisma)
  const { setGuestsForConnexions} = guestPrismaActions
    const svgConnexion = useRef();
   const svgEvolution = useRef();

const [minBehavior, setMinBehavior] = useState("min");
const [guestsHyerachy, setGuestsHyerachy] = useState<Map<unknown>>();
type dataHie = {
  "host": string,
  "tokenId": string
}
useEffect(() => {
  if(typeof guestsForConnexions !== 'undefined' && guestsForConnexions){
    const _svgConnexion =  select(svgConnexion.current!)
    const _svgEvolution =  select(svgEvolution.current!)
    
    console.log({
        width: document?.querySelector('svg')?.clientWidth,
        hight: document?.querySelector('svg')?.clientHeight,
    });
     
  if(typeof guestsForConnexions !== 'undefined' && guestsForConnexions.length > 0){
      //console.log({guestsPrisma});
      const _svgConnexion =  select(svgConnexion.current!)
      const _svgEvolution =  select(svgEvolution.current!)
           console.log({
          width: document?.querySelector('svg')?.clientWidth,
          hight: document?.querySelector('svg')?.clientHeight,
      });

const _groupHost = group(guestsForConnexions, d =>d.host)
const _groupHostArr =  Array.from(
  _groupHost, 
  ([key, value]) => ({ key, value: value[0].tokenId })
)
const _dataHier:dataHie[]  = guestsForConnexions.map((gst: GuestPrismaType) => ({
  "host": `${gst.host}`,
  "tokenId": `${gst.tokenId}`,
}))

console.log({_dataHier});

  //const _hierStrat=stratify().id((d:dataHie)=> d.tokenId ).parentId((d: dataHie)=> d.host )(_dataHier)
 //setGuestsHyerachy(_connHierarch, )
          
         console.log({guestsForConnexions,});
        }// end _hosts
        //drawConnexions({SVG:_svgConnexion,  data:guestsHyerachy  })
      }
  }, []); 
 useEffect(() => {
   console.log({guestsForConnexions});
   
 }, [guestsForConnexions]);
 
 const [wind, setWind] = useState({
  min:0,
  max:100
 });
 
 async function getGuestsHandler(){
  const nextWind =  await getPrismaGuests(wind.min, wind.max)
  if(nextWind.success && nextWind.guests ){
    dispatch(setGuestsForConnexions({guestsPrisma:JSON.parse(nextWind.guests)}))
}
}

    return (<div className={`flex-col h-full border-1 border-blue-400 rounded-md gap-1 justify-start p-1   items-stretch w-full`} >
               <div className="flex p-1  justify-center items-center ">
                 <Button  className='border-1 bg-blue-500 px-3 py-1 rounded-md' onPress={getGuestsHandler} >
                 Get Next Mi1a
                 </Button>
            
              </div>
        <div className="grid grid-cols-2 grid-flow-row h-full  justify-start items-stretch gap-2">
        <div className="flex  col-span-1 p-1 border-1 border-violet-500 justify-center items-center rounded-md">
            <svg ref={svgConnexion!}   >
            <g/> 
            <g/> 
            <g/> 
            <g/> 
            </svg>
        </div>
        <div className="flex col-span-1  border-1 border-violet-500 justify-center items-center rounded-md">
            <svg ref={svgEvolution!}   >
            <g/> 
            <g/> 
            <g/> 
            <g/>
            </svg>
        </div>
         </div>
        <div className="flex  col-span-1 p-1 border-1 mt-1 shadow-md justify-center items-center rounded-md">
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
              </div>
              </div>)
    }

export default memo(GuestEvolution);
