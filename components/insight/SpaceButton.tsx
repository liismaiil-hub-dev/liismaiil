'use client'
import { Button } from "@nextui-org/react";

function SpaceButton({ disabled=false, title, handlePress,  }: {disabled:boolean, title: string, handlePress: () => void,}) {

    return (<Button  disabled={disabled} onPress={() => { handlePress() }}  color="primary" 
    variant="bordered" className= {`border-2 border-blue-600 rounded-md `}   >
        {title}
    </Button>
    )
}

export default SpaceButton;
