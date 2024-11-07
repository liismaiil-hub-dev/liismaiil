
import Board from "@/components/space/Board";
import { getGuestFromCookies } from "@/lib/authTools";
export default async function SpacePage() {
  let currentGuest = await getGuestFromCookies();
  console.log({ currentGuest });
  return (<section id="space-page" className="flex flex-col justify-start items-center  w-full h-full" >
      <Board current />
  </section>
  )
}

