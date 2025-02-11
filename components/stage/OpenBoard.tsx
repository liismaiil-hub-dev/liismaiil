'use client'
import { Ayah, AyahPrismaType, StagePrismaType } from '@/app/api/graphql/stage/stage.types';
import EvalClickBoardComp from "@/components/stage/EvalClickBoard";
import EvalDragOrderBoardComp from "@/components/stage/EvalDragOrderBoard";
import EvalOrderedComp from "@/components/stage/EvalOrdered";
import EvalSuits from "@/components/stage/EvalSuits";
import RadioButtonEvalState from "@/components/stage/RadioButtonEvalState";
import SpaceButton from "@/components/stage/SpaceButton";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { cn } from '@/lib/cn-utility'
import { createNewSprint, setSprintSession } from '@/actions/sprint';
import { useRouter } from 'next/navigation';
import { addGuestToStage, getStageForSprint } from '@/actions/stage';
import { useDisclosure } from '@heroui/modal';
import WindowSprintDialog from './WindowSprintDialog';

export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}
const OpenBoard = ( ) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {stageSprintSelected, stageGridSelected, stageEvalContext, stageReorderedAyahsContext, evalValidContext, stageEvalIndexContext, stageHideNbContext, errorNbContext,
    stageShuffeledFirstAyahsContext, stageValidContext, stepIndexContext,   stageOrderedAyahsContext, stageShuffeledAyahsContext, stageGridsContext, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma:{tokenId} } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageOrderedAyahsContext, setStageShuffeledFirstAyahsContext, setStageHideNbContext, setStageGridsContext,  setStageShuffeledAyahsContext, setStageGridSelected ,
     setStageValidContext, setStepIndexContext, setFirstStateContext,setStageReorderedAyahsContext, setEvalValidContext } = stageActions
  
     const {isOpen, onOpen, onClose} = useDisclosure();
           
      

     useEffect(() => {
       dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]}))
      } , []);
     // const [gridIndex, setGridIndex] = useState('0');
      
  
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
  //setGridIndex(stageSprintSelected.stageId.split('-')[stageSprintSelected.stageId.split('-').length - 1 ])
  dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
  dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
}}
_actualSprint()
}

}, [stageSprintSelected]);

  
  function shuffleHandler() {
      dispatch(setFirstStateContext({first: false}))
      const shuffeledAy = _.shuffle(stageShuffeledAyahsContext)
      console.log({ shuffeledAy });

      dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
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


  const sprintSessionHandler = async () =>{
    try {
      const {stageId,createdAt, }= stageGridSelected
        const _sprint = {
        
          stageId, guests:[tokenId,-1], sprintId:stageId
        }
       const res =  await setSprintSession(_sprint) 
      if(typeof res !=='undefined' && res.success) {
        toast.success(res.message)
      }else if(typeof res !=='undefined' && res.message) {
        toast.error(res.message)
      }else {
        toast.error(res?.message)

      }
      // dispatch(setStageGridSelected({ stage: grid}))
    } catch (error) {
      console.log(error);
    }
   }

 async  function sprintHandler() {
      console.log({ stageReorderedAyahsContext, stageShuffeledFirstAyahsContext });
      try {

          if (stageReorderedAyahsContext.length === stageShuffeledFirstAyahsContext.length) {
             const {message, success} = await createNewSprint({
                  sprintId: `${stageGridSelected.stageId}_${tokenId}`,
                  createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                  stageId: stageGridSelected.stageId,
                  tokenId:tokenId,
              })
              if(success) {
                toast.success(`sprint ${stageGridSelected.stageId} was successfully persisted`)
              }
          } else {
              toast.warning('you must at least order the grid once');
          }
      } catch (error) {
          toast.error(`${error}`)
      }
  }

  async  function sprintItHandler() {

  }
  async  function stageItHandler() {
    const resp = await addGuestToStage({
      stageId:stageSprintSelected?.stageId,
      tokenId
    })
   }
  function stageHideNbHandler() {
    dispatch(setStageHideNbContext({ hide: !stageHideNbContext }))
  }
  function shuffelHandler() {
    console.log({ stageShuffeledFirstAyahsContext });

    dispatch(setStageShuffeledFirstAyahsContext({ ayahs: _.shuffle(stageShuffeledFirstAyahsContext) }))
  }
  function stageValidHandler() {
    dispatch(setStageValidContext({ validCtxt: !stageValidContext }))
    console.log({isOpen});
    
    onOpen()
    // setEvalIndex((prev) => prev + 1)
  }
  function evalValidHandler() {
    dispatch(setEvalValidContext({ evalCtxt: !evalValidContext }))
   onClose()
    // setEvalIndex((prev) => prev + 1)
  }
  
  useEffect(() => {
 
    console.log({ stageHideNbContext, stageEvalContext, stageEvalIndexContext, stageGridSelected,  stageReorderedAyahsContext });
  }, [stageHideNbContext, stageEvalIndexContext, stageValidContext, stageEvalContext, stageGridSelected, stageReorderedAyahsContext]);
  
  const [sprintAble, setSprintAble] = useState(false);
 const [taysir, setTaysir] = useState(0);
  
  useEffect(() => {
 
  if(typeof  stageSprintSelected !== 'undefined' &&  stageSprintSelected?.grid === 5) {
    setSprintAble(true)
    console.log({substr : getMaxNb() - getMinNb(), max:getMaxNb(), min: getMinNb() });
    const min =  getMinNb()
    const max = getMaxNb()
    console.log({max_min: max-min});
    
    setTaysir((max- min) )
    }else {
      setSprintAble(false)
    }

  }, [stageSprintSelected]);
  useEffect(() => {
 console.log({isOpen});
 
  }, [isOpen]);
  
  useEffect(() => {
    console.log({stageValidContext, isOpen});
    
  }, [stageValidContext, isOpen]);
  
  return (
    <div className=" flex-col justify-start  h-full p-1 items-center w-full ">
      <div className="flex-col   justify-start  items-center   flex-wrap  ">
      {sprintAble ? 
      <div className='justify-center items-center text-center flex '>{
        sprintAble ? `SprintId : ${stageSprintSelected?.stageId}`
          :`StageId : ${stageSprintSelected?.stageId}` } &nbsp;&nbsp;
        :From ayah &nbsp; : {getMinNb()} &nbsp; To &nbsp;{getMaxNb()}&nbsp;&nbsp;
           </div>:
      <div className='justify-center items-center text-center flex '>StageId &nbsp; : {stageSprintSelected?.stageId} 
        :From &nbsp; : {getMinNb()}To {getMaxNb()}
        
      </div> 
       }
      
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
             {sprintAble ?
            <SpaceButton handlePress={sprintItHandler} title='Sprint it ' />:
            <SpaceButton handlePress={stageItHandler} title='Stage it ' />
              }
        
          
          <div className="flex  justify-between items-center border border-green-300 rounded-md text-center font-sans " >
            <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
              type="checkbox"
              id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={stageHideNbContext} onChange={() => stageHideNbHandler()} />
            <label className='px-1' htmlFor='HIDE_NB'  >Hide nb</label>
          </div>
          <div className="flex  justify-center items-center border border-green-300 rounded-md text-center font-sans " >
            <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
              type="checkbox"
              id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' 
              checked={stageValidContext && isOpen} 
              onChange={() => stageValidHandler()} />
            <label className='px-2' htmlFor='VALID_CTXT' >Validate </label>
          </div>
          <div className="flex  justify-center items-center border border-green-300 rounded-md text-center font-sans " >
            <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
              type="checkbox"
              id='EVAL_CTXT' name='EVAL_CTXT' value='EVAL_CTXT' 
              checked={evalValidContext} 
              onChange={() => evalValidHandler()} />
            <label className='px-2' htmlFor='EVAL_CTXT' >Eval </label>
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

           {/*  <div className="flex justify-center items-center  ">
                <p className=' text-center text-emerald-500'>Grid Index &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    {gridIndex}
                </p>
            </div> */}
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
          <div className=" -order-last md:order-first flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div>
          <div className=" flex justify-stretch w-full flex-1 items-start m-1">
            <EvalSuits  />
          </div> 
          </div> :   stageValidContext && isOpen  ?
                <div className=" flex justify-center w-screen h-screen items-center p-2 overflow-scroll ">
                   <WindowSprintDialog isOpen={isOpen}  onOpen={onOpen} onClose={onClose}/>
                 </div>
                 : null} 
    </div>
  )
}
export default OpenBoard