
import { PROFILE_STATUS_ENUM } from "@/app/api/graphql/profile/profile.types";
import SpaceBoardComponent from "@/components/space/SpaceBoard";
import { getGuestFromCookies } from "@/actions/guest";
export default async function SpacePage() {
  //let currentGuest = await getGuestFromCookies();
  //console.log({ currentGuest });
  return (<section id="space-page" className="flex flex-col justify-start items-center  w-full h-full" >
      <SpaceBoardComponent  />
  </section>
  )
}

