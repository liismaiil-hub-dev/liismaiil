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
import { cn } from '@nextui-org/react';
import { createNewSprint, setSprintSession } from '@/actions/sprint';
import { useRouter } from 'next/navigation';

export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}
const OpenBoard = ( ) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { stageGridSelected, stageEvalContext, stageReorderedAyahsContext, firstStateContext, stageEvalIndexContext, stageHideNbContext, errorNbContext,
    stageShuffeledFirstAyahsContext, stageValidContext, stepIndexContext,   stageOrderedAyahsContext, stageShuffeledAyahsContext, stageGridsContext, } = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

  const { setStageOrderedAyahsContext, setStageShuffeledFirstAyahsContext, setStageHideNbContext, setStageGridsContext,  setStageShuffeledAyahsContext, setStageGridSelected ,
     setStageValidContext, setStepIndexContext, setFirstStateContext,setStageReorderedAyahsContext, setErrorNbContext } = stageActions
     
     useEffect(() => {
       dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]}))
      } , []);
      const [gridIndex, setGridIndex] = useState('0');
      
  useEffect(() => {
    if (typeof stageGridSelected !== 'undefined' && stageGridSelected.ayahs != '' && typeof stageGridSelected.ayahs !== 'undefined') {
      console.log({ stageGridSelected });
      const _shuffeleledFirst = JSON.parse(stageGridSelected.ayahs).map((ordG: Ayah, index: number) => ({ ...ordG, index }));
      console.log({ _shuffeleledFirst });
    const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['order'])].map((ordG: Ayah, index) => ({ ...ordG, index }))
      console.log({ _orderedAy });
      setGridIndex(stageGridSelected.stageId.split('-')[stageGridSelected.stageId.split('-').length - 1 ])
      dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
      dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
    }
  }, [stageGridSelected]);

  
  function shuffleHandler() {
      dispatch(setFirstStateContext({first: false}))
      const shuffeledAy = _.shuffle(stageShuffeledFirstAyahsContext)
      console.log({ shuffeledAy });

      dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
  }
  /*  
  function firstHandler() {
      dispatch(setFirstStateContext({first: true}))
      dispatch(setErrorNbContext({errorNb:0}))
      dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]}))
      
      dispatch(setStageShuffeledFirstAyahsContext({ ayahs: stageShuffeledFirstAyahsContext }))

  }
  useEffect(() => {
      console.log({ stageReorderedAyahsContext });

  }, [stageReorderedAyahsContext]);

  useEffect(() => {
      console.log(stageShuffeledAyahsContext);

  }, [stageShuffeledAyahsContext]);
 */
 
  function getMax() {
      if (stageGridSelected && JSON.parse(stageGridSelected.ayahs).length > 0 && JSON.parse(stageGridSelected.ayahs)[0].numberInSurah !== -1 ) {
          const _numbers =  JSON.parse(stageGridSelected.ayahs).map((e: Ayah)=> e.numberInSurah)
        return  _.max(_numbers) as string
        }
  }
  function getMin() {
  //    console.log({ stageOrderedAyahsContext, stepIndexContext });
  if (stageGridSelected && JSON.parse(stageGridSelected.ayahs).length > 0 && JSON.parse(stageGridSelected.ayahs)[0].numberInSurah !== -1 ) {
    const _numbers =  JSON.parse(stageGridSelected.ayahs).map((e: Ayah)=> e.numberInSurah)
  return  _.min(_numbers) as string
    }
  }

