'use client'
import { addGuestToStage, createNewStage, getInsightTemplateByNb } from '@/actions/stage';
import { AY_VISUALISATION, Ayah, StatsTemplateType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import _ from 'lodash';
import { memo, use, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import {  useFormStatus } from 'react-dom';
import {scaleLinear,BaseType,select, 
     scaleSequential, 
    interpolateRainbow,
    axisLeft,
     axisTop,
     axisBottom,
     scaleOrdinal,
     schemePastel1,
     schemeDark2} from "d3";
import { getStatTaysir } from '@/actions/sprint';
import { Radio, RadioGroup } from '@heroui/radio';
import { ayahWithoutPunct } from '@/lib/tools';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import WindowDialog from './WindowDialog';


const dimentions = {
    width:500,
    height:200,
    margin :{
        top:25,
        right:25,
        bottom:25,
        left:25,}}

const {height, margin, width } = dimentions
const boundedWidth = width  - margin.right  -margin.left
const boundedHeight = height  - margin.top  
const drawSoura = ({
    SVG,
    ayVisualisation,
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    ayVisualisation: AY_VISUALISATION|string,
    data:StatsTemplateType[]
}) => {
    console.log({data});
   // const colorScale =scaleSequential([0,data.length ], ['blue', "green"]).interpolator(interpolateRainbow)
   const _colors = scaleOrdinal(schemeDark2)

   try {
        const WIND_max = data.map((wind)=> wind.max )
        const WIND_min = data.map((wind)=> wind.min )

        const WINDOW_AY_MAX = Math.max(...WIND_max)
        const WINDOW_AY_MIN = Math.min(...WIND_min)
console.log(
    {WIND_max, WIND_min }
);
    const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MAX+1,WINDOW_AY_MIN -1 ])
                    .rangeRound([ 0, boundedWidth]).clamp(true)
  
                    
    const _yScale = scaleLinear()
                    .domain([ 1,data.length +1 ])
                    .rangeRound([ margin.top, boundedHeight])
                    .clamp(true)
    const yScaleAxis = scaleLinear()
                    .domain([1,data.length ])
                    .rangeRound([ margin.top, boundedHeight ])
                    .clamp(true)
    const xScaleAxis = scaleLinear()
                .domain([WINDOW_AY_MAX+1,WINDOW_AY_MIN -1 ])
                .rangeRound([0, boundedWidth]).clamp(true)

               const _xticks =   xScaleAxis.ticks(WINDOW_AY_MAX - WINDOW_AY_MIN) 
                const _yticks =   yScaleAxis.ticks(data.length) 
  //.interpolate(interpolateHclLong)
  SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
  
  const _svgWindow = SVG?.select('g:nth-of-type(1)').selectAll('line')
        .data(data, async function(d, i ,n){
            return d})
        .join('line')
        .attr('height', function(d){
            return 8
        })
        .attr('x1', function(d, i){
            console.log({ min:d.min});
            return _xScale(d.max)  
        }).attr('x2', function(d, i){
          //  console.log({ min:d.min});
            return _xScale(d.min)  
        }).attr('y1', function(d, i){
          console.log({ yscal:_yScale(i)});
          if(data.length>1 ){
            
            return   _yScale(i )+((i+1)*3) //+ ((i + 1) * 6)

          }else{

            return   _yScale(i )+ _yScale((1+i) )//+ ((i + 1) * 6)
          }
  
        }).attr('y2', function(d, i){
          console.log({ yscal:d.i});
          if(data.length>1 ){
            return   _yScale(i )+((i+1)*3) //+ ((i + 1) * 6)

          }else{

            return   _yScale(i )+ _yScale((1+i) )//+ ((i + 1) * 6)
          }
  
        })
        .style('stroke', (d,i ) => _colors(i))
        .style('stroke-width', (d,i ) => d.max - d.min < 20 ? (d.max-d.min )/ 2: d.max - d.min < 40 ? (d.max-d.min )/ 3:(d.max-d.min )/ 4)
           // .attr('fill', (d,i ) => _colors(i))
            .attr('transform',`translate(${margin.left+10},0)`)    

 const _ayMinWind =   SVG?.select('g:nth-of-type(2)').selectAll('text')
.data(data)
.join('text')
.text(function(d, i){
  console.log({code:d.ayMin.split(' ')[0].charCodeAt(0), first:ayahWithoutPunct(d.ayMin)[0] ,ayMin:d.ayMin });
        return  ayVisualisation===AY_VISUALISATION.MIN || ayVisualisation===AY_VISUALISATION.MINMAX ?`${ayahWithoutPunct(d.ayMin).join()}:${d.min}`: 
        ayVisualisation===AY_VISUALISATION.AWAL ? `${ayahWithoutPunct(d.ayMin)[0]}:${d.min}`:
        ayVisualisation===AY_VISUALISATION.AWSAT ? `${ayahWithoutPunct(d.ayMin)[Math.round(ayahWithoutPunct(d.ayMin).length/2)]}:
        ${d.min}`:
        ayVisualisation===AY_VISUALISATION.AKHIR ? `${ayahWithoutPunct(d.ayMin)[Math.round(ayahWithoutPunct(d.ayMin).length -1)]}:${d.min}`:
        null
     })
.attr('x', (d, i ) => {
      return   _xScale(d.min ) -(d.ayMin.length *(i+2))
    }    )
.attr('y', function(d, i){
      return  _yScale(i) 
   })
.style('fill',(d,i ) => _colors(i)) 
    .style('font-size',`${ayVisualisation===AY_VISUALISATION.MINMAX ||ayVisualisation===AY_VISUALISATION.MIN ? '15px': '9px'}` )
    .style('font-weight','light')
    .attr('transform', (d, i ) => `translate(${-margin.right -d.ayMin.length},0)`)    

  
  const _ayMaxWind =   SVG?.select('g:nth-of-type(3)').selectAll('text')
 .data(data)
 .join('text')
 .text(function(d,i){

  return   ayVisualisation===AY_VISUALISATION.MAX || ayVisualisation===AY_VISUALISATION.MINMAX ?`${ayahWithoutPunct(d.ayMax).join()}:${d.max}`: 
  ayVisualisation===AY_VISUALISATION.AWAL ? `${ayahWithoutPunct(d.ayMax)[0]}:${d.max}`:
      ayVisualisation===AY_VISUALISATION.AWSAT ? `${ayahWithoutPunct(d.ayMax)[Math.round(ayahWithoutPunct(d.ayMax).length/2)]}:
      ${d.max}`:
      ayVisualisation===AY_VISUALISATION.AKHIR ? `${ayahWithoutPunct(d.ayMax)[Math.round(ayahWithoutPunct(d.ayMax).length -1)]}:${d.max}`:
      null
})
    .attr('x', (d, i ) => {
        console.log({dMAx:d.max,xsc:_xScale(d.max) - d.ayMax.length, ayLength:d.ayMax.length});
        
        return   _xScale(d.max ) -d.ayMax.length
  
    })
    .attr('y', function(d, i){
        console.log({yMax:d.max,ysc:_yScale(i),});

      return  _yScale(d.max)  - margin.bottom -(20 *(i +1))
   })
    .style('fill',(d,i ) => _colors(i)) 
    .style('font-size',`${ayVisualisation===AY_VISUALISATION.MAX ||ayVisualisation===AY_VISUALISATION.MINMAX ? '15px': '9px'}` )
        .style('font-weight','light') 
        .attr('transform',(d)  =>`translate(${  margin.right + (d.ayMax.length) },${margin.top})`)    

        //   .attr('transform','rotate(45)')
//  console.log({_svgWindow, _ayMinWind, scalPo: scalePow().exponent()});
 
const _yAxisLeft = axisLeft(yScaleAxis).tickSizeOuter(12).tickSize(8)
const _displayYAxisG = SVG.select('g:nth-of-type(4)')
                .attr('id','yAxisLeftG')
               .attr('transform',`translate(${margin.left },0)`)    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

const _xAxisBottom = axisBottom(xScaleAxis).tickSizeOuter(7).tickSize(8).ticks(WIND_max.length).tickValues(WIND_min)
const _displayXAxisB = SVG.select('g:nth-of-type(5)')
             .attr('id','xAxisBottom')
            .attr('transform',`translate(${margin.left},${boundedHeight})`)    
          //   .attr('margin', '10')
            _xAxisBottom(_displayXAxisB)

}catch(error) {
console.log({error});

}}
const drawSouraDesign = ({
  SVG,
  ayVisualisation,
  data
}:{
  SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
  ayVisualisation: AY_VISUALISATION|string,
  data:StatsTemplateType[]
}) => {
  console.log({data});
const _statsDes = data.map((wind)=> [wind.min,wind.max] )
  //const colorScale =scaleSequential([0,data.length ], ['blue', "green"]).interpolator(interpolateRainbow)
  const _colors = scaleOrdinal(schemeDark2)
  try {
      const WIND_max = data.map((wind)=> wind.max )
      const WIND_min = data.map((wind)=> wind.min )
      const WINDOW_AY_MAX = Math.max(...WIND_max)
      const WINDOW_AY_MIN = Math.min(...WIND_min)

console.log(
  {_statsDes}
);
  const _xScale = scaleLinear()
                  .domain([WINDOW_AY_MAX+1,WINDOW_AY_MIN -1 ])
                  .rangeRound([ 0, boundedWidth]).clamp(true)

                  
  const _yScale = scaleLinear()
                  .domain([ 1,data.length +1 ])
                  .rangeRound([ margin.top, boundedHeight])
                  .clamp(true)
  const yScaleAxis = scaleLinear()
                  .domain([1,data.length ])
                  .rangeRound([ margin.top, boundedHeight ])
                  .clamp(true)
  const xScaleAxis = scaleLinear()
              .domain([WINDOW_AY_MAX+1,WINDOW_AY_MIN -1 ])
              .rangeRound([0, boundedWidth]).clamp(true)

             const _xticks =   xScaleAxis.ticks(WINDOW_AY_MAX - WINDOW_AY_MIN) 
              const _yticks =   yScaleAxis.ticks(data.length) 
//.interpolate(interpolateHclLong)
SVG.attr('viewBox', `0 0 ${width} ${height}`)
    .style('background-color', 'rgb(240,240,240)')
    .style('position', 'relative')
/* const _svgWindow = SVG?.select('g:nth-of-type(1)').selectAll('line')
      .data(data, async function(d, i ,n){
          return d})
      .join('line')
      .attr('height', function(d){
          return 8
      })
      .attr('x1', function(d, i){
          console.log({ min:d.min});
          return _xScale(d.max)  
      }).attr('x2', function(d, i){
        //  console.log({ min:d.min});
          return _xScale(d.min)  
      }).attr('y1', function(d, i){
        console.log({ yscal:_yScale(i)});
        if(data.length>1 ){
          
          return   _yScale(i )+25 //+ ((i + 1) * 6)

        }else{
          return   _yScale(i )+25 //+ ((i + 1) * 6)
        }

      }).attr('y2', function(d, i){
        console.log({ yscal:d.i});
        if(data.length>1 ){
          return   _yScale(i )+25 //+ ((i + 1) * 6)
        }else{

          return   _yScale(i ) + 25 //+ ((i + 1) * 6)
        }

      })
      .style('stroke', (d,i ) => _colors(i))
      .style('stroke-width', (d,i ) => d.max - d.min < 20 ? (d.max-d.min )/ 2: d.max - d.min < 40 ? (d.max-d.min )/ 3:(d.max-d.min )/ 4)
         // .attr('fill', (d,i ) => _colors(i))
          .attr('transform',`translate(${margin.left+10},0)`)  */   

const _ayMinWind =   SVG?.select('g:nth-of-type(2)')
      .style('position', 'relative')
        .selectAll('text')
          .data(data)
          .join('text')
          .text(function(d, i){
          console.log({d, min:d.min, pos: _xScale(d.min) });
      return  ayVisualisation===AY_VISUALISATION.MIN || ayVisualisation===AY_VISUALISATION.MINMAX ?`${ayahWithoutPunct(d.ayMin).join()}:${d.min}`: 
      ayVisualisation===AY_VISUALISATION.AWAL ? `${ayahWithoutPunct(d.ayMin)[0]!=="" ?ayahWithoutPunct(d.ayMin)[0] :ayahWithoutPunct(d.ayMin)[1] }:${d.min}`:
      ayVisualisation===AY_VISUALISATION.AWSAT ? `${ayahWithoutPunct(d.ayMin)[Math.round(ayahWithoutPunct(d.ayMin).length/2)]}:
      ${d.min}`:
      ayVisualisation===AY_VISUALISATION.AKHIR ? `${ayahWithoutPunct(d.ayMin)[Math.round(ayahWithoutPunct(d.ayMin).length -1)]  !=="" ? ayahWithoutPunct(d.ayMin)[Math.round(ayahWithoutPunct(d.ayMin).length -1)] 
      :  ayahWithoutPunct(d.ayMax)[Math.round(ayahWithoutPunct(d.ayMin).length -2)]}:${d.min}`:
      null
   })
.attr('x', (d, i ) => {
      console.log({dMin:d.min,xsc:_xScale(d.min) , ayLength:d.ayMin.length});
          return   _xScale(WINDOW_AY_MAX ) + margin.left +margin.right
        }    )
.attr('y', function(d, i){
      console.log({dMin:d.min,ysc:_yScale(i), i });

    return  _yScale(i)    
 })
.style('fill',(d,i ) => _colors(i)) 
  .style('font-size',`${ayVisualisation===AY_VISUALISATION.MINMAX ||ayVisualisation===AY_VISUALISATION.MIN ||ayVisualisation===AY_VISUALISATION.AWAL 
    ||ayVisualisation===AY_VISUALISATION.AWSAT||ayVisualisation===AY_VISUALISATION.AKHIR
    ? '9px': '7px'}` )
  .style('font-weight','light')
  //.style('opacity','0.3')
  /* .each(function(d,i){
    select(this).style('position', 'absolute') 
                   .style('top', function(d,i){
                     return `${(i+1)*20}px`
                   })
                   .style('right', function(d,i){
                    return '150px'
                     // return `${(d.ayMin.length+1)*50}px`
                   })
  }) */
  //.style('background-color','rgb(150,200,180)')
  //.attr('transform', (d, i ) => `translate(${-margin.right -d.ayMin.length-margin.right},0)`)    
  //.attr('dx',(d, i ) =>  `${-(i+2)*45}px`)
const _allAy =   SVG?.select('g:nth-of-type(4)').selectAll('text')
                  
 

const _ayMaxWind =   SVG?.select('g:nth-of-type(3)').selectAll('text')
.data(data)
.join('text')
.text(function(d,i){
  return   ayVisualisation===AY_VISUALISATION.MAX || ayVisualisation===AY_VISUALISATION.MINMAX ?`${ayahWithoutPunct(d.ayMax).join()}:${d.max}`: 
  ayVisualisation===AY_VISUALISATION.AWAL ? `${ayahWithoutPunct(d.ayMax)[0]!=="" ? ayahWithoutPunct(d.ayMax)[0] : ayahWithoutPunct(d.ayMax)[1] }:${d.max}`:
  ayVisualisation===AY_VISUALISATION.AWSAT ? `${ayahWithoutPunct(d.ayMax)[Math.round(ayahWithoutPunct(d.ayMax).length/2)]}:
  ${d.max}`:
  ayVisualisation===AY_VISUALISATION.AKHIR ? `${ayahWithoutPunct(d.ayMax)[Math.round(ayahWithoutPunct(d.ayMax).length -1)] !=="" ?
  ayahWithoutPunct(d.ayMax)[Math.round(ayahWithoutPunct(d.ayMax).length -1)]:
  ayahWithoutPunct(d.ayMax)[Math.round(ayahWithoutPunct(d.ayMax).length -2)] }:${d.max}`:
  null
})
  .attr('x', (d, i ) => {
      console.log({dMAx:d.max,xsc:_xScale(d.max) - d.ayMax.length, ayLength:d.ayMax.length});
      return   _xScale(WINDOW_AY_MAX ) + margin.left +margin.right
  //    return   _xScale(d.max )
    })
  .attr('y', function(d, i){
      console.log({yMax:d.max,ysc:_yScale(i),i});

return  _yScale(i) +(i+1)*3   
 })
  .style('fill',(d,i ) => _colors(i)) 
  .style('font-size',`${ayVisualisation===AY_VISUALISATION.MAX ||ayVisualisation===AY_VISUALISATION.MINMAX ? 
    '9px': '7px'}` )
      .style('font-weight','light')
      
      //.attr('transform',(d)  =>`translate(${  margin.right + (d.ayMax.length) },${margin.top})`)    
      //.attr('dx',(d, i ) =>  `${(i+1)*15}px`)

const _Legend =   SVG?.select('g:nth-of-type(4)').selectAll('text')
.data(data)
.join('text')
.text(function(d,i){
    return  'legend'
// return  `${formatFn(d.max)}`
//     return `${d.max}-${d.ayMax}`
  })
  .attr('x', (d, i ) => {
    console.log({xsc: _xScale((WINDOW_AY_MAX+1-WINDOW_AY_MIN -1)/2), boundedHHalf:WINDOW_AY_MAX+1-WINDOW_AY_MIN -1,WINDOW_AY_MIN, WINDOW_AY_MAX  });
        return _xScale((WINDOW_AY_MAX))
        
  })
  .attr('y', function(d, i){
  return margin.top 
  })
  .style('fill',(d,i ) => 'rgb(45,125,134)') 
  .style('font-size',`25` )
      .style('font-weight','light')  
const _yAxisLeft = axisLeft(yScaleAxis).tickSizeOuter(12).tickSize(8)
const _displayYAxis = SVG.select('g:nth-of-type(4)')
              .attr('id','yAxisLeftG')
             .attr('transform',`translate(${margin.left },0)`)    
           //   .attr('margin', '10')
             _yAxisLeft(_displayYAxis)


const _xAxisBottom = axisBottom(xScaleAxis).tickSizeOuter(7).tickSize(8).ticks(WIND_max.length).tickValues(WIND_min)
 const _displayXAxisB = SVG.select('g:nth-of-type(5)')
              .attr('id','xAxisBottom')
             .attr('transform',`translate(${margin.left},${boundedHeight})`)    
           //   .attr('margin', '10')
             _xAxisBottom(_displayXAxisB)
 }catch(error) {
console.log({error});

}}
function TemplateSouraStats() {
    const dispatch = useDispatch()
   const {pending} =   useFormStatus()
    const { insightTemplate, statsTemplateContext, windowContext} = useSelector((state: RootStateType) => state.stage)
    const {  setGridsStaged, setStatsTemplateContext, setWindowDialogContext } = stageActions
   const svgSoura = useRef();
   const svgSouraDesign = useRef();
     const [statsSoura, setStatsSoura] = useState([{min:-1}]);
        const [ayVisualisation, setMinBehavior] = useState <AY_VISUALISATION|string>( AY_VISUALISATION.MINMAX);
  const {isOpen, onOpen, onClose} = useDisclosure();
        
   
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
          useEffect(() => {
         if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
         const _svgSoura =  select(svgSoura.current!)
         const _svgSouraDesign =  select(svgSouraDesign.current!)
         
         console.log({
             width: document?.querySelector('svg')?.clientWidth,
             hight: document?.querySelector('svg')?.clientHeight,
         });
         console.log({statsTemplateContext, insightTemplate});
         
         const  _dataSoura = statsTemplateContext.filter((wiAy)=> wiAy.souraNb == insightTemplate.souraNb)
         console.log({_dataSoura});
         const _diFFLastSprint = _dataSoura[_dataSoura.length -1].max -  _dataSoura[_dataSoura.length -1].min
         
         if(_diFFLastSprint   <25) {
      //    setSprintUnder(_diFFLastSprint +1)
        } 
        console.log({dMax:_dataSoura[_dataSoura.length -1].max, dMin:_dataSoura[_dataSoura.length -1].min, diFF:_dataSoura[_dataSoura.length -1].max - _dataSoura[_dataSoura.length -1].min })
        
            setStatsSoura(_dataSoura)
            drawSoura({SVG:_svgSoura, ayVisualisation: ayVisualisation, data:_dataSoura  })
            drawSouraDesign({SVG:_svgSouraDesign, ayVisualisation:ayVisualisation , data:_dataSoura  })
         
         }
     
         }, [statsTemplateContext, insightTemplate]);
    useEffect(() => {
     if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
       const _svgSoura =  select(svgSoura.current!)
       const _svgSouraDesign =  select(svgSouraDesign.current!)
       
       console.log({ayVisualisation
       });
       console.log({statsTemplateContext, insightTemplate});
       
       const  _dataSoura = statsTemplateContext.filter((wiAy)=> wiAy.souraNb == insightTemplate.souraNb)
       console.log({_dataSoura});
       
          setStatsSoura(_dataSoura)
          drawSoura({SVG:_svgSoura, ayVisualisation:ayVisualisation , data:_dataSoura  })
          drawSouraDesign({SVG:_svgSouraDesign, ayVisualisation:ayVisualisation , data:_dataSoura  })
     }
    }, [ayVisualisation]);
