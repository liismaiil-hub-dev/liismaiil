'use client'
import { Button } from "@nextui-org/react";
function SpaceError({ error, reset }) {
    return (<Button onClick={() => reset()} color="primary" >
        {`${error} Error occurs Click to reset `}
    </Button>)

}

export default SpaceError;
