import { Checkbox } from "@nextui-org/react";
import { EVAL_STATE } from "./Board";


export default function RadioButtonEvalState({handleRadioCheck, title, evalState, actualState}: {handleRadioCheck: any, 
    title:string, evalState:EVAL_STATE,  actualState:EVAL_STATE}) {
  
    return (
    <div className="flex  justify-center items-center  border border-green-400 text-center font-sans " 
    onClick={handleRadioCheck}>
         <input onChange={()  => {handleRadioCheck(evalState)}} className="flex  justify-center items-center  border border-green-100"
          type="radio" 
         id={evalState} name={evalState} value={evalState} checked={actualState === evalState} />
    <label htmlFor={evalState} className="text-sm">{title}</label>
  </div>
 
  );
}

