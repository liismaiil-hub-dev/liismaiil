import SpaceLayout from '@/components/Layout/SpaceLayout';


type AyahWithIndex = {
    id: number;
    order: number;
    text: string;
    juz: number;
    slice?: string;
    _id?: string;
}
export default function SpacePage(params) {
    console.log({ params });


    return (
        <div id="spacePage" className="flex flex-col justify-start items-center gap-3 md:w-full mt-10  h-full " >
            <div className="flex flex-col justify-start items-center  w-full overflow-visible" >
                space token
            </div> </div>
    )
}



SpacePage.getLayout = function getLayout(page, pageProps) {
    return (<SpaceLayout {...pageProps} title=' liismaiil space dashboard '> {page}</SpaceLayout>)
}

/* export const getStaticPaths = (async () => {
    try {
        await connectMongoose()
        const sprints = await SprintModel.find({}).lean().exec() as SprintType[];
        console.log({ sprintsStaticPath: sprints })
        const paths = sprints.map((doc: SprintType) => {
            // console.log(doc);

            return ({ params: { id: doc?.author } })

        });
        return { paths, fallback: false }
    } catch (error) {
        console.log({ error })
    }
})
export const getStaticProps = async (context) => {
    console.log({ context });
    const { id } = context?.params

    if (process.env.APP_ENV === APP_ENV.WEB) {
        try {
            await connectMongoose()
            const sprints = await SprintModel.find({ author: id }).lean().exec() as SprintType[];

            return { props: { sprints: JSON.stringify(sprints) }, revalidate: 10, };
        } catch (error) {
            console.log({ error })
        }

    }
    else if (process.env.APP_ENV === APP_ENV.BOX) {
        try {
            await connectMongoose()
            const sprints = await SprintModel.find({ author: id }).lean().exec() as SprintType[];
            console.log({ sprints })
            return { props: { sprints: JSON.stringify(sprints) }, revalidate: 10, };
        } catch (error) {
            console.log({ error })
        }
    }
}
 */
export async function generateMetaData({ params, searchParams }, parent) {
    console.log({ params })
    try {
        const description = (await parent).description ?? "liismaiil-hub tools"
        //await connectMongoose()
        /* const sprints = await SprintModel.find({ author: params }).lean().exec() as SprintType[];
         console.log({ sprints })
         return sprints.map(async (doc: SprintType) => {
         });
 */

        return ({ title: params.id, description });

    } catch (error) {
        console.log({ error })
    }
}
