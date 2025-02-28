'use client'
import { WINDOW_VISUALISATION, Ayah,StagesSprintType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import EvalOrderedComp from "@/components/stage/EvalOrdered";
import EvalSuits from "@/components/stage/EvalSuits";
import _ from 'lodash';
import { ElementRef, ElementType,  useEffect, useRef, useState,  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter} from "@heroui/modal";
import {cn} from "@/lib/cn-utility";

import {Radio, RadioGroup} from "@heroui/radio";
import { addGuestToStage,  getStageForSprint } from '@/actions/stage';

export default function ThreeGridDialog({isOpen,  onOpen, onClose}:{isOpen:boolean,  onOpen:()=> void,  onClose:()=> void}) {
    const dispatch = useDispatch()
    const {windowContext} = useSelector((state: RootStateType) => state.stage)
    const {firstStateContext,stageSprintSelected , stageReorderedAyahsContext,stageOrderedAyahsContext,errorNbContext,stageShuffeledAyahsContext,
       stageShuffeledFirstAyahsContext,catStages, stageGridSelected, stageHideNbContext, validContext } = useSelector((state: RootStateType) => state.stage)
 const { setStageOrderedAyahsContext,setStageReorderedAyahsContext,setFirstStateContext, setStageSprintSelected,setStageValidContext,setStageShuffeledAyahsContext,
  setErrorNbContext,setStageHideNbContext, setValidContext, setWindowVisualisationContext } = stageActions
  const {guestPrisma:{tokenId}} = useSelector((state: RootStateType) => state.guestPrisma)
        const [windowVisualisation, setWindowVisualisation] = useState(WINDOW_VISUALISATION.ALL);
     
 function ayahInReordered(ord: number) {
    if(typeof stageReorderedAyahsContext!= 'undefined' ) {
     console.log({ stageReorderedAyahsContext, ord, some: stageReorderedAyahsContext.some((el) => el === ord) });
     return stageReorderedAyahsContext.some((el) => el === ord)
}}

useEffect(() => {
  dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]}))
 } , []);
 
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
        dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
        dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
      }}
_actualSprint()
}}, [stageSprintSelected]);

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
 useEffect(() => {
     console.log({ stageOrderedAyahsContext,stageShuffeledAyahsContext });
 // setGridAyahs(JSON.parse(stageGridSelected.ayahs!))
 }, [stageOrderedAyahsContext,stageShuffeledAyahsContext ]);

async function validateHandler() {
    try {
        setWindowVisualisation(WINDOW_VISUALISATION.HIDE_NB)
     } catch (error) {
         toast.warning(`${error}`)
}}
useEffect(() => {
  dispatch(setWindowVisualisationContext({windVisu:windowVisualisation}))

}, [windowVisualisation]);


async function sprintHandler() {
  try {
    const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb +1)
        /* dispatch(setStageSprintSelected({stage:{
            arabName:_sprints[0].arabName,
            souraName:_sprints[0].souraName,
            souraNb:_sprints[0].souraNb,
            grid:_sprints[0].grid,
            group:_sprints[0].group,
          stageId:_sprints[0].stageId,
            
           }})) */
  }catch (error) {
        toast.warning(`${error}`)
      }  
        
      }
