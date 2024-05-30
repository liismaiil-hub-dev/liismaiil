import GridLayout from '@/components/Layout/GridLayout';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';


import SprintModel from '@/api/__sprint/Sprint.model';
import { SprintType } from '@/api/__sprint/sprint.types';
import connectMongoose from '@/lib/mongoose-db';
import moment from 'moment';
import slug from 'slug';
//: React.FunctionComponent<{ params: { slug: string } }>
const SpacePage = ({ params }: { params: { slug: string } }) => {
    //long = 2.30473, lat = 48.8678
    const router = useRouter()
    console.log({ params })
    const { query: { slug } } = router
    //const { slug: slugFromParam } = typeof (params) !== 'undefined' ?? params
    const [currentMoment, setCurrentMoment] = useState(moment())

    console.log({ slug })
    const prevMonth = () => {
        setCurrentMoment(moment(currentMoment.subtract(1, 'months')))
    }
    const nextMonth = () => {
        setCurrentMoment(moment(currentMoment.add(1, 'months')))
    }
    return (
        <main>
            <div>
                {slug} {slug}{slug}{slug}{slug}
            </div>
        </main >
    );
};


SpacePage.getLayout = function getLayout(page: ReactElement) {
    return <GridLayout title='space'>{page}</GridLayout>;
};

export default SpacePage
export async function generateStaticParams() {

    try {
        await connectMongoose()
        const sprints = await SprintModel.find({}).lean().exec() as SprintType[];
        console.log({ sprints })
        return sprints.map(async (doc: SprintType) => {

            return ({ slug: slug(doc?.title) });
        });

    } catch (error) {
        console.log({ error })
    }
}
export async function generateMetaData({ params }) {
    console.log({ params })
    try {
        //await connectMongoose()
        const sprints = await SprintModel.find({}).lean().exec() as SprintType[];
        console.log({ sprints })
        return sprints.map(async (doc: SprintType) => {

            return ({ slug: slug(doc?.title) });
        });

    } catch (error) {
        console.log({ error })
    }
}