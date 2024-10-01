'use client'
import { EVAL_STATE } from "@/api/graphql/stage/stage.types";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';


export default function RadioButtonEvalState({ title, evalState, }: {
  title: string, evalState: EVAL_STATE
}) {
  const dispatch = useDispatch();
  const { stageEvalContext } = useSelector((state: RootStateType) => state.stage)

  //const [_actualGrid, setActualGrid] = useState(() => JSON.parse(gridSelected.ayahs)[gridIndex])
  const { setStageEvalContext } = stageActions

  function handleRadioCheck() {
    dispatch(setStageEvalContext({ eval: evalState }))
  }


  return (
    <div className="flex  justify-center items-center   text-center font-sans "
      onClick={handleRadioCheck}>
      <input onChange={() => { handleRadioCheck() }} className={`flex  justify-center items-center  border-3 mx-2 ${stageEvalContext === evalState ? 'border-green-400 text-green-600' : 'border-grey-400'}`}
        type="radio"
        id={evalState} name={evalState} value={evalState} checked={stageEvalContext === evalState} />
      <label htmlFor={evalState} className="text-sm">{title}</label>
    </div>

  );
}

