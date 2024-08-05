
'use client'

import { GET_GRIDS_BY_NB } from "@/graphql/sprint/queries";
import { GRIDS_NAME, GRIDS_TLD } from "@/store/constants/constants";
import { sprintActions } from "@/store/slices/sprintSlice";
import { useLazyQuery } from "@apollo/client";
import { Accordion, AccordionItem, Button, ScrollShadow } from "@nextui-org/react";
import { useEffect, useMemo } from 'react';
import { useDispatch } from "react-redux";

type GridMenu = {
  souraName: string;
  souraNb: number;
}
const TiwalAccordion = ({ grids, handleSelectedSouraNb }: {
  grids: GridMenu[],
  handleSelectedSouraNb: (arg: number) => void
}) => {
 // console.log({ gridsTiWal: grids });
 return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {

        return <Button onClick={() => { handleSelectedSouraNb(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MiinAccordion = ({ grids, handleSelectedSouraNb }: {
  grids: GridMenu[],
  handleSelectedSouraNb: (arg: number) => void
}) => {
  return (
    <section id='miin_accordion' className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {

        return <Button onClick={() => { handleSelectedSouraNb(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>

  )
}
const MathaniAccordion = ({ grids, handleSelectedSouraNb }: {
  grids: GridMenu[],
  handleSelectedSouraNb: (arg: number) => void
}) => {
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {

        return <Button onClick={() => { handleSelectedSouraNb(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>
  )
}
const MofasalAccordion = ({ grids, handleSelectedSouraNb }: {
  grids: GridMenu[],
  handleSelectedSouraNb: (arg: number) => void
}) => {
  return (
    <section id='tiwal_accordion' className="flex flex-col justify-start items-start ">
      {grids?.map((grd) => {

        return <Button onClick={() => { handleSelectedSouraNb(grd.souraNb) }} key={`${grd.souraName}-${grd.souraNb}`} aria-label={`${grd.souraName}`} title={`${grd.souraName}`}>
          <div className="flex justify-center  text-center">
            {`  ${grd.souraName}   :  ${grd.souraNb}`}

          </div>
        </Button>
      }
      )}
    </section>
  )
}
//             _____COMPONENT_____________

const Grids = ({ grids }: { grids: GridMenu[] }) => {
console.log(`grids de stage --------${grids?.length}`);
 
  const dispatch = useDispatch()
 const [GetGridsByNb, {data:dataGetGridsByNb, loading:loadingGetGridsByNb, error: errorGetGridsByNb}]= useLazyQuery(GET_GRIDS_BY_NB)
  const { setSpaceGrids } = sprintActions
  //const { grids } = useSelector((state: RootStateType) => state.sprint)

  // creating chunks 
  const newTiwal: GridMenu[] = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb <= 7
  }), [grids])
  const newMiin = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb > 7 && gr.souraNb <= 18;
  }), [grids])


  const newMathani = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb > 18 && gr.souraNb <= 50;
  }), [grids])

  const newMofasal = useMemo(() => grids.filter((gr: GridMenu) => {
    return gr.souraNb > 50;
  }), [grids])

  useEffect(() => {
    console.log(`dataGridNb  ${dataGetGridsByNb?.getGridsByNb?.grids}`);
    if (dataGetGridsByNb && dataGetGridsByNb.getGridsByNb && dataGetGridsByNb.getGridsByNb.success && dataGetGridsByNb.getGridsByNb.grids.length > 0) {
      console.log(`Grids comp from souras page : ${dataGetGridsByNb.getGridsByNb.grids} `);
      
      dispatch(setSpaceGrids({ grids: dataGetGridsByNb.getGridsByNb.grids }))
    
    } else if (errorGetGridsByNb || !dataGetGridsByNb?.getGridsByNb.success) {
      console.log({ errorGetGridsByNb });
      }
  }, [dataGetGridsByNb, loadingGetGridsByNb, errorGetGridsByNb]);

  const selectSouraHandler = (souraNb: number) => {
  try {
    
    GetGridsByNb({
      variables:{
        input:{
          author: "O6cKgXEsuPNAuzCMTGeblWW9sWI3" ,
           souraNb:souraNb
        }
      }
    })
  } catch (error) {
    console.log(error);
  }

  }
  return (
    <section className="flex flex-col text-blue-800 justify-start items-center w-full h-full">
      <Accordion
        /* selectedKeys={selectedKeys}
        onSelectionChange={()  => setSelectedKeys() }
       */
       >
        <AccordionItem key={`${GRIDS_TLD.TIWAL}`} aria-label="souar tiwal" 
        title={`${GRIDS_NAME[GRIDS_TLD.TIWAL]}`}>
          <TiwalAccordion grids={newTiwal}  handleSelectedSouraNb={(arg) => selectSouraHandler(arg)} />

        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MIIN}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MIIN]}`} title={`${GRIDS_NAME[GRIDS_TLD.MIIN]}`}>
          <MiinAccordion grids={newMiin}  handleSelectedSouraNb={(arg) => selectSouraHandler(arg)} />
        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MATHANI}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MATHANI]}`} title={`${GRIDS_NAME[GRIDS_TLD.MATHANI]}`}>
          <MathaniAccordion grids={newMathani}  handleSelectedSouraNb={(arg) => selectSouraHandler(arg)} />
        </AccordionItem>
        <AccordionItem key={`${GRIDS_TLD.MOFASAL}`} aria-label={`souar ${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`} title={`${GRIDS_NAME[GRIDS_TLD.MOFASAL]}`}>
          <ScrollShadow className=" h-[calc(100vh-20rem)]">
            <MofasalAccordion grids={newMofasal} 
              handleSelectedSouraNb={(arg) => selectSouraHandler(arg)} />
          </ScrollShadow>

        </AccordionItem>
      </Accordion >

    </section>);


}

export default Grids