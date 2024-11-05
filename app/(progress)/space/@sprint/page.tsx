
import { getPublishedSprints } from '@/actions/sprint';
import Sprints from "@/components/space/Sprints";
import { Button } from '@nextui-org/react';


export default async function Sprint() {
  const sprints = await getPublishedSprints({ page: 1, limit: 50 })
  console.log({ sprints });

  if (typeof sprints != 'undefined' && sprints?.length > 0) return <Sprints sprints={sprints} />
  return (
    <Button type="submit" className='btn bg-blue-400
             text-yellow-100  text-center text-md p-1 
              rounded-md'>
      No sprint projected
    </Button>)



}
