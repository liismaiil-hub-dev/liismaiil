import { dmSerif } from '@/styles/fonts'
import Image from 'next/image'
import Link from 'next/link'
function Logo() {
    return (
        <div className='flex items-center gap-4 ' >
            <div className='cursor-pointer relative ml-4 px-10 sm:hidden md:inline-grid' >
                <Link href='/' >
                    <Image src="/liismLogo.svg" alt="liismaiil s logo"
                        className='object-contain' style={{ width: "auto" }} height={70} />
                </Link>
            </div>
            <div className={`${dmSerif.className} lowercase text-slate-400  text-2xl font-bold `} >lil</div>
        </div >
    )
}

export default Logo