'use client'
import { WINDOW_VISUALISATION, Ayah,StagesSprintType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import _ from 'lodash';
import {   useEffect, useMemo, useRef, useState,  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter} from "@heroui/modal";

import {Radio, RadioGroup} from "@heroui/radio";

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
  
} from "@dnd-kit/sortable";
import {Draggable} from "@/components/stage/Draggable";
import {Droppable} from "@/components/stage/Droppable";


import { getStageForSprint } from '@/actions/stage';
import { ayahWithoutPunct } from '@/lib/tools';
import { GRIDS_NAME, GRIDS_TLD } from '@/store/constants/constants';



export default function DragDropDialog({isOpen,  onOpen, onClose}:{isOpen:boolean,  onOpen:()=> void,  onClose:()=> void}) {
  
  const dispatch = useDispatch()
  const {windowContext} = useSelector((state: RootStateType) => state.stage)
  const {categoryContext,firstStateContext,stageSprintSelected , stageReorderedAyahsContext,stageOrderedAyahsContext,
    errorNbContext,stageShuffeledAyahsContext,catStages,stagesSprintsContext } = useSelector((state: RootStateType) => state.stage)
  const { setStageOrderedAyahsContext, setStageSprintSelected,
  setStageShuffeledAyahsContext, setDraggedIndex, setOrderedAyahsContext,  setStageReorderedAyahsContext,
  setShuffeledAyahsContext, setValidContext,   setHideNbContext, setCategoryContext, setCatStages} = stageActions
  const svgWindow = useRef();
  const [windowVisualisation, setWindowVisualisation] = useState(WINDOW_VISUALISATION.ALL);
       
useEffect(() => {
      dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[-1]})) 
        console.log({stageSprintSelected});

        if (typeof stageSprintSelected !== 'undefined' && stageSprintSelected?.souraName != '' ){
      const _actualSprint = async () =>{ 
        const _sprint =  await getStageForSprint(stageSprintSelected.stageId)
      if ( _sprint.success && typeof _sprint.stage !== 'undefined' ) {
        const _shuffeleledFirst = (JSON.parse(_sprint.stage!.ayahs)).map((ordG: Ayah, index: number) => (ordG));
       console.log({ _shuffeleledFirst });
      const _orderedAy = [..._.sortBy(_shuffeleledFirst, ['number'])].map((ordG: Ayah, index) => (ordG))
        console.log({ _orderedAy });
      //  setGridIndex(stageSprintSelected.stageId.split('-')[stageSprintSelected.stageId.split('-').length - 1 ])
        dispatch(setStageOrderedAyahsContext({ ayahs: _orderedAy }))
        dispatch(setStageShuffeledAyahsContext({ ayahs: _shuffeleledFirst }))
      }}
      _actualSprint()
    }
}, [stageSprintSelected]);

 useEffect(() => {
     console.log({ stageOrderedAyahsContext,stageShuffeledAyahsContext });
 // setGridAyahs(JSON.parse(stageGridSelected.ayahs!))
 }, [stageOrderedAyahsContext,stageShuffeledAyahsContext ]);

 function getMin() {
 if (stageOrderedAyahsContext && 
     stageOrderedAyahsContext.length > 0 && stageOrderedAyahsContext[0].numberInSurah 
     !== -1 ) {
     console.log({Num:stageOrderedAyahsContext[0].numberInSurah, 
         });
   return stageOrderedAyahsContext[0].numberInSurah!
     } else return 
    0 
 }     
 const newTiwal: StagesSprintType[] = useMemo(() => stagesSprintsContext?.filter((gr: StagesSprintType) => {
     return gr.souraNb <= 7
   }), [stagesSprintsContext])
   const newMiin = useMemo(() => stagesSprintsContext?.filter((gr: StagesSprintType) => {
     return gr.souraNb! > 7 && gr.souraNb <= 18;
   }), [stagesSprintsContext])
 
   const newMathani = useMemo(() => stagesSprintsContext?.filter((gr: StagesSprintType) => {
     return gr.souraNb > 18 && gr.souraNb <= 48;
   }), [stagesSprintsContext])
 
   const newMofasal = useMemo(() => stagesSprintsContext?.filter((gr: StagesSprintType) => {
     return gr.souraNb > 48;
   }), [stagesSprintsContext])
   const categoryHandler = (cat:GRIDS_NAME ) => {
    console.log({cat});
      dispatch(setCategoryContext({cat:cat}))
      switch (cat) {
       case ( GRIDS_NAME[GRIDS_TLD.TIWAL]):{
         dispatch(setCatStages({
          stages:newTiwal 
         })) 
         break;
       }case ( GRIDS_NAME[GRIDS_TLD.MIIN]):{
         dispatch(setCatStages({
          stages:newMiin 
         })) 
         break;
       }
       case ( GRIDS_NAME[GRIDS_TLD.MATHANI]):{
         dispatch(setCatStages({
          stages:newMathani 
         })) 
         break;
       }case ( GRIDS_NAME[GRIDS_TLD.MOFASAL]):{
      dispatch(setCatStages({
          stages:newMofasal 
         })) 
         break;
       }
     };}
  const _cats = [ GRIDS_NAME[GRIDS_TLD.TIWAL],GRIDS_NAME[GRIDS_TLD.MIIN], GRIDS_NAME[GRIDS_TLD.MATHANI],GRIDS_NAME[GRIDS_TLD.MOFASAL]]   
