
import { getSpaceGrids } from "@/actions/stage";
import SpaceMenu from "@/components/space/SpaceMenu";



export default async function SourasNav() {
  
  try {
    const grids = await getSpaceGrids()
    console.log({grids});
    
    if (typeof grids !== 'undefined' && grids.length > 0) {
      return (
        <SpaceMenu grids={grids} />
      )
    }

  } catch (error) {
    throw error
  }
}
