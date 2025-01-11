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

function EvalSuits() {
    const dispatch = useDispatch()
  //  const [isPending, startTransition] = useTransition()
   const {pending} =   useFormStatus()
    const { localStages,gridSelected, firstGridContext,orderedAyahsContext, shuffeledAyahsContext, gridsContext, reorderedAyahsContext, hideNbContext, 
        shuffeledFirstAyahsContext, gridIndexContext, gridsStaged, stagedContext } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setShuffeledAyahsContext, setReorderedAyahsContext,
         setValidContext, setGridIndexContext, setHideNbContext, setGridsStaged, setFirstGridContext} = stageActions
     const [errorNb, setErrorNb] = useState(0);

const localStageIds = localStages ? localStages.map(stage => stage.stageId) : ['']
useEffect(() => {
    dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
}, []);

    function shuffleHandler() {
        dispatch(setFirstGridContext({first:false}))
        const shuffeledAy = _.shuffle(shuffeledFirstAyahsContext)
        console.log({ shuffeledAy });

        dispatch(setShuffeledAyahsContext({ ayahs: shuffeledAy }))
        dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
        setErrorNb(0)
    }
    function firstHandler() {
        dispatch(setFirstGridContext({first:true}))
        setErrorNb(0)
        dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
        dispatch(setGridIndexContext({ index: 0 }))
        console.log({ firstGridContext });
    }
    /**
     * 
     * @param reord  index
     */
    function ayahInReordered(ord: number) {
        console.log({ reorderedAyahsContext, ord, some: reorderedAyahsContext.some((el) => el === ord) });
        return reorderedAyahsContext.some((el) => el === ord)
    }

    useEffect(() => {
        console.log({ reorderedAyahsContext,  shuffeledFirstAyahsContext, shuffeledAyahsContext});
        console.log({ pending });
    }, [reorderedAyahsContext, pending, shuffeledAyahsContext, shuffeledFirstAyahsContext]);
