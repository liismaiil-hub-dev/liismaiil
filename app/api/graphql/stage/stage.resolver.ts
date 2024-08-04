import { Firestore } from 'firebase-admin/firestore';
import { STAGE_CATEGORY_ENUM, StageTypeData } from './stage.types';

const stages = async (_: undefined, __: undefined, { dbFirestore }: { dbFirestore: Firestore }): Promise<Array<StageTypeData> | null> => {
  try {
    const stages: Array<StageTypeData> | null = [];
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

const stagesById = async (
  _: undefined,
  { id }: { id: number },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<Array<StageTypeData> | null> => {
  try {
    const stages: Array<StageTypeData> = [];
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
): Promise<Array<StageTypeData> | null> => {
  try {
    const stages: Array<StageTypeData> = [];
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
): Promise<StageTypeData | null> => {
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
  { input }: { input: StageTypeData },
  {
    dbFirestore,
    slug,
    timeStamp
  }: { dbFirestore: Firestore; slug: (arg: string) => string; storageRef: any; currentProfile: any; timeStamp: any; req: any }
): Promise<StageTypeData | undefined> => {
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


const ProductResolver = {
  Query: {
    stages,
    stagesById,
    stagesByCategory,
    stagesByToken
  },
  Mutation: {
    addStage,
  }
};
export default ProductResolver;