function getMaxNb() {
    if (stageGridSelected && JSON.parse(stageGridSelected.ayahs).length > 0 && JSON.parse(stageGridSelected.ayahs)[0].number !== -1 ) {
        const _numbers =  JSON.parse(stageGridSelected.ayahs).map((e: Ayah)=> e.number)
      return  _.max(_numbers) as string
      }
}
function getMinNb() {
//    console.log({ stageOrderedAyahsContext, stepIndexContext });
if (stageGridSelected && JSON.parse(stageGridSelected.ayahs).length > 0 && JSON.parse(stageGridSelected.ayahs)[0].number !== -1 ) {
  const _numbers =  JSON.parse(stageGridSelected.ayahs).map((e: Ayah)=> e.number)
return  _.min(_numbers) as string
  }
}


  const sprintSessionHandler = async () =>{
    try {
      const {stageId,createdAt, }= stageGridSelected
        const _sprint = {
        
          stageId, guests:[guestPrisma.tokenId,-1], sprintId:stageId
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
                  sprintId: `${stageGridSelected.stageId}_${guestPrisma.tokenId}`,
                  createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                  stageId: stageGridSelected.stageId,
                  tokenId:guestPrisma.tokenId,
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
   router.push(`/stages/${stageGridSelected.stageId}`)
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
    // setEvalIndex((prev) => prev + 1)
  }
  
  useEffect(() => {
 
    console.log({ stageHideNbContext, stageEvalContext, stageEvalIndexContext, stageGridSelected,  stageReorderedAyahsContext });
  }, [stageHideNbContext, stageEvalIndexContext, stageValidContext, stageEvalContext, stageGridSelected, stageReorderedAyahsContext]);
  
  const [sprintAble, setSprintAble] = useState(false);
  
  useEffect(() => {
    const gridNb = stageGridSelected.stageId.split('-')[1];

  if(parseInt(gridNb) === 5) {
setSprintAble(true)
    }else {
      setSprintAble(false)
    }

  }, [stageGridSelected]);
  
  return (
    <div className=" flex-col justify-start space-y-2 h-full py-2 items-center w-full ">
      <div className="flex-col   justify-start  items-stretch  gap-3 flex-wrap  ">
      <div className='justify-center items-center text-center inline-flex '>StageId &nbsp; : {stageGridSelected.stageId} :From &nbsp; : {getMinNb()}To {getMaxNb()}
        {`Sprint Gift for  ${getMaxNb()}-${getMinNb()} =  `}
      </div>
      
      <div className="flex justify-center items-center mt-2 p-3  ">
                <p className='text-center inline-flex '>Soura &nbsp;: [&nbsp;{stageGridSelected.arabName ? stageGridSelected.arabName : stageGridSelected.souraName}&nbsp;]&nbsp;</p>
                <p className='text-center inline-flex '>&nbsp; Nb : [&nbsp;{stageGridSelected.souraNb}&nbsp;] </p>
                <p className='text-center inline-flex'>&nbsp; Grid :[&nbsp;{stageGridSelected.grid}&nbsp;]</p>
                <p className='text-center inline-flex' > &nbsp; Nb of Grids:  [&nbsp;{stageGridSelected.group ?
                 stageGridSelected.group : stageGridSelected?.stageId.split('-')[2]}] </p>
            </div>
        <div className="flex-col  justify-start items-center  gap-3 text-center font-sans  " >
        <div className="flex justify-evenly items-center gap-1 ">
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
             {sprintAble && 
            <SpaceButton handlePress={sprintItHandler} title='Sprint it ' />
        }
            {sprintAble && 
            <SpaceButton handlePress={sprintHandler} title='Sprint ' />
        }
        {sprintAble && 
          <SpaceButton handlePress={sprintSessionHandler} title='Sprint charge ' />
      }
        </div>
        <div className="flex justify-evenly items-center gap-1 flex-wrap ">
          
          <div className="flex  justify-between items-center p-2  border border-green-300 rounded-md text-center font-sans " >
            <input className="flex border-blue-800 text-green-300 justify-center items-center  border "
              type="checkbox"
              id='HIDE_NB' name='HIDE_NB' value='HIDE_NB' checked={stageHideNbContext} onChange={() => stageHideNbHandler()} />
            <label className='px-2' htmlFor='HIDE_NB'  >Hide nb</label>
          </div>
          <div className="flex  justify-center items-center p-2 border border-green-300 rounded-md text-center font-sans " >
            <input className="flex  justify-center items-center  border border-blue-800 text-green-300"
              type="checkbox"
              id='VALID_CTXT' name='VALID_CTXT' value='HIDE_NB' checked={stageValidContext} onChange={() => stageValidHandler()} />
            <label className='px-2' htmlFor='VALID_CTXT' >valid sprint</label>
          </div>
            <div className="CENTER border border-green-300 rounded-md  p-2 text-center font-sans " >
               <RadioButtonEvalState
                evalState={EVAL_STATE.EVAL} title='Eval board' />
            </div>
            <div className="CENTER  border border-blue-300 rounded-md p-2 text-center font-sans " >
              <RadioButtonEvalState
                evalState={EVAL_STATE.ORDER} title='Order Grid' />
            </div>
            <div className="CENTER  border border-violet-300 rounded-md p-2 text-center font-sans " >
              <RadioButtonEvalState
                evalState={EVAL_STATE.CLICK} title='Click Grid' />
            </div>
          </div>
          </div>
          
            <div className="flex justify-start items-center mt-1 p-3  ">
           
            <p className='text-center'>reordered suits &nbsp;{typeof stageReorderedAyahsContext != 'undefined'&& stageReorderedAyahsContext[0] != -1 && stageReorderedAyahsContext.map((e: number) => `[${e}]`).join(', ')}</p>
            </div>
            
            <div className="flex justify-between items-center mt-1 p-3  ">
            
            <div className="flex justify-center items-center  ">
              <p className={cn(errorNbContext < 1 ? 'text-green-500 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>errors &nbsp;
                </p>
                <p className={cn(errorNbContext < 1 ? 'text-blue-500 !important' : errorNbContext > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>
                    {errorNbContext}
                </p>
              </div>

            <div className="flex justify-center items-center  ">
                <p className=' text-center text-emerald-500'>Grid Index &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    {gridIndex}
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

      {stageGridSelected && stageEvalContext === EVAL_STATE.EVAL ?
        <div className="flex flex-col justify-start  items-stretch w-full   ">
          <div className=" -order-last md:order-first flex justify-stretch w-full flex-1 items-start m-1 ">
            <EvalOrderedComp />
          </div>
          <div className=" flex justify-stretch w-full flex-1 items-start m-1">
            <EvalSuits  />
          </div> </div> :
        stageEvalContext === EVAL_STATE.ORDER ?
          <EvalDragOrderBoardComp />
          : stageEvalContext === EVAL_STATE.CLICK && <EvalClickBoardComp
          />}
    </div>
  )
}
export default OpenBoard