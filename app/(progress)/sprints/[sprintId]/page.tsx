'use server'
import { getSprint } from "@/actions/sprint";
import Board from "@/components/sprint/Board";
import prisma from "@/lib/prisma-db";

export async function generateStaticParams() {
  try {
    const _sprints = await prisma.sprint.findMany({
      where: {
        published: true
      }
    });

    const _allSprints = _sprints.map((spr) => ({ sprintId: spr.sprintId }))
    return _allSprints.slice(0, 50)

  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }


}


export default async function GuestSptintPage({ params }: { params: { sprintId: string } }) {
  if (params && params.sprintId) {
    const { sprintId } = params
    const sprint = await getSprint(sprintId)
    if (sprint && sprint.success) {
      console.log({ sprint });


      return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >

        <Board stages={stages._stages} />


      </section>
      );
    }

  } else {
    return (<section id="space-page" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >

      there is an error

    </section>
    );
  }
}
