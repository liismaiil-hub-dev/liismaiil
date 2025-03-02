'use client'
import { getStageForSprint } from '@/actions/stage';
import { Ayah, WINDOW_VISUALISATION } from '@/app/api/graphql/stage/stage.types';
import { ayahWithoutPunct } from '@/lib/tools';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';

import _ from 'lodash';
import { memo,  useEffect, useState,  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function EvalSuits() {
    const dispatch = useDispatch()
    
    const {windowVisualisationContext, firstStateContext, stageReorderedAyahsContext,stageOrderedAyahsContext,stageSprintSelected,
         errorNbContext,stageShuffeledAyahsContext, stageGridsContext,  stageHideNbContext, stageShuffeledFirstAyahsContext, 
         stepIndexContext, stageGridSelected } = useSelector((state: RootStateType) => state.stage)
    const { setStageReorderedAyahsContext,setFirstStateContext, setStageGridSelected,setStageValidContext, setStageOrderedAyahsContext, setStageShuffeledAyahsContext, setErrorNbContext,setStageHideNbContext } = stageActions
    
    function ayahInReordered(ord: number) {
       if(typeof stageReorderedAyahsContext!= 'undefined' ) {
        console.log({ stageReorderedAyahsContext, ord, some: stageReorderedAyahsContext.some((el) => el === ord) });
        return stageReorderedAyahsContext.some((el) => el === ord)
}    }
  
useEffect(() => {
dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]})) 
}, []);
  
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
  }, [stageSprintSelected]);
   
  useEffect(() => {
console.log({stageShuffeledAyahsContext});

  }, [stageShuffeledAyahsContext]);
   
  function validAyahHandler(reord: number) {
        console.log({ reord, stageReorderedAyahsContext });
          if (typeof firstStateContext!== 'undefined' && firstStateContext && typeof stageReorderedAyahsContext!= 'undefined' && stageReorderedAyahsContext.length + 1 === stageShuffeledFirstAyahsContext.length) {
            toast.success(`It s  your last ayah on that grid of  ${stageShuffeledFirstAyahsContext.length} values`)
        }
        if (typeof stageReorderedAyahsContext!= 'undefined' && stageReorderedAyahsContext[0] == -1 && reord !== stageOrderedAyahsContext[0].numberInSurah) {
            console.log({reord,fir:stageOrderedAyahsContext[0].numberInSurah} );
            
            toast.error(`You made a mistake on the first ayah its ${stageOrderedAyahsContext[0].text} it s in orange color `)
        }
        else if (typeof stageReorderedAyahsContext!= 'undefined' && stageReorderedAyahsContext[0] == -1) {
            dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[reord]}))

        } else if (ayahInReordered(reord)) {
            toast.success(`You already selected ayah ${reord}`)
        } else if (typeof stageReorderedAyahsContext!= 'undefined' && reord === stageReorderedAyahsContext[stageReorderedAyahsContext.length - 1] + 1) {
              dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[...stageReorderedAyahsContext, reord]}))
        } else if(typeof stageReorderedAyahsContext!= 'undefined' ){
            toast.warning(`you must select 
                 ${stageOrderedAyahsContext[stageReorderedAyahsContext.length].text} 
                 is next ayah `, {
                closeOnClick: true,
                autoClose: false
            })
            dispatch(setErrorNbContext({errorNb: errorNbContext+1}))
        }        
        if (typeof stageReorderedAyahsContext!= 'undefined' && stageSprintSelected.grid === 3 && errorNbContext < 3) {
            console.log({ stageReorderedAyahsContext, stageShuffeledAyahsContext });
            if ( stageReorderedAyahsContext.length === stageShuffeledAyahsContext.length && stageReorderedAyahsContext[0] !== -1) {
                toast.success('it was the last ayas for that grid you can stage it')
            }
        } else if (typeof stageReorderedAyahsContext!= 'undefined' && stageSprintSelected.grid === 4 && errorNbContext < 5) {
          if ( stageReorderedAyahsContext.length === stageShuffeledAyahsContext.length && stageReorderedAyahsContext[0] !== -1) {
                toast.success('it was the last ayas for that grid you can stage it')
            }
        } else if (typeof stageReorderedAyahsContext!= 'undefined' && stageSprintSelected.grid === 5 && errorNbContext < 7) {
          if ( stageReorderedAyahsContext.length === stageShuffeledAyahsContext.length && stageReorderedAyahsContext[0] !== -1) {
                toast.success('it was the last ayas for that grid you can stage it')
            }
        }else {
            toast.warning(`you must rehearsal  !!! `)
            dispatch(setStageValidContext({ validCtxt: false }))
            dispatch(setStageHideNbContext({ hide: false }))
            dispatch(setErrorNbContext({errorNb:0}))
            dispatch(setFirstStateContext({first:false}))
  }}
  
 
  useEffect(() => {
    console.log({ stageReorderedAyahsContext, stageShuffeledAyahsContext });
    if ( stageReorderedAyahsContext.length === stageShuffeledAyahsContext.length && stageReorderedAyahsContext[0] !== -1) {
        toast.success('it was the last ayas for that grid you can stage it')
    }
  }, [stageReorderedAyahsContext]);
  
