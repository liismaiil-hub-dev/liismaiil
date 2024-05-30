import { DateTimeResolver } from 'graphql-scalars';
import {
  
  EventTypeData,
  PROFILE_STATUS_ENUM,
  SigninViewerInput, ViewerTypeData,
} from './viewer.types';
import { GuestType } from '../sprint/sprint.types';




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
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<GuestType> } | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('guests').lean().exec();
    if (enrollments && enrollments.length > 0) {
      return { success: true, message: enrollments }
    } else {
      return ({
        success: false, message: [{
          title: '',

          token: '',
          profileEmail: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS_ENUM.GUEST,
        }]
      })
    }
  } catch (error: any) {
    throw error;
  }
};

const frontCollaborators = async (
  _: undefined,
  __: undefined,
  { ViewerModel }: { ViewerModel: any }
): Promise<ViewerTypeData[] | undefined> => {
  try {
    const collaborators = await ViewerModel.find({ status: { $in: [PROFILE_STATUS_ENUM.ORGA, 
      PROFILE_STATUS_ENUM.LIIS, PROFILE_STATUS_ENUM.LIBRARY,
       PROFILE_STATUS_ENUM.ADMIN] } }).lean().exec();
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
  DateTime: DateTimeResolver,
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
