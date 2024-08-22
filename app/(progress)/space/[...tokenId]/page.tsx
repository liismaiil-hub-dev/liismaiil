'use server'


export default async function SpacePage({params}) {
  console.log({hostId:params.tokenId[0]});
  console.log({tokenId:params.tokenId[1]});
  

  //const titles = await getTitles()
 // console.log({ titles });


  return (<section id="space-page" className="flex flex-col justify-center items-center  w-full h-screen" >

   <div> token</div>
  </section>
  )
}

