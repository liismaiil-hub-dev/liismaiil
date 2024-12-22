'use client'

function HomeError({error, reset}) {
    return (
    <div className="flex justify-center items-center">
        <button onClick={()=> {
            reset()
        } }>
            Reset
        </button>
    </div>   
         )
}

export default HomeError;
