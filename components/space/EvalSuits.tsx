'use client'
import { addGuestToStage, createNewStage } from '@/actions/stage';
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import _ from 'lodash';
import { memo, useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import { useFormState, useFormStatus } from 'react-dom';
import { space } from 'postcss/lib/list';
import { createNewSprint } from '@/actions/sprint';

function EvalSuits() {
    const dispatch = useDispatch()
  //  const [isPending, startTransition] = useTransition()
   const {pending} =   useFormStatus()
    const { localStages,gridSelected,spaceStageSelected, spaceStageAyahsContext, spaceStages,sprintsReady ,orderedAyahsContext, shuffeledAyahsContext, gridsContext, reorderedAyahsContext, hideNbContext, 
 gridIndexContext, gridsStaged, stagedContext } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setShuffeledAyahsContext, setReorderedAyahsContext, setSpaceStageSelected,
         setValidContext, setGridIndexContext, setHideNbContext, setGridsStaged, setSprintsReady, setFirstGridContext} = stageActions
     const [errorNb, setErrorNb] = useState(0);

const localStageIds = localStages ? localStages.map(stage => stage.stageId) : ['']
useEffect(() => {
    dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
    if(!shuffeledAyahsContext){
        dispatch(setShuffeledAyahsContext({ayahs:spaceStageAyahsContext}))
    }
}, []);
/* useEffect(() => {
    dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
    console.log({spaceStageSelectedAyahs:spaceStageSelected?.ayahs});
    dispatch(setSpaceStageAyahsContext({ayahs: JSON.parse(spaceStageSelected?.ayahs)}))
    
    //dispatch(setShuffeledAyahsContext({ayahs:JSON.parse(spaceStageSelected?.ayahs)}))
}, [spaceStageSelected]);
 */
    function shuffleHandler() {
        const shuffeledAy = _.shuffle(orderedAyahsContext)

        dispatch(setShuffeledAyahsContext({ ayahs: shuffeledAy }))
        dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
        setErrorNb(0)
    }


        function ayahInReordered(ord: number) {
        console.log({ reorderedAyahsContext, ord, some: reorderedAyahsContext.some((el) => el === ord) });
        return reorderedAyahsContext.some((el) => el === ord)
    }
const [sprintReady, setSprintReady] = useState(false);
useEffect(() => {
  if(spaceStageSelected && spaceStageSelected.grid === 5) {
    setSprintReady(true)
  }
}, [spaceStageSelected]);

    function validAyahHandler(reord: number) {
        
        
        if (reorderedAyahsContext.length + 1 === shuffeledAyahsContext.length) {
            toast.success(`It s  your last ayah on   ${spaceStageSelected.stageId} stage`)
            if(spaceStageSelected.grid === 5){
                setSprintReady(true)}
          }
        if (reorderedAyahsContext[0] == -1 && reord !== orderedAyahsContext[0].numberInSurah) {
            toast.error(`You made a mistake on the first ayah its ${orderedAyahsContext[0].text} `)
        }
        else if (reorderedAyahsContext[0] == -1) {
            
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[reord]}))
        } else if (ayahInReordered(reord)) {    
            toast.success(`You already selected ayah ${reord}`)
        } else if (reord === reorderedAyahsContext[reorderedAyahsContext.length - 1] + 1) {
            console.log({orderedAyahsContext,reorderedAyahsContext,reord, });

            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[...reorderedAyahsContext, reord]}))
           
        } else {
            console.log({orderedAyahsContext,reorderedAyahsContext});
            
            toast.warning(`your next ayah ${reord + 1}  
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
            if(spaceStageSelected.grid === 5){
                 setSprintReady(true)}
                toast.success('it was the last ayas for that grid you can stage it')
            }
        } else {
            toast.warning(`you must rehearsal  !!! `)
            dispatch(setValidContext({ validCtxt: false }))
            dispatch(setHideNbContext({ hide: false }))
            setErrorNb(0)
            dispatch(setFirstGridContext({first:true})
)
        }
    }

    function nextGridHandler() {
           console.log({spaceStageSelected, spaceStages});
            const _nextG = spaceStageSelected.stageId.split('-')
       console.log({_nextG});
                const grds= parseInt(_nextG[2])
                const grdIndex = parseInt(_nextG[3])
                const grdNb = parseInt(_nextG[1])
            // dispatch(setSpaceStageSelected({ grid:  }))</div>

            if(grdIndex < grds ) {
                dispatch(setSpaceStageSelected({ grid:spaceStages[grdIndex + 1]  }))
            }else if(grdIndex +1 === grds && (grdNb === 3 || grdNb === 4)){
                dispatch(setSpaceStageSelected({ grid:spaceStages[grdIndex + 1]  }))

            }else if(grdIndex +1 === grds && grdNb === 5){
                dispatch(setSpaceStageSelected({ grid:spaceStages[0]  }))

            }
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
            setErrorNb(0)
}
    function prevGridHandler() {
        console.log({spaceStageSelected, spaceStages});
        const _nextG = spaceStageSelected.stageId.split('-')
        console.log({_nextG});
            const grds= parseInt(_nextG[2])
            const grdIndex = parseInt(_nextG[3])
            const grdNb = parseInt(_nextG[1])
        // dispatch(setSpaceStageSelected({ grid:  }))</div>

        if(grdIndex !== 0 && grdNb!==3 ) {
            dispatch(setSpaceStageSelected({ grid:spaceStages[grdIndex - 1]  }))
        }else if(grdIndex  === 0 && (grdNb === 5|| grdNb === 4)){
            dispatch(setSpaceStageSelected({ grid:spaceStages[grdIndex - 1]  }))

        }else {
            dispatch(setSpaceStageSelected({ grid:spaceStages[0]  }))

        }
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
            setErrorNb(0)

        }
        //const  stageId = `${gridSelected.souraNb}-${gridSelected.grid}-${gridsContext.length}-${gridIndexContext}`;
   async function sprintHandler() {
    try {
        
/*              if (reorderedAyahsContext.length === shuffeledAyahsContext.length ) {
 */   
                const {message, success} =     await createNewSprint({
                    sprintId:spaceStageSelected.stageId,
                    
                    createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                    stageId: spaceStageSelected.stageId,    
                     tokenId: guestPrisma.tokenId ? guestPrisma.tokenId : 2,
                })
                console.log({message, success});
                
                if(success) {
                    if(typeof gridsStaged !== 'undefined' && gridsStaged && 
                        gridsStaged.length === 1 && gridsStaged[0] === ''){
                    console.log({message, success, gridsStaged});
                    dispatch(setSprintsReady({sprintIds:[spaceStageSelected.stageId ]}))

                    }else if(typeof gridsStaged !== 'undefined' && 
                         gridsStaged && gridsStaged[0] !== ''){
                    dispatch(setSprintsReady({sprintIds:[...sprintsReady,spaceStageSelected.stageId ]}))
                }
            } 
             else {
            toast.error(`${message}`)
            } 
             
        } catch (error) {
            toast.error(`${error}`)
        }
    }
    async function stageQHandler() {
        try {
                             const {message, success} =     await   createNewStage({
                        ayahs: JSON.stringify(shuffeledAyahsContext),
                        createdAt: new Date().toISOString(),
                        group: gridSelected.group,
                        grid: gridSelected.grid,
                        createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                        souraName: gridSelected.souraName,
                        arabName: gridSelected.arabName,
                        souraNb: gridSelected.souraNb,
                        stageId:`${gridSelected.souraNb}-${gridSelected.grid}-${gridSelected.group}-"O6cKgXEsuPNAuzCMTGeblWW9sWI3"`,
                        startOn: new Date().toISOString(),
                        tokenId: guestPrisma.tokenId ? guestPrisma.tokenId : 2,
                    })
                    console.log({message, success});
                    
                    if(success) {
                        if(typeof gridsStaged !== 'undefined' && gridsStaged && 
                            gridsStaged.length === 1 && gridsStaged[0] === ''){
                    console.log({message, success, gridsStaged});
                        dispatch(setGridsStaged({stageIds:[stageId ]}))
    
                        }else if(typeof gridsStaged !== 'undefined' && 
                             gridsStaged && gridsStaged[0] !== ''){
                        dispatch(setGridsStaged({stageIds:[...gridsStaged,stageId ]}))
                    }
                }else {
                toast.error(`${message}`)
                } 
                            } catch (error) {
                toast.error(`${error}`)
            }
        }
    useEffect(() => {
     console.log({sprintReady, stagedContext});
     
    }, [sprintReady, stagedContext]);
    

    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
        <div className="flex-col justify-center items-center  ">
            <div className='flex justify-center items-center text-center  '>StageId &nbsp; : {spaceStageSelected?.stageId}&nbsp; from soura :  {spaceStages[0].souraName}</div>
            <div className="flex justify-center items-center  ">
                
            <p className='text-center inline-flex '>{spaceStages[0].arabName}</p>
                  <p className='text-center inline-flex '>&nbsp; &nbsp; {spaceStages[0].souraNb}</p>
                <p className='text-center inline-flex' > &nbsp; &nbsp; Nb of groups &nbsp;{spaceStages[0].group}</p>
                <p className='text-center inline-flex'>&nbsp; Grid &nbsp;{spaceStages[0].grid}</p>
            </div>

            <p className='text-center'>Ordered suits &nbsp;: {typeof reorderedAyahsContext !== 'undefined' && reorderedAyahsContext[0] != -1 && reorderedAyahsContext.map((e: number) => `[${e}]`).join(', ')}</p>
            <div className="flex justify-center items-center  ">

                <p className={cn(errorNb < 1 ? 'text-green-700 !important' : errorNb > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>errors &nbsp;
                </p>
                <p className={cn(errorNb < 1 ? 'text-blue-400 !important' : errorNb > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>
                    {errorNb}
                </p>
            </div>

            <div className="flex justify-center items-center  ">

                <p className=' text-center text-emerald-700'>Grid Index &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    {gridIndexContext + 1}/ {gridsContext.length}
                </p>
            </div>
            <div className="flex justify-center items-center  ">

                <p className=' text-center text-emerald-700'> Ayahs &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    From { typeof orderedAyahsContext !== 'undefined' && orderedAyahsContext[0] && orderedAyahsContext[0]['numberInSurah'] ? orderedAyahsContext[0]['numberInSurah'] : 0} To 
                     {typeof orderedAyahsContext !== 'undefined' && orderedAyahsContext.length > 0   && 
                     typeof orderedAyahsContext[orderedAyahsContext?.length - 1] !=='undefined' && orderedAyahsContext[orderedAyahsContext?.length - 1] ? 
                    orderedAyahsContext[orderedAyahsContext?.length - 1]['numberInSurah'] : 1}
                </p>
            </div>


        </div>
        <div className="flex justify-evenly items-center ">
            
            <SpaceButton disabled={false} handlePress={shuffleHandler} title='Shuffel Grid' />
            <SpaceButton disabled={false} handlePress={prevGridHandler} title='Prev Grid' />
            <SpaceButton disabled={false} handlePress={nextGridHandler} title='Next Grid' />
            <SpaceButton disabled={pending} handlePress={stageQHandler} title='Stage Q' />
            
            { (sprintReady || stagedContext) && <div className={'shadow-lg shadow-emerald-300 CENTER'}>
                    <SpaceButton disabled={pending} handlePress={sprintHandler} title='Sprint ready' />
            </div>
            }
        </div>
        <div className="flex flex-col justify-start items-stretch  space-y-2">
            { (typeof reorderedAyahsContext !='undefined' ) && shuffeledAyahsContext?.map((ayag: Ayah) => {
                if( !reorderedAyahsContext.includes(ayag?.numberInSurah!))
            
                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {
            
                return <div onClick={() => { validAyahHandler(ayag?.numberInSurah!) }} key={`${ayag?.numberInSurah!}_${ayag.juz}`} className=" 
                flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2 border-b-1 border-green-300/25 hover:bg-sky-700 hover:text-natWarmheader
                hover:cursor-pointer hover:scale-110 hover:text-2xl">
                        <div className='flex justify-center items-center'>{ayag?.numberInSurah!}</div>
                        <div className=' flex text-right justify-end items-center
                       '>{ayag.text}</div>
                    </div>} else {
                        console.log({ayag});
                        
                    return (
                        <div onClick={() => { validAyahHandler(ayag?.numberInSurah!) }} key={`${ayag?.numberInSurah!}_${ayag.juz}`} className='   p-2 flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-1 border-green-300/25 hover:cursor-pointer items-center   focus:border-red-500'>{ayag.text}</div>
                    )}}
            )}</div>
    </div>}

export default memo(EvalSuits);
