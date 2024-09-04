
import Sprints from "@/components/space/Sprints";

import { getCurrentGuest, getOwnSprintsForDashboard, getOwnStagesForDashboard } from "@/lib/guests";

import { Button } from '@nextui-org/react';


export default async function Sprint() {
  const guest = await getCurrentGuest();
  let sprints;
  let stages;
  if (guest) {

    sprints = await getOwnSprintsForDashboard(guest.tokenId)
    stages = await getOwnStagesForDashboard(guest.tokenId)
    console.log({ sprints, stages });
  }

  if (typeof sprints != 'undefined' && sprints?.length > 0) return <Sprints />
  return (
    <Button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-xl p-2 h-full
              rounded-md'>
      No sprint projected
    </Button>)
}
