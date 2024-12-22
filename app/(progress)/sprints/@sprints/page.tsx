
import { SprintPrismaType } from '@/app/api/graphql/stage/stage.types';
import SprintComponent from "@/components/stage/Sprint";
import { getOwnSprints } from '@/app/api/lib/sprint';

export default async function SprintStepsNav() {
  try {

    const sprints = await getOwnSprints()
    if (sprints && sprints.success) {

      return (
        <div className="flex flex-col justify-start items-center space-y-1 border-3   w-full h-[calc(100vh-7rem)] " >
          {sprints.sprints.map((sprint: SprintPrismaType) => (<SprintComponent key={sprint.sprintId} sprint={sprint} />)
          )}
        </div>
      )
    }
  } catch (error) {
    throw error
  }
}