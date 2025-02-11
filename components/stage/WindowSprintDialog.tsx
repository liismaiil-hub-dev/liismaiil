'use client'
import { WINDOW_VISUALISATION, Ayah,StagesSprintType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';

import _ from 'lodash';
import { ElementRef, ElementType,  useEffect, useRef, useState,  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter} from "@heroui/modal";

import {Radio, RadioGroup} from "@heroui/radio";
import {scaleLinear,BaseType,select,axisLeft,axisBottom,scaleOrdinal,schemeDark2} from "d3";

import { getStageForSprint } from '@/actions/stage';
import { ayahWithoutPunct } from '@/lib/tools';

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
  //const colorScale =scaleSequential([0,data.length ], ['blue', "green"]).interpolator(interpolateRainbow)
  const colorScale = scaleOrdinal(schemeDark2)
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
const _ayMinWind =   SVG?.select('g:nth-of-type(2)').selectAll('text')
.data(data)
.join('text')
.text(function(d, i){
console.log({d,  });
console.log({
  aw:ayahWithoutPunct(d.text)[(Math.floor(ayahWithoutPunct(d.text).length/2))],text:d.text
});

      return  windowVisualisation===WINDOW_VISUALISATION.ALL || (windowVisualisation===WINDOW_VISUALISATION.ODD && i%2 !== 0) 
      ||(windowVisualisation===WINDOW_VISUALISATION.EVEN && i%2 === 0) ?
      `${d.text}:${d.numberInSurah}`:(
      windowVisualisation===WINDOW_VISUALISATION.AWAL || (windowVisualisation===WINDOW_VISUALISATION.ODD && i%2 !== 0) 
      ||(windowVisualisation===WINDOW_VISUALISATION.EVEN && i%2 === 0 )) ?
      `${ typeof ayahWithoutPunct(d.text)[0] !='undefined' && ayahWithoutPunct(d.text)[0] !=="" ?
       ayahWithoutPunct(d.text)[0] :
      ayahWithoutPunct(d.text)[0] !==""  ? ayahWithoutPunct(d.text)[1] :d.text}:${d.numberInSurah}`:
      windowVisualisation===WINDOW_VISUALISATION.AWSAT || (windowVisualisation===WINDOW_VISUALISATION.ODD && i%2 !== 0) 
      ||(windowVisualisation===WINDOW_VISUALISATION.EVEN && i%2 === 0) 
      ?`${ayahWithoutPunct(d.text)[(Math.floor(ayahWithoutPunct(d.text).length/2))] !== 'undefined' && 
      ayahWithoutPunct(d.text)[(Math.floor(ayahWithoutPunct(d.text).length/2))] !== ""?
      ayahWithoutPunct(d.text)[(Math.floor(ayahWithoutPunct(d.text).length/2))]  :
      ayahWithoutPunct(d.text)[(Math.floor(ayahWithoutPunct(d.text).length/2))] === "" ?
      ayahWithoutPunct(d.text)[(Math.floor(ayahWithoutPunct(d.text).length/2))-1] :d.text }:${d.numberInSurah}`:
      windowVisualisation===WINDOW_VISUALISATION.AKHIR || (windowVisualisation===WINDOW_VISUALISATION.ODD && i%2 !== 0) 
      ||(windowVisualisation===WINDOW_VISUALISATION.EVEN && i%2 === 0) ?
      `${ typeof ayahWithoutPunct(d.text)[Math.floor(ayahWithoutPunct(d.text).length - 1)] !== 'undefined' 
      ? ayahWithoutPunct(d.text)[Math.floor(ayahWithoutPunct(d.text).length - 1)]: d.text}:${d.numberInSurah}`
      :''})
.attr('x', (d, i ) => {
  //  console.log({d, min:d.min,ayLength: d.ayMax.split(' ').length });
  if(windowVisualisation===WINDOW_VISUALISATION.AWSAT ||windowVisualisation===WINDOW_VISUALISATION.AWAL||
    windowVisualisation===WINDOW_VISUALISATION.AKHIR) {
      
      console.log({xAW : _xScale(WINDOW_AY_MAX )+ boundedHeight/2});
  return   _xScale(WINDOW_AY_MAX )+ boundedWidth/2 

  }  
  return   _xScale(WINDOW_AY_MAX )+margin.left + margin.right+20
      //d.numberInSurah ) + (Math.pow((i - 5 ) ,2) ) - margin.left
  }    )
.attr('y', function(d, i){
    return  _yScale(i ) 
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
export default function WindowSprintDialog({isOpen,  onOpen, onClose}:{isOpen:boolean,  onOpen:()=> void,  onClose:()=> void}) {
    const dispatch = useDispatch()
    const {windowContext} = useSelector((state: RootStateType) => state.stage)
    const {firstStateContext,stageSprintSelected , stageReorderedAyahsContext,stageOrderedAyahsContext,
      errorNbContext,stageShuffeledAyahsContext, stageGridsContext,   stageShuffeledFirstAyahsContext, stageValidContext,
     catStages, stepIndexContext, stageGridSelected } = useSelector((state: RootStateType) => state.stage)
 const { setStageOrderedAyahsContext,setStageReorderedAyahsContext,setFirstStateContext, setStageSprintSelected,setStageValidContext, 
  setStageShuffeledAyahsContext,setErrorNbContext,setStageHideNbContext } = stageActions
 
 function ayahInReordered(ord: number) {
    if(typeof stageReorderedAyahsContext!= 'undefined' ) {
     console.log({ stageReorderedAyahsContext, ord, some: stageReorderedAyahsContext.some((el) => el === ord) });
     return stageReorderedAyahsContext.some((el) => el === ord)
}    }

useEffect(() => {
  
}, []);

useEffect(() => {
      dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]})) 
        console.log({stageSprintSelected});

        if (typeof stageSprintSelected !== 'undefined' && stageSprintSelected?.souraName != '' ){
      const _actualSprint = async () =>{ 
        const _sprint =  await getStageForSprint(stageSprintSelected.stageId)
      if ( _sprint.success && typeof _sprint.stage !== 'undefined' ) {
        const _shuffeleledFirst = (JSON.parse(_sprint.stage!.ayahs)).map((ordG: Ayah, index: number) => (ordG));
       console.log({ _shuffeleledFirst });
      const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['number'])].map((ordG: Ayah, index) => (ordG))
        console.log({ _orderedAy });
      //  setGridIndex(stageSprintSelected.stageId.split('-')[stageSprintSelected.stageId.split('-').length - 1 ])
        dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
        dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
      }
}
_actualSprint()
}

}, [stageSprintSelected]);

 function validAyahHandler(reord: number) {
     console.log({ reord, stageReorderedAyahsContext });

     if (typeof firstStateContext!== 'undefined' && firstStateContext && typeof stageReorderedAyahsContext!= 'undefined' && stageReorderedAyahsContext.length + 1 === stageShuffeledFirstAyahsContext.length) {
         toast.success(`It s  your last ayah on that grid of  ${stageShuffeledFirstAyahsContext.length} values`)
     }

     if (typeof stageReorderedAyahsContext!= 'undefined' && stageReorderedAyahsContext[0] == -1 && reord !== stageOrderedAyahsContext[0].numberInSurah) {
         toast.error(`You made a mistake on the first ayah its ${stageOrderedAyahsContext[0].numberInSurah}in the grid`)

     }
     else if (typeof stageReorderedAyahsContext!= 'undefined' && stageReorderedAyahsContext[0] == -1) {

         //console.log({ firstReord: stageReorderedAyahsContext[0] });
         dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[reord]}))

     } else if (ayahInReordered(reord)) {
         toast.success(`You already selected ayah ${reord}`)
     } else if (typeof stageReorderedAyahsContext!= 'undefined' && reord === stageReorderedAyahsContext[stageReorderedAyahsContext.length - 1] + 1) {

         dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[...stageReorderedAyahsContext, reord]}))
     } else {
         if(typeof stageReorderedAyahsContext!= 'undefined' ){
         toast.warning(`you must select 
              ${stageOrderedAyahsContext[stageReorderedAyahsContext.length].text} 
              is next ayah `, {
             closeOnClick: true,
             autoClose: false
         })
         dispatch(setErrorNbContext({errorNb: errorNbContext+1}))
}        }
     if (typeof stageReorderedAyahsContext!= 'undefined' && errorNbContext < 4) {
         console.log({ stageReorderedAyahsContext, stageShuffeledAyahsContext });

         if ((firstStateContext && stageReorderedAyahsContext.length === stageShuffeledFirstAyahsContext.length && stageReorderedAyahsContext[0] !== -1) || (!firstStateContext && stageReorderedAyahsContext.length === stageShuffeledAyahsContext.length && stageReorderedAyahsContext[0] !== -1)) {
             toast.success('it was the last ayas for that grid you can stage it')
             }

     } else {
         toast.warning(`you must rehearsal  !!! `)
         dispatch(setStageValidContext({ validCtxt: false }))
         dispatch(setStageHideNbContext({ hide: false }))
         dispatch(setErrorNbContext({errorNb:0}))
         dispatch(setFirstStateContext({first:false}))
}}
const [gridAyahs, setGridAyahs] = useState(() => JSON.parse(stageGridSelected.ayahs!) );

 useEffect(() => {
     console.log({ stageOrderedAyahsContext,stageShuffeledAyahsContext });
 // setGridAyahs(JSON.parse(stageGridSelected.ayahs!))
 }, [stageOrderedAyahsContext,stageShuffeledAyahsContext ]);

