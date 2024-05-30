/* import { useEffect, useState } from 'react' */
import ViewerModel from '@/api/graphql/viewer/Viewer.model';
import { ViewerTypeData } from '@/api/graphql/viewer/viewer.types';
import Organisations from "@/components/front/Organisations";
//import MapComponent from '@/components/maps/MapComponent';
import connectMongoose from '@/lib/mongoose-db';
import { Metadata } from 'next';

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

//Refresh every 5s
export const revalidate = 5;
const countries = ["FR", "DZ", "MA", "PA", "IN", "SE", "MU", "YEM", "IR"]
export default async function Home() {
  const organisations = await getOrganisations()


  /*  const cities = organisations.map((org: { addressGeo: any }) => {
    return org.addressGeo
  })
  */ /* bg-gradient-to-r from-[#0f1f47] to-[#5f6984] */
  return (
    <main className="bg-gray-200  flex flex-col justify-start items-center" >
      <Organisations organisations={organisations} />
    </main>

  )
}

async function getOrganisations() {
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