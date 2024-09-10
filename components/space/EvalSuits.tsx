'use client'
import { createNewStage } from '@/actions/sprint';
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';

function EvalSuits({ first }: { first: boolean }) {
    const dispatch = useDispatch()
    const [isPending, startTransition] = useTransition()
    const { gridSelected, orderedAyahsContext, shuffeledAyahsContext, gridsContext, validContext, hideNbContext, shuffeledFirstAyahsContext, gridIndexContext } = useSelector((state: RootStateType) => state.stage)
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
    const { setShuffeledAyahsContext, setEvalIndex, setValidContext, setGridIndexContext, setHideNbContext } = stageActions
    const [firstState, setFirstState] = useState(() => first);
    const [reorderedAyahs, setReorderedAyahs] = useState([-1]);
    const [errorNb, setErrorNb] = useState(0);
    const [validGrid, setValidGrid] = useState(false);

    function shuffleHandler() {
        setFirstState(false)
        const shuffeledAy = _.shuffle(shuffeledFirstAyahsContext)
        console.log({ shuffeledAy });

        dispatch(setShuffeledAyahsContext({ ayahs: shuffeledAy }))
    }
    function firstHandler() {
        setFirstState(true);
        setErrorNb(0)
        setReorderedAyahs([-1])
        console.log({ firstState });
    }
    /**
     * 
     * @param reord  index
     */
    function ayahInReordered(ord: number) {
        console.log({ reorderedAyahs, ord, some: reorderedAyahs.some((el) => el === ord) });

        return reorderedAyahs.some((el) => el === ord)
    }

    const firstAyahIndex = useCallback(() => {
        if (firstState) {
            return (_.findIndex(shuffeledFirstAyahsContext, function (ay) {
                const minOrder = _.minBy(shuffeledFirstAyahsContext, 'order')!['order']
                console.log({ minOrder });

                return ay['order'] === minOrder
            }))
        } else {
            return (_.findIndex(shuffeledAyahsContext, function (ay) {
                const minOrder = _.minBy(shuffeledAyahsContext, 'order')!['order']
                return ay['order'] === minOrder
            }))
        }
    }, [firstState, shuffeledAyahsContext, shuffeledFirstAyahsContext]);

    useEffect(() => {
        console.log({ reorderedAyahs });

    }, [reorderedAyahs]);

    function validAyahHandler(reord: number) {
        if (firstState && reorderedAyahs.length + 1 === shuffeledFirstAyahsContext.length) {
            toast.success(`It s  your last ayah on that grid of  ${shuffeledFirstAyahsContext.length} values`)
        }

        console.log({
            reord,
            shuffeledAyahsContextLEngth: shuffeledAyahsContext.length,
            shuffeledFirstAyahsContextLength: shuffeledFirstAyahsContext.length
        });

        if (reorderedAyahs[0] == -1 && reord !== 0) {
            toast.error(`You made a mistake on the first ayah its ${firstAyahIndex() + 1} ayahs in the grid`)

        }
        else if (reorderedAyahs[0] == -1) {
            //console.log({ firstReord: reorderedAyahs[0] });
            setReorderedAyahs([reord])
        } else if (ayahInReordered(reord)) {
            toast.success(`You already selected ayah ${reord + 1}`)

        }
        else if (errorNb < 4) {
            if (reorderedAyahs[reorderedAyahs.length - 1]! + 1 !== reord) {
                console.log({ lastReordr: reorderedAyahs[reorderedAyahs.length - 1]! + 1, reord });
                toast.warning(`you must try again its  ${reord + 1} ayahs you have selected !!! `)
                setErrorNb((prev) => prev + 1)
            } else {
                console.log({ lastReordr: reorderedAyahs[reorderedAyahs.length - 1]! + 1, reord });

                setReorderedAyahs([...reorderedAyahs, reord])
                if (reord === shuffeledAyahsContext.length - 1 || reord === shuffeledFirstAyahsContext.length - 1) {
                    toast.success('it was the last ayas for that grid')

                }
            }
        } else {
            toast.warning(`you must rehearsal  !!! `)
            dispatch(setValidContext({ validCtxt: false }))
            dispatch(setHideNbContext({ hide: false }))
            setErrorNb(0)
            setFirstState(true)

        }
    }
    useEffect(() => {
        console.log(shuffeledAyahsContext);

    }, [shuffeledAyahsContext]);

    function nextGridHandler() {

        dispatch(setGridIndexContext({ index: gridIndexContext + 1 }))

    }
    function getMax() {
        const gridLength = gridsContext[gridIndexContext]?.length
        return getMin() + gridLength - 1
    }
    function getMin() {
        console.log({ orderedAyahsContext, gridIndexContext, gridsLength: gridsContext.length });
        if (gridIndexContext + 1 < gridsContext.length) {
            const firstAy = orderedAyahsContext[0];
            const firstOrd = firstAy?.order;
            return (firstOrd * gridIndexContext) + 1
        } else {
            const _minAy = _.orderBy(gridsContext[gridIndexContext], ['order'])
            console.log({ _minAy });
            const ordr = _minAy[0]
            console.log({ ordr, order: ordr ? ordr['order'] : 0 });

            return ordr ? ordr['order'] +  1 : 0;
        }
    }


    function stageHandler() {
        console.log({ reorderedAyahs, shuffeledFirstAyahsContext });

        if (reorderedAyahs.length === shuffeledFirstAyahsContext.length) {
            startTransition(() => createNewStage({
                ayahs: JSON.stringify(shuffeledFirstAyahsContext),
                createdAt: new Date().toISOString(),
                grid: gridSelected.grid,
                createdById: "O6cKgXEsuPNAuzCMTGeblWW9sWI3",
                souraName: gridSelected.souraName,
                souraNb: gridSelected.souraNb,
                stageId: `${gridSelected.souraNb}-${gridSelected.grid}-${gridsContext.length}-${gridIndexContext}`,
                startOn: new Date().toISOString(),
                tokenId: guestPrisma.tokenId,
            }
            ))
        } else {
            toast.warning('you must at least order the grid once');
        }
    }

    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
        <div className="flex-col justify-center items-center  ">
            <div className="flex justify-center items-center  ">
                <p className='text-center inline-flex '>{gridSelected.arabName}</p>

                <p className='text-center inline-flex '>&nbsp; &nbsp; {gridSelected.souraNb}</p>
                <p className='text-center inline-flex' > &nbsp; &nbsp; Nb of groups &nbsp;{gridSelected.group}</p>
                <p className='text-center inline-flex'>&nbsp; Grid &nbsp;{gridSelected.grid}</p>
            </div>

            <p className='text-center'>reordered suits &nbsp;{reorderedAyahs[0] != -1 && reorderedAyahs.map((e: number) => e + 1).join(', ')}</p>
            <div className="flex justify-center items-center  ">

                <p className={cn(errorNb == 1 && 'text-red-200', ' text-center text-emerald-200')}>errors &nbsp;
                </p>
                <p className={cn(errorNb == 2 && ' text-red-300', ' text-center text-emerald-400')}>
                    {errorNb}
                </p>
            </div>

            <div className="flex justify-center items-center  ">

                <p className=' text-center text-emerald-200'>Grid Index &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    {gridIndexContext + 1}/ {gridsContext.length}
                </p>
            </div>
            <div className="flex justify-center items-center  ">

                <p className=' text-center text-emerald-200'> Ayahs &nbsp;
                </p>
                <p className=' text-center text-blue-400'>
                    From {getMin()} To  {getMax()}
                </p>
            </div>


        </div>
        <div className="flex justify-evenly items-center ">
            <div className={cn(firstState && 'shadow-lg shadow-emerald-300', 'CENTER')}>
                <SpaceButton handlePress={() => firstHandler()} title='First Grid' />
            </div>
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
            <SpaceButton handlePress={nextGridHandler} title='Next Grid' />
            <SpaceButton handlePress={stageHandler} title='Stage Grid' />
        </div>
        <div className="flex flex-col justify-start items-stretch  space-y-2">
            {firstState && shuffeledFirstAyahsContext ? shuffeledFirstAyahsContext?.map((ayag: Ayah) => {
                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {

                    return <div onClick={() => { validAyahHandler(ayag.order) }} key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between px-2
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order + 1}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                }
                else {
                    return (
                        <div onClick={() => { validAyahHandler(ayag.order) }} key={`${ayag.order}_${ayag.juz}`} className={'flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-b-1 border-green-300/25 hover:cursor-pointer  items-center   hover:border-red-500 hover:bg-emerald-100/70'}>{ayag.text}</div>
                    )
                }
            }) : shuffeledAyahsContext?.map((ayag: Ayah) => {

                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {
                    return <div onClick={() => { validAyahHandler(ayag.order) }} key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag.order + 1}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                } else {
                    return (
                        <div onClick={() => { validAyahHandler(ayag.order) }} key={`${ayag.order}_${ayag.juz}`} className='  flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-1 border-green-300/25 hover:cursor-pointer items-center   focus:border-red-500'>{ayag.text}</div>
                    )
                }
            })}
        </div>
    </div>

}

