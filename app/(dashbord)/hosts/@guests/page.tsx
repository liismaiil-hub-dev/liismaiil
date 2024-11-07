
import { SprintPrismaType } from "@/app/api/graphql/stage/stage.types";
import SprintComponent from "@/components/space/Sprint";
import { getOwnSprints, } from "@/lib/utils/sprint";
import { getOwnStages } from "@/lib/utils/stage";
import { Button } from '@nextui-org/react';


export default async function Sprint() {


  const sprintsResp = await getOwnSprints();
  const stagesResp = await getOwnStages();
  console.log({ sprints, stages });


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
