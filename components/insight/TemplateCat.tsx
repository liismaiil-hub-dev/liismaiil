'use client'
import { addGuestToStage, createNewStage, getInsightTemplateByNb } from '@/actions/stage';
import { Ayah, StatsTemplateType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import _ from 'lodash';
import { memo, use, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import { useFormState, useFormStatus } from 'react-dom';
import {scaleLinear,BaseType, pointer, pointers, select, min, max,scalePow, 
    tickFormat, interpolateHslLong, scaleSequential, interpolateRdYlBu, scaleOrdinal, schemeCategory10,interpolate,
    interpolateHclLong,scaleQuantile,
    interpolateRainbow,
    scaleQuantize,
    scaleThreshold,
    scaleBand,
    scalePoint,
    axisLeft,
    schemePastel1} from "d3";
import { SECTIONS_SOURAS } from '@/store/constants/constants';
import { getStatTaysir } from '@/actions/sprint';
import { Radio, RadioGroup } from '@heroui/radio';

enum OrderEnum { 
    ASC ='ASC',
    DESC =  'DESC'
}
function updateBars( d, i, n) {
    console.log({updated: d, updatei:i, updateN:n});
   const _myrect = select(n[i])
   console.log({_myrect});
   
   _myrect
}
const drawTiwal = ({
  SVG,
  order, 
  data
}:{
  SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
  order:OrderEnum
  data:StatsTemplateType[]
}) => {
  console.log({data});
  try {
    const _souraNb = data.map((wind)=> wind.souraNb )
    const WIND_max = data.map((wind)=> wind.max )
    const WIND_min = data.map((wind)=> wind.min )
    const souraNbArr = [...new Set(_souraNb)];
    
    const SVG_WIDTH = select(SVG).node().clientWidth 
    const SVG_HIGHT = select(SVG).node().clientHeight
    const WINDOW_LENGTH = data.length
    const WINDOW_AY_MAX = Math.max(...WIND_max)
    const WINDOW_AY_MIN = Math.min(...WIND_min)
 // const    souraNbArr = souraNbArr.filter((win) =>  win < 8)
     console.log({SVG_WIDTH,SVG_HIGHT, WINDOW_LENGTH, WINDOW_AY_MAX , WINDOW_AY_MIN, souraNbArr});
     /* 
 SVG.on('click' ,  (e, d) => {
    //return null // 
      console.log({ pointers:pointers(e), d});
  }) */
  const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .rangeRound([margin.left, boundedWidth]).clamp(true)
  const xScale = scaleBand()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .range([margin.left, boundedWidth])
                    //.clamp(true)

                    const _xticks =   _xScale.ticks(100) 
console.log({WINDOW_AY_MIN,WINDOW_AY_MAX });

const yScale = scaleLinear()
                .domain([Math.max(...souraNbArr),Math.min(...souraNbArr) ])
                .rangeRound([ boundedHeight, margin.top])
                .clamp(true)
    const _yScale = scalePoint()
                .domain([Math.min(...souraNbArr),Math.max(...souraNbArr) ])
                .rangeRound([margin.top, boundedHeight])
               // .clamp(true)
       //d3.interpolateRdYlBu         
    //const colorScale =scaleOrdinal([Math.min(...souraNbArr),Math.max(...souraNbArr) ], schemeCategory10).unknown(null)  
    const _colorScale =scaleLinear([Math.min(...souraNbArr),Math.max(...souraNbArr) ], ['blue', "orange"])
    .unknown(null).clamp(true)  
  //.interpolate(interpolateHclLong)
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
     const _svgWindow = SVG?.selectAll('rect')
                .data(data, async function(d, i ,n){
                    return d})
                .join('rect')
                .attr('width',function(d, i ){
                       /*  console.log({dmax:d.max,
                                    dmin:d.min ,
                                    xDmax:_xScale(d.max),
                                    xDmin:_xScale(d.min),
                                    width:_xScale(d.max) - _xScale(d.min)}); */
                    return (d.max - d.min )

                        })
                .attr('height', function(d){
                    return 8
                })
                .attr('x', function(d, i){
                  //  console.log({ min:d.min});
                    return _xScale(d.min) + i * 2 
                }).attr('transform','translate(-27,-10)')
                .attr('y', function(d, i){
                    //console.log({ souraNb:d.souraNb, scal: _yScale(d.souraNb)});
                    return yScale(d.souraNb) 
                         //_yScale(d.souraNb)  
                    })
                    .attr('fill', (d ) => colorScale(d.souraNb))
                    .attr('rx', '2')
                    .attr('ry', '2')
                    .attr('transform','translate(10,0)') 
 
/* const _svgText = SVG?.selectAll('rect')
                    .data(data, async function(d, i ,n){
                        return d})
                    .join('rect').on('click', (e, d) => {
                        //return null // 
                          console.log({ pointers:pointers(e), d});
                      })
                    .attr('width',
                        function(d ){
                            return (_xScale(d.max)- _xScale(d.min))
                        }
                    )
                    .attr('height', function(d){
                        console.log({ min:d.min , height:boundedHeight / souraNbArr.length -5});
                        return '3'
                        })
                    .attr('x', function(d){
                        console.log({ min:d.min});
                        return _xScale(d.min)
                        })
                    .attr('y', function(d,i ){
                        return i * 3 + 5
                        
                        }).style('fill',function(d, ){
                            console.log({colord:d});
                            
                            return colorScale(d.souraNb)
                        })
 */// Min Ayah 
  
 const _ayMinWind =   SVG?.selectAll('text')
.data(data)
.join('text')
.text(function(d,i, n){
        console.log({dMaxMIN: d.max - d.min});
        
        return `${d.min}`
  //`${d.souraNb}-${d.ayMin}`
   })
.attr('x', (d, i ) => _xScale(d.min) -i*3    )
.attr('y', function(d,i ){
    return yScale(d.souraNb) 
    }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
    .style('font-size','7px')
    .style('font-weight','light')
    .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*5},0)`) 
    
 const _ayMaxWind =   SVG?.selectAll('text:nth-of-type(2)')
 .data(data)
 .join('text')
 .text(function(d,i){
     //console.log({ayMin:d.ayMin});
     
     return `${d.max}` 
     //`${d.souraNb}-${d.ayMin}`
    })
 .attr('x', (d, i ) => _xScale(d.min)  -i*3 )
 .attr('y', function(d,i ){
     return yScale(d.souraNb) +17 
     }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
     .style('font-size','7px')
     .style('font-weight','light')
     .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
    //   .attr('transform','rotate(45)')

      //  console.log({_svgWindow, _ayMinWind, scalPo: scalePow().exponent()});
 
const _yAxisLeft = axisLeft(yScale)
const _displayYAxisG = SVG.select('g')
                .attr('id','yAxisLeftG')
               .attr('transform','translate(30,0)')    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

}catch(error) {
console.log({error});

}}

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
const drawCat = ({
    SVG,
    section,
    minAySelected,
    maxAySelected, 
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    minAySelected: boolean,
    maxAySelected: boolean, 
    section:{souraName:string,
      souraNb: number }[],
    data:StatsTemplateType[]
}) => {
   // console.log({data})
const _statCat = [{souraNb:data[0].souraNb,
    min:data[0].min,
    max:data[0].max,
    ayMin :data[0].ayMin,
    ayMax :data[0].ayMax,
}]
 data.forEach(stt => {
    console.log({stt});
    
      if(_statCat.length ===1 && _statCat[0].souraNb !== stt.souraNb ) {
        _statCat.push(stt)
      }else  if(_statCat.length ===1 && _statCat[0].souraNb === stt.souraNb && stt.max > _statCat[0].max) {
          _statCat.splice(0,1, {
            min:  _statCat[0].min,
            max:stt.max,
            ayMin:_statCat[0].ayMin,
            ayMax:stt.ayMax,
            souraNb:stt.souraNb
          })
        
      }else if(_statCat.length !==1 && _statCat[_statCat.length -1].souraNb == stt.souraNb &&stt.max > _statCat[0].max)  {
        _statCat.splice(_statCat.length -1 ,1, {
          min:  _statCat[_statCat.length -1].min,
          max:stt.max,
          ayMin:_statCat[_statCat.length -1].ayMin,
          ayMax:stt.ayMax,
          souraNb:stt.souraNb
        })

      }else if (_statCat.length ===1 ) {
        return
      }else{
        _statCat.push(stt)

      }
   }); 
   console.log({_statCat, section});
    
   const colorScale =scaleSequential([0,section.length ], ['blue', "green"]).interpolator(interpolateRainbow)
    try {
        const WIND_max = _statCat.map((wind)=> wind.max )
        const WIND_min = _statCat.map((wind)=> wind.min )

     const WINDOW_AY_MAX = Math.max(...WIND_max)
     const WINDOW_AY_MIN = Math.min(...WIND_min)
console.log(
    {WINDOW_AY_MIN , WINDOW_AY_MAX, diff:WINDOW_AY_MAX -WINDOW_AY_MIN }
);
    const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN  ,WINDOW_AY_MAX ])
                    .rangeRound([margin.left , boundedWidth]).clamp(true)
  
                    
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

               const _xticks =   xScaleAxis.ticks(WINDOW_AY_MAX - WINDOW_AY_MIN) 
                const _yticks =   yScaleAxis.ticks(_statCat.length) 
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

const _xAxisTop = axisBottom(xScaleAxis)
const _displayXAxisT = SVG.select('g:nth-of-type(4)')
                .attr('id','xAxisTop')
               .attr('transform',`translate(0,${boundedHeight})`)    
             //   .attr('margin', '10')
               _xAxisTop(_displayXAxisT)
}catch(error) {
console.log({error});

}}


function TemplateCat() {
    const dispatch = useDispatch()
   const {pending} =   useFormStatus()
    const { insightTemplate, statsTemplateContext,insightTemplateAyahsSelected} = useSelector((state: RootStateType) => state.stage)
    const {  setGridsStaged, setStatsTemplateContext } = stageActions
   const svgTiwal = useRef();
   const svgMiin = useRef();
   const svgMathani = useRef();
   const svgMofasalTawil = useRef();
   const svgMofasalAwsat = useRef();
   const svgMofasalKisar = useRef();
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
const [minBehavior, setMinBehavior] = useState("min");
useEffect(() => {
    if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
      const _svgTiwal =  select(svgTiwal.current!)
      const _svgMiin =  select(svgMiin.current!)
      const _svgMathani =  select(svgMathani.current!)
      const _svgMofasalTawil =  select(svgMofasalTawil.current!)
      const _svgMofasalAwsat =  select(svgMofasalAwsat.current!)
      const _svgMofasalKisar =  select(svgMofasalKisar.current!)
      
      console.log({
          width: document?.querySelector('svg')?.clientWidth,
          hight: document?.querySelector('svg')?.clientHeight,
      });
      console.log({statsTemplateContext});
//Tiwal      
      const  _dataTiwal = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 8)
      const _sortedTiw = _dataTiwal.sort((a,b)=>a.souraNb-b.souraNb )    
      drawCat({SVG:_svgTiwal,section:SECTIONS_SOURAS.TIWAL,  minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedTiw  })
//Miin             
       const  _dataMiin = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 19 && wiAy.souraNb>7 )
       const _sortedMiin = _dataMiin.sort((a,b)=>a.souraNb-b.souraNb )    
       drawCat({SVG:_svgMiin, section:SECTIONS_SOURAS.MIIN,minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' ,data:_sortedMiin  })
//Mathani
       const  _dataMathani = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 49 && wiAy.souraNb>18 )
       const _sortedMathani = _dataMathani.sort((a,b)=>a.souraNb-b.souraNb )    
       drawCat({SVG:_svgMathani, section:SECTIONS_SOURAS.MATHANI, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedMathani  })
////MafasalTawil  
      const  _dataMofasalTawil = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 80 && wiAy.souraNb>48 )
      const _sortedMofasalTawil = _dataMofasalTawil.sort((a,b)=>a.souraNb-b.souraNb )    
      drawCat({SVG:_svgMofasalTawil,section:SECTIONS_SOURAS.MOFASAL, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedMofasalTawil  })
//MofasalAwsat      
      const  _dataMofasalAwsat = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 93 && wiAy.souraNb>=80 )
      const _sortedMofasalAwsat = _dataMofasalAwsat.sort((a,b)=>a.souraNb-b.souraNb )    
      drawCat({SVG:_svgMofasalAwsat,section:SECTIONS_SOURAS.MOFASAL, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedMofasalAwsat  })
//MofasalKisar      
      const  _dataMofasalKisar = statsTemplateContext.filter((wiAy)=>  wiAy.souraNb>=93 )
      const _sortedMofasalKisar = _dataMofasalKisar.sort((a,b)=>a.souraNb-b.souraNb )    
      drawCat({SVG:_svgMofasalKisar, section:SECTIONS_SOURAS.MOFASAL, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedMofasalKisar  })
       }
 }, [minBehavior]); 
 // CAt Implementation
 useEffect(() => {
     if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
     const _svgTiwal =  select(svgTiwal.current!)
     const _svgMiin =  select(svgMiin.current!)
     const _svgMathani =  select(svgMathani.current!)
     const _svgMofasalTawil =  select(svgMofasalTawil.current!)
     const _svgMofasalAwsat =  select(svgMofasalAwsat.current!)
     const _svgMofasalKisar =  select(svgMofasalKisar.current!)
     
     console.log({
         width: document?.querySelector('svg')?.clientWidth,
         hight: document?.querySelector('svg')?.clientHeight,
     });
     console.log({statsTemplateContext});
      
//Tiwal      
const  _dataTiwal = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 8)
const _sortedTiw = _dataTiwal.sort((a,b)=>a.souraNb-b.souraNb )    
drawCat({SVG:_svgTiwal,section:SECTIONS_SOURAS.TIWAL,  minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedTiw  })
//Miin             
 const  _dataMiin = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 19 && wiAy.souraNb>7 )
 const _sortedMiin = _dataMiin.sort((a,b)=>a.souraNb-b.souraNb )    
 drawCat({SVG:_svgMiin, section:SECTIONS_SOURAS.MIIN,minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' ,data:_sortedMiin  })
//Mathani
 const  _dataMathani = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 49 && wiAy.souraNb>18 )
 const _sortedMathani = _dataMathani.sort((a,b)=>a.souraNb-b.souraNb )    
 drawCat({SVG:_svgMathani, section:SECTIONS_SOURAS.MATHANI, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedMathani  })
////MafasalTawil  
const  _dataMofasalTawil = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 80 && wiAy.souraNb>48 )
const _sortedMofasalTawil = _dataMofasalTawil.sort((a,b)=>a.souraNb-b.souraNb )    
drawCat({SVG:_svgMofasalTawil,section:SECTIONS_SOURAS.MOFASAL, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedMofasalTawil  })
//MofasalAwsat      
const  _dataMofasalAwsat = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 93 && wiAy.souraNb>=80 )
const _sortedMofasalAwsat = _dataMofasalAwsat.sort((a,b)=>a.souraNb-b.souraNb )    
drawCat({SVG:_svgMofasalAwsat,section:SECTIONS_SOURAS.MOFASAL, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedMofasalAwsat  })
//MofasalKisar      
const  _dataMofasalKisar = statsTemplateContext.filter((wiAy)=>  wiAy.souraNb>=93 )
const _sortedMofasalKisar = _dataMofasalKisar.sort((a,b)=>a.souraNb-b.souraNb )    
drawCat({SVG:_svgMofasalKisar, section:SECTIONS_SOURAS.MOFASAL, minAySelected:minBehavior==='min' , maxAySelected:minBehavior==='min' , data:_sortedMofasalKisar  })
 }},[statsTemplateContext])

    return (<div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
               <div className="flex justify-evenly items-center ">
               {/*  <SpaceButton disabled={false} handlePress={descHandler} title='Desc' />
                <SpaceButton disabled={false} handlePress={ascHandler} title='Asc ' />
                */}     <SpaceButton disabled={pending} handlePress={getStat} title='Get Stats' />
            
        </div>
        <div className="grid grid-cols-2 grid-flow-row h-full  justify-start items-stretch gap-2">
        <div className="flex  col-span-1 p-2 border-1 border-violet-500 justify-center items-center rounded-md">
            <svg ref={svgTiwal!}   >
            <g/> 
            <g/> 
            <g/> 
            <g/> 
            </svg>
        </div>
        <div className="flex col-span-1  justify-center items-center ">
            <svg ref={svgMiin!}   >
            <g/> 
            <g/> 
            <g/> 
            <g/>
            </svg>
        </div>
        <div className="flex col-span-1 justify-evenly items-center ">
            <svg ref={svgMathani!}   >
            <g/> 
            <g/> 
            <g/> 
            <g/>
            </svg>
        </div>
        
        <div className="flex col-span-1 justify-evenly items-center ">
            <svg ref={svgMofasalTawil!}   >
            <g/> 
            <g/> 
            <g/> 
            <g/>
            </svg>
        </div>

        <div className="flex col-span-1 justify-evenly items-center ">
            <svg ref={svgMofasalAwsat!}   >
            <g/> 
            <g/> 
            <g/> 
            <g/>
            </svg>
        </div>
        
        <div className="flex col-span-1 justify-evenly items-center ">
            <svg ref={svgMofasalKisar!}   >
            <g/> 
            <g/> 
            <g/> 
            <g/> 
            </svg>
        </div>
      </div>
           
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
    </div>)
    }

export default memo(TemplateCat);
