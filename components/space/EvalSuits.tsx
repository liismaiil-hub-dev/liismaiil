'use client'
import { createNewStage } from '@/actions/stage';
import { Ayah } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@nextui-org/react';
import _ from 'lodash';
import { memo, useEffect, useState, useTransition } from "react";
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
        dispatch(setGridIndexContext({ index: 0 }))
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


    useEffect(() => {
        console.log({ reorderedAyahs });

    }, [reorderedAyahs]);

    function validAyahHandler(reord: number) {
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
            setErrorNb((prev) => prev + 1)
        }
        if (errorNb < 4) {
            console.log({ reorderedAyahs, shuffeledAyahsContext });

            if ((firstState && reorderedAyahs.length === shuffeledFirstAyahsContext.length && reorderedAyahs[0] !== -1) || (!firstState && reorderedAyahs.length === shuffeledAyahsContext.length && reorderedAyahs[0] !== -1)) {
                toast.success('it was the last ayas for that grid you can stage it')

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
        if (gridIndexContext < gridSelected.group) {
            dispatch(setGridIndexContext({ index: gridIndexContext + 1 }))
            setReorderedAyahs([-1])

        } else {
            dispatch(setGridIndexContext({ index: 0 }))
            setReorderedAyahs([-1])

        }
    }
    function prevGridHandler() {
        if (gridIndexContext >= 1) {
            dispatch(setGridIndexContext({ index: gridIndexContext - 1 }))
            setReorderedAyahs([-1])

        } else {
            dispatch(setGridIndexContext({ index: 0 }))
            setReorderedAyahs([-1])

        }

    }



    function stageHandler() {
        console.log({ reorderedAyahs, shuffeledFirstAyahsContext });
        try {

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
                    tokenId: guestPrisma.tokenId ? guestPrisma.tokenId : 2,
                }
                ))
            } else {
                toast.warning('you must at least order the grid once');
            }
        } catch (error) {
            toast.error(`${error}`)
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

            <p className='text-center'>reordered suits &nbsp;{reorderedAyahs[0] != -1 && reorderedAyahs.map((e: number) => `[${e}]`).join(', ')}</p>
            <div className="flex justify-center items-center  ">

                <p className={cn(errorNb < 1 ? 'text-green-200 !important' : errorNb > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>errors &nbsp;
                </p>
                <p className={cn(errorNb < 1 ? 'text-green-200 !important' : errorNb > 2 ? 'text-red-400 !important' : 'text-red-500 !important')}>
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
                    From {orderedAyahsContext[0]['numberInSurah'] ? orderedAyahsContext[0]['numberInSurah'] : 0} To  {orderedAyahsContext ? orderedAyahsContext[orderedAyahsContext.length - 1]['numberInSurah'] : 1}
                </p>
            </div>


        </div>
        <div className="flex justify-evenly items-center ">
            <div className={cn(firstState && 'shadow-lg shadow-emerald-300', 'CENTER')}>
                <SpaceButton handlePress={() => firstHandler()} title='First Grid' />
            </div>
            <SpaceButton handlePress={shuffleHandler} title='Shuffel Grid' />
            <SpaceButton handlePress={prevGridHandler} title='Prev Grid' />
            <SpaceButton handlePress={nextGridHandler} title='Next Grid' />
            <SpaceButton handlePress={stageHandler} title='Stage Grid' />
        </div>
        <div className="flex flex-col justify-start items-stretch  space-y-2">
            {firstState && shuffeledFirstAyahsContext ? shuffeledFirstAyahsContext?.map((ayag: Ayah) => {
                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {

                    return <div onClick={() => { validAyahHandler(ayag?.numberInSurah!) }} key={`${ayag.order}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between px-2
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag?.numberInSurah!}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                }
                else {
                    return (
                        <div onClick={() => { validAyahHandler(ayag?.numberInSurah!) }} key={`${ayag?.numberInSurah!}_${ayag.juz}`} className={'flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-b-1 p-2 border-green-300/25 hover:cursor-pointer  items-center   hover:border-red-500 hover:bg-emerald-100/70'}>{ayag.text}</div>
                    )
                }
            }) : shuffeledAyahsContext?.map((ayag: Ayah) => {

                if (typeof hideNbContext !== 'undefined' && !hideNbContext) {
                    return <div onClick={() => { validAyahHandler(ayag?.numberInSurah!) }} key={`${ayag?.numberInSurah!}_${ayag.juz}`} className=" flex p-2 bg-emerald-100/30 justify-between 
        items-center space-x-2
        border-b-1 border-green-300/25 ">
                        <div className='flex justify-center focus:border-red-500 items-center'>{ayag?.numberInSurah!}</div>
                        <div className=' flex text-right justify-end items-center
           hover:bg-emerald-200 
           hover:cursor-pointer 
            focus:border-red-500'>{ayag.text}</div>
                    </div>
                } else {
                    return (
                        <div onClick={() => { validAyahHandler(ayag?.numberInSurah!) }} key={`${ayag?.numberInSurah!}_${ayag.juz}`} className='   p-2 flex justify-end  w-full   bg-emerald-100/30  text-right space-x-2 border-1 border-green-300/25 hover:cursor-pointer items-center   focus:border-red-500'>{ayag.text}</div>
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