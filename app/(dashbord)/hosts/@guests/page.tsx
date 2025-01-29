
import { SprintPrismaType } from "@/app/api/graphql/stage/stage.types";
import SprintComponent from "@/components/space/Sprints";
import { getOwnSprints, } from "@/app/api/lib/sprint";
import { getOwnStages } from "@/actions/host";
import { Button } from "@heroui/button";


export default async function Sprint() {


  const sprintsResp = await getOwnSprints();
  const stagesResp = await getOwnStages();
  console.log({ sprintsResp, stagesResp });


  if (typeof sprintsResp != 'undefined' && sprintsResp.success && sprintsResp.sprints?.length > 0) {
    return sprintsResp.sprints.map((sprint: SprintPrismaType) => <SprintComponent key={sprint.sprintId} sprint={sprint} />)
  }
  return (
    <Button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-xl p-2 h-full
              rounded-md'>
      No sprint projected
    </Button>)
}
