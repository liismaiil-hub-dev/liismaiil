'use client'
import { AyahTabletType } from '@/api/graphql/sprint/sprint.types';
import * as _ from 'lodash';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AyahButton from './AyahButton';
type AyahWithId = {
    order: number;
    text: string;
    juz: number;
    slice?: string;
    id: number
}

export default function EvalClickBoard({ grid, evalIndex, hideNb, arabName }: { grid: AyahTabletType[], evalIndex: number, hideNb: boolean, arabName: string },) {

    const dispatch = useDispatch()
    const [orderedAyahs, setOrderedAyahs] = useState<AyahTabletType[]>(() => _.sortBy(grid, 'order'))
    const orderedAyahsWithId: AyahWithId[] = orderedAyahs.map((ordG: AyahTabletType, index) => ({ ...ordG, id: index }))
    
    const [gridState, setGridState] = useState<AyahWithId[]>(() => _.shuffle(orderedAyahsWithId))
const [actualAyah, setActualAyah] = useState(0);

    
    function handleShuffle() {
        const newGrid = _.shuffle(gridState)
        console.log({ newGrid })
        setGridState(newGrid)
    }
    function handleValidate() {
        const newGrid = _.shuffle(gridState)
        console.log({ newGrid })
        setGridState(newGrid)
    }
    function pressHandler(ord:number){
        if(ord && ord=== actualAyah){
            setActualAyah((prev)  => prev + 1)
        }
    }
    
    function repeatHandler(){
        setGridState
        //const _randomGrid =   Math.random() * ( - min) + min;
       // setGridState(Math.floor(Math.random() * 16777215).toString(16);)
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    }


    return (<div id="Eval Board " className="flex flex-col 
    justify-between items-stretch   w-full   h-full " >
            <div id="Eval Board " className="flex grid-cols-1 md:grid-cols-2 
    justify-between items-stretch   w-full   h-full " >
        <div  className="flex flex-col w-full items-end justify-center">
        {gridState && gridState.map((ayd: AyahWithId, index: number) => {
                return (
                    <AyahButton key={`${ayd.order}-${index}`} id={ayd.id} handlePress={() => pressHandler(ayd.order)}  >
                        <p tabIndex={ayd.order}>{!hideNb && `${ayd.order}`} &nbsp; {` ${ayd.text} `} </p>
                    </AyahButton>
            )
        })}
        </div>
        <div className="flex flex-col items-end justify-center h-full  w-full border  border-emerald-700 text-sm " >
            {orderedAyahs && orderedAyahs?.length > 0 &&
                    orderedAyahs.map((ay, index) => {
                        return (   <AyahButton  handlePress={() => {toast.info(`ordered ${ay.order}`)} } key={`${ay.order}`} id={index} >
                                <p className=' text-blue-900 text-opacity-50'>{` ${ay.text}  `} &nbsp;</p>
                            </AyahButton>
                    )
                    })  
                }
                </div>
                </div>
        <div className="flex  justify-evenly items-center w-full  border-3  bg-slate-300 font-light  border-teal-200 text-gray-600">
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={ repeatHandler}>Repeat </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={handleShuffle}> Shuffle </button>
            <button className=" px-5 py-3 border  rounded-md border-emerald-700" onClick={handleValidate}> Validate </button>
        </div>
    </div>

    )
}

