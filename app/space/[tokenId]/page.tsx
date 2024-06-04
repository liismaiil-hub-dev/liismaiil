import { getCurrentGuest } from "@/lib/guests";


export default async function Space({ params }) {
    console.log({ token: params.tokenId });

    const guest = getCurrentGuest()
    console.log({ guest });

    return (<div className="h-full w-screen bg-gray-600 p-3">
        <h2 className='text-4xl text-center my-10 font-semibold'> Bismi ALLAH   </h2>
        <div className="h-full  bg-gray-600 p-3">
            space           token
        </div>
    </div>


    )
}
