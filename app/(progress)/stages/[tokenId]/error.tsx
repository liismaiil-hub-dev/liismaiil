'use client'

function HomeError({ reset } : { reset: ()  => void }) {
    return (
        <div className="flex justify-center items-center">
            <button onClick={() => {
                reset()
            }}>
                Reset
            </button>
        </div>
    )
}

export default HomeError;