async function nextSouraHandler() {
  try {
    const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb +1)

        if(typeof _sprints[0] === 'undefined'){
         
          const _nextCat = _.findIndex(_cats,(cat: GRIDS_NAME)=> cat == categoryContext as string )
        if(_nextCat +1  < _cats.length) {
          categoryHandler(_cats[_nextCat+1])
        }else {

          categoryHandler(_cats[0])
        }
        }else {
          dispatch(setStageSprintSelected({stage:{
          arabName:_sprints[0].arabName,
          souraName:_sprints[0].souraName,
          souraNb:_sprints[0].souraNb,
          grid:_sprints[0].grid,
          group:_sprints[0].group,
        stageId:_sprints[0].stageId,
          
         }}))}
  }catch (error) {
        toast.warning(`${error}`)
  }}
useEffect(() => {
 // dispatch(setStageSprintSelected({ stage: catStages[0]}))
}, [catStages]);

  
async function prevSouraHandler() {
  try {
    const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb -1)

    if(typeof _sprints[0] === 'undefined'){
     
      const _prevCat = _.findIndex(_cats,(cat: GRIDS_NAME)=> cat == categoryContext as string )
    if(_prevCat -1  <0) {
      categoryHandler(_cats[0])
    }else {

      categoryHandler(_cats[_prevCat -1])
    }
    }else {

    const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb -1)
    dispatch(setStageSprintSelected({stage:{
            arabName:_sprints[0].arabName,
            souraName:_sprints[0].souraName,
            souraNb:_sprints[0].souraNb,
            grid:_sprints[0].grid,
            group:_sprints[0].group,
          stageId:_sprints[0].stageId,
   }}))}
  }catch (error) {
        toast.warning(`${error}`)
      }}
