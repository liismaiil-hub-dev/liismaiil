


import { getAllSprintsForDashboard } from "@/actions/sprint";
import Sprints from "@/components/space/Sprints";
import { Button } from '@nextui-org/react';


export default async function Sprint() {
  const sprints = await getAllSprintsForDashboard();
  console.log({ Allsprints: sprints });

  if (typeof sprints != 'undefined' && sprints?.length > 0) return <Sprints sprints={sprints} />
  return (
    <Button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-xl p-2 h-full
              rounded-md'>
      No sprint projected
    </Button>)
}
