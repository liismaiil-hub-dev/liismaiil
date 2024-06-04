
import GridModel from '@/api/graphql/sprint/Grid.model';
import { GridType } from "@/api/graphql/sprint/sprint.types";

import Sprints from "@/components/space/Sprints";

import { APP_ENV } from '@/store/constants/constants';


const getSprints = async (): Promise<GridType[] | undefined> => {

  try {
    const sprints = await GridModel.find({ author: 'O6cKgXEsuPNAuzCMTGeblWW9sWI3' }).sort({ souraNb: 1 }).lean().exec();
    if (typeof sprints !== 'undefined' && sprints.length > 0) {
      return sprints
    } else {
      return;
    }
  } catch (error: unknown) {
    throw error;
  }
}

export default async function Sprint() {
  const sprints = await getSprints()

  return (<div id="sprint" className="flex flex-col justify-start items-center gap-3 md:w-full mt-10  h-full " >
    {(process.env.APP_ENV === APP_ENV.WEB) &&

      <Sprints sprints={sprints} />
    }
  </div>
  )
}
