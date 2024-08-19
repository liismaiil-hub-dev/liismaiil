'use client' 
import { EVAL_STATE } from "@/api/graphql/stage/stage.types";
import { sprintActions } from "@/store/slices/sprintSlice";
import { RootStateType } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';


export default function RadioButtonEvalState({ title, evalState,}: { 
    title:string, evalState:EVAL_STATE  }) {
      const dispatch = useDispatch();
      const {   evalContext } = useSelector((state: RootStateType) => state.sprint)
  
  //const [_actualGrid, setActualGrid] = useState(() => JSON.parse(gridSelected.ayahs)[gridIndex])
 const { setEvalContext} = sprintActions
  
  function handleRadioCheck() {
    dispatch(setEvalContext({eval:evalState}))
  }
 
      
    return (
    <div className="flex  justify-center items-center  border border-green-400 text-center font-sans " 
    onClick={handleRadioCheck}>
         <input onChange={()  => {handleRadioCheck()}} className={`flex  justify-center items-center  border-3 ${evalContext === evalState ? 'border-green-400': 'border-grey-400'}`}
          type="radio" 
         id={evalState} name={evalState} value={evalState} checked={evalContext === evalState} />
    <label htmlFor={evalState} className="text-sm">{title}</label>
  </div>
 
  );
}

