'use client'

import { StagePrismaType } from "@/app/api/graphql/stage/stage.types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState, useTransition } from "react";

const Stages = ({ stage }: { stage : StagePrismaType}) => {
 
  return (
            {stages?.map((stage: string) => (
              <AutocompleteItem key={stage} value={stage}>
                {stage}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div></div>
    </section>)


}

export default Stages