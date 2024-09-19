
import { dbFirestore } from '@/app/api/graphql/fb-utils-admin';
import { GridTypeData } from '@/app/api/graphql/tablet/tablet.types';
import GridsComponent from "@/components/stage/Grids";

import _ from 'lodash';

const getGrids = async (): Promise<{ souraName: string, souraNb: number }[] | undefined> => {

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
      //console.log({ grids });

      const souraName = grids.map((gr: GridTypeData) => {
        return { souraName: gr.arabName, souraNb: parseInt(gr.souraNb.toString()) };
      })
      const uniqGrids = _.uniqBy(souraName, 'souraNb')
      const sortedGrids = _.sortBy(uniqGrids, ['souraNb'])
      return sortedGrids as [{ souraName: string, souraNb: number }]
    } else {
      return
    }
  } catch (err) {

    console.log({ err });
    return
  }
}
export default async function SourasNav() {
  const grids = await getGrids()
  if (typeof grids !== 'undefined' && grids.length > 0) {
    console.log(`grids ${grids}`);
    return (
      <GridsComponent grids={grids} />
    )
  } else {
    return (<GridsComponent grids={['']} />)

  }
}

