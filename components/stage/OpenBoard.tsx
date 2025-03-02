'use client'
import { Ayah, StagesSprintType, WINDOW_VISUALISATION } from '@/app/api/graphql/stage/stage.types';
import EvalOrderedComp from "@/components/stage/EvalOrdered";
import EvalSuits from "@/components/stage/EvalSuits";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { cn } from '@/lib/cn-utility'
import { useRouter } from 'next/navigation';
import { addGuestToStage, getStageForSprint } from '@/actions/stage';
import { useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';

import ThreeGridDialog from './ThreeGridDialog';
import DragDropDialog from './DragDropDialog';
import D3Dialog from './D3DialogD3';
import { Radio, RadioGroup } from '@heroui/radio';
import SprintDialog from './SprintDialog';


const OpenBoard = ( ) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {stageSprintSelected, stageGridSelected, stageReorderedAyahsContext,dragDropContext, threeContext, stageHideNbContext,sprintContext, errorNbContext,catStages,
    stageValidContext,  d3Context,  stageOrderedAyahsContext, stageShuffeledAyahsContext,   } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma:{tokenId} } = useSelector((state: RootStateType) => state.guestPrisma)
  const [windowVisualisation, setWindowVisualisation] = useState(WINDOW_VISUALISATION.ALL);
  
  const { setStageOrderedAyahsContext,  setStageHideNbContext,   setStageShuffeledAyahsContext,setThreeContext, setSprintContext,
    setDragDropContext,setStageReorderedAyahsContext,  setStageSprintSelected, setD3Context, setWindowVisualisationContext } = stageActions
    
    const {isOpen, onOpen, onClose} = useDisclosure();
    console.log({tokenId});
   
useEffect(() => {
       dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]}))
       if(typeof catStages !== 'undefined' && catStages[0].arabName !== null && catStages[0].souraNb !== -1){
         const _firstStage = catStages[0]
         dispatch(setStageSprintSelected({stage:catStages[0] }))
       }} , []);
  
useEffect(() => {
  console.log({stageSprintSelected});
  if (typeof stageSprintSelected !== 'undefined' && stageSprintSelected?.souraName != '' ){
const _actualSprint = async () =>{ 
  const _sprint =  await getStageForSprint(stageSprintSelected.stageId)
if ( _sprint.success && typeof _sprint.stage !== 'undefined' ) {
  const _shuffeleledFirst = (JSON.parse(_sprint.stage!.ayahs)).map((ordG: Ayah, index: number) => (ordG));
 console.log({ _shuffeleledFirst });
const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['number'])].map((ordG: Ayah, index) => (ordG))
  console.log({ _orderedAy });

  dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
  dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
}}
_actualSprint()}
}, [stageSprintSelected.stageId]);

function shuffleHandler() {
     // dispatch(setFirstStateContext({first: false}))
      const shuffeledAy = _.shuffle(stageShuffeledAyahsContext)
      console.log({ shuffeledAy });
      dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
  }
  function orderHandler() {
    
     dispatch(setStageShuffeledAyahsContext({ ayahs: stageOrderedAyahsContext }))
 }
 
  function getMax() {
    if (stageOrderedAyahsContext && stageOrderedAyahsContext.length > 0 && 
      stageOrderedAyahsContext[stageOrderedAyahsContext.length -1 ].numberInSurah !== -1 ) {
      return stageOrderedAyahsContext[stageOrderedAyahsContext.length -1 ].numberInSurah! 
       }else return 0
        }
  function getMin() {
    if (stageOrderedAyahsContext && stageOrderedAyahsContext.length > 0 && stageOrderedAyahsContext[0].numberInSurah !== -1 ) {
      return stageOrderedAyahsContext[0].numberInSurah!
       } else return 0 }

function getMinNb(): number {
    if (stageOrderedAyahsContext && stageOrderedAyahsContext.length > 0 && stageOrderedAyahsContext[0].number !== -1 ) {
   return stageOrderedAyahsContext[0].number!
    } else return 0
}
function getMaxNb(): number {
  if (stageOrderedAyahsContext && stageOrderedAyahsContext.length > 0 && 
    stageOrderedAyahsContext[stageOrderedAyahsContext.length -1 ].number !== -1 ) {
    return stageOrderedAyahsContext[stageOrderedAyahsContext.length -1 ].number! 
     }else return 0
 }
