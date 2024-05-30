
import { RootStateType } from '@/store/store'
import { useSelector } from 'react-redux'


export default function Grid() {

    const { stageSelected, gridSelected, serieSelected } = useSelector((state: RootStateType) => state.sprint)
    const { token, guest } = useSelector((state: RootStateType) => state.guest)

    return (<div className="h-full  bg-gray-600 p-3">
        <h2 className='text-4xl text-center my-10 font-semibold'> Bismi ALLAH   </h2>
        <div className="h-full  bg-gray-600 p-3">
            grids
        </div>
    </div>


    )
}
