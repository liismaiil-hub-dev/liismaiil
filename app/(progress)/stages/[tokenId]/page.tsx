'use server'
import { LIISMAIIL_STATUS_ENUM } from "@/app/api/graphql/profile/profile.types";
import Board from "@/components/stage/Board";
import OpenBoard from "@/components/stage/OpenBoard";
import StepCaroussel from "@/components/stage/StepsCaroussel";
import prisma from "@/api/lib/prisma-db";
import { redirect } from "next/navigation";
import StateOpenBoard from "@/components/stage/StateOpenBoard";

/* 
export async function generateStaticParams() {
  
  try {
    const _hosts = await prisma.guest.findMany({
      where: { status: LIISMAIIL_STATUS_ENUM.HOST }
    });
    const _allHosts = _hosts.map((host) => ({ tokenId: host.tokenId.toString() }))
  const _tokenArgs =   _allHosts.map(h => ({tokenId:h.tokenId}))
 if(_tokenArgs){
  return _tokenArgs}
  else return [] 
  } catch (error: any) {
    console.error(error);
    return []
    //throw new Error(error);
  }} */
  
async function getStages(tokenId: number) {
//  console.log({ tokenId });
  const _stagesRel = await prisma.guest.findUniqueOrThrow({
    where: { tokenId },
    select: {
      stages: {
        select: { stage: true }
      }
    }
  });
//  console.log({ _stagesRel: _stagesRel.stages });
  try {
   if (_stagesRel && _stagesRel.stages.length > 0) {
      return {
        success: true,
        _stages: _stagesRel.stages
      }
    } else {
      return {
        success: false,
        _stages: []
      }
    }
  } catch (error: any) {
    console.error({error});
    redirect('/stages')
    throw new Error(error);
  }
}

export default async function GuestStagePage({ params }: { params: { tokenId: string } }) {
   const { tokenId } = params
    const stages = await getStages(parseInt(tokenId))
    
    console.log({ stages, tokenId });
    if (stages && stages.success) {
      return (<section id="stage" className="flex flex-col justify-start items-center border-2 border-blue-300 w-full h-screen" >
        <StepCaroussel currentGuest={{
          id: undefined,
          tokenId: 0,
          host: 0,
          flag: "",
          password: undefined,
          collaboratorId: undefined,
          status: "",
          country: undefined,
          onLine: undefined,
          startDate: undefined,
          endDate: undefined,
          stages: undefined,
          sprints: undefined
        }} />
        <Board stages={stages._stages} />
      </section>
      );
    }else {
      return <div className="grid grid-cols-3">
        <div className="flex-col justify-center items-center col-span-1">
        <StateOpenBoard  />
        </div>
        
        <div className="flex justify-center items-center col-span-2"> 
        <OpenBoard  />
         </div>
         </div>
    }
}
