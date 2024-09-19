import { GuestType } from '@/api/graphql/stage/stage.types';
import {
  PROFILE_STATUS_ENUM,
  ViewerTypeData,
} from '@/api/graphql/viewer/viewer.types';
import { Firestore } from 'firebase-admin/firestore';



export const viewer = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<ViewerTypeData | undefined> => {
  try {
    const viewer = await ViewerModel?.findOne({
      email
    }).lean().exec();
    return viewer
  } catch (error: any) {
    throw error;
  }
};

export const viewerById = async (
  _: undefined,
  { id }: { id: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<ViewerTypeData | undefined> => {
  try {
    const viewer = await ViewerModel?.findOne({
      _id: id
    }).lean().exec();
    return { ...viewer, _id: viewer._id }
  } catch (error: any) {
    throw error;
  }
};


export const getGuests = async (
  _: undefined,
  { collaboratorId }: { collaboratorId: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<GuestType[] | undefined> => {
  try {
    //console.log({ firestore });

    const guests: GuestType[] = [];
    return dbFirestore
      .collection('guests').where('collaboratorId', '==', `${collaboratorId}`)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          guests.push({ id: doc.id, ...doc.data() });
        });
        return guests;
      });
    return guests;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
};

const frontCollaborators = async (
  _: undefined,
  __: undefined,
  { ViewerModel }: { ViewerModel: any }
): Promise<ViewerTypeData[] | undefined> => {
  try {
    const collaborators = await ViewerModel.find({
      status: {
        $in: [PROFILE_STATUS_ENUM.ORGA,
        PROFILE_STATUS_ENUM.LIIS, PROFILE_STATUS_ENUM.LIBRARY,
        PROFILE_STATUS_ENUM.ADMIN]
      }
    }).lean().exec();
    return collaborators
  } catch (error: any) {
    console.log({ error });
    throw error;
  }
};



const getQrCode = async (
  _: undefined,
  { url, QRCode }: { url: string, QRCode: any }): Promise<{ qrCodeUrl: string } | undefined> => {
  try {

    const qrCodeUrl = await QRCode.toDataURL(url)

    return {
      qrCodeUrl
    }
  } catch (error: any) {

    throw error;
  }
};

const Viewer = {
  loginSlug: async (viewer: ViewerTypeData, _: undefined, { slug }: { slug: (arg: string) => string }): Promise<string | undefined> => {
    return slug(viewer.login)
  },

}
// eslint-disable-next-line no-undef
const viewerResolver = {
  Viewer,
  Query: {
    viewer,
    viewerById,

    getGuests,

    frontCollaborators,
    //getQrCode
  },

}

export default viewerResolver
