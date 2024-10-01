'use server'
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import { getGuestFromCookies } from "@/lib/authTools";
import prisma from "@/lib/prisma-db";
import { revalidateTag } from "next/cache";
import { memoize } from "nextjs-better-unstable-cache";

export const getOwnSprints = memoize(async (tokenId: number) => {
    console.log({ tokenId });
    const _sprintsRel = await prisma.guest.findUniqueOrThrow({
        where: { tokenId },
        select: {

            sprints: {
                select: {
                    sprint: {
                        select: {
                            sprintId: true,
                            createdAt: true,
                            createdById: true,
                            guests: {
                                select: {
                                    tokenId: true
                                }
                            },
                            stage: true
                        }
                    }
                },

            },
        }
    });
    console.log({ _sprintsRel: _sprintsRel.sprints });
    try {
        if (_sprintsRel && _sprintsRel.sprints.length > 0) {
            return {
                success: true,
                _sprints: _sprintsRel.sprints
            }

        } else {
            return {
                success: false,
                _sprints: []
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
    logid: 'getOwnSprints'
})

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
export const getPublishedSprints = memoize(async () => {
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
        }
    });
    console.log({ sprintPublished: sprintPublished });
    return sprintPublished
}, {
    persist: true,
    revalidateTags: () => ['stages', `sprints`],
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

export const setSprintSession = memoize(async (sprintId: string) => {
    const _guest: GuestType = await getGuestFromCookies()
    const _allGuest = await prisma.sprint.findUnique({
        where: { sprintId },
        select: {
            guests: true
        }
    });
    if (_guest && _guest.tokenId) {
        const sprintPublished = await prisma.sprint.update({
            where: { sprintId },
            data: {
                guests: [..._allGuest, { tokenId: _guest.tokenId, sprintId }]
            }
        });
        console.log({ sprintPublished: sprintPublished });
        return sprintPublished
    }

}, {
    persist: true,
    revalidateTags: () => ['stages', `sprints`],
    log: ['datacache', 'verbose', 'dedupe'],
    logid: `getPublishedSprints `
})


export const getAllStagesForDashboard = memoize(async () => {

    const stages = await prisma.stage.groupBy({
        by: 'souraNb',
    })
    return stages;
}, {
    persist: true,
    revalidateTags: ['dashboard:stages'],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'dashboard: stages'
})

export const getAllSprintsForDashboard = memoize(async () => {

    const sprints = await prisma.sprint.findMany({
        orderBy: { stage : {
            souraNb:'asc'
        }},
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
