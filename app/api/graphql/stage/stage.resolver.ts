
import { GuestType, LIISMAIIL_STATUS_ENUM, ProfileTypeData } from './../profile/profile.types';
import { GuestRegisterSchema } from "@/api/graphql/tools";
import { PrismaClient } from '@prisma/client';
import { Firestore } from 'firebase-admin/firestore';
import { GridTypeData } from '../stage/stage.types';
import { AddGuestPrismaInput, GuestPrismaType, SignInPrismaInput, STAGE_CATEGORY_ENUM, StagePrismaType, SuccessMessageOutput } from './stage.types';


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
  { prisma, moment, dbFirestore }: 
  {  prisma: PrismaClient,  moment: () => any, dbFirestore: Firestore }
): Promise<SuccessMessageOutput | undefined> => {
  
    
    const { collaboratorId, host, country, password, tokenId,guestPassword } = input;
    const data = GuestRegisterSchema.parse({ tokenId, host, country, password, collaboratorId })
    try {
      if(data.tokenId > 1000  && data.host != 0){
      const docRef = dbFirestore.collection('guests').doc(`${data.tokenId}`);
      const snapshot = await docRef.get();
      if (snapshot.exists) {
        const { tokenId, host,country  } = snapshot.data()as GuestType; 
       console.log({ host: data.host , 
           tokenId: data.tokenId,
           password: data.password,
          
           guestPassword,
           startDate:new Date().toISOString(),
            collaboratorId:collaboratorId ?? 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
             country: data.country,
             status: LIISMAIIL_STATUS_ENUM.GUEST , 
             flag:`${(data.country).toLowerCase}.png`,
             
             endDate:  new Date(moment().add(3, 'months').toISOString()).toISOString() 
       });
        const _newGuest=  await prisma.guest.create({
               data:{ host: data.host , 
                tokenId: data.tokenId,
                password: data?.password,
                guestPassword: guestPassword,
                startDate:new Date().toISOString(),
                 collaboratorId:collaboratorId ?? 'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
                  country: data.country,
                  status: LIISMAIIL_STATUS_ENUM.GUEST , 
                  flag:`${(data.country).toLowerCase}.png`,
                  endDate:  new Date(moment().add(3, 'months').toISOString()).toISOString() ,
                  /* sprints:[{sprintId:`sprint-${data.tokenId}`}],
                  stages:[{stageId:`stage-${data.tokenId}`}],
                  favorites:[{stageId:`stage-${data.tokenId}`}],               */  }
              })
              return {success: true, message:JSON.stringify(_newGuest) } 
        } else {
        return{success:false, message:'this tokenId is not provided'}
        }
    }else {
      if(data.host === 0  && data.tokenId  < 1000  ){
        const profilesRef = dbFirestore.collection('profiles');
        const snapshot = await  profilesRef.where('tokenId', '==', data.tokenId).orderBy('tokenId').limit(1).get();
        if (snapshot.empty) {
        return{success:false, message:'this tokenId is not provided'}
        }
        snapshot.forEach(async (doc) => {
          
              const {updatedAt }  = doc.data() as ProfileTypeData; 
              //const hashedPass = await hashPassword(data.password) as string;
              console.log({ docId: doc.id, data:doc.data(),  updatedAt}) ;
              const _flag = data.country.toLowerCase()
            try {
              console.log({ host: data.host , 
                tokenId: data.tokenId,
                password: data.password,
                guestPassword: guestPassword,
                startDate:updatedAt ? new Date(updatedAt).toISOString(): new Date().toISOString(),
                 collaboratorId:doc.id,
                 country: data.country,
                 status: LIISMAIIL_STATUS_ENUM.HOST , 
                 flag:`${_flag}.png`,
                 endDate:  new Date(moment().add(3, 'months').toISOString()).toISOString() 
               });
              const _newGuest=  await prisma.guest.create({
                      data:{ host: data.host , 
                       tokenId: data.tokenId,
                       password: data.password,
                       guestPassword: guestPassword,
                       startDate:updatedAt ? new Date(updatedAt).toISOString(): new Date().toISOString(),
                        collaboratorId:doc.id,
                        country: data.country,
                        status: LIISMAIIL_STATUS_ENUM.HOST , 
                        flag:`${_flag}.png`,
                        endDate:  new Date(moment().add(3, 'months').toISOString()).toISOString() },
                      })
              console.log({  _newGuest}) ;
                return {success: true, message:JSON.stringify(_newGuest) } 
              } catch (error) {
              console.log({error});
              
                return {success:false,message:`You can not register to rooming db ${error}`}
              }
        
      })
    }else {
      return ({success: false, message: 'you can not register with that tokenId' })}
    } 
  }catch (e) {
    return ({success: false, message: `you cant register with that tokenId due to ${e}` })
  }
 
};

const signInPrisma = async (
  _: undefined,
  { input }: { input: SignInPrismaInput },
  { prisma,  verifyPassword }: { prisma: PrismaClient, verifyPassword:(arg: string, arg2: string ) => boolean}
): Promise<SuccessMessageOutput | undefined> => {
  try {
    const { tokenId, host, password,  country } = input;
    const _signed: GuestPrismaType = prisma.guest.findFirst({where:{
      tokenId
    }})
    // (passwordAttempt: string, hashedPassword: string) => {
    if(_signed.password === password){
        console.log({_signed});
    const _signedUpdated = await prisma.guest.update({
      where:{tokenId},data:{onLine:true}
    })
        return({success:true, message:JSON.stringify(_signedUpdated)})
      } else {
        return({success:false, message: 'Sorry you can not signin'})

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
    signInPrisma,
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