async function sprintHandler() {
  try {
    const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb +1)
        /* dispatch(setStageSprintSelected({stage:{
            arabName:_sprints[0].arabName,
            souraName:_sprints[0].souraName,
            souraNb:_sprints[0].souraNb,
            grid:_sprints[0].grid,
            group:_sprints[0].group,
          stageId:_sprints[0].stageId,
            
           }})) */
  }catch (error) {
        toast.warning(`${error}`)
      }  
        
      }
      async function duoHandler() {
        try {
          const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb +1)
              dispatch(setStageSprintSelected({stage:{
                  arabName:_sprints[0].arabName,
                  souraName:_sprints[0].souraName,
                  souraNb:_sprints[0].souraNb,
                  grid:_sprints[0].grid,
                  group:_sprints[0].group,
                stageId:_sprints[0].stageId,
                  
                 }}))
        }catch (error) {
              toast.warning(`${error}`)
            }  
              
            }
  function prevWindowHandler() {
         try {
          const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb ===stageSprintSelected.souraNb )
          const _actualSprintIndex = _.findIndex(_sprints,(elm:StagesSprintType )  => elm.stageId === stageSprintSelected.stageId )
          console.log({ _sprints, _actualSprintIndex ,});
          
          const _actualSprint = async () =>{ 
           if(_actualSprintIndex >0){
        
            dispatch(setStageSprintSelected({stage:{
            arabName:stageSprintSelected.arabName,
            souraName:stageSprintSelected.souraName,
            souraNb:stageSprintSelected.souraNb,
            grid:stageSprintSelected.grid,
            group:stageSprintSelected.group,
          stageId:_sprints[_actualSprintIndex -1].stageId,
            }})) 
          }else {
        dispatch(setStageSprintSelected({stage:{

          arabName:stageSprintSelected.arabName,
          souraName:stageSprintSelected.souraName,
          souraNb:stageSprintSelected.souraNb,
          grid:stageSprintSelected.grid,
          group:stageSprintSelected.group,
          stageId:_sprints[0].stageId,
          //ayahs:_sprint.stage!.ayahs
        }
        }
      ))}}
      _actualSprint()
       } catch (error) {
              toast.warning(`${error}`)
}}
       useEffect(() => {
         console.log({stageSprintSelected});}, [stageSprintSelected]);
       
  function nextWindowHandler() {
           try {
            console.log({stageSprintSelected});
            const _sprints = _.filter(catStages , (spr:StagesSprintType)  => spr.souraNb === stageSprintSelected.souraNb )
            const _actualSprintIndex = _.findIndex(_sprints,(elm:StagesSprintType )  => elm.stageId === stageSprintSelected.stageId )
            console.log({ _sprints, _actualSprintIndex });
            
            const _actualSprint = async () =>{ 
             if(_actualSprintIndex < _sprints.length){
            dispatch(setStageSprintSelected({ stage: {  arabName:stageSprintSelected.arabName,
              souraName:stageSprintSelected.souraName,
              souraNb:stageSprintSelected.souraNb,
              grid:stageSprintSelected.grid,
            group:stageSprintSelected.group,
            stageId: typeof (_sprints[_actualSprintIndex+1]) !== 'undefined' ?
            _sprints[_actualSprintIndex+1].stageId : 
            stageSprintSelected.stageId, 
            //ayahs:_sprint.stage!.ayahs
            }}))
      
            }else {
            dispatch(setStageSprintSelected({ stage: {  arabName:stageSprintSelected.arabName,
              souraName:stageSprintSelected.souraName,
              souraNb:stageSprintSelected.souraNb,
              grid:stageSprintSelected.grid,
            group:stageSprintSelected.group,
            stageId: typeof (_sprints[_actualSprintIndex+1]) !== 'undefined' ?
            _sprints[_actualSprintIndex+1].stageId : 
            stageSprintSelected.stageId, 
            }}))
            }
          
          }
            _actualSprint()
              } catch (error) {
                toast.warning(`${error}`)
              }}
           
