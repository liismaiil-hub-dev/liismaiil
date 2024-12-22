import { GuestType } from "@/app/api/graphql/profile/profile.types";
import HostsComponent from "@/components/hosts/Hosts";
import { getHostsForDashboard } from "@/actions/host";
import { Pagination } from "@nextui-org/react";

export default async function HostsPage() {

    const hosts = await getHostsForDashboard();
    console.log({hosts});
    try {
        if(typeof hosts !='undefined' && hosts && hosts.length >0 )  {

    return (<div className="flex-col  h-full w-full p-3    justify-start items-start gap-3 ">
        <section className="flex  h-full w-full p-3    justify-start items-start gap-3 ">
                {typeof hosts != 'undefined' && hosts.length > 0 &&
                 <HostsComponent  hosts={hosts!} />}
    
        </section>
        </div>)
        } else return null 
    } catch (error) {
    console.log({error});
    return null
            
    }
    
}