//  console.log({ stageReorderedAyahsContext, stageHideNbContext });
function getMin() {
 if (stageOrderedAyahsContext && 
     stageOrderedAyahsContext.length > 0 && stageOrderedAyahsContext[0].numberInSurah 
     !== -1 ) {
     console.log({Num:stageOrderedAyahsContext[0].numberInSurah, 
         });
   return stageOrderedAyahsContext[0].numberInSurah!
     } else return 
    0 
 }      const svgWindow = useRef();
        const [windowVisualisation, setWindowStatus] = useState(WINDOW_VISUALISATION.ALL);
        const [window, setWindow] = useState([{ }]);
 // const [stageSprintSelected, setStageSelectedState] = useState<StagesSprintType>(stageSprintSelected);
     
async function nextSouraHandler() {
  try {
    const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb +1)
        dispatch(setStageSprintSelected({stage:{
            arabName:_sprints[0].arabName,
            souraName:_sprints[0].souraName,
            souraNb:_sprints[0].souraNb,
            grid:_sprints[0].grid,
            group:_sprints[0].group,
          stageId:_sprints[0].stageId,
            
           }}))
  }catch (error) {
        toast.warning(`${error}`)
      }  
        
      }
async function prevSouraHandler() {
  try {
    const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb -1)
    dispatch(setStageSprintSelected({stage:{
            arabName:_sprints[0].arabName,
            souraName:_sprints[0].souraName,
            souraNb:_sprints[0].souraNb,
            grid:_sprints[0].grid,
            group:_sprints[0].group,
          stageId:_sprints[0].stageId,
            
           }}))
  }catch (error) {
        toast.warning(`${error}`)
      } 
}
  function prevSprintHandler() {
         try {
          const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb && spr.grid ===stageSprintSelected.grid )
          const _actualSprintIndex = _.findIndex(_sprints,(elm:StagesSprintType )  => elm.stageId === stageSprintSelected.stageId )
          console.log({ _sprints, _actualSprintIndex ,});
          
          const _actualSprint = async () =>{ 
           if(_actualSprintIndex >0){
        
            dispatch(setStageSprintSelected({stage:{
            arabName:stageSprintSelected.arabName,
            souraName:stageSprintSelected.souraName,
            souraNb:stageSprintSelected.souraNb,
            grid:stageSprintSelected.grid,
            group:stageSprintSelected.group,
          stageId:_sprints[_actualSprintIndex -1].stageId,
            
           }
          }
        )
        ) 
         // dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
          //  dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
        
          }else {
       // const  _sprint =  await getStageForSprint(_sprints[0].stageId)
      //  if ( _sprint.success && typeof _sprint.stage !== 'undefined' ) {
        //  const _shuffeleledFirst = (JSON.parse(_sprint.stage!.ayahs)).map((ordG: Ayah, index: number) => (ordG));
        // console.log({ _shuffeleledFirst });
        //const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['number'])].map((ordG: Ayah, index) => (ordG))
         // console.log({ _orderedAy });
        //  setGridIndex(stageSprintSelected.stageId.split('-')[stageSprintSelected.stageId.split('-').length - 1 ])
        dispatch(setStageSprintSelected({stage:{

          arabName:stageSprintSelected.arabName,
          souraName:stageSprintSelected.souraName,
          souraNb:stageSprintSelected.souraNb,
          grid:stageSprintSelected.grid,
          group:stageSprintSelected.group,
          stageId:_sprints[0].stageId,
          //ayahs:_sprint.stage!.ayahs
        }
        }
      ))}}
      _actualSprint()
    
      //  dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
        //  dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
      //   }
       } catch (error) {
              toast.warning(`${error}`)
            } 
       }
       useEffect(() => {
         console.log({stageSprintSelected});
         
       }, [stageSprintSelected]);
       
  function nextSprintHandler() {
           try {
            console.log({stageSprintSelected});
            
            const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb &&
             spr.grid ===stageSprintSelected.grid )
            const _actualSprintIndex = _.findIndex(_sprints,(elm:StagesSprintType )  => elm.stageId === stageSprintSelected.stageId )
            console.log({ _sprints, _actualSprintIndex });
            
            const _actualSprint = async () =>{ 
             if(_actualSprintIndex < _sprints.length){
/* 
            const    _sprint =  await getStageForSprint(_sprints[_actualSprintIndex ].stageId)
            if ( _sprint.success && typeof _sprint.stage !== 'undefined' ) {
              const _shuffeleledFirst = (JSON.parse(_sprint.stage!.ayahs)).map((ordG: Ayah, index: number) => (ordG));
             console.log({ _shuffeleledFirst });
            const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['number'])].map((ordG: Ayah, index) => (ordG))
              console.log({ _orderedAy });
             *///  setGridIndex(stageSprintSelected.stageId.split('-')[stageSprintSelected.stageId.split('-').length - 1 ])
            dispatch(setStageSprintSelected({ stage: {  arabName:stageSprintSelected.arabName,
              souraName:stageSprintSelected.souraName,
              souraNb:stageSprintSelected.souraNb,
              grid:stageSprintSelected.grid,
            group:stageSprintSelected.group,
            stageId: typeof (_sprints[_actualSprintIndex+1]) !== 'undefined' ?
            _sprints[_actualSprintIndex+1].stageId : 
            stageSprintSelected.stageId, 
            //ayahs:_sprint.stage!.ayahs
            }}))
  
          //  dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
            //  dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
              
            //  dispatch(setStageGridSelected({stage:}))
            
            }else {
          /* const  _sprint =  await getStageForSprint(_sprints[0].stageId)
          if ( _sprint.success && typeof _sprint.stage !== 'undefined' ) {
            const _shuffeleledFirst = (JSON.parse(_sprint.stage!.ayahs)).map((ordG: Ayah, index: number) => (ordG));
           console.log({ _shuffeleledFirst });
          const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['number'])].map((ordG: Ayah, index) => (ordG))
            console.log({ _orderedAy });
            dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
            dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
           */ 
            dispatch(setStageSprintSelected({ stage: {  arabName:stageSprintSelected.arabName,
              souraName:stageSprintSelected.souraName,
              souraNb:stageSprintSelected.souraNb,
              grid:stageSprintSelected.grid,
            group:stageSprintSelected.group,
            stageId: typeof (_sprints[_actualSprintIndex+1]) !== 'undefined' ?
            _sprints[_actualSprintIndex+1].stageId : 
            stageSprintSelected.stageId, 
            }}))
            }
          
          }
            _actualSprint()
              } catch (error) {
                toast.warning(`${error}`)
              }}
           
  
    function shuffleHandler() {
      //dispatch(setFirstStateContext({first: false}))
        const shuffeledAy = _.shuffle(stageShuffeledAyahsContext)
     console.log({ shuffeledAy });

        dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
    }

    useEffect(() => {
  if(typeof stageShuffeledAyahsContext !== 'undefined' && stageShuffeledAyahsContext){
    const _svgWindow =  select(svgWindow.current!)
    drawWindow({SVG:_svgWindow, windowVisualisation:windowVisualisation , data:stageShuffeledAyahsContext  })
  }
 }, [stageShuffeledAyahsContext, windowVisualisation]); 
 
 useEffect(() => {
   console.log({stageOrderedAyahsContext, stageShuffeledAyahsContext});
   
 }, [stageOrderedAyahsContext, stageShuffeledAyahsContext]);
 
 /**cn((typeof stageValidContext !== 'undefined' && stageValidContext === true) && 'blur-lg', 
  * 
 */

