import Image from 'next/image';


function ErrorBoundaryComp() {
    return <div className='flex height-[60vh] width-[full] flex-col justify-center items-center'>
        <div className="height-[40vh] bg-cover bg-center">
            <Image src={'/error.png'}
                width={300} height={200} alt="Error image" />

        </div>
        <div className='font-ranga font-light text-red-400'>Server Error / network Error.</div>;
    </div>
}

export default ErrorBoundaryComp;

