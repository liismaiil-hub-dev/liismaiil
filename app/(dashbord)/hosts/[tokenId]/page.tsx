'use server'
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import HostComponent from "@/components/hosts/Host";
import prisma from "@/api/lib/prisma-db";



export async function getHost(tokenId: number) {

    const guest = await prisma.guest.findUnique({
        where: { tokenId }
    })
    console.log({guest});
    return guest;
}
    
export default async function HostPage({ params }: { params: GuestType }) {
    const host = await getHost(parseInt(params.tokenId))
    console.log({host});
    
    return (
        <div className="flex border-2 h-full w-full p-3  border-violet-500  justify-center items-start gap-3 flex-wrap">
            <HostComponent host={host} />
        </div>
    );
}
