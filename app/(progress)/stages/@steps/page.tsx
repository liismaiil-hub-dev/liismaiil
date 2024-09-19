

import { GuestStageRel } from '@/api/graphql/stage/stage.types';
import GridsComponent from "@/components/stage/Grids";
import prisma from '@/lib/prisma-db';
import { headers } from 'next/headers';
async function getStages(tokenId: number) {
  console.log({ tokenId });

  const _stagesRel = await prisma.guestStage.findMany({ where: { tokenId } });
  console.log({ _stagesRel });
  try {
    if (_stagesRel && _stagesRel.length > 0) {

      const _stages = await _stagesRel.map(async (rela: GuestStageRel) => {
        const _stage = await prisma.stage.findUniqueOrThrow({
          where: {
            stageId: rela.stageId
          }
        })
        console.log({ _stage });

        return _stage

      });
      return { success: true, _stages }


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

export default async function StepssNav() {
  const url = new URL(headers().get('x-url')!);
  const searchParams = url.searchParams;
  console.log({ searchParams });

  const stages = await getStages(2)
  if (stages.success && typeof stages._stages !== 'undefined' && stages._stages.length > 0) {
    // console.log(`grids stages ${grids}` );

    return (
      <GridsComponent stages={stages._stages} />
    )
  } else {
    return (<GridsComponent stages={[{
      id: -1,
      stageId: '',
      createdAt: '',
      souraName: '',
      souraNb: -1,
      grid: -1,
      startOn: '',
      createdById: '',
      ayahs: '',
      guests: []
    }]} />)

  }
}

