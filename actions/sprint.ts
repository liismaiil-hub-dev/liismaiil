import { SprintPrismaSessionInputType } from './../app/api/graphql/stage/stage.types';
'use server'
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import moment from "moment";
import { revalidateTag } from "next/cache";
import prisma from "@/api/lib/prisma-db";
import { memoize } from "nextjs-better-unstable-cache";
import { getGuestFromCookies} from "@/actions/guest";
import { SprintPrismaType } from "@/app/api/graphql/stage/stage.types";


export const createNewSprint = async ({
    sprintId,
    stageId,
    tokenId,
    createdById,
}: {
    sprintId: string,
    tokenId: number,
    createdById: string
    stageId: string
}) => {
    //const _guest = getCurrentGuest()
    console.log({
        sprintId,
        createdById,
        stageId,
        tokenId
    });
    try {
        const _sprint = await prisma.sprint.findUnique({ where: { sprintId } })
        if (_sprint) {
            await prisma.guestSprint.create({
                data: {
                    sprintId,
                    tokenId,
                    addedAt: new Date().toISOString(),
                }
            })
            revalidateTag('sprints')
            revalidateTag('stages')

            return { success: true, message: JSON.stringify(_sprint) }

        } else {
            const _sprint = await prisma.sprint.create({
                data: {
                    createdAt: new Date().toISOString(),
                    startOn: new Date().toISOString(),
                    finishOn: moment().add(1, 'months').toISOString(),
                    stageId,
                    published: true,
                    sprintId,
                    createdById,
                }
            })
            await prisma.guestSprint.create({
                data: {
                    sprintId,
                    tokenId,
                    addedAt: new Date().toISOString(),
                }
            })
            revalidateTag('sprints')
            revalidateTag('stages')
            return { success: true, message: JSON.stringify(_sprint) }
        }

    } catch (error) {

        console.log({ ErrorCode: error.code, sprintActionError: error });
        throw error
    }
    revalidateTag('sprints')
}



export const sprintActivate = async (sprintId: string) => {
    console.log({ sprintId });
    const _sprintsRel = await prisma.sprint.update({
        where: { sprintId },
        data: {
            published: true
        },
        select: {
            stage: true,

        }

    });
    console.log({ _sprintsRel: _sprintsRel });
    revalidateTag('stages')
    revalidateTag('sprints')
};
export const getPublishedSprints = memoize(async ({ page, limit }: { page: number, limit: number }) => {
    const sprintPublished = await prisma.sprint.findMany({
        where: { published: true },
        select: {
            stage: true,
            guests: {
                select: {
                    tokenId: true
                }
            },
            sprintId: true,
            createdById: true,
        },
        skip: page ?? 0,
        take: limit ?? 50,
    });
    console.log({ sprintPublished: sprintPublished });
    return sprintPublished
}, {
    persist: true,
    revalidateTags: () => [ `sprints`],
    log: ['datacache', 'verbose', 'dedupe'],
    logid: `getPublishedSprints `
})

export const getSprint = memoize(async (sprId: string) => {
    const _sprint = await prisma.sprint.findUniqueOrThrow({
        where: { sprintId: sprId },
        select: {
            stage: true,
            guests: {
                select: {
                    tokenId: true
                }
            },
            sprintId: true,
            createdById: true,
        }
    });
    console.log({ uniqSprint: _sprint });
    return _sprint
}, {
    persist: true,
    revalidateTags: () => ['stages', `sprints`],
    log: ['datacache', 'verbose', 'dedupe'],
    logid: `getPublishedSprints `
})

export const setSprintSession = memoize(async (sprint: SprintPrismaSessionInputType) => {
    const {sprintId,guests,stageId} = sprint
    const _now = new Date()
    try {
        const _guest_sprint1 = await prisma.guestSprint.create({
            data: { sprintId, tokenId: parseInt(guests[0]) , },
            
        });
        const _guest_sprint2 = await prisma.guestSprint.create({
            data: { sprintId, tokenId: parseInt(guests[1])  },
            });
        if(_guest_sprint1 && _guest_sprint2) {
            try {
                const _sprint = await prisma.sprint.create({
                    data: { sprintId, createdAt :  _now.toISOString(),guests:[_guest_sprint1, _guest_sprint2],stageId,published },
                    
                });
                if(_sprint ){
                    
                    return { success: true, message: JSON.stringify(_sprint)}
                }else {
                    return { success: false, message: JSON.stringify(_sprint)}
            
                }  
                
            } catch (error) {
                return { success: false, message: JSON.stringify(error)}
                
            }
        }    
    } catch (error) {
        return { success: false, message: JSON.stringify(error)}
        
    }
    
    
}, {
    persist: true,
    revalidateTags: () => ['stages', `sprints`],
    log: ['datacache', 'verbose', 'dedupe'],
    logid:`setSprint `
})


export const deleteSprint = memoize(async (sprintId: string, stageId: string) => {
   try {

    const _delStage = await prisma.stage.delete({
        where: { stageId },
        
    });
    const _delSprint = await prisma.sprint.delete({
        where: { sprintId },
        
    });
    return{message:JSON.stringify(_delSprint), success:true}
   } catch (error) {
    return{message:JSON.stringify({error}), success:false}
    
   }
}, {
    persist: true,
    revalidateTags: () => ['stages', `sprints`],
    log: ['datacache', 'verbose', 'dedupe'],
    logid: `getPublishedSprints `
})



export const getAllSprintsForDashboard = memoize(async () => {

    const sprints = await prisma.sprint.findMany({
        orderBy: {
            stage: {
                souraNb: 'asc'
            }
        },
    })
    return sprints;
}, {
    persist: true,
    revalidateTags: [`dashboard:sprints`],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: `dashboard:sprints`,
})

export const getOneSprintById = memoize(
    async (sprintId: string) => {
        const sprints = await prisma.sprint.findFirst({
            where: { sprintId: { equals: sprintId } },
        })
        return sprints;
    },
    {
        persist: true,
        revalidateTags: (sprintId) => ['sprint', sprintId],
        suppressWarnings: true,
        logid: 'sprint',
    }
)
