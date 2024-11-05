import { getPublishedSprints } from "@/actions/sprint";
import SprintBoardsComponent from "@/components/sprint/SprintsBoard";

async function SprintsPage({ searchParams }) {
    try {

        console.log({ searchParams });
        const page = searchParams.page ?? 1
        const limit = searchParams.page ?? 10
        const _sprints = await getPublishedSprints({ page, limit })
        console.log({ _sprints });

        return (

            <div className="h-full w-full bg-gray-200 p-10">
                <SprintBoardsComponent sprints={_sprints} />

            </div>


        )
    } catch (error) {
        throw error
    }
}

export default SprintsPage