import FrontCards from './FrontCards'
import FrontTablet from './FrontTablet'

function Presentation() {
    return (
        <div className=' flex flex-col sm:grid-cols-1 grid-cols-2 text-center '>

            <FrontTablet />


            <FrontCards />

        </div>


    )
}


export default Presentation