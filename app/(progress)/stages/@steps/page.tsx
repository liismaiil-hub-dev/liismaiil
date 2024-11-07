
import StageStepsComponent from "@/components/stage/StageSteps";

export default async function StepsNav() {
  try {
    return (
      <div className="flex-col justify-start items-center space-y-1 border-3  w-full  " >
        <StageStepsComponent />
      </div>
    )
  }
  catch (error) {
    throw error
  }

}