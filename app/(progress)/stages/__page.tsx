'use server'
import Board from "@/components/stage/Board";
import GridCard from "@/components/stage/StepsCaroussel";
import prisma from "@/lib/prisma-db";
export async function generateStaticParams({ params: { tokenId } }: { params: { tokenId: [string] } }) {
    const _tokenId = parseInt(tokenId[0])
    try {

        const _tokenIds = await prisma.guestStage.findMany({ where: {}, distinct: ['tokenId'], select: { tokenId: true } });
        console.log({ _tokenIds });

        return _tokenIds.map((tokenId) => ({
            tokenId: _tokenId,
        }))
    } catch (error) {

    }
}
async function getStages(tokenId: number) {
    console.log({ tokenId });

    const _stagesRel = await prisma.guestStage.findMany({
        where: { tokenId }, include: {
            stage: true,
        }
    });
    console.log({ _stagesRel });
    try {
        if (_stagesRel && _stagesRel.length > 0) {

            /*         const _stages = await _stagesRel.map(async (rela: GuestStageRel) => {
                        const _stage = await prisma.stage.findUniqueOrThrow({
                            where: {
                                stageId: rela.stageId
                            }
                        })
                        console.log({ _stage });
        
                        return _stage
        
                    }); */
            return { success: true, stages: _stagesRel }


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


export default async function GuestStagePage({ params }: { params: { tokenId: [string] } }) {
    console.log({ params });
    const { tokenId } = params

    const stages = await getStages(parseInt(tokenId[0]))
    console.log({ tokenId: parseInt(tokenId[0]) });

    console.log({ stages });

    return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >

        <GridCard />
        <Board stages={stages} />


    </section>
    );
}
