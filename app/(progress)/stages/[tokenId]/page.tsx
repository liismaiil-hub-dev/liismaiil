'use server'
import { LIISMAIIL_STATUS_ENUM } from "@/app/api/graphql/profile/profile.types";
import Board from "@/components/stage/Board";
import GridCard from "@/components/stage/StepsCaroussel";
import prisma from "@/lib/prisma-db";

export async function generateStaticParams() {
  try {
    const _hosts = await prisma.guest.findMany({
      where: { status: LIISMAIIL_STATUS_ENUM.HOST }
    });
    const _allHosts = _hosts.map((host) => ({ tokenId: host.tokenId.toString() }))
    return _allHosts.slice(0, 50)
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }}
  
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

export default async function GuestStagePage({ params }: { params: { tokenId: string } }) {
  if (params && params.tokenId) {
    const { tokenId } = params
    const stages = await getStages(parseInt(tokenId))
    if (stages && stages.success) {
      console.log({ stages });
      return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >
        <GridCard />
        <Board stages={stages._stages} />
      </section>
      );
    }
  } else {
    return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >

      there is an error

    </section>
    );
  }
}
