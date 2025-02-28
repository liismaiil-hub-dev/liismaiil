'use client'
import { Ayah } from '@/api/graphql/stage/stage.types';
import { Draggable } from '@/components/shared/Draggable';
import { Droppable } from '@/components/shared/Droppable';
import { stageActions } from '@/store/slices/stageSlice';
import { RootStateType } from '@/store/store';
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import HeaderEvalComponent from '@/components/shared/HeaderEvalComponent';
import * as _ from 'lodash';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const SortableGrid = ({ ay, id }: { ay: Ayah, id: number }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="flex 
         content-center items-center">
            <p > {` ${ay.text} `} </p>
        </div>)
}

// Order Components space exercide
export default function EvalDragOrderBoard() {

    const dispatch = useDispatch()

    const {  firstStateContext,errorNbContext, reorderedAyahsContext, orderedAyahsContext, shuffeledAyahsContext,
         shuffeledFirstAyahsContext,  } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setDraggedIndex, setOrderedAyahsContext, setErrorNbContext, setReorderedAyahsContext,
        setShuffeledAyahsContext, setValidContext,   setHideNbContext } = stageActions

    const [firstState, setFirstState] = useState(() => true);
    const [reorderedAyahs, setReorderedAyahs] = useState([-1]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragOver(event: any) {
        if(event.active.id === event.over.id){
             dispatch(setDraggedIndex({index:event.active.id}))
        }
    }
    useEffect(() => {
        console.log({shuffeledAyahsContext});
          const orderedAy = _.sortBy(shuffeledAyahsContext, ['numberInSurah']) 
          console.log({orderedAy, orderedAyahsContext, shuffeledAyahsContext});
          
          dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
           
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffeledAyahsContext]);

  const [errorNb, setErrorNb] = useState(0);
  
  function handleDragEnd(event: { active: any; over: any; }) {
        const { active, over } = event;
        console.log({ active, over })
        if (active?.id === over?.id && !firstStateContext) {
            console.log({active, over});
        
             dispatch(setShuffeledAyahsContext({
                ayahs: [..._.filter(shuffeledAyahsContext, function (sh: Ayah) {
                    return sh.numberInSurah !== active.id
                })]
            })) 
          dispatch(setOrderedAyahsContext({
                ayahs: [..._.filter(orderedAyahsContext, function (sh: Ayah) {
                    return sh.numberInSurah !== active.id
                })]
            })) 
            if (reorderedAyahsContext[0] == -1 && active.data.current.numberInSurah !== orderedAyahsContext[0].numberInSurah) {
                toast.error(`You made a mistake on the first ayah its ${orderedAyahsContext[0].text} `)
            }
            else if (reorderedAyahsContext[0] == -1) {
                
                dispatch(setReorderedAyahsContext({reorderedAyahsContext:[active.data.current.numberInSurah!]}))
            }else if (active.data.current.numberInSurah === reorderedAyahsContext[reorderedAyahsContext.length - 1] + 1) {
                console.log({orderedAyahsContext,reorderedAyahsContext, });
    
                dispatch(setReorderedAyahsContext({reorderedAyahsContext:[...reorderedAyahsContext, active.data.current.numberInSurah]}))
               
            } else {
                console.log({orderedAyahsContext,reorderedAyahsContext});
                
                toast.warning(`your next ayah ${active.data.current.numberInSurah + 1}  
                     ${orderedAyahsContext[reorderedAyahsContext.length].text} 
                     is next ayah `, {
                    closeOnClick: true,
                    autoClose: false
                })
                setErrorNb((prev) => prev + 1)
            }
            if (errorNb < 4) {
                console.log({ reorderedAyahsContext, shuffeledAyahsContext });
                if ( reorderedAyahsContext.length === shuffeledAyahsContext.length && reorderedAyahsContext[0] !== -1){
                    toast.success('it was the last ayas for that grid you can stage it')
                }
            } else {
                toast.warning(`you must rehearsal  !!! `)
                dispatch(setValidContext({ validCtxt: false }))
                dispatch(setHideNbContext({ hide: false }))
                setErrorNb(0)
                
            }

        }
    }
useEffect(() => {
  if(errorNbContext < 4 && errorNbContext !==0) {
    toast.info(`You have ${errorNbContext-4} other essay`)
        }
}, [errorNbContext]);


    //_____Business space 
   // console.log({ evalIndex });
    function handleShuffle() {
        const newGrid = _.shuffle(orderedAyahsContext)
        dispatch(setShuffeledAyahsContext({ ayahs: [..._.shuffle(orderedAyahsContext)] }))
    }

  
    function ayahInReordered(ord: number) {
        console.log({ reorderedAyahs, ord, some: reorderedAyahs.some((el) => el === ord) });

        return reorderedAyahs.some((el) => el === ord)
    }


    useEffect(() => {
        console.log({ reorderedAyahs });

    }, [reorderedAyahs]);

  /*   function validAyahHandler(reord: number) {
        console.log({ reord, reorderedAyahs });

        if (firstState && reorderedAyahs.length + 1 === shuffeledFirstAyahsContext.length) {
            toast.success(`It s  your last ayah on that grid of  ${shuffeledFirstAyahsContext.length} values`)
        }

        if (reorderedAyahs[0] == -1 && reord !== orderedAyahsContext[0].numberInSurah) {
            toast.error(`You made a mistake on the first ayah its ${orderedAyahsContext[0].numberInSurah}in the grid`)

        }
        else if (reorderedAyahs[0] == -1) {

            //console.log({ firstReord: reorderedAyahs[0] });
            setReorderedAyahs([reord])
        } else if (ayahInReordered(reord)) {
            toast.success(`You already selected ayah ${reord}`)
        } else if (reord === reorderedAyahs[reorderedAyahs.length - 1] + 1) {

            setReorderedAyahs([...reorderedAyahs, reord])
        } else {

            toast.warning(`you must select 
                 ${orderedAyahsContext[reorderedAyahs.length].text} 
                 is next ayah `, {
                closeOnClick: true,
                autoClose: false
            })
            dispatch(setErrorNbContext({errorNb: errorNbContext + 1}))
        }
        if (errorNbContext < 4) {
            console.log({ reorderedAyahs, shuffeledAyahsContext });

            if ((firstState && reorderedAyahs.length === shuffeledFirstAyahsContext.length && reorderedAyahs[0] !== -1) || (!firstState && reorderedAyahs.length === shuffeledAyahsContext.length && reorderedAyahs[0] !== -1)) {
                toast.success('it was the last ayas for that grid you can stage it')

            }

        } else {
            toast.warning(`you must rehearsal  !!! `)
            dispatch(setValidContext({ validCtxt: false }))
            dispatch(setHideNbContext({ hide: false }))
            dispatch(setErrorNbContext({errorNb:0}))
            setFirstState(true)

        }
    } */

    function handleValidate() {
        console.log('validate');

    }

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (<div className="flex-col justify-start items-stretch mt-3 w-full gap-2   h-full " >
        <HeaderEvalComponent />
        <DndContext sensors={sensors}
            collisionDetection={closestCenter}
            autoScroll={true} onDragOver={handleDragOver}
             onDragEnd={handleDragEnd}>
            <div className="flex justify-between items-stretch gap-3 mt-2 w-full  border-blue-400 border-1 rounded-md  
                 h-full " >
                <div className="flex   flex-col w-full items-stretch justify-start p-2 gap-2">
                    { typeof shuffeledAyahsContext !== 'undefined' && 
                    shuffeledAyahsContext.length > 0 && shuffeledAyahsContext.map && shuffeledAyahsContext?.map((ayd: Ayah, index: number) => {
                     // console.log({ayId:ayd, nbSurah: ayd.numberInSurah, index});
                        
                        return (<Draggable  key={`${ayd.order}-${index}`} id={ayd?.numberInSurah!} gridAyah={ayd}  />)
                    })}
                </div>
                <div className="flex flex-col items-center justify-start   h-full  w-full  gap-2 p-2 border-emerald-500  " >
                    {orderedAyahsContext && orderedAyahsContext?.length > 0 &&
                        orderedAyahsContext.map((ayd: Ayah, index: number) => {
                          //  console.log({ayd, nbA: ayd.numberInSurah});
                            
                            return (<Droppable key={`${ayd.order}-${index}`} id={ayd.numberInSurah!} ayd={ayd} />)
                        })}</div>
            </div>
        </DndContext>
        
    </div>

    )
}

