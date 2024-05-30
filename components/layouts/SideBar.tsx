import { sprintActions } from '@/store/slices/sprintSlice';
import { RootStateType } from '@/store/store';
import { SprintType, StageType } from 'app/api/sprint/sprint.types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SideBar() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { sprints, sprintsTitles, spaceSprint } = useSelector((state: RootStateType) => state.sprint)

    const { showSideBarMenu, setSpaceSprint, setSpaceStage } = sprintActions
    const isRoute = (route) => {
        return router.pathname.slice(1) === route
    }

    /*  useEffect(() => {
         console.log({ sprints });
         console.log({ sprintsTitles });
         console.log({ spaceSprint });
 
 
     }, [sprints, sprintsTitles, spaceSprint]); */

    return (<div className='flex flex-col justify-start overflow-hidden md:hidden 
    h-full  bg-cyan-100   text-sky-100 pt-10' >
        <div className='m-2 ' >
            <ul className='flex flex-col justify-start gap-2 items-center font-mont font-light w-3/4  p-4 sm:hidden  '>
                {typeof sprintsTitles !== 'undefined' && sprintsTitles && sprintsTitles.length > 0 && sprintsTitles?.map((sprint: string, index) => {


                    return (<li key={`${sprint}-${index}`} className={`list-none ${isRoute('space') && 'bg-green-100 shadow-lg'} menu-item`}>
                        <button key={`domain`} onClick={() => dispatch(setSpaceSprint({ sprint }))} className='text-center' > {sprint} </button>
                    </li>)
                })}
            </ul>
            {typeof sprints !== 'undefined' && sprints && sprints.length > 0 && sprints?.map && sprints?.map((sprint: SprintType, index) => {
                console.log({ sprint, title: sprint });
                return (typeof sprint.stages !== 'undefined' && sprint.stages.length > 0 && sprint.stages.map((stage: StageType, indexStage) => {
                    console.log({ sprint, stage });
                    return (<li key={`${sprint.title}-${index}`} className={`list-none ${isRoute('space') && 'bg-green-100 shadow-lg'} 
                    w-full hover:bg-green-300 text-slate-500 p-2 mx-1 rounded-md text-center`}>
                        <button key={`domain`} onClick={() => dispatch(setSpaceStage({ stage }))} className='text-center' > {stage.title} </button>
                    </li>)
                }))
            })}
            <div className='flex justify-evenly ' >
                <div className={`list-none ${isRoute('guest') && 'shadow-lg'} bg-gradient-to-b rounded-md from-slate-800 to-cyan-800  hover:bg-orange-100 p-2 `}>
                    <Link key='guests' href='/guests'> Guests </Link>
                </div>
                <div className={`list-none ${isRoute('guest') && 'shadow-lg'} bg-cyan-800 p-2 rounded-md `}>
                    <Link key='guests' href='/hosts'> Hosts </Link>
                </div>
            </div>
        </div>

    </div >)
}

export default React.memo(SideBar)