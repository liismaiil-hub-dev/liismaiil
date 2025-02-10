import { select } from 'd3';
import { StatTaysir } from './../node_modules/.prisma/client/index.d';
import { SprintPrismaSessionInputType, SprintPrismaType } from './../app/api/graphql/stage/stage.types';
'use server'
import { revalidateTag } from "next/cache";
import prisma from "@/api/lib/prisma-db";
import { memoize } from "nextjs-better-unstable-cache";
import  * as _  from 'lodash';


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
       // create guest Sprint Junction
            

    const __sprint = await prisma.sprint.upsert({where:{
        sprintId
    },
        create:{
                sprintId ,
                createdAt :new Date().toISOString(),
                published: true,
                stageId,
            }, 
            update:{

            },
            include:{
                guests: true
            }
            })
      const __guest_sprint = await prisma.guestSprint.create({data:{
        sprintId,
        tokenId,
        addedAt:new Date().toISOString(),
    }})
      console.log({__sprint, __guest_sprint});
      
        
         revalidateTag('space')
         revalidateTag('stages')
         return { success: true, message: JSON.stringify(__sprint) }
        } catch (error) {
            console.log({error});
            
        return { success: false, message: JSON.stringify(error) }
            
        }
}
export const statTaysirPersist = async ({
    souraNb,
   min,
   max,
   ayMin,
   ayMax,

}: {souraNb:number,min:number, max: number , length: number, ayMin:string, ayMax:string}) => {
    //const _guest = getCurrentGuest()
    console.log({
        souraNb,
        min,
        max,
        ayMin,
        ayMax, });

    try {

    const __stat = await prisma.statTaysir.create({
        data:{
            souraNb,
            min,
            max,
            ayMin,
            ayMax,
        }})
      
        
         revalidateTag('insight')

         return { success: true, message: JSON.stringify(__stat) }
        } catch (error) {
            console.log({error});
            
        return { success: false, message: JSON.stringify(error) }
            
        }
}
   
export const getStatTaysir = async ({
   min=0,
   max=100,
   }: {min:number, max: number ,}) => {
    //const _guest = getCurrentGuest()
    console.log({
        min,
        max,
 });

    try {

    const __stat = await prisma.statTaysir.findMany({
        /* skip:min,   
        take:max, */})
      revalidateTag('insight')
       // console.log({__stat});
        const _statString =JSON.stringify(__stat) 
        
         return { success: true, message: _statString}
        } catch (error) {
            console.log({error});
            
        return { success: false, message: JSON.stringify(error) }
            
        }
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



export const getAllSprints = memoize(async () => {

    const sprints = await prisma.sprint.findMany({
        orderBy: {
            stage: {
                souraNb: 'asc'
            },
            
        },
        select:{
            sprintId: true,
            guests:true,
        },
    })
    return sprints as SprintPrismaType[];
}, {
    persist: true,
    revalidateTags: [`sprints`],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: `sprints`,
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
export const getSprintGuests = memoize(
    async (sprintId: string) => {
        const guests = await prisma.guestSprint.findMany({
            where: { sprintId: { equals: sprintId } }, include:{
                
                guest:true,
               }
        })
        console.log({guests});
        
        return guests;
    },
    {
        persist: true,
        revalidateTags: (sprintId) => [`guetsOf-${sprintId}`],
        suppressWarnings: true,
        logid: 'sprintGuests',
    }
)
