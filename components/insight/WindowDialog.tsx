'use client'
import { WINDOW_VISUALISATION, Ayah, StatsTemplateType, WIND_VISUALISATION } from '@/app/api/graphql/stage/stage.types';
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
import { ayahWithoutPunct } from '@/lib/tools';

/* const dimentions = {
    width:1000,
    height:500,
    margin :{
        top:25,
        right:45,
        bottom:25,
        left:25,}}
 */
        const dimentions = {
          width:700,
          height:300,
          margin :{
              top:25,
              right:25,
              bottom:25,
              left:25,}}
        

const {height, margin, width } = dimentions
const boundedWidth = width  - margin.right - margin.left 
const boundedHeight = height  - margin.top   

const drawWindow = ({
  SVG,
  windowVisualisation,
  data
}:{
  SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
  windowVisualisation: WINDOW_VISUALISATION|string,
  data:Ayah[]
}) => {
  console.log({data});
  const colorScale =scaleSequential([0,data.length ], ['blue', "green"]).interpolator(interpolateRainbow)
  try {
      const WIND_numberInSurah = data.map((wind)=> wind.numberInSurah )
      

   const WINDOW_AY_MAX = Math.max(...WIND_numberInSurah)
   const WINDOW_AY_MIN = Math.min(...WIND_numberInSurah)
console.log(
  {WINDOW_AY_MIN,WINDOW_AY_MAX, diff:WINDOW_AY_MAX -WINDOW_AY_MIN }
);
  const _xScale = scaleLinear()
                  .domain([WINDOW_AY_MAX,WINDOW_AY_MIN ])
                  .rangeRound([ 0, boundedWidth]).clamp(true)

                  
const _yScale = scaleLinear()
              .domain([ 0,data.length  ])
              .rangeRound([   margin.top, boundedHeight])
              .clamp(true)
const yScaleAxis = scaleLinear()
              .domain([0,data.length ])
              .rangeRound([ margin.top, boundedHeight ])
              .clamp(true)
const xScaleAxis = scaleLinear()
              .domain([WINDOW_AY_MAX+1,WINDOW_AY_MIN -1 ])
              .rangeRound([0, boundedWidth])
              .clamp(true)

             const _xticks =   xScaleAxis.ticks(WINDOW_AY_MAX - WINDOW_AY_MIN) 
              const _yticks =   yScaleAxis.ticks(data.length) 
//.interpolate(interpolateHclLong)
  SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
/* const _svgWindow = SVG?.select('g:nth-of-type(1)').selectAll('line')
      .data(data, async function(d, i ,n){
        console.log({ayah :d});
        
        return d
        })
      .join('line')
      .attr('height', function(d){
          return 8
      })
      .attr('x1', function(d, i){
          console.log({ min:d.min});
          return _xScale(d.numberInSurah)  
      }).attr('x2', function(d, i){
        //  console.log({ min:d.min});
          return _xScale(d.m)  
      }).attr('y1', function(d, i){
          console.log({ yscal:d.i});
        return boundedHeight- _yScale(i  )//+ ((i + 1) * 6)  
      }).attr('y2', function(d, i){
        //  console.log({ min:d.min});
        return boundedHeight-  _yScale(i )//+ ((i + 1) * 6)
      })
      .style('stroke', (d,i ) => colorScale(i))
      .style('stroke-width', (d,i ) => (d.max-d.min )/ 2)
         // .attr('fill', (d,i ) => colorScale(i))
          .attr('rx', '2')
          .attr('ry', '2')
          .attr('transform',`translate(${margin.left+10},0)`)    
 */
const _ayMinWind =   SVG?.select('g:nth-of-type(2)').selectAll('text')
.data(data)
.join('text')
.text(function(d, i){
console.log({d, min:d.min, pos: _xScale(d.min) });
      return  windowVisualisation===WINDOW_VISUALISATION.ALL || (windowVisualisation===WINDOW_VISUALISATION.ODD && i%2 !== 0) 
      ||(windowVisualisation===WINDOW_VISUALISATION.EVEN && i%2 === 0) ?
      `${d.text}:${d.numberInSurah}`:(
      windowVisualisation===WINDOW_VISUALISATION.AWAL || (windowVisualisation===WINDOW_VISUALISATION.ODD && i%2 !== 0) 
      ||(windowVisualisation===WINDOW_VISUALISATION.EVEN && i%2 === 0 )) ?
      `${ typeof ayahWithoutPunct(d.text)[0] !='undefined' ? ayahWithoutPunct(d.text)[0] : d.text}:${d.numberInSurah}`:
      windowVisualisation===WINDOW_VISUALISATION.AWSAT || (windowVisualisation===WINDOW_VISUALISATION.ODD && i%2 !== 0) 
      ||(windowVisualisation===WINDOW_VISUALISATION.EVEN && i%2 === 0) 
      ?`${typeof ayahWithoutPunct(d.text)[(Math.floor(ayahWithoutPunct(d.text).length)/2)] !== 'undefined'?
      ayahWithoutPunct(d.text)[(Math.floor(ayahWithoutPunct(d.text).length)/2)] : d.text }:${d.numberInSurah}`:
      windowVisualisation===WINDOW_VISUALISATION.AKHIR || (windowVisualisation===WINDOW_VISUALISATION.ODD && i%2 !== 0) 
      ||(windowVisualisation===WINDOW_VISUALISATION.EVEN && i%2 === 0) ?
      `${ typeof ayahWithoutPunct(d.text)[Math.floor(ayahWithoutPunct(d.text).length - 1)] !== 'undefined' 
      ? ayahWithoutPunct(d.text)[Math.floor(ayahWithoutPunct(d.text).length - 1)]: d.text}:${d.numberInSurah}`
      :''})
.attr('x', (d, i ) => {
  //  console.log({d, min:d.min,ayLength: d.ayMax.split(' ').length });
  //  console.log({d, min:d.min, pos: boundedWidth/ d.ayMax.split(' ').length});
    return   _xScale(d.numberInSurah ) //- ((i + 1 ) * data.length) 
  }    )
.attr('y', function(d, i){
    return  _yScale(i + 1) 
 })
.style('fill',(d,i ) => colorScale(i)) 
  .style('font-size',`${windowVisualisation===WINDOW_VISUALISATION.MINMAX ||windowVisualisation===WINDOW_VISUALISATION.MIN ? '15px': '9px'}` )
  .style('font-weight','light')
  .attr('transform', (d, i ) => `translate(${-ayahWithoutPunct(d.text).length },0)`)    

const _yAxisLeft = axisLeft(yScaleAxis)
const _displayYAxisG = SVG.select('g:nth-of-type(4)')
              .attr('id','yAxisLeftG')
             .attr('transform',`translate(${margin.left },0)`)    
           //   .attr('margin', '10')
             _yAxisLeft(_displayYAxisG)

const _xAxisBottom = axisBottom(xScaleAxis)
const _displayXAxisB = SVG.select('g:nth-of-type(5)')
              .attr('id','xAxisBottom')
            .attr('transform',`translate(0,${boundedHeight})`)    
           //   .attr('margin', '10')
             _xAxisBottom(_displayXAxisB)
}catch(error) {
console.log({error});

}}
export default function WindowDialog({isOpen,  onOpen, onClose}:{isOpen:boolean,  onOpen:()=> void,  onClose:()=> void}) {
    const dispatch = useDispatch()
  //  const [isPending, startTransition] = useTransition()
  
   const {pending} =   useFormStatus()
    const { insightTemplate, statsTemplateContext,windowContext} = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const {  setGridsStaged, setStatsTemplateContext, setInsightTemplate, setWindowDialogContext } = stageActions
        const svgWindow = useRef();
        const [windowVisualisation, setWindowStatus] = useState(WINDOW_VISUALISATION.ALL);
        const [window, setWindow] = useState([{ }]);
     
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
      
  
  function getWindow() {
         try {
         const  _dataWindow = JSON.parse(insightTemplate.ayahs[windowContext])
          console.log({_dataWindow});
          console.log({_dataWindow});
            
                setWindow(_dataWindow)
                  
         }catch(error) {
           toast.warning(`something went wrong ${error}`)
          }
        } 
  function prevWindowHandler() {
             if(typeof insightTemplate !== 'undefined'&& 
             insightTemplate && insightTemplate.souraNb>0 && insightTemplate.souraNb <115 && windowContext >0 ){
               try {
         const _svgWindow =  select(svgWindow.current!)
                
                const  _dataWindow = JSON.parse(insightTemplate.ayahs[windowContext - 1])
                console.log({_dataWindow, windowContext});
                   setWindow(_dataWindow)
                   dispatch(setWindowDialogContext({wind:windowContext - 1}))
            
                   drawWindow({SVG:_svgWindow, windowVisualisation:windowVisualisation , data:_dataWindow  })
                                
                  } catch (error) {
                    toast.warning(`${error}`)
                  } 
                 }
           }
  function nextWindowHandler() {
          if(typeof insightTemplate !== 'undefined'&& insightTemplate && insightTemplate.souraNb>0 && insightTemplate.souraNb 
            <115 && windowContext < insightTemplate.ayahs.length ){

           try {
            const _svgWindow =  select(svgWindow.current!)
                
            const  _dataWindow = JSON.parse(insightTemplate.ayahs[windowContext + 1])
            console.log({_dataWindow, windowContext});
            
            setWindow(_dataWindow)
            dispatch(setWindowDialogContext({wind:windowContext + 1}))
            drawWindow({SVG:_svgWindow, windowVisualisation:windowVisualisation , data:_dataWindow  })
                            
        
              } catch (error) {
                toast.warning(`${error}`)
              } 
             }
           }
  
        
     useEffect(() => {
         if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
         const _svgWindow =  select(svgWindow.current!)
         
         console.log({
             width: document?.querySelector('svg')?.clientWidth,
             hight: document?.querySelector('svg')?.clientHeight,
         });
         console.log({statsTemplateContext, insightTemplate});
         
   const  _dataWindow = JSON.parse(insightTemplate.ayahs[windowContext])
   console.log({_dataWindow});
   
      setWindow(_dataWindow)
         
        
            setWindow(_dataWindow)
            drawWindow({SVG:_svgWindow, windowVisualisation: windowVisualisation, data:_dataWindow })
         
         }
     
         }, [statsTemplateContext, insightTemplate]);
    useEffect(() => {
  if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
    const _svgWindow =  select(svgWindow.current!)
    
    console.log({windowVisualisation
    });
    console.log({statsTemplateContext, insightTemplate});
    
    const  _dataWindow = JSON.parse(insightTemplate.ayahs[windowContext])
    console.log({_dataWindow});
    
       setWindow(_dataWindow)
    drawWindow({SVG:_svgWindow, windowVisualisation:windowVisualisation , data:_dataWindow  })
  }
 }, [windowVisualisation]);
 
   
    return       <Modal backdrop={'blur'} isOpen={isOpen} size={'full'} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-blue-700">{`
            ${insightTemplate.souraNb} - ${insightTemplate.arabName}-${insightTemplate.souraName}  -  ( Window 
             ${window[window.length-1].numberInSurah - window[0].numberInSurah!  +1 }  Ayahs )
            From Ayah ${ayahWithoutPunct(window[0].text)[0]!==" " && ayahWithoutPunct(window[0].text)[1]!==" " &&
                        ' ( ' + window[0].numberInSurah + ' ) ' + ayahWithoutPunct(window[0].text)[0] + ' ' + ayahWithoutPunct(window[0].text)[1]
                          } To Ayah ${ayahWithoutPunct(window[window.length -1].text)[0]!==" " &&
                            ayahWithoutPunct(window[window.length -1].text)[1]!==" " &&
                          ' ( ' + window[window.length -1].numberInSurah + ' ) ' + ayahWithoutPunct(window[window.length -1].text)[0] + ' ' + ayahWithoutPunct(window[window.length -1].text)[1]
                          }`
                          }
            </ModalHeader>
            <ModalBody>
            <div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
               <div className="flex justify-evenly items-center ">
                <SpaceButton  handlePress={prevSouraHandler} title='Prev Soura ' disabled={false} />
                <SpaceButton  handlePress={nextSouraHandler} title='Next Soura' disabled={false} />
                <SpaceButton  handlePress={getWindow} title='Get Window' disabled={false} />
                <SpaceButton  handlePress={prevWindowHandler} title='Prev Window ' disabled={false} />
                <SpaceButton  handlePress={nextWindowHandler} title='Next Window' disabled={false} />
        </div>
             
               <div className="w-full   justify-center items-center border-2   space-y-2">
           <div className="w-full   flex justify-center items-center border-2 border-red-500  space-y-2">
       
               <svg ref={svgWindow!}   >
               <g /> 
               <g />
               {/* AyahText */} 
               <g /> 
               {/* yAxis */}
               <g /> 
              {/* xaxis */}
               <g /> 
               </svg>
               </div>
                    </div>
    </div>
            </ModalBody>
            <ModalFooter>
            <RadioGroup
                           orientation="horizontal"
                           value={windowVisualisation}
                           onValueChange={setWindowStatus}
                    >
               <div className="flex  p-2  rounded-md justify-center items-center border-2 border-violet-500  space-y-2">
                         <Radio value={WINDOW_VISUALISATION.AWAL }>Awal</Radio>
                         <Radio value={WINDOW_VISUALISATION.AWSAT }>Awsat</Radio>
                         <Radio value={WINDOW_VISUALISATION.AKHIR }>Akhir</Radio>
                         <Radio value={WINDOW_VISUALISATION.ODD }>Odd</Radio>
                         <Radio value={WINDOW_VISUALISATION.EVEN }>Even</Radio>
                         <Radio value={WINDOW_VISUALISATION.ALL }>All</Radio>
               </div>
                     
                     </RadioGroup>  
                            
              </ModalFooter>
          
          </>
        )}
      </ModalContent>
    </Modal>
}