/*      From Ayah ${ayahWithoutPunct(window[0].text)[0]!==" " && ayahWithoutPunct(window[0].text)[1]!==" " &&
                        ' ( ' + window[0].numberInSurah + ' ) ' + ayahWithoutPunct(window[0].text)[0] + ' ' + ayahWithoutPunct(window[0].text)[1]
                          } To Ayah ${ayahWithoutPunct(window[window.length -1].text)[0]!==" " &&
                            ayahWithoutPunct(window[window.length -1].text)[1]!==" " &&
                          ' ( ' + window[window.length -1].numberInSurah + ' ) ' + ayahWithoutPunct(window[window.length -1].text)[0] + ' ' + ayahWithoutPunct(window[window.length -1].text)[1]
                          } */
   
    return       <Modal backdrop={'blur'} isOpen={isOpen} size={'full'} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-blue-700"> {`
            ${stageSprintSelected.souraNb} - ${stageSprintSelected.arabName} -  StageId ${stageSprintSelected.stageId}  - 
             ( From Ay ${stageOrderedAyahsContext[0].numberInSurah} To ${stageOrderedAyahsContext[stageOrderedAyahsContext.length -1 ].numberInSurah} )
       ` } 
            </ModalHeader>
            <ModalBody>
            <div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
               <div className="flex justify-evenly items-center ">
                <SpaceButton  handlePress={prevSouraHandler} title='Prev Soura '  />
                <SpaceButton  handlePress={nextSouraHandler} title='Next Soura'  />
                 <SpaceButton  handlePress={shuffleHandler} title='Shuffle' /> 
                <SpaceButton  handlePress={prevSprintHandler} title='Prev Window '  />
                <SpaceButton  handlePress={nextSprintHandler} title='Next Window'  />
        </div>
             
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
            </ModalBody>
            <ModalFooter>
              <div className=" flex w-full   justify-center items-center border-2   space-y-2">
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
                      </div>
                            
              </ModalFooter>
          
          </>
        )}
      </ModalContent>
    </Modal>
}
