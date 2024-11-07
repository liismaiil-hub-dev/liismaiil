'use client'
import { GuestType } from "@/app/api/graphql/profile/profile.types";
import { cn } from "@nextui-org/react";
import Image from "next/image";
import Link from 'next/link';

const HostComponent = ({ host }: { host: GuestType }) => {

    return <div className='flex flex-row border-2 gap-3 border-blue-600 items-center justify-start   
    shadow-md shadow-blue-400 rounded-sm w-full h-full flex-wrap' >
        <Link key={`${host.tokenId}_`} href={`/stageS/${host.tokenId}`} scroll={false}>
            <div className={cn(host.tokenId.toString() !== '', 'bg-green-300 shadow-md shadow-green-200',
                "cursor-pointer hover:animate-zoomIn border-2 border-green-400 hover:border-indigo-600 flex items-stretch justify-stretch   rounded-full h-14 w-14")}>
                <Image width={70} height={100} className='flex justify-center items-center rounded-full object-cover' src={host.flag.startsWith('https://') ? host.flag : `/img/flags/${host.flag}`} alt={'avatar flalg '} />
            </div>
            <div className={cn(host.country !== '' && 'justify-self-center text-center shadow-md')}>
                {host.country}
            
            </div>
        </Link>

    </div>
}


export default HostComponent 