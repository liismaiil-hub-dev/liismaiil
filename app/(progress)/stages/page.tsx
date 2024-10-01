'use server'
import { getGuestFromCookies } from "@/actions/guest";
import { getStages } from "@/actions/stage";
import Board from "@/components/stage/Board";
import GridCard from "@/components/stage/StepsCaroussel";

/* export async function generateStaticParams({ params: { tokenId } }: { params: { tokenId: [string] } }) {
  const _tokenId = parseInt(tokenId[0])
  try {

    const _tokenIds = await prisma.guestStage.findMany({ where: {}, distinct: ['tokenId'], select: { tokenId: true } });
    console.log({ _tokenIds });

    return _tokenIds.map((tokenId) => ({
      tokenId: _tokenId,
    }))
  } catch (error) {

  }
} */

export default async function GuestStagePage() {
  let stages = [];
  const _guest = await getGuestFromCookies();
  if (typeof _guest !== 'undefined' && _guest && typeof _guest?.tokenId! !== 'undefined' && _guest.tokenId!) {
    stages = await getStages(_guest.tokenId);
    stages.stages.forEach((st) => {
     // console.log({ st });

    })
  } else {
    stages = await getStages(2);
  }
  // console.log({ stages });
  return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >
    <div className="flex justify-start items-center">

      <GridCard />
    </div>

    <div className="flex justify-between items-start">
      <Board stages={stages?.stages!} />
    </div>


  </section>
  );
}

