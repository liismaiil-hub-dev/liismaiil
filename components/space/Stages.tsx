'use client'
import { getStages } from "@/actions/stage";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState, useTransition } from "react";

const Stages = () => {
  const [isPending, startTransition] = useTransition();
  const [stages, setStages] = useState([]);

  useEffect(() => {
    startTransition(async () => {
      const _stages = await getAllStagesForDashboard()
      setStages(_stages);
    });
  }, []);

  return (
    <section className="flex flex-col  justify-start items-center w-screen h-screen">

      <div className="flex justify-content-center ">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Autocomplete
            label="Select an animal"
            className="max-w-xs"
          >
            {stages?.map((stage: string) => (
              <AutocompleteItem key={stage} value={stage}>
                {stage}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Autocomplete
            label="Favorite Animal"
            placeholder="Search an animal"
            className="max-w-xs"
            defaultItems={stages}
          >
            {(item) => <AutocompleteItem key={item}>{item}</AutocompleteItem>}
          </Autocomplete>
        </div></div>
    </section>)


}

export default Stages