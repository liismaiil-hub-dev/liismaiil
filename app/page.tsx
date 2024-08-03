/* import { useEffect, useState } from 'react' */
import ViewerModel from '@/api/graphql/viewer/Viewer.model';
import { ViewerTypeData } from '@/api/graphql/viewer/viewer.types';
import Organisations from "@/components/front/Organisations";
//import MapComponent from '@/components/maps/MapComponent';
import { getGuestFromToken } from '@/lib/authTools';
import connectMongoose from '@/lib/mongoose-db';
import { APP_ENV, COOKIE_NAME } from '@/store/constants/constants';
import { promises as fs } from 'fs';
import { Metadata } from 'next';
import { cookies } from 'next/headers';


const APP_NAME = "liismaiil-hub";
const APP_DEFAULT_TITLE = "liismaiil hub App";
const APP_TITLE_TEMPLATE = "%s |  liismaiil hub App";
const APP_DESCRIPTION = "lismaiil 1asas tool";


export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  /*   formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: APP_NAME,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    },
    twitter: {
      card: "summary",
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    },
    */
};


export const revalidate = 5;
const countries = ["FR", "DZ", "MA", "PA", "IN", "SE", "MU", "YEM", "IR"]

/**HOME COMPONENT */
export default async function Home() {
  const organisations = await getOrganisations()
  const guests = await getGuests()
  const guest =  await getGuestFromCookies()
  
  if (process.env.APP_ENV === APP_ENV.BOX) {
    const parsedOrganisations = JSON.parse(organisations)
    const parsedGuests = JSON.parse(guests)

    return (
        <Organisations guest={guest!} guests={parsedGuests} organisations={parsedOrganisations} />
       )
  } else {
    return (
        <Organisations guest={guest} guests={guests} organisations={organisations} />
      
    )
  }

}
async function getGuestFromCookies(){
 
  try {
    const token = cookies().get(COOKIE_NAME)
    if (typeof token !== 'undefined') {
        
      const guest = await getGuestFromToken(token.value)
      return guest
    }
    return null


    //redirect(`/space/${slug(data.host)}`)
  } catch (e) {
    console.error(e)
    return null
    //redirect(`/liismaiil/${slug(data.host)}`)

  }


}
async function getOrganisations() {
  if (process.env.APP_ENV === APP_ENV.BOX) {
    try {

      const organisations = await fs.readFile(process.cwd() + '/store/shares/organisations.json', 'utf8');
      return organisations
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