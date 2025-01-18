
import TemplateBoardComponent from "@/components/insight/TemplateBoard";

export default async function InsightPage() {
  //let currentGuest = await getGuestFromCookies();
  //console.log({ currentGuest });
  return (<section id="space-page" className="flex flex-col justify-start items-center  w-full h-full" >
      <TemplateBoardComponent  />
  </section>
  )
}

