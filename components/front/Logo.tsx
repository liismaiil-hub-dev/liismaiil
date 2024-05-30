import Image from 'next/image'
import Link from 'next/link'
function Logo() {
    return (
        <div className='flex items-center justify-center ' >
            <div className='cursor-pointer relative ml-1 px-10 sm:hidden md:inline-grid' >
                <Link href='/' >
                    <Image src="/liismLogo.svg" alt="liismaiil s logo"
                        className='object-contain' width={170} height={70} />
                </Link>
            </div>
        </div >
    )
}

export default Logo