export default memo(EvalSuits);

/*   else {


      if (reorderedAyahs[0] == -1 && reord !== 0) {
          toast.error(`You made a mistake on the first ayah its ${firstAyahIndex() + 1} th ayahs on the grid`,
              {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
              }
          )

      }
      else if (reorderedAyahs[0] == -1) {
          toast.warning(`you are on rehearsal mode if you want to register ?
  please check valid (checkbox) and hideNb (checkbox) either  !!! `, {
              position: "top-right",

              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          })

          //console.log({ firstReord: reorderedAyahs[0] });
          setReorderedAyahs([reord])
      } else if (ayahInReordered(reord)) {
          toast.success(`You already selected ayah ${reord + 1}`)

      }
      else if (reord === shuffeledAyahsContext.length - 1 || reord === shuffeledFirstAyahsContext.length - 1) {
          toast.success('it s the last ayas for that grid')

      }
      else if (errorNb < 4) {
          if (reorderedAyahs[reorderedAyahs.length - 1]! + 1 !== reord) {
              console.log({ lastReordr: reorderedAyahs[reorderedAyahs.length - 1]! + 1, reord });
              toast.warning(`you must try again its  ${reord + 1} ayahs you have selected !!! `)
              setErrorNb((prev) => prev + 1)
          } else {
              console.log({ lastReordr: reorderedAyahs[reorderedAyahs.length - 1]! + 1, reord });

              setReorderedAyahs([...reorderedAyahs, reord])
          }
      } else {
          toast.warning(`you must rehearsal  !!! `)
          dispatch(setValidContext({ validCtxt: false }))
          dispatch(setHideNbContext({ hide: false }))
          setErrorNb(0)
          setFirstState(true)

      }
  }
  //dispatch(setShuffeledAyahsContext({ayahs:shuffeledFirstAyahsContext}))
}
*/