useEffect(() => {
        console.log({stageGridSelected, stageSprintSelected});
        
    }, [stageReorderedAyahsContext, stageGridSelected, stageSprintSelected]);
    
    useEffect(() => {
        console.log({ stepIndexContext });
      /*   if (stepIndexContext < stageGridsContext.length) {
            dispatch(setStageGridSelected({ stage: stageGridsContext[stepIndexContext] }))
        } else {
            dispatch(setStageGridSelected({ stage: stageGridsContext[0] }))
        } */
    }, [stepIndexContext]);
    function getMin() {
  //  console.log({ stageReorderedAyahsContext, stageHideNbContext });
    if (stageOrderedAyahsContext && 
        stageOrderedAyahsContext.length > 0 && stageOrderedAyahsContext[0].numberInSurah 
        !== -1 ) {
        console.log({Num:stageOrderedAyahsContext[0].numberInSurah, 
            });
      return stageOrderedAyahsContext[0].numberInSurah!
        } else return 
       0 
    }

    return <div className="flex flex-col justify-start items-stretch w-full h-full  rounded-md space-y-2 border-2  border-orange-400">
            { stageShuffeledAyahsContext && typeof stageReorderedAyahsContext !== 'undefined' && 
            stageShuffeledAyahsContext?.map((ayag: Ayah) => {
                //console.log({ stageReorderedAyahsContext, ayag });
                if(!stageReorderedAyahsContext.includes(ayag.numberInSurah!)){

                if (typeof stageHideNbContext !== 'undefined' && !stageHideNbContext) {
                    return <button onClick={() => { validAyahHandler(ayag.numberInSurah!) }}
                     key={`${ayag.numberInSurah}_${ayag.juz}`} 
                     className=" flex p-1 bg-emerald-100/30 items-center gap-1 border-1 border-green-300/25 ">
                                    { getMin() ==  ayag.numberInSurah ?
                                  <div className=" flex p-1border-2 rounded-md bg-orange-400/70 border-red-500 
                                  justify-between w-full h-full items-center gap-1 border-1 ">  
                                  <div className='flex-none w-24 justify-start  '>{` [ ${ ayag.numberInSurah}- ${ ayag.number}] `}
                                    </div>
                                    <div className=' flex flex-grow   text-center justify-end
                                    hover:bg-emerald-600 hover:text-yellow-200  hover:text-2xl hover:-translate-x-5 hover:-translate-y-1 ease-in 
                                    hover:cursor-pointer '>{windowVisualisationContext === WINDOW_VISUALISATION.ODD && ayag.numberInSurah %2 !==0 ?ayag.text :
                                      windowVisualisationContext === WINDOW_VISUALISATION.EVEN && ayag.numberInSurah %2 ===0 ? ayag.text:
                                      windowVisualisationContext === WINDOW_VISUALISATION.AKHIR ? ayahWithoutPunct(ayag.text)[ayahWithoutPunct(ayag.text).length -1]:
                                      windowVisualisationContext === WINDOW_VISUALISATION.AWAL ? ayahWithoutPunct(ayag.text)[0]: 
                                      windowVisualisationContext === WINDOW_VISUALISATION.AWSAT ? ayahWithoutPunct(ayag.text)[Math.ceil(ayahWithoutPunct(ayag.text).length/2)]:
                                      windowVisualisationContext === WINDOW_VISUALISATION.ALL  ?ayag.text : ayag.text}
                                    </div>
                                    </div> 
                                    :
                                    <div className=" flex p-1 bg-emerald-100/30 justify-stretch w-full h-full
                                                 items-center gap-1 border-b-1 border-green-300/25">  
                                  <div className='flex-none w-24  justify-start border-2  items-center'>{` [ ${ ayag.numberInSurah}- ${ ayag.number}] `}
                                    </div>
                                    <div className=' flex-grow flex text-right justify-end items-center w-full
                                     hover:bg-emerald-600 hover:text-yellow-200 hover:text-2xl  hover:-translate-x-5 hover:-translate-y-1 ease-in 
                                     hover:cursor-pointer  '>{
                                      windowVisualisationContext === WINDOW_VISUALISATION.ODD && 
                                      ayag.numberInSurah %2 !==0 ?ayag.text :
                                        windowVisualisationContext === WINDOW_VISUALISATION.EVEN && ayag.numberInSurah %2 ===0 ? ayag.text:
                                        windowVisualisationContext === WINDOW_VISUALISATION.AKHIR ? ayahWithoutPunct(ayag.text)[ayahWithoutPunct(ayag.text).length -1]:
                                        windowVisualisationContext === WINDOW_VISUALISATION.AWAL ? ayahWithoutPunct(ayag.text)[0]: 
                                        windowVisualisationContext === WINDOW_VISUALISATION.AWSAT ? ayahWithoutPunct(ayag.text)[Math.ceil(ayahWithoutPunct(ayag.text).length/2)]:
                                        windowVisualisationContext === WINDOW_VISUALISATION.ALL  ?ayag.text : null }
                                     </div></div>}
                                </button>
                            }
                            else {
                                return (getMin() ==  ayag.numberInSurah ?
                                    <button onClick={() => { validAyahHandler(ayag.numberInSurah!) }} 
                                    key={`${ayag.number!}_${ayag.juz}`} 
                                    className=' border-2 rounded-md bg-orange-400/70 border-red-500 flex text-right justify-end items-center p-2 w-full h-full px-1 gap-1 border-b-1 border-green-300/25 
                                          hover:stage-hover  hover:cursor-pointer '>
                                        {windowVisualisationContext === WINDOW_VISUALISATION.ODD && ayag.numberInSurah %2 !==0 ?ayag.text :
                                      windowVisualisationContext === WINDOW_VISUALISATION.EVEN && ayag.numberInSurah %2 ===0 ? ayag.text:
                                      windowVisualisationContext === WINDOW_VISUALISATION.AKHIR ? ayahWithoutPunct(ayag.text)[ayahWithoutPunct(ayag.text).length -1]:
                                      windowVisualisationContext === WINDOW_VISUALISATION.AWAL ? ayahWithoutPunct(ayag.text)[0]: 
                                      windowVisualisationContext === WINDOW_VISUALISATION.AWSAT ? ayahWithoutPunct(ayag.text)[Math.ceil(ayahWithoutPunct(ayag.text).length/2)]:
                                      windowVisualisationContext === WINDOW_VISUALISATION.ALL  ?ayag.text : ayag.text
                                      }</button>:
                                        <button onClick={() => { validAyahHandler(ayag.numberInSurah!) }} 
                                        key={`${ayag.number!}_${ayag.juz}`} 
                                        className='  flex text-right justify-end items-center p-2 bg-emerald-100/30 w-full h-full px-1 gap-1 border-1 rounded-md 
                                        border-green-300/25  hover:stage-hover  hover:cursor-pointer '>
                                           {windowVisualisationContext === WINDOW_VISUALISATION.ODD && ayag.numberInSurah %2 !==0 ?ayag.text :
                                        windowVisualisationContext === WINDOW_VISUALISATION.EVEN && ayag.numberInSurah %2 ===0 ? ayag.text:
                                        windowVisualisationContext === WINDOW_VISUALISATION.AKHIR ? ayahWithoutPunct(ayag.text)[ayahWithoutPunct(ayag.text).length -1]:
                                        windowVisualisationContext === WINDOW_VISUALISATION.AWAL ? ayahWithoutPunct(ayag.text)[0]: 
                                        windowVisualisationContext === WINDOW_VISUALISATION.AWSAT ? ayahWithoutPunct(ayag.text)[Math.ceil(ayahWithoutPunct(ayag.text).length/2)]:
                                        windowVisualisationContext === WINDOW_VISUALISATION.ALL  ?ayag.text : null
                                        } </button>
                                    )
                            }}})}
        </div>
  

}

export default memo(EvalSuits);
