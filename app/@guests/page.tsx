'use server'
import ViewerModel from '@/api/graphql/viewer/Viewer.model';
import { ViewerTypeData } from '@/api/graphql/viewer/viewer.types';
import GuestsComp from "@/components/front/Guests";
//import MapComponent from '@/components/maps/MapComponent';
import connectMongoose from '@/lib/mongoose-db';

import { APP_ENV } from '@/store/constants/constants';
import { promises as fs } from 'fs';

export default async function Guests() {
  const guests = await getGuests()
  if (process.env.APP_ENV === APP_ENV.BOX) {

    const parsedGuests = JSON.parse(guests)
  //console.log({ guests });

    return (
      <main className=" flex flex-col justify-start items-center" >
        <GuestsComp guests={parsedGuests} />
      </main>

    )
  } else {
    return (
      <main className="flex flex-col justify-start items-center" >
        <GuestsComp guests={guests} />
      </main>

    )
  }

}

async function getGuests() {
  if (process.env.APP_ENV === APP_ENV.BOX) {
    try {

      const guests = await fs.readFile(process.cwd() + '/store/shares/guests.json', 'utf8');
      return guests
    } catch (error) {
      console.log(error);
      return `[]`
    }
  }
  await connectMongoose()
  const organisations: ViewerTypeData[] = [];
  const docs = await ViewerModel.find({ status: { $in: ['ORGA', 'ADMIN', 'LIIS'] } }).exec()

  docs.forEach((doc: ViewerTypeData & any) => {
    const { guests, updatedAt, login, email, uid,
      organisation = null, website = null, coords, status, addressGeo,
      instagram = null, stripe_account_id = null, phone = null, avatar, continent = '', country = '', city = '', state = '',
      bio = null, } = doc?._doc

    //createdAt: JSON.stringify(createdAt),
    organisations.push({
      _id: uid.toString(),
      login,
      email,
      stripe_account_id,
      phone, bio,
      status,
      website, instagram, organisation,
      addressGeo: `${addressGeo}`,
      coords,
      avatar: avatar.url,
      updatedAt: JSON.stringify(updatedAt),
      uid: uid, continent, country, city, state
    });
  });


  return organisations as ViewerTypeData[]
} 