async function duoHandler() {
        try {
          const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb +1)
        }catch (error) {
              toast.warning(`${error}`)
            }  
            }
  async function prevStageHandler() {
         try {
          const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb && spr.grid ===stageSprintSelected.grid )
          if(_sprints .length > 0 ){
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
          stageId:_sprints[0].stageId,
        }}
      ))}}else {
        toast.warning('please reselect a stage ')
        onClose()
}}catch (error) {
              toast.warning(`${error}`)
}}
         
   function nextStageHandler() {
    console.log({ catStages, stageSprintSelected});
    const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb && spr.grid === 3 )
    if(_sprints .length > 0 ){
      const _actualSprintIndex = _.findIndex(_sprints,(elm:StagesSprintType )  => elm.stageId === stageSprintSelected.stageId )
      console.log({ _sprints, _actualSprintIndex , _sprLength:  _sprints.length});
      
     if(_actualSprintIndex < _sprints.length -1 ){
      console.log({ _sprints, _actualSprintIndex , _sprLength:  _sprints.length});
   
      dispatch(setStageSprintSelected({stage:{
      arabName:stageSprintSelected.arabName,
      souraName:stageSprintSelected.souraName,
      souraNb:stageSprintSelected.souraNb,
      grid:stageSprintSelected.grid,
      group:stageSprintSelected.group,
    stageId:_sprints[_actualSprintIndex +1].stageId,
      }})) 
      onOpen()
    }else {
  dispatch(setStageSprintSelected({stage:{
  arabName:stageSprintSelected.arabName,
    souraName:stageSprintSelected.souraName,
    souraNb:stageSprintSelected.souraNb,
    grid:stageSprintSelected.grid,
    group:stageSprintSelected.group,
    stageId:_sprints[0].stageId,
    //ayahs:_sprint.stage!.ayahs
  }}))

}
  } else {
    toast.warning('please reselect a stage ')
    onClose()
  }}
   
  async  function sprintItHandler() {
    try {
      const resp = await addGuestToStage({
        stageId:stageSprintSelected?.stageId,
        tokenId
      })
      if(resp && resp.success && resp.message) {
        console.log({resp});
        toast.success(`your sprint is  ${resp.message} is validated`)
      }else{
        toast.warning(`warning ${resp.message}`)
      }
    } catch (error) {
      toast.warning(`warning ${error}`)
    }
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
 function stageValidHandler() {
  dispatch(setValidContext({ validCtxt: !validContext }))
 }
function stageHideNbHandler() {
  dispatch(setStageHideNbContext({ hide: !stageHideNbContext }))
}
 function shuffleHandler() {
        const shuffeledAy = _.shuffle(stageShuffeledAyahsContext)
     console.log({ shuffeledAy })
       dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
}
 useEffect(() => {
   console.log({stageOrderedAyahsContext, stageShuffeledAyahsContext, catStages});
 }, [stageOrderedAyahsContext, stageShuffeledAyahsContext, catStages]);
 
   
return  <Modal backdrop={'blur'} scrollBehavior={'outside'} isOpen={isOpen} size={'full'} onClose={onClose}>
      <ModalContent className='overflow-scroll'>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-blue-700"> {`
            ${stageSprintSelected.souraNb} - ${stageSprintSelected.arabName} -  StageId ${stageSprintSelected.stageId}  - 
             ( From Ay ${stageOrderedAyahsContext[0].numberInSurah} To ${stageOrderedAyahsContext[stageOrderedAyahsContext.length -1 ].numberInSurah} )
       ` } 
            </ModalHeader>
            <ModalBody>
            <div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
            <div className="flex-col   justify-start  items-center   flex-wrap  ">
            
           <div className='justify-center items-center text-center flex '>{
            
          `StageId : ${stageSprintSelected?.stageId}` } &nbsp;&nbsp;
        :&nbsp; From ayah &nbsp; : {getMinNb()} &nbsp; To &nbsp;{getMaxNb()}&nbsp;&nbsp;
           </div>
             <div className="flex justify-center items-center  p-1  ">
                      <p className='text-center inline-flex '>Soura &nbsp;: [&nbsp;{stageSprintSelected?.arabName ? stageSprintSelected?.arabName : stageSprintSelected?.souraName}&nbsp;]&nbsp;</p>
                      <p className='text-center inline-flex '>&nbsp; Nb : [&nbsp;{stageSprintSelected?.souraNb}&nbsp;] </p>
                      <p className='text-center inline-flex'>&nbsp; Grid :[&nbsp;{stageSprintSelected?.grid*stageSprintSelected?.grid}&nbsp;]</p>
                      <p className='text-center inline-flex' > &nbsp; Nb of Grids:  [&nbsp;{stageSprintSelected?.group ?
                       stageSprintSelected?.group : stageSprintSelected?.stageId.split('-')[2]}] </p>
            </div>
              <div className="flex-col  justify-start items-center   text-center font-sans  " >
          <div className="flex justify-evenly items-center gap-1 flex-wrap ">
              <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
              <SpaceButton handlePress={prevStageHandler} title='Prev Stage' />
              <SpaceButton handlePress={nextStageHandler} title='Next Stage' />
               {stageHideNbContext&&
              <SpaceButton handlePress={validateHandler} title='Sprint it ' />}
            <div className="flex  justify-between items-center  p-1 border border-green-300 rounded-md text-center font-sans " >
              <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
                type="checkbox"
                id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={stageHideNbContext} onChange={() => stageHideNbHandler()} />
              <label className='px-1' htmlFor='HIDE_NB'  >Hide nb</label>
            </div>
          {/*   <div className="flex  justify-center items-center border p-1  border-green-300 rounded-md text-center font-sans " >
            <input className="flex  p-2 justify-center items-center  border border-blue-800 text-green-300"
              type="checkbox"
              id='VALID_CTXT' name='VALID_CTXT' value='VALID_CTXT' 
              checked={validContext } 
              onChange={() => stageValidHandler()} />
            <label className='px-2' htmlFor='VALID_CTXT' >Validate </label>
          </div> */}
          <div className="flex  justify-center items-center border p-1  border-green-300 rounded-md text-center font-sans " >
            
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
           {stageGridSelected &&
        <div className="flex flex-col justify-start  items-stretch w-full   ">
            <EvalOrderedComp />
            <EvalSuits  />
            </div>
            }
            </div>
            </div>

            </ModalBody>
            <ModalFooter>
              <div className=" flex w-full   justify-evenly items-center border-2   p-2">
            <RadioGroup
                           orientation="horizontal"
                           value={windowVisualisation}
                           onValueChange={setWindowVisualisation}
                           >
               <div className="flex  p-2  rounded-md justify-center items-center border-2 border-violet-500  space-x-2">
                         <Radio value={WINDOW_VISUALISATION.AWAL }>Awal</Radio>
                         <Radio value={WINDOW_VISUALISATION.AWSAT }>Awsat</Radio>
                         <Radio value={WINDOW_VISUALISATION.AKHIR }>Akhir</Radio>
                         <Radio value={WINDOW_VISUALISATION.ODD }>Odd</Radio>
                         <Radio value={WINDOW_VISUALISATION.EVEN }>Even</Radio>
                         <Radio value={WINDOW_VISUALISATION.ALL }>All</Radio>
               </div>
                                                                                                
                     </RadioGroup>  
                     <div className="flex justify-between p-2  rounded-md gap-1 items-center border-2 border-violet-500">
                        <SpaceButton  handlePress={validateHandler} title='Validate '  />
                        <SpaceButton  handlePress={sprintHandler} title='Sprint '  />
                         <SpaceButton  handlePress={duoHandler} title='Duo ' /> 
                        {/* <SpaceButton  handlePress={prevStageHandler} title='Prev Window '  />
                        <SpaceButton  handlePress={nextSprintHandler} title='Next Window'  /> */}
        </div>
                      </div>
                            
              </ModalFooter>
          
          </>
        )}
      </ModalContent>
    </Modal>
}
