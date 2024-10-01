
import { getGuestFromCookies } from '@/actions/guest';
import { getOwnSprints } from '@/actions/sprint';
import SprintStepsComponent from "@/components/stage/SprintSteps";

export default async function SprintStepsNav() {
  try {
    const _ImGuest = await getGuestFromCookies();
    const sprints = await getOwnSprints(parseInt(_ImGuest?.tokenId!))
    console.log({ sprintsFromParallel: sprints._sprints });
    if (sprints && sprints.success) {

      return (
        <div className="flex flex-col justify-start items-center space-y-1 border-3   w-full h-[calc(100vh-7rem)] " >
          <SprintStepsComponent sprints={sprints._sprints} />
        </div>
      )
    }
  } catch (error) {
    throw error
  }
}