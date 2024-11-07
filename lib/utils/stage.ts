import prisma from "@/lib/prisma-db";
import { memoize } from "nextjs-better-unstable-cache";
import { getGuestFromCookies } from "../authTools";
import { GuestType } from "@/app/api/graphql/profile/profile.types";


export const getOwnStages = memoize(async (): Promise<{ success: boolean, stages: [] } | undefined | null> => {
    const _localGuest: GuestType = getGuestFromCookies()! ;
    const { tokenId } = _localGuest
    console.log({ tokenId });
    const _stagesRel = await prisma.guestStage.findMany({
        where: { tokenId }, include: {
            stage: true,
        }
    });
    //console.log({ _stagesRel });
    try {
        if (_stagesRel && _stagesRel.length > 0) {

            return { success: true, stages: _stagesRel }

        } else {
            return {
                success: false,
                stages: []
            }
        }
    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
}, {
    persist: true,
    revalidateTags: () => ['stages', 'sprints'],
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'stages'
}
)