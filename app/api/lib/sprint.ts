import { getGuestFromCookies } from "@/actions/guest";
import prisma from "@/api/lib/prisma-db";
import { memoize } from "nextjs-better-unstable-cache";
import { GuestType } from "../graphql/profile/profile.types";

export const getOwnSprints = memoize(async () => {
const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!
    const _localGuest:GuestType = getGuestFromCookies();

    if (typeof _localGuest !== 'undefined' && _localGuest?.tokenId) {
        const _sprintsRel = await prisma.guest.findUniqueOrThrow({
            where: { tokenId: _localGuest?.tokenId },
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
                    sprints: _sprintsRel.sprints
                }

            } else {
                return {
                    success: false,
                    sprints: []
                }
            }
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    }
}, {
    persist: true,
    revalidateTags: () => ['stages', 'sprints'],
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'getOwnSprints'
})