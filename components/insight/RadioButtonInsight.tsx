'use client'
import { INSIGHT_STATE } from "./TemplateBoard";
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';


export default function RadioButtonInsight({ title, insightState, }: {
  title: string, insightState: INSIGHT_STATE
}) {
  const dispatch = useDispatch();
  const { insightContext } = useSelector((state: RootStateType) => state.stage)

  //const [_actualGrid, setActualGrid] = useState(() => JSON.parse(gridSelected.ayahs)[gridIndex])
  const { setInsightContext } = stageActions

  function handleRadioCheck() {
    dispatch(setInsightContext({ insight: insightState }))
  }


  return (
    <div className="flex  justify-center items-center  border border-green-400 text-center font-sans "
      onClick={handleRadioCheck}>
      <input onChange={() => { handleRadioCheck() }} className={`flex  justify-center items-center  border-3 ${insightContext === insightState ? 'border-green-400' : 'border-grey-400'}`}
        type="radio"
        id={insightState} name={insightState} value={insightState} checked={insightContext === insightState} />
      <label htmlFor={insightState} className="text-sm">{title}</label>
    </div>

  );
}

