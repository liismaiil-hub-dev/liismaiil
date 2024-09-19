import { GuestRegisterSchema } from "@/api/graphql/tools";
import { PrismaClient } from '@prisma/client';
import { Firestore } from 'firebase-admin/firestore';
import { LIISMAIIL_STATUS_ENUM } from '../profile/profile.types';
import { GridTypeData } from '../tablet/tablet.types';
import { AddGuestPrismaInput, AddGuestPrismaOutput, GuestPrismaType, STAGE_CATEGORY_ENUM, StagePrismaType } from './stage.types';


const stages = async (_: undefined, __: undefined, { dbFirestore }: { dbFirestore: Firestore }): Promise<Array<StagePrismaType> | null> => {
  try {
    const stages: Array<StagePrismaType> | null = [];
    const querySnapshot = await dbFirestore.collection('stages').orderBy('createdAt', 'desc').get();
    querySnapshot.forEach((doc: any) => {
      stages.push({ id: doc?.id, ...doc?.data() });
    });
    return stages;
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};
const getGridsByNb = async (
  _: undefined,
  { souraNb }: { souraNb: number },
  { dbFirestore }: { dbFirestore: Firestore, _lodash: { filter: any } }
): Promise<{
  success: boolean, grids: Array<GridTypeData>
} | undefined> => {
  try {
    const grids: GridTypeData[] = [];
    console.log({ souraNb });

    const querySnapshot = await dbFirestore.collection('grids').where('souraNb', '==', souraNb).orderBy('grid').get();
    querySnapshot.forEach((doc: any) => {
      //console.log({ doc });

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
};
const hostsForDashboard = async (_: undefined, __: undefined, { prisma }: { prisma: PrismaClient }): Promise<Array<GuestPrismaType> | null> => {
  try {
    const hosts = await prisma.guest.findMany({ where: { status: LIISMAIIL_STATUS_ENUM.HOST } })
    return hosts
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const stagesById = async (
  _: undefined,
  { id }: { id: number },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<Array<StagePrismaType> | null> => {
  try {
    const stages: Array<StagePrismaType> = [];
    return dbFirestore
      .collection('stages')
      .where('id', '==', `${id}`)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          stages.push({ id: doc.id, ...doc.data() });
          /*   console.log({ productDoc: doc.data() }) */
        });

        return stages;
      });
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const stagesByToken = async (
  _: undefined,
  { token }: { token: number },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<Array<StagePrismaType> | null> => {
  try {
    const stages: Array<StagePrismaType> = [];
    return dbFirestore
      .collection('stages')
      .where('authorId', '==', `${token}`)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          stages.push({ id: doc.id, ...doc.data() });
        });
        return stages;
      });
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const stagesByCategory = async (
  _: undefined,
  { category }: { category: STAGE_CATEGORY_ENUM },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<StagePrismaType | null> => {
  try {
    return dbFirestore
      .collection('stage')
      .where('categories', 'array-contains', category)
      .get()
      .then((snapshot: any) => ({
        id: snapshot.id,
        ...snapshot.data()
      }));
  } catch (error: any) {
    throw error;
  }
};

// Mutations

const addStage = async (
  _: undefined,
  { input }: { input: StagePrismaType },
  {
    dbFirestore,
    slug,
    timeStamp
  }: { dbFirestore: Firestore; slug: (arg: string) => string; storageRef: any; currentProfile: any; timeStamp: any; req: any }
): Promise<StagePrismaType | undefined> => {
  const { authorId, id, title, sprints, grids, published, categories } = input;
  const titleSlug = slug(title);
  const createdAt = timeStamp;
  const stage = {
    title,
    titleSlug,
    authorId, id, sprints, grids, published, categories,
    createdAt,

  };
  try {
    const docRef = dbFirestore.collection('stages').doc();
    await docRef
      .get()
      .then((snapshot: any) => {
        if (snapshot.exists) {
          docRef.set({ ...stage });
        }
      })
      .catch((error: any) => {
        throw new Error(error);
      });
    return { authorId, id, title, sprints, grids, published, categories }
  } catch (error: any) {
    throw error;
  }
};
/**@todo modify to prisma */
const addStagePrisma = async (
  _: undefined,
  { input }: { input: StagePrismaType },
  {
    dbFirestore,
    slug,
    timeStamp
  }: { dbFirestore: Firestore; slug: (arg: string) => string; storageRef: any; currentProfile: any; timeStamp: any; req: any }
): Promise<StagePrismaType | undefined> => {
  const { authorId, id, title, sprints, grids, published, categories } = input;
  const titleSlug = slug(title);
  const createdAt = timeStamp;
  const stage = {
    title,
    titleSlug,
    authorId, id, sprints, grids, published, categories,
    createdAt,

  };
  try {
    const docRef = dbFirestore.collection('stages').doc();
    await docRef
      .get()
      .then((snapshot: any) => {
        if (snapshot.exists) {
          docRef.set({ ...stage });
        }
      })
      .catch((error: any) => {
        throw new Error(error);
      });
    return { authorId, id, title, sprints, grids, published, categories }
  } catch (error: any) {
    throw error;
  }
};


const addGuestPrisma = async (
  _: undefined,
  { input }: { input: AddGuestPrismaInput },
  { registerPrisma, dbFirestore }: { registerPrisma: (arg: any) => any, dbFirestore: Firestore; }
): Promise<AddGuestPrismaOutput | undefined> => {
  try {
    // console.log({ input });
    const { collaboratorId, host, country, password, tokenId, } = input;
    const data = GuestRegisterSchema.parse({ tokenId, host, country, password, collaboratorId })
    // console.log({ data });

    try {

      const docRef = dbFirestore.collection('guests').doc(`${data.tokenId}`);
      const snapshot = await docRef.get();
      if (snapshot.exists) {
        const { success, tokenId, country, host, flag, status } = await registerPrisma({ ...data, collaboratorId: collaboratorId ? collaboratorId : 'O6cKgXEsuPNAuzCMTGeblWW9sWI3', status: LIISMAIIL_STATUS_ENUM.HOST })
        if (success) {
          return ({ tokenId, country, host, success, flag, status })
        } else {
          return {
            tokenId, country, host, success, flag, status
          }
        }
      } else {
        const { success, tokenId, country, host, flag, status } = await registerPrisma({ ...data, collaboratorId: collaboratorId ? collaboratorId : 'O6cKgXEsuPNAuzCMTGeblWW9sWI3', status: LIISMAIIL_STATUS_ENUM.GUEST })

        if (success) {
          return ({ tokenId, country, host, success, flag, status })
        } else {
          return {
            tokenId, country, host, success, flag, status
          }
        }
      }


    } catch (e) {
      console.error(e)
      return {

        tokenId: -1,
        host: -1,
        flag: '',
        success: false,
        country: '',
        status: ''
      }
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

const updateGuestPrisma = async (
  _: undefined,
  { input }: { input: AddGuestPrismaInput },
  { dbFirestore, timeStamp }: { dbFirestore: Firestore; timeStamp: unknown }
): Promise<GuestPrismaType | undefined> => {
  try {
    const { tokenId, host, collaboratorId, country } = input;

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


const ProductResolver = {
  Query: {
    stages,
    getGridsByNb,
    hostsForDashboard,
    stagesById,
    stagesByCategory,
    stagesByToken
  },
  Mutation: {
    addStage,
    addStagePrisma,
    addGuestPrisma,
  }
};
export default ProductResolver;
