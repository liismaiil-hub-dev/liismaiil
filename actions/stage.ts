import { TemplateTypeData } from '@/api/graphql/stage/stage.types';
'use server'
import prisma from '@/api/lib/prisma-db';
import { memoize } from "nextjs-better-unstable-cache";

import { revalidateTag } from 'next/cache';
import { SpaceMenuType, StagePrismaType } from '@/app/api/graphql/stage/stage.types';
import { dbFirestore } from '@/app/api/graphql/fb-utils-admin';
import _ from 'lodash';
import { error } from 'console';

export const getAllStagesForDashboard = memoize(async () => {

  const stages = await prisma.stage.findMany({
    orderBy: {souraNb: 'asc'}
  })
 // console.log({allStagesAction: stages });
  return stages;
}, {
  duration:60,
  persist: true,
  additionalCacheKey: ['stages'],
  revalidateTags: ['stages'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'stages'
})
export const getAllStagesIdsNbName = memoize(async () => {

  const stages = await prisma.stage.findMany({
    orderBy: {souraNb: 'asc'}, select:{
      arabName:true,
      stageId:true,
      souraName:true,
      souraNb:true,
      grid:true,
      group:true,

    }
  })
 // console.log({allStagesAction: stages });
  return stages;
}, {
  duration:60,
  persist: true,
  additionalCacheKey: ['stagesSprints'],
  revalidateTags: ['stagesSprints'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'stagesSprints'
})
export const getSpaceSprintable = memoize(async (tokenId: number) => {

  const sprints = await prisma.sprint.findMany({where:{
    guests:{
      some:{
        tokenId
      }
    }
  },
    orderBy: {sprintId: 'asc'}})
 // console.log({allStagesAction: stages });
  return sprints;
}, {
  duration:60,
  persist: true,
  additionalCacheKey: ['sprints'],
  revalidateTags: ['space','stages'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'sprints'
})
export const getAllStageIdsForSprints = memoize(async () => {
try {
  
  const stages = await prisma.stage.findMany({
    orderBy: {souraNb: 'asc'}}
  )

  const sprintIds = await stages.map( (stage) => {
const gridNb = stage.stageId.split('-')[1];

if(parseInt(gridNb) === 5) {
  console.log({stageId:stage.stageId});
    return stage.stageId
}
}
)
const _sprintIds = _.compact(sprintIds);
console.log({sprintIds});

  if(_sprintIds && _sprintIds.length>0){

    return _sprintIds
  }else return null
} catch (error) {
  
}
}, {
  duration:60,
  persist: true,
  additionalCacheKey: ['sprints'],
  revalidateTags: ['stages'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'sprints'
})
export const getStageForSprint = memoize(async (stageId: string) => {
  try {
    console.log({stageId});
    
    const _stage = await prisma.stage.findFirstOrThrow({
      where:{stageId},
      }
    )
  if(_stage  && typeof _stage !== 'undefined') {
    console.log(_stage);
    
      return {success: true, stage:_stage}
  }else {
    return {success: false, stage:null}
    }} catch (error) {
      return {success: false, error}
    }
  }, {
    duration:60,
    persist: true,
    additionalCacheKey: ['stageForSprint'],
    revalidateTags: ['stageForSprint'],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'stageForSprint'
  })
export const getOwnStages = memoize(async ({
  tokenId,
  }:{
    tokenId:number,
    }) => {

  const _stages = await prisma.guest.findUnique({
    where: {
   tokenId
    } ,
    include: {
      stages:{orderBy: {stageId: 'asc'}},
    }})
//  console.log({allStagesAction: stages });
  return _stages;
}, {
  duration:60,
  persist: true,
  additionalCacheKey: ['space'],
  revalidateTags: ['space'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'ownStaged'
})
export const createNewStage = async ({
  stageId,
  createdAt,
  souraName,
  souraNb,
  grid,
  startOn,
  createdById,
  ayahs,
  tokenId,
  arabName,
  group
}: {
  stageId: string,
  createdAt: string
  souraName: string,
  arabName: string,
  souraNb: number,
  tokenId: number,
  grid: number,
  group: number,
  startOn: string,
  createdById: string
  ayahs: string
}) => {
  console.log({
    stageId,
    createdAt,
    souraName,
    arabName,
    souraNb,
    grid,
    group,
    startOn,
    createdById,
    ayahs,
    tokenId
  });
  
  try {
    const _stage = await prisma.stage.upsert({where:{
      stageId:stageId
    },
          create: {
            stageId,
            createdAt,
            souraName,
            arabName,
            souraNb,
            grid,
            group,
            startOn,
            createdById,
            ayahs,
          },
          update: {
            stageId,
            createdAt,
            souraName,
            arabName,
            souraNb,
            grid,
            group,
            startOn,
            createdById,
            ayahs,
          }})
          console.log({_stage});
          const _stToken =  await prisma.guestStage.upsert({
      where: {
        tokenId_stageId:{
          tokenId: tokenId,
          stageId: stageId,
          }},
        create: {
          stageId,
          tokenId,
        },
        update: {
          stageId,
          tokenId,
        }
      })
      console.log({_stToken});
      revalidateTag('stages')
      revalidateTag('space')
      return { success: true, message: JSON.stringify(_stToken) }
  
} catch (error: unknown) {
    return { success: false, message: JSON.stringify(error) }
  }
}
export const addGuestToStage = async ({
  stageId,
  tokenId,
}: {
  stageId: string,
  tokenId: number,
  
}) => {
  console.log({
    stageId,
    
    tokenId
  });
  try {
      const _stToken =  await prisma.guestStage.upsert({
        where: {
          tokenId_stageId:{
            tokenId: tokenId,
            stageId: stageId,
            }},
          create: {
            stageId,
            tokenId,
          },
          update: {
            stageId,
            tokenId,
          }
        }) 
        revalidateTag('stages')
        revalidateTag('space')
        return { success: true, message: JSON.stringify(_stToken) }

    
} catch (error: unknown) {
    return { success: false, message: JSON.stringify(error) }
  }
}
export const getSpaceGrids = memoize(async () => {

  try {
    const grids:SpaceMenuType[] = [];
    const querySnapshot = await dbFirestore.collection('grids').orderBy('souraNb').get();
    querySnapshot.forEach((doc: any) => {
      
      const {
        title,
        souraNb,
        souraName,
        arabName
       } = doc.data()
        grids.push({
        title,
        arabName,
        souraNb:parseInt(souraNb.toString()),
        souraName,
      });
    });

    if (typeof grids !== 'undefined' && grids.length > 0) {
      const uniqGrids = _.uniqBy(grids, 'souraNb')
      const sortedGrids = _.sortBy(uniqGrids, ['souraNb'])
      console.log({sortedGrids});
      
      return sortedGrids as SpaceMenuType[]
    } else {
      return
    }
  } catch (err) {
    console.log({ err });
    return
  }
}, {
  persist: true,
  revalidateTags: ['space'],
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'spaceMenu'
}
)
export const getInsightTemplateByNb = memoize(async (souraNb: number) => {

  try {
    const templates:TemplateTypeData[] = [];
 console.log({souraNb});
 
    const templatesRef =  dbFirestore.collection('templates')
   const templateSnapshot = await templatesRef.where('souraNb', '==', souraNb).get();
  if(templateSnapshot.empty){
return {success: false, templates: 'No template'}
 
  }
  //console.log({templateSnapshot});
  
   await templateSnapshot.forEach((doc: any) => {
      
      const {ayahs,souraNb,souraName,arabName} = doc.data()
 templates.push({ayahs,souraNb,souraName,arabName})   
    });
return {success: true, templates: JSON.stringify(templates)}
      
    
  } catch (err) {

    console.log({ err });
    return {success: false, templates: JSON.stringify(err)}

  }
}, {
  persist: true,
  revalidateTags: (souraNb)  =>[`insight-${souraNb}`],
  log: ['datacache', 'verbose', 'dedupe'],
  logid:  `insight`
}
)
export const getLocalStagesByNb = async (souraNb: number) => {

  try {
    
  const stages = await prisma.stage.findMany({
    where: {souraNb: souraNb}, select:{
stageId:true, souraNb: true,      grid: true,group:true, arabName:true, souraName: true
    }})
 console.log({souraNb, stages });
  return {success: true,stages:  JSON.stringify(stages) };
  } catch (err) {
    console.log({ err });
    return
  }
}
export const getStageById = async (stageId: string) => {

  try {
    
  const stageAyahs = await prisma.stage.findFirst({
    where: {stageId}, select:{
ayahs: true
    }})
 //console.log({stageAyahs });
  return {success: true,stage:  stageAyahs?.ayahs as unknown as string };
  } catch (err) {
    console.log({ err });
    return {success: false,stage:  JSON.stringify(error) };
  }
}