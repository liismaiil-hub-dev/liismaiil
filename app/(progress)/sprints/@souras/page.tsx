
import GridModel from '@/api/graphql/sprint/Grid.model';
import { GridType } from '@/api/graphql/sprint/sprint.types';
import GridsComponent from "@/components/stage/Grids";
import connectMongoose from "@/lib/mongoose-db";
import { APP_ENV } from '@/store/constants/constants';

import _ from 'lodash';

const getGrids = async (): Promise<{ souraName: string, souraNb: number }[] | undefined> => {
  if (process.env.APP_ENV === APP_ENV.BOX) {
    await connectMongoose()

    try {
      const grids: GridType[] = await GridModel.find({ author: '3jtczfl93BWlud2t3Q44KdC0EVJ3' }).select({ "_id": 0 }).sort({ souraNb: 1 }).lean().exec();

      if (typeof grids !== 'undefined' && grids.length > 0) {
        console.log(
          { grids }
        );

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
  } else {
  }
}
export default async function SourasNav() {
  const grids = await getGrids()
  if (typeof grids !== 'undefined' && grids.length > 0) {
    //console.log({ grids });

    return (
      <GridsComponent grids={grids} />


    )
  } else {
    return (<GridsComponent grids={['']} />)

  }
}

