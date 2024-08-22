import Image from 'next/image';
import Link from 'next/link';


function ErrorBoundaryComp() {
    return <section className='flex height-[60vh] width-[full] flex-col justify-center items-center'>
        <div className="height-[40vh] bg-cover bg-center">
            <Image src={'/error.png'}
                width={300} height={300} alt="Error image" />

        </div>
        <div className='font-ranga font-light text-red-400'>Server Error / network Error.</div>
        <Link key={`home`} href='/' className=' flex justify-center'>
            <div className={' border-1 border-green-500 text-blue-500   text-center  px-4 py-3 rounded-md '}  >
                Home
            </div>
        </Link>
    </section>
}

export default ErrorBoundaryComp;

