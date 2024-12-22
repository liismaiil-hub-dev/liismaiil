/* import { useEffect, useState } from 'react' */
//import MapComponent from '@/components/maps/MapComponent';
import { getGuestFromCookies } from "@/actions/guest";
import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import GuestsComponent from "@/components/front/Guests";
import prisma from "@/api/lib/prisma-db";
import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
import { Metadata } from 'next';
import { GuestType, ProfileTypeData } from "./api/graphql/profile/profile.types";
import { GuestPrismaType } from "./api/graphql/stage/stage.types";

import Footer from "@/components/front/Footer";
import Organisation from "@/components/front/OrganisationComponent";
import OrganisationsPagination from "@/components/front/OrganisationsPagination";
import SearchHost from "@/components/front/SearchHost";
import GoogleMapComponent from "@/components/maps/GoogleMapComponent";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!
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
  metadataBase: new URL('https://liismaiil.org'),
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

/**HOME COMPONENT */
export default async function Home() {
  const collaborators = await getCollaborators()
  //const hosts = await getHosts()
//  const guest = await getGuestFromCookies()
  //console.log({ hosts, collaborators });
  const localsOnline = await getLocalGuests() as GuestPrismaType[];
  //  console.log({ localsOnline, guest, collaborators });
  /*   const newToken = await createTokenForGuest({ tokenId:localOnline.tokenId, host, collaboratorId, country, flag, status, onLine
  }) */

  return (
    <div className=' container  flex flex-col gap-3 justify-start items-center'>
      <section className=" w-full  flex-col  space-y-1 items-stretch  p-1 justify-start " >
        <SearchHost />
        <div className="flex flex-col justify-start items-stretch  ">
          <div className="flex  w-full justify-center items-start  ">
            <GoogleMapComponent />
          </div>
          <div className="flex  w-full justify-start items-center  ">

            {collaborators && collaborators.length > 0 && collaborators.map((org: ProfileTypeData) => {
              return (<div key={org.tokenId} className="p-3 ">
                <Organisation profile={org} />
              </div>
              )
            })}
          </div>

          {collaborators && collaborators.length > 4 &&
            <OrganisationsPagination  collaborators={collaborators} />}
        </div>
      </section >

      <div className="flex flex-col  justify-start w-full items-start">
        <GuestsComponent localsOnline={localsOnline} />
      </div>
      <div className="flex justify-center w-full items-center">
        <Footer />
      </div>
    </div>

  )
}

export async function getLocalGuests() {
  try {
    const _onlinGuests = await prisma.guest.findMany({ where: { onLine: true } });
    let _guestsOnline: GuestPrismaType[] = _onlinGuests && _onlinGuests.length > 0 ? _onlinGuests.map((gst: GuestPrismaType) => {
      return {
        tokenId: gst.tokenId,
        host: gst.host,
        flag: gst.flag,
        status: gst.status,
        onLine: gst.onLine,
        collaboratorId: gst.collaboratorId,
        startDate: (gst.startDate && Number.isInteger(parseInt(gst.startDate))) ? new Date(parseInt(gst?.startDate!)).toISOString() : '',
      }
    })
      : [{
        tokenId: -1,
        host: -1,
        flag: '',
        onLine: false,
      
        status: '',
        startDate: '',
        collaboratorId: ''
      }]
      //console.log({_guestsOnline});
      
    return _guestsOnline
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
}

async function getCollaborators() {
  try {
    const snapshot = await dbFirestore.collection('profiles').where('status', 'in', ['ORGA', 'ADMIN', 'LIIS']).get();
    const collaborators: ProfileTypeData[] = [];
    snapshot.forEach(async (doc: DocumentSnapshot<GuestType | DocumentData>) => {
      const coolaborat = await doc?.data()!;
      collaborators.push(coolaborat as ProfileTypeData);
    });
    //   console.log({ collaborators });

    return collaborators;

  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
}