const [stageReady, setStageReady] = useState(false);

    function validAyahHandler(reord: number) {
        console.log({ reord, reorderedAyahsContext });
        if (firstGridContext && reorderedAyahsContext.length + 1 === shuffeledFirstAyahsContext.length) {
            setStageReady(true)
            toast.success(`It s  your last ayah on that grid of  ${shuffeledFirstAyahsContext.length} values`)
        }
        if (reorderedAyahsContext[0] == -1 && reord !== orderedAyahsContext[0].numberInSurah) {
            toast.error(`You made a mistake on the first ayah its ${orderedAyahsContext[0].numberInSurah}in the grid`)
        }
        else if (reorderedAyahsContext[0] == -1) {
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[reord]}))
        } else if (ayahInReordered(reord)) {    
            toast.success(`You already selected ayah ${reord}`)
        } else if (reord === reorderedAyahsContext[reorderedAyahsContext.length - 1] + 1) {
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[...reorderedAyahsContext, reord]}))
        }else if(reorderedAyahsContext.length + 1 === shuffeledAyahsContext.length) {
            toast.success(`It s  your last ayah on that grid of  ${shuffeledAyahsContext.length} values`)
            setStageReady(true)
        } else {
            toast.warning(`you must select 
                 ${orderedAyahsContext[reorderedAyahsContext.length].text} 
                 is next ayah `, {
                closeOnClick: true,
                autoClose: false
            })
            setErrorNb((prev) => prev + 1)
        }
        if (errorNb < 4) {
            console.log({ reorderedAyahsContext, shuffeledAyahsContext });
            if ((firstGridContext && reorderedAyahsContext.length === shuffeledFirstAyahsContext.length && reorderedAyahsContext[0] !== -1) || 
            (!firstGridContext && reorderedAyahsContext.length === shuffeledAyahsContext.length && reorderedAyahsContext[0] !== -1)){
            setStageReady(true)

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
        console.log({
            gridIndexContext, gslGrp: gridSelected.group
        });
        
        if (gridIndexContext <= gridSelected.group) {
            dispatch(setGridIndexContext({ index: gridIndexContext + 1 }))
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
            setErrorNb(0)

        } else {
            dispatch(setGridIndexContext({ index: 0 }))
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))}
            setErrorNb(0)
        }
    function prevGridHandler() {
        if (gridIndexContext >= 1) {
            dispatch(setGridIndexContext({ index: gridIndexContext - 1 }))
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
            setErrorNb(0)

        } else {
            dispatch(setGridIndexContext({ index: 0 }))
            dispatch(setReorderedAyahsContext({reorderedAyahsContext:[-1]}))
            setErrorNb(0)

        }}
        const  stageId = `${gridSelected.souraNb}-${gridSelected.grid}-${gridsContext.length}-${gridIndexContext}`;
   async function stageHandler() {
    try {
        console.log({localStageIds});
             if (reorderedAyahsContext.length === shuffeledFirstAyahsContext.length ) {
//                 const  stageId = `${gridSelected.souraNb}-${gridSelected.grid}-${gridsContext.length}-${gridIndexContext}`;
                if(!localStageIds.includes(stageId)){   
                         const {message, success} =     await   createNewStage({
                    ayahs: JSON.stringify(shuffeledFirstAyahsContext),
                    createdAt: new Date().toISOString(),
                    group: gridSelected.group,
                    grid: gridSelected.grid,
                    createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                    souraName: gridSelected.souraName,
                    arabName: gridSelected.arabName,
                    souraNb: gridSelected.souraNb,
                    stageId,
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
            } else {
                const {message, success} =     await   addGuestToStage({
                    stageId,
                    tokenId: guestPrisma.tokenId ? guestPrisma.tokenId : 2,
                })
                
                if(success) {
                    if(typeof gridsStaged !== 'undefined' && gridsStaged && gridsStaged.length === 1 && gridsStaged[0] === ''){
                        console.log({message, success, gridsStaged});
                    dispatch(setGridsStaged({stageIds:[stageId ]}))

                    }else if(typeof gridsStaged !== 'undefined' &&
                          gridsStaged && gridsStaged[0] !== ''){
                    dispatch(setGridsStaged({stageIds:[...gridsStaged,stageId ]}))
                }
            }else {
            toast.error(`${message}`)
            }
            }} else {
                toast.warning('you must at least order the grid once');
             }
        } catch (error) {
            toast.error(`${error}`)
        }
    }
    async function stageQHandler() {
        try {
                             const {message, success} =     await   createNewStage({
                        ayahs: JSON.stringify(shuffeledFirstAyahsContext),
                        createdAt: new Date().toISOString(),
                        group: gridSelected.group,
                        grid: gridSelected.grid,
                        createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                        souraName: gridSelected.souraName,
                        arabName: gridSelected.arabName,
                        souraNb: gridSelected.souraNb,
                        stageId,
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
     console.log({stageReady, stagedContext});
     
    }, [stageReady, stagedContext]);
    

    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
        <div className="flex-col justify-center items-center  ">
            <div className='justify-center items-center text-center inline-flex '>StageId &nbsp; : {stageId}</div>
            <div className="flex justify-center items-center  ">
                
            <p className='text-center inline-flex '>{gridSelected.arabName}</p>
                  <p className='text-center inline-flex '>&nbsp; &nbsp; {gridSelected.souraNb}</p>
                <p className='text-center inline-flex' > &nbsp; &nbsp; Nb of groups &nbsp;{gridSelected.group}</p>
                <p className='text-center inline-flex'>&nbsp; Grid &nbsp;{gridSelected.grid}</p>
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
                    From { typeof orderedAyahsContext !== 'undefined' && orderedAyahsContext[0] && orderedAyahsContext[0]['numberInSurah'] ? orderedAyahsContext[0]['numberInSurah'] : 0} To  {orderedAyahsContext  && typeof orderedAyahsContext[orderedAyahsContext.length - 1] !=='undefined'? 
                    orderedAyahsContext[orderedAyahsContext.length - 1]['numberInSurah'] : 1}
                </p>
            </div>


        </div>
        <div className="flex justify-evenly items-center ">
            { firstGridContext ? <div className={'shadow-lg shadow-emerald-300 CENTER'}>
                <SpaceButton disabled={false} handlePress={() => firstHandler()} title='First Grid' />
            </div>:<div className={'shadow-lg  CENTER'}>
                <SpaceButton disabled={false} handlePress={() => firstHandler()} title='First Grid' />
            </div>
            }
            <SpaceButton disabled={false} handlePress={shuffleHandler} title='Shuffel Grid' />
            <SpaceButton disabled={false} handlePress={prevGridHandler} title='Prev Grid' />
            <SpaceButton disabled={false} handlePress={nextGridHandler} title='Next Grid' />
            <SpaceButton disabled={pending} handlePress={stageQHandler} title='Stage Q' />
            
            { (stageReady || stagedContext) && <div className={'shadow-lg shadow-emerald-300 CENTER'}>
                    <SpaceButton disabled={pending} handlePress={stageHandler} title='Stage Grid' />
            </div>
            }
        </div>
        <div className="flex flex-col justify-start items-stretch  space-y-2">
            {firstGridContext && shuffeledFirstAyahsContext  && typeof reorderedAyahsContext != 'undefined' ? shuffeledFirstAyahsContext?.map((ayag: Ayah, index) => {
                console.log({nbS:ayag.numberInSurah,  in:reorderedAyahsContext.includes(ayag?.numberInSurah!), index });
                if( !reorderedAyahsContext.includes(ayag?.numberInSurah!)){
                    console.log({ayagFirst: ayag});
                    
                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {
                    return <div onClick={() => { validAyahHandler(ayag?.numberInSurah!) }} key={`${ayag.numberInSurah}_${ayag.juz}`} 
                    className={"flex p-2 bg-emerald-100/30 justify-between px-2 hover:text-natWarmheader\
        items-center space-x-2 hover:bg-sky-700 hover:text-2xl hover:cursor-pointer hover:scale-110 border-b-1 border-green-300/25  "}>
                        <div className='flex justify-center items-center'>{ayag?.numberInSurah!}</div>
                        <div className=' flex text-right justify-end items-center
                             '>{ayag.text}</div>
                    </div>}else {
                    return (<div onClick={() => { validAyahHandler(ayag?.numberInSurah!) }} key={`${ayag?.numberInSurah!}_${ayag.juz}`} className={'flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-b-1 p-2 border-green-300/25 hover:cursor-pointer  items-center   hover:border-red-500 hover:bg-emerald-100/70'}>{ayag.text}</div>
                    )}
                }
            }) : (typeof reorderedAyahsContext !='undefined' ) && shuffeledAyahsContext?.map((ayag: Ayah) => {
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
