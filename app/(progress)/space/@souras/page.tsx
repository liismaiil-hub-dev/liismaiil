'use server'
import { dbFirestore } from '@/app/api/graphql/fb-utils-admin';
import { GridMenu } from '@/app/api/graphql/stage/stage.types';
import { GridTypeData } from '@/app/api/graphql/tablet/tablet.types';
import GridsComponent from "@/components/space/Grids";
import _ from 'lodash';
import { memoize } from "nextjs-better-unstable-cache";

export const getSpaceGrids = memoize(async () => {

  try {
    const grids: GridTypeData[] = [];
    const querySnapshot = await dbFirestore.collection('grids').orderBy('souraNb').get();
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
    });
    if (typeof grids !== 'undefined' && grids.length > 0) {
      const souraName = await grids.map((gr: GridTypeData) => {
        return { souraName: gr.arabName, souraNb: parseInt(gr.souraNb.toString()) };
      })
      const uniqGrids = _.uniqBy(souraName, 'souraNb')
      const sortedGrids = _.sortBy(uniqGrids, ['souraNb'])
      return sortedGrids as GridMenu[]
    } else {
      return
    }
  } catch (err) {
    console.log({ err });
    return
  }
}, {
  persist: true,
  revalidateTags: () => ['space'],
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'spaceMenu'
}
)
export default async function SourasNav() {
  const grids = await getSpaceGrids()
 // console.log({ gridsSouraNav: grids });

  try {
    if (typeof grids !== 'undefined' && grids.length > 0) {
      return (
        <GridsComponent grids={grids} />
      )
    }

  } catch (error) {
    throw error
  }
}

