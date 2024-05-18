import { DateTimeResolver } from 'graphql-scalars';
import {
  HostTypeData
} from './host.types';




export const host = async (
  _: undefined,
  { email }: { email: string },
  { HostModel }: { HostModel: any }
): Promise<HostTypeData | undefined> => {
  try {
    const host = await HostModel?.findOne({
      email
    }).lean().exec();
    return host
  } catch (error: any) {
    throw error;
  }
};

export const hostById = async (
  _: undefined,
  { id }: { id: string },
  { HostModel }: { HostModel: any }
): Promise<HostTypeData | undefined> => {
  try {
    const host = await HostModel?.findOne({
      _id: id
    }).lean().exec();
    return { ...host, _id: host._id }
  } catch (error: any) {
    throw error;
  }
};


const hosts = async (
  _: undefined,
  __: undefined,
  { HostModel }: { HostModel: any }
): Promise<HostTypeData[] | undefined> => {
  try {
    const hosts = await HostModel.find({}).limit(50).lean().exec();
    return hosts
  } catch (error: any) {
    console.log({ error });
    throw error;
  }
};

export const getGuests = async (
  _: undefined,
  { token }: { token: string },
  { HostModel }: { HostModel: any }
): Promise<{ success: boolean, guests: string } | undefined> => {
  try {
    const guests = await HostModel.findOne({
      token
    }).select('guestProfiles').lean().exec();
    return { success: true, guests: JSON.stringify(guests) }
  } catch (error: any) {
    throw error;
  }
};

const notifySite = async (
  _: undefined,
  { email }: { email: string },
  { HostModel, }:
    {
      HostModel: any,
    }): Promise<{ success: boolean } | undefined> => {
  try {
    return HostModel.findOne({ email: "kazdhicham@gmail.com" }).then((doc) => {
      if (doc?.notif.length !== 0) {
        const exists = doc.notifError.filter(registred => registred.email === email)


        if (exists.length === 0) {
          doc.notif = [...doc.notifError, { email, date: new Date() }]

          doc.save()
          return { success: true }
        } else {

          return { success: true }

        }
      } else {

        doc.notif = [{ email, date: new Date() }]
        doc.save()
        return { success: true }
      }
    }).catch((error) => {
      return { success: false }

    })
  } catch (error: any) {
    throw error
  }
}


// eslint-disable-next-line no-undef
const hostResolver = {
  DateTime: DateTimeResolver,
  Query: {
    host,
    hostById,
    hosts,

  },
  Mutation: {
    notifySite,

  },
}
export default hostResolver