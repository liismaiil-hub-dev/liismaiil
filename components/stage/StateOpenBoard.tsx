'use client'

import { useDispatch, useSelector } from 'react-redux';

import StagesSprintableComponent from './StagesSprintable';
import StagesRehearsalComponent from './StagesRehearsal';
import { useSearchParams } from 'next/navigation';


const StateOpenBoard = ( ) => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const stageId = searchParams.get('stageId');
  console.log({stageId});
  
  return (<div className="flex-col justify-start overflow-scroll  h-full items-stretch  gap-1  text-center text-sm  font-sans">
      <StagesRehearsalComponent />
      </div>
      )
    }
    export default StateOpenBoard
     {/*  <div className=" flex-col justify-start gap-2 space-y-2 h-screen  items-stretch w-full ">
     <div className="flex-col overflow-scroll  justify-start h-1/2 items-stretch  gap-1  text-center  text-sm font-sans">

    <StagesSprintableComponent />
      
    </div> */}

