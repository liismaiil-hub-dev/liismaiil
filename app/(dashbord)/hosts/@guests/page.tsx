
import Sprints from "@/components/space/Sprints";

import { getGuestFromCookies } from "@/actions/guest";
import { getOwnSprints, } from "@/actions/sprint";
import { getOwnStages } from "@/actions/stage";
import { Button } from '@nextui-org/react';


export default async function Sprint() {
  const guest = await getGuestFromCookies();
  let sprints;
  let stages;
  if (guest) {

    sprints = await getOwnSprints()
    stages = await getOwnStages(guest.tokenId)
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
