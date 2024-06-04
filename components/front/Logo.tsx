import Image from 'next/image'
import Link from 'next/link'
function Logo() {
    return (
        <div className='cursor-pointer p-3' >
            <Link href='/' >
                <Image src="/liismLogo.svg" alt="liismaiil s logo"
                    className='object-contain' width={170} height={70} />
            </Link>
        </div>
    )
}

export default Logo