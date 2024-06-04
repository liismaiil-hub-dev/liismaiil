/* import { useEffect, useState } from 'react' */
import ViewerModel from '@/api/graphql/viewer/Viewer.model';
import { ViewerTypeData } from '@/api/graphql/viewer/viewer.types';
import Organisations from "@/components/front/Organisations";
//import MapComponent from '@/components/maps/MapComponent';
import connectMongoose from '@/lib/mongoose-db';
import { FLAG_FILES } from '@/store/constants/flagArray';
import jsonfile from 'jsonfile';
import mime from 'mime';
import { Metadata } from 'next';

import { APP_ENV } from '@/store/constants/constants';
import { promises as fs } from 'fs';


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
type GuestType = {
  collaboratorId: string;
  tokenId: string;
}
async function putFlag() {
  try {
    const filename = `${process.cwd()}/store/shares/guests.json`
    const mimetype = mime.getType(filename);
    console.log({ filename, mimetype });
    jsonfile.readFile(filename)
      .then(obj => {
        //now it an object
        console.log({ obj });
        const flaguedGuests = obj.map((gust, index) => {
          const ind = (Math.ceil(Math.random() * FLAG_FILES.length))

          return {
            ...gust, flag: FLAG_FILES[ind]
          }
        })
        // jsonfile.writeFile(filename, obj, { spaces: 2 }, function (err) {
        /* if (err) {
          console.error({ err })
        } */
        // const filestream = createReadStream(filename);
        jsonfile.writeFile(filename, [...flaguedGuests], { spaces: 2 }, function (err) {
          if (err) {
            console.error({ err })

          }

        }
        )
      }).catch(error => {
        console.log({ error });
      })


  } catch (error) {
    console.log(error);
  }
}


export const revalidate = 5;
const countries = ["FR", "DZ", "MA", "PA", "IN", "SE", "MU", "YEM", "IR"]
export default async function Home() {
  const organisations = await getOrganisations()
  const guests = await getGuests()
  if (process.env.APP_ENV === APP_ENV.BOX) {
    const parsedOrganisations = JSON.parse(organisations)
    const parsedGuests = JSON.parse(guests)

    return (
      <main className=" flex flex-col justify-start items-center" >
        <Organisations guests={parsedGuests} organisations={parsedOrganisations} />
      </main>
    )
  } else {
    return (
      <main className="flex flex-col justify-start items-center" >
        <Organisations guests={guests} organisations={organisations} />
      </main>

    )
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
      console.log({ parsed: JSON.parse(guests) });
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