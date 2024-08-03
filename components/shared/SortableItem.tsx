import { AyahWithId } from "@/api/graphql/sprint/sprint.types";
import { cn } from "@/lib/cn-utility";
import {
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

const colorNuance = [50,100,200,300,400,500,600, 700,800]

const SortableItem = ({ ay, id, min, ordered}: { ay: AyahWithId, id: number, min: number, ordered : boolean}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: ay.order + 1  })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    const txtColorPosit = id < colorNuance.length ? id : Math.ceil( id % colorNuance.length)  
    const bg_nuance: number = colorNuance[id - 1]
    const txt_nuance: number = colorNuance[colorNuance.length - txtColorPosit] 
console.log({id, ordered});

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}
         className={cn( ay.order ===  min && ordered ? `text-xl bg-green-600 text-blue-${txtColorPosit}`: ordered ? 
         `bg-blue-${bg_nuance} text-green-${txt_nuance}`: `bg-blue-200 text-green-500` ,
         "flex flex-auto text-md items-center cursor-pointer py-1 px-3")}>
            <button className="cursor-move" > {` ${ay.text} `} </button>
        </div>)
}
export default SortableItem