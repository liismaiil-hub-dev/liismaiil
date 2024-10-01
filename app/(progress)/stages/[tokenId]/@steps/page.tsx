
import GridsComponent from "@/components/stage/StageGrids";
import { getGuestFromCookies } from '@/lib/authTools';
import prisma from "@/lib/prisma-db";

async function getStages(tokenId: number) {
  console.log({ tokenId });
  const _stagesRel = await prisma.guest.findUniqueOrThrow({
    where: { tokenId },
    select: {
      stages: {
        select: { stage: true }
      }
    }
  });
  console.log({ _stagesRel: _stagesRel.stages });
  try {

    if (_stagesRel && _stagesRel.stages.length > 0) {

      return {
        success: true,
        _stages: _stagesRel.stages
      }

    } else {
      return {
        success: false,
        _stages: []
      }
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }

}

export default async function StepsNav() {
  try {
    const _ImGuest = await getGuestFromCookies();
    console.log({ _ImGuest });
    if (_ImGuest && _ImGuest.tokenId) {

      const stages = await getStages(parseInt(_ImGuest?.tokenId!))
      if (stages && stages.success) {
        console.log({ stages });

        return (
          <div className="flex flex-col justify-start items-center space-y-1 border-3   w-full h-[calc(100vh-7rem)] " >
            <GridsComponent stages={stages._stages} />
            <SprintsComponent />
          </div>
        )
      }
    }
  } catch (error) {
    throw error
  }

}