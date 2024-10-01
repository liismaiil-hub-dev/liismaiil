'use client'

function HomeError({error, reset}) {
    return (
    <div className="flex justify-center items-center">
    <div className="flex text-center justify-center items-center">
        {`${error.message} error occured`}
    </div>   
        
        <button onClick={()=> {
            reset()
        } }>
            Reset
        </button>
    </div>   
         )
}

export default HomeError;
