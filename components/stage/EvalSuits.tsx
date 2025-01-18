'use client'

import { createNewSprint } from "@/actions/sprint";
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from "@nextui-org/react";
import _ from 'lodash';
import { memo,  useEffect, useState,  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function EvalSuits() {
    const dispatch = useDispatch()
    
    const {firstStateContext, stageReorderedAyahsContext,stageOrderedAyahsContext,
         errorNbContext,stageShuffeledAyahsContext, stageGridsContext,  stageHideNbContext, stageShuffeledFirstAyahsContext, 
         stepIndexContext, stageGridSelected } = useSelector((state: RootStateType) => state.stage)
    const { setStageReorderedAyahsContext,setFirstStateContext, setStageGridSelected,setStageValidContext, setErrorNbContext,setStageHideNbContext } = stageActions
    
    function ayahInReordered(ord: number) {
       if(typeof stageReorderedAyahsContext!= 'undefined' ) {
        console.log({ stageReorderedAyahsContext, ord, some: stageReorderedAyahsContext.some((el) => el === ord) });
        return stageReorderedAyahsContext.some((el) => el === ord)
}    }
  
useEffect(() => {
dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]})) 
}, []);
   
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
        console.log({  });
setGridAyahs(JSON.parse(stageGridSelected.ayahs))
    }, [stageReorderedAyahsContext, stageGridSelected]);
    useEffect(() => {
        console.log({ stepIndexContext });
        if (stepIndexContext < stageGridsContext.length) {
            dispatch(setStageGridSelected({ stage: stageGridsContext[stepIndexContext] }))
        } else {
            dispatch(setStageGridSelected({ stage: stageGridsContext[0] }))
        }
    }, [stepIndexContext]);
  //  console.log({ stageReorderedAyahsContext, stageHideNbContext });

    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
        <div className="flex flex-col justify-start items-stretch  space-y-2">
            { stageShuffeledAyahsContext && typeof stageReorderedAyahsContext !== 'undefined' && stageShuffeledAyahsContext?.map((ayag: Ayah) => {
                //console.log({ stageReorderedAyahsContext, ayag });
                if(!stageReorderedAyahsContext.includes(ayag.numberInSurah!)){

                if (typeof stageHideNbContext !== 'undefined' && !stageHideNbContext) {
                    return <button onClick={() => { validAyahHandler(ayag.numberInSurah!) }}
                     key={`${ayag.numberInSurah}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between px-2
                    items-center space-x-2 border-b-1 border-green-300/25 ">
                                    <div className='flex justify-center focus:border-red-500 items-center'>{ayag.number! }</div>
                                    <div className=' flex text-right justify-end items-center
                       hover:bg-emerald-800 hover:text-yellow-200 hover:scale-125 hover:-translate-x-3 hover:-translate-y-1 ease-in 
                       hover:cursor-pointer  active:border-red-500'>{ayag.text}</div>
                                </button>
                            }
                            else {
                                return (
                                    <button onClick={() => { validAyahHandler(ayag.number!) }} 
                                    key={`${ayag.number!}_${ayag.juz}`} 
                                    className=' flex text-right justify-end items-center
                                     p-2 bg-emerald-100/30  px-2
                     space-x-2 border-b-1 border-green-300/25 
                                    hover:bg-emerald-800 hover:text-yellow-200 hover:scale-110
                                    hover:-translate-x-5 hover:-translate-y-1 ease-in 
                                    hover:cursor-pointer '>{ayag.text}</button>)
                            }}})}
        </div>
    </div>

}

export default memo(EvalSuits);
