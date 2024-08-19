
//^ File process stream
import jsonfile from 'jsonfile';
import mime from 'mime';
import path from 'path';
import { dbFirestore, FieldValue, timeStamp } from '@/api/graphql/fb-utils-admin';
import { GuestType } from '../graphql/stage/stage.types';
import { redirect } from 'next/navigation';


export const dynamic = 'force-dynamic' // defaults to auto

export async function OPTION(request: Request) {

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
export const POST = async (req: Request) => {
  const {
    
  } = await req.json()
  console.log({ guest });

  try {
    const { collaboratorId, flag, host, status, tokenId, startDate } = ;
    const guestSnapshot = await dbFirestore.collection('guests').doc(`${tokenId}`).get();
    if (guestSnapshot.exists) {
      const { collaboratorId, host } = guestSnapshot.data() as GuestType;
      if (typeof host === 'undefined' || typeof collaboratorId === 'undefined') {
        dbFirestore.collection('profiles').doc(`${tokenId}`).set({ collaboratorId, flag, host, status, tokenId, startDate }, { merge: true });
        return { collaboratorId, flag, host, status, tokenId, startDate };
      }
    } else {
      dbFirestore.collection('profiles').doc(`${tokenId}`).set({ collaboratorId, flag, host, status, tokenId, startDate }, { merge: true });
      return { collaboratorId, flag, host, status, tokenId, startDate };
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
  redirect(`stages/${token}`)

}
export const GET = async (req: Request) => {
  const guestsDirName = path.join(process.cwd(), '/store/shares')
  console.log({ guestsDirName });

  try {
    const fileName = path.join(guestsDirName, `guests.json`)
    /* readFile(fileName!, 'utf8', async (err, data) => {
      if (err) {
        console.log({ err });
        return new Response(JSON.stringify({ "success": false, err }), { status: 501 })
      } else {
        console.log({ data });
        return new Response(data, { headers: { 'content-type': 'text/json' } });
      }) */

    return jsonfile.readFile(fileName)
      .then(obj => {
        //now it an object
        console.log({ obj });
        //const filestream = fs.createReadStream(fileName);

        return new Response(JSON.stringify(obj));


      }).catch((error: any) => {
        return new Response(JSON.stringify({ "success": false, error }), { status: 501 })

      })
  }
  catch (err) {
    return new Response(JSON.stringify({ "success": false, err }), { status: 501 })

  }
}