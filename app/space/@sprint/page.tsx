
import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import { SprintType } from "@/api/graphql/stage/stage.types";

import Sprints from "@/components/space/Sprints";

import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';


const getSprints = async (): Promise<SprintType[] | undefined> => {
try{
  

    //console.log({ firestore });
    const snapshot = await dbFirestore.collection('sprints').get();

    const sprints: SprintType[] = [];
    snapshot.forEach(async (doc: DocumentSnapshot<SprintType | DocumentData>) => {
      const guest = await doc?.data()!;
      sprints.push(guest as SprintType);
    });

    return sprints;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
}

export default async function Sprint() {
  const sprints = await getSprints()
console.log({sprints});

  return (<div id="sprint" className="flex flex-col justify-start items-center gap-3 md:w-full mt-10  h-full " >
    {(typeof sprints != 'undefined' && sprints?.length > 0) &&

      <Sprints sprints={sprints} />
    }
  </div>
  )
}
