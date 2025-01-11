'use server'
import prisma from '@/api/lib/prisma-db';
import { memoize } from "nextjs-better-unstable-cache";

import { revalidateTag } from 'next/cache';
import { SpaceMenuType, StagePrismaType } from '@/app/api/graphql/stage/stage.types';
import { GridMenu } from '@/app/api/graphql/stage/stage.types';
import { dbFirestore } from '@/app/api/graphql/fb-utils-admin';
import _ from 'lodash';

export const getAllStagesForDashboard = memoize(async () => {

  const stages = await prisma.stage.findMany({
    orderBy: {souraNb: 'asc'},include:{guests:{orderBy:{tokenId:'asc'}}}
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
    
    const _stage = await prisma.stage.findFirstOrThrow({
      where:{stageId},
      }
    )
  if(_stage  && typeof _stage !== 'undefined') {
      return {sucess: true, stage:_stage}
  }else {
    return {sucess: false, stage:null}
    }} catch (error) {
      return {sucess: false, error}
    }
  }, {
    duration:60,
    persist: true,
    additionalCacheKey: ['sprint'],
    revalidateTags: ['stages'],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'sprint'
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
export const getLocalStagesByNb = async (souraNb: number) => {

  try {
    
  const stages = await prisma.stage.findMany({
    where: {souraNb: souraNb}})
 console.log({souraNb, stages });
  return {success: true,stages:  JSON.stringify(stages) };
  } catch (err) {
    console.log({ err });
    return
  }
}