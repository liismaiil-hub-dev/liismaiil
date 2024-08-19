import { DateTimeResolver } from 'graphql-scalars';

import {
  AddGuestInput,
  GuestType,
  PromoteStageInput
} from '@/api/graphql/stage/stage.types';
import { FlagTokenType, PROFILE_STATUS_ENUM } from '@/api/graphql/profile/profile.types';
import { DocumentData, DocumentReference, DocumentSnapshot, FieldValue, Firestore } from 'firebase-admin/firestore';
//import { FirebaseError } from '@firebase/util';
const guest = async (
  _: undefined,
  { id }: { id: string },
  {
    dbFirestore
  }: {
    dbFirestore: Firestore;
  }
): Promise<GuestType | undefined> => {
  if (id) {
    try {
      const dbGuests = dbFirestore.collection('guests');
      const guestRef: DocumentReference = await dbGuests.doc(id);
      const guestSnapshot = await guestRef.get();
      if (guestSnapshot.exists) {
        if (guestSnapshot?.data()?.status === 'HOST') {
          return { ...guestSnapshot.data(), status: PROFILE_STATUS_ENUM.GUEST } as GuestType;
          /* 
            startDate: new Date().toISOString(),
            endDate: new Date(moment(new Date()).add(1, 'months')).toISOString(),
*/
        } else {
          return { ...guestSnapshot.data() } as GuestType;
        }
      } else {
        return undefined;
      }
    } catch (error: any) {
      throw error;
    }
  } else {
    return undefined;
  }
};

const guests = async (
  _: undefined,
  __: undefined,
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<GuestType[] | undefined> => {
  try {
    //console.log({ firestore });
    const snapshot = await dbFirestore.collection('guests').get();

    const guests: GuestType[] = [];
    snapshot.forEach(async (doc: DocumentSnapshot<GuestType | DocumentData>) => {
      const guest = await doc?.data()!;
      guests.push(guest as GuestType);
    });
    console.log({ guests })

    return guests;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
};
//Mutations

const addGuest = async (
  _: undefined,
  { input }: { input: AddGuestInput },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<GuestType | undefined> => {
  try {
    const { collaboratorId, flag, host, status, tokenId, startDate } = input;
    const guestSnapshot = await dbFirestore.collection('guests').doc(`${tokenId}`).get();
    if (guestSnapshot.exists) {
      const { collaboratorId, host } = guestSnapshot.data() as GuestType;
      if (typeof host === 'undefined' || typeof collaboratorId === 'undefined') {
        dbFirestore.collection('profiles').doc(`${tokenId}`).set({ collaboratorId, flag, host, status, tokenId, startDate }, { merge: true });
        return { collaboratorId, flag, host, status, tokenId, startDate };
      }
    } else {
      dbFirestore.collection('profiles').doc(`${tokenId}`).set({ collaboratorId, flag, host, status, tokenId, startDate }, { merge: true });
      return { collaboratorId, flag, host, status, tokenId, startDate };
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

const updateGuest = async (
  _: undefined,
  { input }: { input: GuestType },
  { dbFirestore, timeStamp }: { dbFirestore: Firestore; timeStamp: unknown }
): Promise<GuestType | undefined> => {
  try {
    const { tokenId, host, collaboratorId, stages, sprints } = input;

    const updatedAt = timeStamp;
    const docRef = dbFirestore.collection('guests').doc(`${tokenId}`);
    docRef
      .get()
      .then((snapshot: any) => {
        if (snapshot.exists) {
          return docRef
            .set({ host, collaboratorId, stages, sprints }, { merge: true })
            .then(() => {
              return { tokenId, host, collaboratorId, stages, sprints }
            })
            .catch((error: any) => {
              throw new Error(error);
            });
        } else {
          throw new Error('can t find profile in database');
        }
      })
      .catch((error: any) => {
        throw new Error(error);
      });
    return {
      tokenId, host, collaboratorId, stages, sprints
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const flagToken = async (
  _: undefined,
  __: undefined,
  { genRandomFlagUrl, nanoid }: { genRandomFlagUrl: () => string; nanoid: (arg: number) => string }
): Promise<FlagTokenType | undefined> => {
  try {
    const token = nanoid(11);
    const flag = await genRandomFlagUrl();

    console.log(flag, token);
    return { flag, token };
  } catch (error) {
    return { flag: '', token: '' };
  }
}
const signOut = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean } | undefined> => {
  try {
    await dbFirestore.collection('guests').doc(`${id}`).update({
      online: false
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw `${error.message} occurs`;
    }
    throw new Error(error);
  }
};
const promoteStages = async (
  _: undefined,
  { input }: { input: PromoteStageInput },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean } | undefined> => {
  const { stage, category } = input;
  try {
    return dbFirestore
      .collection('stages')
      .doc(`${stage}`)
      .update({
        categories: FieldValue.arrayUnion(category)

      })
      .then((doc) => {
        console.log({ doc });
        return { success: true };
      });
  } catch (error: any) {
    throw new Error(error);
  }

};


const guestResolver = {
  DateTime: DateTimeResolver,

  Query: {
    guest,
    guests,
    flagToken,
    signOut
  },
  Mutation: {
    addGuest,
    updateGuest,
    promoteStages,
  }
};
export default guestResolver