import { GuestType } from "@/app/api/graphql/profile/profile.types";
import HostComponent from "@/components/hosts/Host";
import { getAllHosts } from "@/lib/utils/host";

export default async function HostsPage() {

    const hosts = await getAllHosts();
    return (<div className="flex border-2 h-full w-full p-3  border-violet-500  justify-center items-center gap-3 ">

        {typeof hosts != 'undefined' && hosts.length > 0 &&
            hosts.map((host: GuestType) => <HostComponent key={host.tokenId} host={host} />)}

    </div>
    )
}