console.log({min:getMin(), max:getMax() ,minNb:getMinNb(),maxNb:getMaxNb()});
useEffect(() => {
  dispatch(setWindowVisualisationContext({windVisu:windowVisualisation}))

}, [windowVisualisation]);

      const [stageable, setStageable] = useState(false);
      
  async  function stageItHandler() {
    if(stageable) {
      const resp = await addGuestToStage({
        stageId:stageSprintSelected?.stageId,
        tokenId
      })
      if(resp && resp.success && resp.message) {
        console.log({resp});
        toast.success(`your sprint is  ${resp.message} is validated`)
  }else{
        console.log({warn :`warning ${resp.message}`});
      }
    }else {
      toast.warning('You must  reorder the grid by click the Ayahs in the asc order  // in hiden number context so check Hide Nb checkbox ')
    }}
  
  function prevHandler() {
             try {
              const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb  )
              const _actualSprintIndex = _.findIndex(_sprints,(elm:StagesSprintType )  => elm.stageId === stageSprintSelected.stageId )
              console.log({ _sprints, _actualSprintIndex ,});
              
               if(_actualSprintIndex >0){
               dispatch(setStageSprintSelected({stage:{
                arabName:stageSprintSelected.arabName,
                souraName:stageSprintSelected.souraName,
                souraNb:stageSprintSelected.souraNb,
                grid:stageSprintSelected.grid,
                group:stageSprintSelected.group,
              stageId:_sprints[_actualSprintIndex -1].stageId,
                }})) 
              }else {
            dispatch(setStageSprintSelected({stage:{
             arabName:stageSprintSelected.arabName,
              souraName:stageSprintSelected.souraName,
              souraNb:stageSprintSelected.souraNb,
              grid:stageSprintSelected.grid,
              group:stageSprintSelected.group,
              stageId:_sprints[0].stageId,}}
          ))}
           } catch (error) {
              toast.warning(`${error}`)
    }}
   async  function nextHandler() {
       try {
                 console.log({stageSprintSelected});
                 const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb  )
                 const _actualSprintIndex = _.findIndex(_sprints,(elm:StagesSprintType )  => elm.stageId === stageSprintSelected.stageId )
                  if(_actualSprintIndex < _sprints.length){
                 dispatch(setStageSprintSelected({ stage: {  arabName:stageSprintSelected.arabName,
                   souraName:stageSprintSelected.souraName,
                   souraNb:stageSprintSelected.souraNb,
                   grid:stageSprintSelected.grid,
                 group:stageSprintSelected.group,
                 stageId: typeof (_sprints[_actualSprintIndex+1]) !== 'undefined' ?
                 _sprints[_actualSprintIndex+1].stageId : 
                 stageSprintSelected.stageId, 
                 }}))
              }else {
                 dispatch(setStageSprintSelected({ stage: {  arabName:stageSprintSelected.arabName,
                   souraName:stageSprintSelected.souraName,
                   souraNb:stageSprintSelected.souraNb,
                   grid:stageSprintSelected.grid,
                 group:stageSprintSelected.group,
                 stageId: typeof (_sprints[_actualSprintIndex+1]) !== 'undefined' ?
                 _sprints[_actualSprintIndex+1].stageId : 
                 stageSprintSelected.stageId, 
                 }}))}
               } catch (error) {
                     toast.warning(`${error}`)
                   }
    }
   

   useEffect(() => {
    if(typeof stageReorderedAyahsContext !== 'undefined' && stageReorderedAyahsContext.length === stageOrderedAyahsContext.length && stageHideNbContext) {
      setStageable(true)
      // stageItHandler()    
    }}, [stageReorderedAyahsContext]);
  
  function stageHideNbHandler() {
    dispatch(setStageHideNbContext({ hide: !stageHideNbContext }))
  }
  function dragDropHandler() {
    dispatch(setDragDropContext({ dragDrop: !dragDropContext }))
    onOpen()
  }
   function d3Handler() {
    dispatch(setD3Context({ d3: !d3Context }))
    onOpen()
  }
  
  function threeHandler() {
    dispatch(setThreeContext({ three: !threeContext }))
    console.log({isOpen});
    onOpen()
  }
  function sprintHandler() {
    dispatch(setSprintContext({ sprint: !sprintContext }))
    console.log({isOpen});
    onOpen()
  }

  useEffect(() => {
  /* if(typeof  stageSprintSelected !== 'undefined' &&  stageSprintSelected?.grid === 5) {
    setSprintAble(true)
    console.log({substr : getMaxNb() - getMinNb(), max:getMaxNb(), min: getMinNb() });
    const min =  getMinNb()
    const max = getMaxNb()
    console.log({max_min: max-min});
    setTaysir((max- min) )
    }else {
      setSprintAble(false)
    } */
  }, [stageSprintSelected]);
 
  useEffect(() => {
    console.log({stageSprintSelected, isOpen, catStages});
  }, [stageValidContext,stageSprintSelected,  isOpen, catStages]);
  
  return (
    <div className=" flex-col justify-start  h-full p-1 items-stretch w-full ">
    <div className="flex-col p-1 gap-1  justify-start  items-center   flex-wrap  ">
    <div className="flex justify-center items-center  p-1  ">
                <p className='text-center inline-flex '>Soura &nbsp;: [&nbsp;{stageSprintSelected?.arabName ? stageSprintSelected?.arabName : stageSprintSelected?.souraName}&nbsp;]&nbsp;</p>
                <p className='text-center inline-flex '>&nbsp; Nb : [&nbsp;{stageSprintSelected?.souraNb}&nbsp;] </p>
                <p className='text-center inline-flex'>&nbsp; Grid :[&nbsp;{stageSprintSelected?.grid*stageSprintSelected?.grid}&nbsp;]</p>
                <p className='text-center inline-flex' > &nbsp; Nb of Grids:  [&nbsp;{stageSprintSelected?.group ?
                 stageSprintSelected?.group : stageSprintSelected?.stageId.split('-')[2]}] </p>
            </div>
      <div className='flex  justify-between items-center text-center  gap-1 p-1'>
       
      
      <div className='justify-center items-center text-center flex '>StageId &nbsp; : {stageSprintSelected?.stageId} 
      &nbsp; From &nbsp; {getMinNb()}&nbsp;To &nbsp;{getMaxNb()}
      </div> 
       
      <div className="flex  justify-between items-center  p-1 border border-green-300 rounded-md text-center font-sans " >
            <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
              type="checkbox"
              id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={stageHideNbContext} onChange={() => stageHideNbHandler()} />
            <label className='px-1' htmlFor='HIDE_NB'  >Hide Nb</label>
          </div>
          <div className="flex  justify-between items-center  p-1 border border-green-300 rounded-md text-center font-sans " >
            <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
              type="checkbox"
              id='DRAGDROP_CTXT' name='DRAGDROP_CTXT' value='DRAGDROP_CTXT' checked={dragDropContext} onChange={() => dragDropHandler()} />
            <label className='px-1' htmlFor='DRAGDROP_CTXT'  >Drag&Drop</label>
          </div>
          <div className="flex  justify-between items-center  p-1 border border-green-300 rounded-md text-center font-sans " >
            <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
              type="checkbox"
              id='d3_CTXT' name='d3_CTXT' value='d3_CTXT' checked={d3Context} onChange={() => d3Handler()} />
            <label className='px-1' htmlFor='d3_CTXT'  >D3</label>
          </div>
          <div className="flex  justify-between items-center  p-1 border border-green-300 rounded-md text-center font-sans " >
            <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
              type="checkbox"
              id='Three' name='Three'  value='Three' checked={sprintContext } onChange={() => sprintHandler()} />
            <label className='px-1' htmlFor='Three'  >Sprint</label>
            </div>
            </div>
   
        <div className="flex-col  justify-start items-center   text-center font-sans  " >
        <div className="flex justify-evenly items-center gap-1 flex-wrap ">
        <Button  onPress={orderHandler}   color="secondary" 
            variant="shadow" className= "border-2 border-blue-600 rounded-md" >
            Order  
            </Button>
        <Button  onPress={shuffleHandler}   color="secondary" 
            variant="shadow" className= "border-2 border-blue-600 rounded-md" >
            Shuffel  
            </Button>
            <Button  onPress={stageItHandler}  color="primary" 
            variant="shadow" className= {cn(stageable && "shadow-md shadow-green-300" ,"border-2 border-blue-600 rounded-md")} >
              Stage It
            </Button>

            <Button  onPress={() => prevHandler()}  color="secondary" 
            variant="shadow" className= "border-2 border-blue-600 rounded-md" >
              Prev  Grid
            </Button>

            <Button  onPress={()  =>nextHandler()}  color="primary" 
            variant="shadow" className= "border-2 border-blue-600 rounded-md" >
              Next Grid
            </Button>
            <div className="flex-col  p-2  rounded-md justify-start items-center border-2 border-violet-200  space-y-2">

            <RadioGroup defaultValue={WINDOW_VISUALISATION.ALL } 
            label="Select Ayahs Display "
                           orientation="horizontal"
                           value={windowVisualisation}
                           onValueChange={setWindowVisualisation}
                           >
               <div className="flex  p-2  rounded-md justify-center items-center border-2 border-violet-500  space-x-2">
                         <Radio value={WINDOW_VISUALISATION.AWAL } >
                          <div className="flex justify-center items-center p-2 w-10 h-10">
                            Awal
                            </div> 
                          </Radio>
                         <Radio value={WINDOW_VISUALISATION.AWSAT }>
                         <div className="flex justify-center items-center p-2 w-10 h-10">
                         Awsat
                      </div>
                           </Radio>
                           <Radio value={WINDOW_VISUALISATION.AKHIR }>
                           <div className="flex justify-center items-center p-2 w-10 h-10">
                           Akhir
                      </div>
                            </Radio>
                            <Radio value={WINDOW_VISUALISATION.ODD }>
                            <div className="flex justify-center items-center p-2 w-10 h-10">
                            Odd
                      </div>
                            </Radio>
                            <Radio value={WINDOW_VISUALISATION.EVEN }>
                            <div className="flex justify-center items-center p-2 w-10 h-10">
                            Even
                      </div>
                           </Radio>
                           <Radio value={WINDOW_VISUALISATION.ALL }>
                           <div className="flex justify-center items-center p-2 w-10 h-10">
                           All
                      </div>
                         </Radio>
               </div>
                                                                                                
                     </RadioGroup>
          </div>
          </div>
          
          </div>
          <div className="flex justify-between items-center p-1  ">
            <p className='text-center'>Suits &nbsp;{typeof stageReorderedAyahsContext != 'undefined'&& stageReorderedAyahsContext[0] != -1 && stageReorderedAyahsContext.map((e: number) => `[${e}]`).join(', ')}</p>
            <div className="flex justify-center items-center  ">
              <p className={cn(errorNbContext < 1 ? 'text-green-500 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>errors &nbsp;
                </p>
                <p className={cn(errorNbContext < 1 ? 'text-blue-500 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>
                    {errorNbContext}
                </p>
              </div>
            <div className="flex justify-center items-center  ">
            <p className=' text-center text-emerald-500'> Ayahs &nbsp;
                </p>
                <p className=' text-center text-blue-500'>
                    From {getMin()?? '' } To  {getMax()?? ''}
                </p>
            </div>
          </div>
      </div>

      {stageGridSelected && !isOpen?
        <div className="flex flex-col justify-start  items-stretch w-full   ">
          <div className=" -order-last md:order-first p-2 flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div>
          <div className=" flex justify-stretch w-full px-2 flex-1 items-start m-1">
            <EvalSuits  />
          </div> 
          </div>: d3Context && isOpen  ?
                 <div className=" flex justify-center w-screen h-screen items-center p-2 overflow-scroll ">
                 <D3Dialog isOpen={isOpen}  onOpen={onOpen} onClose={onClose}/>
               </div> :sprintContext  && isOpen?
                  <div className=" flex justify-center w-screen h-screen items-center p-2 overflow-scroll ">
                  <SprintDialog isOpen={isOpen}  onOpen={onOpen} onClose={onClose}/>
                </div>:
                dragDropContext && isOpen  ?
               <div className=" flex justify-center w-screen h-screen items-center p-2 overflow-scroll ">
                   <DragDropDialog isOpen={isOpen}  onOpen={onOpen} onClose={onClose}/>
                 </div>
                 :  null
                } 
    </div>
  )
}
export default OpenBoard