'use client'
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import { cn, Pagination } from "@nextui-org/react";
import Image from "next/image";
import Link from 'next/link';
import {COUNTRY_CODES} from "@/store/constants/flagArray";
import { ReactNode } from "react";


const HostsComponent = ({ hosts }: { hosts: GuestType[] }) => {
console.log({hosts});
//grid grid-cols-4  h-[calc(100vh-7rem)] relative
return <div className="flex-col  h-screen  w-full p-3   justify-start items-center gap-3 ">
<div className="flex   w-full p-3   justify-start items-start gap-3 ">

{hosts.map((host: GuestType) =>{

const countryName = COUNTRY_CODES.filter((e) => e.code === host.country)
    return <div key={host.tokenId} className='flex-col items-center justify-between shadow-md shadow-blue-400 rounded-md w-32 h-32 gap-2  ' >
        <Link key={`${host.tokenId}_`} href={`/stages/${host.tokenId}`} scroll={false}>
        <div className='hover:animate-zoomIn shadow-md cursor-pointer  flex justify-center items-center'>
                <Image width={70} height={70} className={cn(host.onLine === true && 'border-green-400 border-3  shadow-green-200', ' rounded-full object-cover aspect-square ')} 
                src={host.flag.startsWith('https://') ? host.flag  : 
                    `/img/flags/${host.country?.toLowerCase()}.png` } alt={'avatar flag '} />
            </div>
            
        </Link>
            <div className={cn(host.country !== '' && 'mt-2 p-2 text-center shadow-md')}>
                {countryName[0].name}
             </div>
</div>
})
}
</div>

<div className="flex  h-14 w-full p-3   justify-center items-center gap-3 ">

<Pagination boundaries={3} color="secondary" total={hosts.length} />
</div>
</div>

}


export default HostsComponent  