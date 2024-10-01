'use client'
import { SprintSpaceType } from "@/api/graphql/stage/stage.types";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useTransition } from "react";

const Sprints = ({ sprints }: { sprints: unknown }) => {
  console.log(JSON.stringify(sprints));
  const router = useRouter()

  const [isPending, startTransition] = useTransition();

  const sprintSessionHandler = (sprId: string) => {
    router.push(`/sprints/${sprId}`)
    /* startTransition(() => {
      setSprintSession(sprId)
    }) */
  }

  return (
    <section className="flex flex-col  justify-start items-start w-full h-full">
      <div className="flex w-full flex-wrap  gap-2">
        {typeof sprints !== 'undefined' && sprints && sprints?.length > 0 && sprints?.map((sprint: SprintSpaceType) => (
          <Link key={sprint.sprintId} href={`/sprints/${sprint.sprintId}`} target="_blank">{sprint.stage.souraName}
          </Link>

        ))
        }
      </div>
    </section>
  )

}
export default Sprints