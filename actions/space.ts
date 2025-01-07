'use server'
import { dbFirestore } from '@/app/api/graphql/fb-utils-admin';
import { GridTypeData } from '@/app/api/graphql/stage/stage.types';
import _ from 'lodash';
import { memoize } from "nextjs-better-unstable-cache";

export const getGridsByNb =  memoize(async (souraNb: number) => {
      const grids: GridTypeData[] = [];
      console.log({ souraNb });
        try {
            const querySnapshot = await dbFirestore.collection('grids').where('souraNb', '==', souraNb).orderBy('grid').get();
            querySnapshot.forEach((doc: any) => {
              const {
                title,
                souraNb,
                author,
                arabName,
                souraName,
                description,
                grid,
                group,
                ayahs, } = doc.data()
              grids.push({
                title,
                souraNb,
                author,
                arabName,
                souraName,
                description,
                grid,
                group,
                ayahs,
              });
            })
            return { success: true, grids: grids as Array<GridTypeData> }
          } catch (error: unknown) {
            throw error;
          }
        }, {
          duration:60,
          persist: true,
          additionalCacheKey: ['spaceGrids'],
          revalidateTags: ['space'],
          suppressWarnings: true,
          log: ['datacache', 'verbose', 'dedupe'],
          logid: 'spaceGrids'
        })
      
  