'use client'
import { SprintPrismaType } from "@/api/graphql/stage/stage.types";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useTransition } from "react";

const Sprint = ({ sprint }: { sprint: SprintPrismaType }) => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition();

  const sprintSessionHandler = (sprId: string) => {
    router.push(`/sprints/${sprint.sprintId}`)
    /* startTransition(() => {
      setSprintSession(sprId)
    }) */
  }

  return (
    <Link key={sprint.sprintId} href={`/sprints/${sprint.sprintId}`} target="_blank">{sprint.stage?.souraName}
    </Link>

  )

}
export default Sprint