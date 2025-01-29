'use client'
import {Button} from "@heroui/button";

function SpaceButton({ title, handlePress,  }: { title: string, handlePress: () => void,}) {

    return (<Button  onPress={() => { handlePress() }}  color="primary" 
    variant="bordered" className= {`border-2 border-blue-600 rounded-md `}   >
        {title}
    </Button>
    )
}

export default SpaceButton;
