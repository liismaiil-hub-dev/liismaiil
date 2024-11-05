'use server'
import { getHosts, getHostsForDashboard } from "@/actions/host";
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import HostGeoForm from "@/components/hosts/HostGeoForm";
export async function generateStaticParams() {
    const hosts = await getHosts();

    return hosts.map((host: GuestType) => ({
        tokenId: host.tokenId,
    }))
}


export default async function HostPage({ params }: { params: GuestType }) {
    const { tokenId } = await params
   
    return (
        <div className="flex border-2 h-full w-full p-3  border-violet-500  justify-center items-start gap-3 flex-wrap">
            <HostComponent tokenId={tokenId} />
        </div>
    );
}
