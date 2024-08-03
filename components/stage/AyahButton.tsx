'use client'
import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

function AyahButton({ children, handlePress, id}: { children: ReactNode, handlePress: (arg:number) => void, id: number}) {

    return (<Button  onPress={() => { handlePress(id) }}  color="primary" 
    variant="bordered" className= "border-2 border-blue-600 rounded-md" >
        {children}
    </Button>
    )
}

export default AyahButton;
