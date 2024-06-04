'use client'
import { SprintType } from "@/api/graphql/sprint/sprint.types";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";


const Sprints = (sprints: SprintType[]) => {
  return (
    <section className="flex flex-col  justify-start items-center w-screen h-screen">
      <div className="flex justify-content-center ">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Autocomplete
            label="Select an animal"
            className="max-w-xs">
            {sprints?.map((sprint: SprintType) => (
              <AutocompleteItem key={sprint.title} value={sprint.title}>
                {sprint.description}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Autocomplete
            label="Favorite Sprint"
            placeholder="Search sprint"
            className="max-w-xs"
            defaultItems={sprints}
          >
            {(item) => <AutocompleteItem key={item.title}>{item.description}</AutocompleteItem>}
          </Autocomplete>
        </div>
      </div>

    </section>)

}
export default Sprints