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
    const hosts = await getAllHosts();
    console.log({ hosts });

    return (
        <div className="flex border-2 h-full w-full p-3  border-violet-500  justify-center items-start gap-3 flex-wrap">
            <HostGeoForm hosts={[]} />
        </div>
    );
}
