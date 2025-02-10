'use client'
import { Button } from "@heroui/button";
function SpaceError({ error, reset }) {
    return (<Button onPress={reset} color="primary" >
        {`${error} Error occurs Click to reset `}
    </Button>)

}

export default SpaceError;
