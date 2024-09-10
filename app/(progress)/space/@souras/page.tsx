
import GridModel from '@/api/graphql/sprint/Grid.model';
import { Ayah, GridType } from '@/api/graphql/stage/stage.types';
import GridsComponent from "@/components/stage/Grids";
import connectMongoose from "@/lib/mongoose-db";

import _ from 'lodash';

const getGrids = async (): Promise<{ souraName: string, souraNb: number }[] | undefined> => {
  await connectMongoose()

  try {
    const grids: GridType[] = await GridModel.find({ author: '3jtczfl93BWlud2t3Q44KdC0EVJ3' }).sort({ souraNb: 1 }).lean().exec();

    if (typeof grids !== 'undefined' && grids.length > 0) {
      //console.log({grids});

      const souraName = grids.map((gr: GridType) => {
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
    //console.log(`grids stages ${grids}` );
    return (
        <GridsComponent grids={grids} />
     )
  } else {
    return (<GridsComponent grids={['']} />)

  }
}