function readHandler() {
        setWindowVisualisation(WINDOW_VISUALISATION.READ) 
      }
                
    function shuffleHandler() {
      //dispatch(setFirstStateContext({first: false}))
        const shuffeledAy = _.shuffle(stageShuffeledAyahsContext)
     console.log({ shuffeledAy });

        dispatch(setStageShuffeledAyahsContext({ ayahs: shuffeledAy }))
    }

    useEffect(() => {
  if(typeof stageShuffeledAyahsContext !== 'undefined' && stageShuffeledAyahsContext){
  console.log({windowVisualisation});
  
 }
}, [stageShuffeledAyahsContext, windowVisualisation]); 
 
 useEffect(() => {
   console.log({stageOrderedAyahsContext, stageShuffeledAyahsContext});
   
 }, [stageOrderedAyahsContext, stageShuffeledAyahsContext]);
 // Drag and Drop Logic
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
         console.log({stageShuffeledAyahsContext});
           const orderedAy = _.sortBy(stageShuffeledAyahsContext, ['numberInSurah']) 
           console.log({orderedAy, stageOrderedAyahsContext, stageShuffeledAyahsContext});
           
           dispatch(setOrderedAyahsContext({ ayahs: orderedAy }))
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [stageShuffeledAyahsContext]);
 
   const [errorNb, setErrorNb] = useState(0);
   
   function handleDragEnd(event: { active: any; over: any; }) {
         const { active, over } = event;
         console.log({ active, over , firstStateContext})
         if (active?.id === over?.id && !firstStateContext) {
             console.log({active, over});
              dispatch(setShuffeledAyahsContext({
                 ayahs: [..._.filter(stageShuffeledAyahsContext, function (sh: Ayah) {
                     return sh.numberInSurah !== active.id
                 })]
             }))

              dispatch(setOrderedAyahsContext({
                 ayahs: [..._.filter(stageOrderedAyahsContext, function (sh: Ayah) {
                     return sh.numberInSurah !== active.id
                 })]
             }))
             console.log({active, over, ordereFilter:[..._.filter(stageOrderedAyahsContext, function (sh: Ayah) {
              return sh.numberInSurah !== active.id
          })], shuffFulter: [..._.filter(stageShuffeledAyahsContext, function (sh: Ayah) {
            return sh.numberInSurah !== active.id
        })]});

            }else if (stageReorderedAyahsContext[0] == -1 && active.id !== stageOrderedAyahsContext[0].numberInSurah) {
                 toast.error(`You made a mistake on the first ayah its ${stageOrderedAyahsContext[0].text} `)
             }
             else if (stageReorderedAyahsContext[0] == -1) {
                 
                 dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[active.id!]}))
             }else if (active.id === stageReorderedAyahsContext[stageReorderedAyahsContext.length - 1] + 1) {
                 console.log({stageOrderedAyahsContext,stageReorderedAyahsContext, });
     
                 dispatch(setStageReorderedAyahsContext({reorderedAyahsContext:[...stageReorderedAyahsContext, active.id]}))
                
             } else {
                 console.log({stageOrderedAyahsContext,stageReorderedAyahsContext});
                 
                 toast.warning(`your next ayah ${active.id + 1}  
                      ${stageOrderedAyahsContext[stageReorderedAyahsContext.length].text} 
                      is next ayah `, {
                     closeOnClick: true,
                     autoClose: false
                 })
                 setErrorNb((prev) => prev + 1)
             }
             if (errorNb < 4) {
                 console.log({ stageReorderedAyahsContext, stageShuffeledAyahsContext });
                 if ( stageReorderedAyahsContext.length === stageShuffeledAyahsContext.length && stageReorderedAyahsContext[0] !== -1){
                     toast.success('it was the last ayas for that grid you can stage it')
                 }
             } else {
                 toast.warning(`you must rehearsal  !!! `)
                 dispatch(setValidContext({ validCtxt: false }))
                 dispatch(setHideNbContext({ hide: false }))
                 setErrorNb(0)
              }
     }
 useEffect(() => {
   if(errorNbContext < 4 && errorNbContext !==0) {
     toast.info(`You have ${errorNbContext-4} other essay`)
         }
 }, [errorNbContext]);
 useEffect(() => {
  console.log({stageShuffeledAyahsContext, stageOrderedAyahsContext});
  
 }, [stageOrderedAyahsContext, stageShuffeledAyahsContext]);
 
    return       <Modal backdrop={'blur'} isOpen={isOpen}
     size={'full'} onClose={onClose} scrollBehavior='outside'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-blue-700"> {`
           category ${categoryContext} - { soura ${stageSprintSelected.arabName} ~ ${stageSprintSelected.souraName}  
           ${stageSprintSelected.souraNb} } -  StageId ${stageSprintSelected.stageId}   
             ( From Ay ${stageOrderedAyahsContext[0].numberInSurah} To ${stageOrderedAyahsContext[stageOrderedAyahsContext.length -1 ].numberInSurah} )
       ` } 
            </ModalHeader>
            <ModalBody>
            <div className={`flex h-full border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
               <div className="flex justify-evenly items-center ">
                <SpaceButton  handlePress={prevSouraHandler} title='Prev Soura '  />
                <SpaceButton  handlePress={nextSouraHandler} title='Next Soura'  />
                 <SpaceButton  handlePress={shuffleHandler} title='Shuffle' /> 
                <SpaceButton  handlePress={prevWindowHandler} title='Prev Wind '  />
                <SpaceButton  handlePress={nextWindowHandler} title='Next Wind'  />
                <SpaceButton  handlePress={readHandler} title='Read'  />
        </div>
               </div>

               <DndContext sensors={sensors}
            collisionDetection={closestCenter}
            autoScroll={true} onDragOver={handleDragOver}
             onDragEnd={handleDragEnd}>
            <div className="flex justify-between items-stretch gap-3 mt-2 w-full  border-blue-400 border-1 rounded-md  
                 h-full " >
                <div className="flex   flex-col w-full items-stretch justify-start p-2 gap-2">
                    { typeof stageShuffeledAyahsContext !== 'undefined' && 
                    stageShuffeledAyahsContext.length > 0 && 
                     stageShuffeledAyahsContext?.map((ayd: Ayah, index: number) => {
                     // console.log({ayId:ayd, nbSurah: ayd.numberInSurah, index});
                        
                        return (<Draggable  key={`${ayd.order}-${index}`} id={ayd?.numberInSurah!} gridAyah={ayd}  />)
                    })}
                </div>
                <div className="flex flex-col items-center justify-start   h-full  w-full  gap-2 p-2 border-emerald-500  " >
                    {stageOrderedAyahsContext && stageOrderedAyahsContext?.length > 0 &&
                        stageOrderedAyahsContext.map((ayd: Ayah, index: number) => {
                          //  console.log({ayd, nbA: ayd.numberInSurah});
                            
                            return (<Droppable key={`${ayd.order}-${index}`} id={ayd.numberInSurah!} ayd={ayd} />)
                        })}</div>
            </div>
        </DndContext>
            </ModalBody>
            <ModalFooter>
              <div className=" flex w-full   justify-evenly items-center border-2   p-2">
            <RadioGroup
                           orientation="horizontal"
                           value={windowVisualisation}
                           onValueChange={setWindowVisualisation}
                           >
               <div className="flex  p-2  rounded-md justify-center items-center border-2 border-violet-500  space-x-2">
                         <Radio value={WINDOW_VISUALISATION.AWAL }>Awal</Radio>
                         <Radio value={WINDOW_VISUALISATION.AWSAT }>Awsat</Radio>
                         <Radio value={WINDOW_VISUALISATION.AKHIR }>Akhir</Radio>
                         <Radio value={WINDOW_VISUALISATION.ODD }>Odd</Radio>
                         <Radio value={WINDOW_VISUALISATION.EVEN }>Even</Radio>
                         <Radio value={WINDOW_VISUALISATION.ALL }>All</Radio>
                         <Radio value={WINDOW_VISUALISATION.HIDE_NB }>Hide Nb</Radio>
                         <Radio value={WINDOW_VISUALISATION.VALID }>Valid Mode</Radio>
               </div>
                     
                     </RadioGroup>  
                     <div className="flex justify-between p-2  rounded-md gap-1 items-center border-2 border-violet-500">
                     {/*    <SpaceButton  handlePress={validateHandler} title='Validate '  />
                      */}   <SpaceButton  handlePress={sprintHandler} title='Sprint '  />
                         <SpaceButton  handlePress={duoHandler} title='Duo ' /> 
                        {/* <SpaceButton  handlePress={prevSprintHandler} title='Prev Window '  />
                        <SpaceButton  handlePress={nextWindowHandler} title='Next Window'  /> */}
        </div>
                      </div>
                            
              </ModalFooter>
          
          </>
        )}
       </ModalContent>
    </Modal>
}
