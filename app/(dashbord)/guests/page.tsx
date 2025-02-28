import { getPrismaGuests } from "@/actions/guest";
import GuestsComponents from "@/components/guests/Guests";

export default async function Guests() {
    
    //   const {credential} = guest;
    const _guestsResp = await getPrismaGuests()
   
    console.log({_guestsResp });
    if(_guestsResp && _guestsResp.success){
        return (
            <div className="flex-col  h-screen w-full p-3  justify-start items-stretch gap-3 flex-wrap">
                <GuestsComponents guests={JSON.parse(_guestsResp.guests)} />
            </div>
        );    
    }else {
        return null
    }
}