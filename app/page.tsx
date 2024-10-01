/* import { useEffect, useState } from 'react' */
import Organisations from "@/components/front/Organisations";
//import MapComponent from '@/components/maps/MapComponent';
import { getGuestFromCookies } from "@/actions/guest";
import { dbFirestore } from '@/api/graphql/fb-utils-admin';
import prisma from "@/lib/prisma-db";
import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
import { Metadata } from 'next';
import { GuestType, ProfileTypeData } from "./api/graphql/profile/profile.types";

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
  const hosts = await getHosts()
  const guest = await getGuestFromCookies()
  //console.log({ hosts, collaborators });
  const localsOnline = await getLocalGuests() as GuestType[];
  console.log({ localsOnline, guest, collaborators });
  /*   const newToken = await createTokenForGuest({ tokenId:localOnline.tokenId, host, collaboratorId, country, flag, status, onLine
  }) */
  const hostsPrisma = hosts.map((guest: GuestType) => {

    return {

      tokenId: guest.tokenId,
      host: guest.host,
      flag: guest.flag,
      collaboratorId: guest.collaboratorId,
      status: guest.status,
      country: guest.country ? guest.country : 'OM',
    }
  }
  )
  /* 
  if (process.env.APP_ENV === APP_ENV.BOX) {
    const parsedOrganisations = JSON.parse(organisations)
    const parsedGuests = JSON.parse(guests)

    return (
        <Organisations guest={guest!} guests={parsedGuests} organisations={parsedOrganisations} />
       )
  } else { */
  return (
    <Organisations guestPrisma={guest} localOnline={localsOnline} hosts={hostsPrisma} collaborators={collaborators} />
  )
}

export async function getHosts() {
  try {
    //console.log({ firestore });
    const snapshot = await dbFirestore.collection('guests').get();

    const guests: GuestType[] = [];
    snapshot.forEach(async (doc: DocumentSnapshot<GuestType | DocumentData>) => {
      const guest = await doc?.data()!;
      guests.push(guest as GuestType);
    });
    console.log({ hosts: guests });

    return guests;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
}
export async function getLocalGuests() {
  try {
    //console.log({ firestore });
    const _onlinGuests = await prisma.guest.findMany({ where: { onLine: true } });
    return _onlinGuests as GuestType[];
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
    console.log({ collaborators });

    return collaborators;

  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
}


/**
 *  if (process.env.APP_ENV === APP_ENV.BOX) {
   try {
     const guests = await fs.readFile(process.cwd() + '/store/shares/guests.json', 'utf8');
     return guests

   } catch (error) {
     console.log(error);
     return `[]`
   }
 }
 */

