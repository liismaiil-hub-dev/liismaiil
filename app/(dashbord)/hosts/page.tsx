'use server'
import { LIISMAIIL_STATUS_ENUM } from "@/app/api/graphql/profile/profile.types";
import { GuestPrismaType } from "@/app/api/graphql/stage/stage.types";
import HostGeoForm from "@/components/hosts/HostGeoForm";
import prisma from "@/lib/prisma-db";

const getAllHosts = async (): Promise<GuestPrismaType[] | undefined | any> => {
    'use server'
    const hosts = await prisma.guest.findMany({ where: { status: LIISMAIIL_STATUS_ENUM.HOST } })
    return hosts
}

export default async function HostsPage() {


    return (
        <div className="flex border-2 h-full w-full p-3  border-violet-500  justify-center items-center gap-3 ">
            <HostsList />
        </div>
    );
}
async function HostsList() {
    const hosts = await getAllHosts();
    console.log({ hosts });
    if (typeof hosts != 'undefined' && hosts.length > 0) {
        return (
            <div className="flex border-2 h-full w-full p-3  border-violet-500  justify-center items-center gap-3 ">
                <HostGeoForm hosts={hosts} />
            </div>)
    }
    else {
        return (
            <div className="flex border-2 h-full w-full p-3  border-violet-500  justify-center items-center gap-3 ">
                <HostGeoForm hosts={[]} />
            </div>)
    }

}
