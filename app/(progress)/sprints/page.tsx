import { getPublishedSprints } from "@/actions/sprint";
import SprintsCarousselComponent from "@/components/sprint/SprintsCaroussel";


async function StagePage() {
    const _sprints = await getPublishedSprints()
    console.log({ _sprints });

    return (

        <div className="h-full w-full bg-gray-200 p-10">
            <SprintsCarousselComponent />

        </div>


    )
}

export default StagePage