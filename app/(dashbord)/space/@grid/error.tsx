'use client'

function SpaceGridError({ error, reset }) {
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

export default SpaceGridError;
