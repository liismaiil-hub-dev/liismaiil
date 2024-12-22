import { getGuestFromCookies } from "@/actions/guest";
import { getPublishedSprints } from "@/actions/sprint";
import SprintBoardsComponent from "@/components/sprint/SprintsBoard";

async function SprintsPage() {
    try {

        const _sprints = await getPublishedSprints({page: 1, limit:50 })
       // const _guest = await getGuestFromCookies()
        console.log({ _sprints });

        return (

            <div className="h-full w-full bg-gray-200 p-10">
             sprints
              {/*   <SprintBoardsComponent sprints={_sprints} />
 */}
            </div>


        )
    } catch (error) {
        throw error
    }
}

export default SprintsPage