function selectWindowHandler(wind:number) {
        dispatch(setWindowDialogContext({wind:wind}))
        onOpen()
  }
    console.log({statsSoura});
    useEffect(() => {
      if(windowContext !== -1 && windowContext < statsSoura.length) {
        onOpen()
      }
    }, [windowContext]);
    
    
    return (<div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
               <div className="flex justify-start items-center p-2  gap-2 ">
              
               <div className="flex justify-start items-center ">
                {`[ ${insightTemplate.souraNb} -  ${insightTemplate.arabName} - ${insightTemplate.souraName} ]`}
            {`[ ${statsSoura[statsSoura.length - 1]?.max! - statsSoura[0].min! +1 } Ayahs  ]`}
            {`[ From Ayah ${statsSoura[0]?.min!} To Ayah ${statsSoura[statsSoura.length-1]?.max}  ]`}
            {` ${statsSoura.length > 1 && statsSoura[statsSoura.length-1].max!- statsSoura[statsSoura.length-1].min!<24  ?            
             ' [ ' +statsSoura.length +'sprint of 25 Ayahs ]' :''}`} 
            {`${statsSoura.length === 1 && statsSoura[0].max!- statsSoura[statsSoura.length-1].min!<24 ? 
            ` [ ${statsSoura[statsSoura.length-1].max!- statsSoura[statsSoura.length-1].min} ayahs ] `:''}` }  
            {`[ So you can have up to ${ statsSoura.length} Sprints ]` }  
            </div>
               <div className="flex justify-end items-center  rounded-md ">
{/*                 <SpaceButton disabled={false} handlePress={descHandler} title='Desc' />
                <SpaceButton disabled={false} handlePress={ascHandler} title='Asc ' />
 */}                <SpaceButton disabled={pending} handlePress={getStat} title='Get Stats'  />
            
        </div>
        </div>
        <div className="h-full p-2  flex-col justify-start items-stretch border-2 border-violet-500 rounded-md space-y-2">
        {typeof statsSoura !=='undefined' && statsSoura[0].min!== -1 && 
              <div className="flex-col justify-start items-stetch gap-2 border-green-500 ">
                { statsSoura.map((sts, index)=> {
             console.log({sts});
             
             return  <div  key={`${index}-${sts.min}`} className="flex gap-2 p-1 justify-between items-center">
                  <div  key={`${index}-${sts.min}`} className="text-left">
              
              {`    
           
              ${ayahWithoutPunct(sts.ayMax)[0]!=="" && ayahWithoutPunct(sts.ayMax)[1]!==" " ? 
              `${ayahWithoutPunct(sts.ayMax)[0]} ${ayahWithoutPunct(sts.ayMax)[1]}`:
              `${ayahWithoutPunct(sts.ayMax)[0]} ${ayahWithoutPunct(sts.ayMax)[1]} ${ayahWithoutPunct(sts.ayMax)[2]}`
              } 
                 [ ${sts.max} ] : To 
                 /-/
              ${ayahWithoutPunct(sts.ayMin)[0]!=="" && ayahWithoutPunct(sts.ayMin)[1]!==" " ? 
              `${ayahWithoutPunct(sts.ayMin)[0]} ${ayahWithoutPunct(sts.ayMin)[1]}`:
              `${ayahWithoutPunct(sts.ayMin)[0]} ${ayahWithoutPunct(sts.ayMin)[1]} ${ayahWithoutPunct(sts.ayMin)[2]}`
              } [ ${sts.min} ]: From 
              `
              }
               
              </div>
                  <div  key={`${index}-${sts.min}`} className="flex justify-start items-center text-right">
                    <Button  className='bg-green-600 text-blue-200 rounded-md ' onPress={ ()=> selectWindowHandler(index) }>
                        Window
                    </Button>
              </div>
              </div>
           } )}
            
            </div>}
        <div className="w-full   flex justify-center items-center border-2 border-red-500  space-y-2">
        <svg ref={svgSouraDesign!}   >
        <g /> 
        <g /> 
        <g /> 
        <g /> 
        <g /> 
        </svg>
        </div>
        
        <div className="w-full   flexjustify-center items-center border-2 border-red-500  space-y-2">

        <RadioGroup
                    orientation="horizontal"
                    value={ayVisualisation}
                    onValueChange={setMinBehavior}
                >
        <div className="flex  p-2  rounded-md justify-center items-center border-2 border-violet-500  space-y-2">
                  <Radio value={AY_VISUALISATION.AWAL }>Awal</Radio>
                  <Radio value={AY_VISUALISATION.AWSAT }>Awsat</Radio>
                  <Radio value={AY_VISUALISATION.AKHIR }>Akhir</Radio>
                  <Radio value={AY_VISUALISATION.MIN }>Min Ay</Radio>
                  <Radio value={AY_VISUALISATION.MAX }>Max Ay</Radio>
                  <Radio value={AY_VISUALISATION.MINMAX }>MinMax</Radio>
        </div>
              
              </RadioGroup>  
              </div>
       {/*        
        <div className="w-full   justify-center items-center border-2   space-y-2">
    <div className="w-full   flex justify-center items-center border-2 border-red-500  space-y-2">

        <svg ref={svgSoura!}   >
        <g /> 
        <g /> 
        <g /> 
        <g /> 
        <g /> 
        </svg>
        </div>
        <RadioGroup
                    orientation="horizontal"
                    value={ayVisualisation}
                    onValueChange={setMinBehavior}
                >
        <div className="flex  p-2  rounded-md justify-center items-center border-2 border-violet-500  space-y-2">
                  <Radio value={AY_VISUALISATION.AWAL }>Awal</Radio>
                  <Radio value={AY_VISUALISATION.AWSAT }>Awsat</Radio>
                  <Radio value={AY_VISUALISATION.AKHIR }>Akhir</Radio>
                  <Radio value={AY_VISUALISATION.MIN }>Min Ay</Radio>
                  <Radio value={AY_VISUALISATION.MAX }>Max Ay</Radio>
                  <Radio value={AY_VISUALISATION.MINMAX }>MinMax</Radio>
        </div>
              
              </RadioGroup>  
              </div> */}
              </div>{isOpen && windowContext !== -1 &&
        <div className=" flex justify-center w-screen h-screen items-center p-2 overflow-scroll ">
           <WindowDialog isOpen={isOpen}  onOpen={onOpen} onClose={onClose}/>
         </div>} 
              </div>
    )
    }

export default memo(TemplateSouraStats);
