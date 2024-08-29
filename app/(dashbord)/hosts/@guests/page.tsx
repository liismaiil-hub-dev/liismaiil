
import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import { SprintType } from "@/api/graphql/stage/stage.types";

import Sprints from "@/components/space/Sprints";

import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';

import { Button } from '@nextui-org/react';

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

  if(typeof sprints != 'undefined' && sprints?.length > 0)return <Sprints sprints={sprints} />
  return   (
   <Button  type="submit"  className='btn bg-blue-400
             text-yellow-100  text-center text-xl p-2 h-full
              rounded-md'>
      No sprint projected
    </Button>)
}
