'use client'
import { SprintPrismaType } from "@/api/graphql/stage/stage.types";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";


const Sprints = (sprints: SprintPrismaType[]) => {
  return (
    <section className="flex flex-col  justify-start items-center w-full h-full">
      <div className="flex justify-content-center ">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          {typeof sprints !== 'undefined' && sprints.length > 0 &&
            <Autocomplete
              label="Select an animal"
              className="max-w-xs">
              {sprints?.map((sprint: SprintPrismaType) => (
                <AutocompleteItem key={sprint.souraNb} value={sprint.sprintId}>
                  {sprint.souraName}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          }

        </div>
      </div>
    </section>)

}
export default Sprints