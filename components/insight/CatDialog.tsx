'use client'
import {  StatsTemplateType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';

import _ from 'lodash';
import {  ElementType,  useEffect, useRef, useState } from "react";
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
     axisBottom,
     ascending} from "d3";

import { getStatTaysir } from '@/actions/sprint';
import { getInsightTemplateByNb } from '@/actions/stage';
import { SECTIONS_SOURAS } from '@/store/constants/constants';

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
    console.log({data})
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
    
   const colorScale =scaleSequential([0,data.length ], ['blue', "green"]).interpolator(interpolateRainbow)
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
 
}catch(error) {
console.log({error});

}}
export default function CatDialog({isOpen,  onOpen, onClose}:{isOpen:boolean,  onOpen:()=> void,  onClose:()=> void}){
    const dispatch = useDispatch()
    const { insightTemplate, statsTemplateContext,insightTemplateAyahsSelected} = useSelector((state: RootStateType) => state.stage)
     const {  setGridsStaged, setStatsTemplateContext, setInsightTemplate } = stageActions
  
  const svgTiwal = useRef();
  const svgMiin = useRef();
  const svgMathani = useRef();
  const svgMofasalTawil = useRef();
  const svgMofasalAwsat = useRef();
  const svgMofasalKisar = useRef();
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
const [minBehavior, setMinBehavior] = useState("min");
  /*    useEffect(() => {
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
            drawCat({SVG:_svgSoura, minAySelected:minBehavior==='min' , maxAySelected:minBehavior!=='min', data:_dataSoura  })
         
         }
     
         }, [statsTemplateContext, insightTemplate]); */
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
 }
 
     }, [statsTemplateContext]);
    return  (<Modal backdrop={'blur'} scrollBehavior={'outside'} isOpen={isOpen} size={'full'} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-center text-blue-700">{`
            ${insightTemplate.souraNb} - ${insightTemplate.arabName}-${insightTemplate.souraName}-
             `}</ModalHeader>
            <ModalBody>
            <div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
               <div className="flex justify-evenly items-center ">
                <SpaceButton  handlePress={prevSouraHandler} title='Prev ' disabled={false} />
                <SpaceButton  handlePress={nextSouraHandler} title='Next' disabled={false} />
                <SpaceButton  handlePress={getStat} title='Get Stats' disabled={false} />
            
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
          </ModalContent>
    </Modal>)

}