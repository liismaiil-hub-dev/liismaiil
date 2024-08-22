import GuestsComponents from "@/components/front/Guests";
import { getCurrentGuest } from "@/lib/guests";

export default async function  Guests() {
    const guest = getCurrentGuest()
 console.log({guest});
 
    //   const {credential} = guest;
//const guests = await getGuestsStagesdb(credential.tokenId)
    return (
                <div className="flex border-2 h-full w-full p-3  border-violet-500  justify-start items-start gap-3 flex-wrap">
                    <GuestsComponents />
                  </div>
    );
}