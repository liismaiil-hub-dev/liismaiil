import { DocumentData, DocumentSnapshot } from "@google-cloud/firestore";
import { dbFirestore } from "@/app/api/graphql/fb-utils-admin";
import { GuestType } from "@/app/api/graphql/profile/profile.types";

export const GET = async () => {
    try {

        const guestsRef = await dbFirestore.collection('guests')
        const snapshot = await guestsRef.where('tokenId', '>', 100).where('tokenId', '<', 1000).limit(100).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        const hosts: GuestType[] = [];
        snapshot.forEach(async (doc: DocumentSnapshot<GuestType | DocumentData>) => {
            const guest = await doc?.data()!;
            hosts.push(guest as GuestType);
        });
        console.log({ hosts: hosts });

        return hosts;
    } catch (error: any) {
        console.log({ error });
        throw new Error(error);
    }
}
// Post lesson pdfs and videos
export const POST = async (request:Request, { params }) => {
    try {
        const {tokenId} = params

        const guestsRef = await dbFirestore.collection('guests')
        const snapshot = await guestsRef.where('tokenId', '>', 100).where('tokenId', '<', 1000).limit(100).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        const hosts: GuestType[] = [];
        snapshot.forEach(async (doc: DocumentSnapshot<GuestType | DocumentData>) => {
            const guest = await doc?.data()!;
            hosts.push(guest as GuestType);
        });
        console.log({ hosts: hosts });

        return hosts;
    } catch (error: any) {
        console.log({ error });
        throw new Error(error);
    }
}