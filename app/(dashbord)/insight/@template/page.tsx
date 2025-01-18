'use client'
import TemplateCard from "@/components/insight/TemplateCard";
import {  useSelector } from "react-redux";
import { RootStateType } from "@/store/store";


export default  function TemplateNavigator() {
  const { insightTemplate} = useSelector((state: RootStateType) => state.stage)
  const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)

    return (<div className="flex-col justify-start  py-2 items-center">
                <div className=" bg-green-100/50  col-span-3 text-center text-blue-400 font-semibold " >
                    {`Select template from soura Nb ${insightTemplate?.souraNb} : ${insightTemplate?.arabName} == ${insightTemplate?.souraName} `}   
                </div >
       
      <TemplateCard />
      </div>
    )

 
}

