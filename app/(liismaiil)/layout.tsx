import ErrorBoundaryComp from "@/components/front/ErrorBoundaryComp"
import { ErrorBoundary } from 'react-error-boundary'
import SideBar from '@/components/front/SideBar'
import { ReactNode } from "react"

function LiismaiilLayout({ children }: { children: ReactNode }) {

    return (
        <main className='h-screen w-full font-mont  '>

            <ErrorBoundary fallback={<ErrorBoundaryComp />}>

                <main className="relative grid  sm:flex-col grid-cols-[250px_1fr] mt-[25px]  ">
                    <div className='sm:hidden'>
                        <SideBar />
                    </div>

                    <div className='bg-violet-20  overflow-x-hidden w-full h-full'>
                        {children}
                    </div>
                </main>
            </ErrorBoundary>
        </main>

    )
}

export default LiismaiilLayout