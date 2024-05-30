
function GridLayout({ children }) {

    return (
        <main className='min-h-screen  font-mont overflow-x-hidden flex-col justify-center items-center '>

            <div className="fixed w-full h-full right-0">
                {children}
            </div>
        </main >
    )
}

export default GridLayout