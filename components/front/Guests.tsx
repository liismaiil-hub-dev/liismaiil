'use client'
import { GuestType } from '@/api/sprint/sprint.types'
import { FLAG_FILES } from '@/store/constants/flagArray'
import Image from 'next/image'
import { memo, ReactElement, useCallback, useState } from 'react'
const GuestsFrontComp = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 11, 2, 3, 4, 5, 6, 7, 8, 9, 15, 10, 1].map((gust, index) => {

        
        return (<div key={index} className='border cursor-pointer hover:animate-zoomIn
                border-slate-300 hover:border-indigo-300  items-center justify-center   shadow-md shadow-black/10 rounded-full h-20 w-20' onClick={() => guestHandler(gust)} >

            <Image className='rounded-full' src={`/img/flags/${FLAG_FILES[gust]}`} alt={'avatar flalg '} width="400" height="400" />

        </div>)
    })
}
function Guests({ guests }: { guests: GuestType[] }): ReactElement {
    const [guest, setGuest] = useState(0)

    const guestHandler = useCallback((gust: number) => {
        setGuest(gust)
    }, [])
    return (

        <div className="container border-2 border-green-300 flex flex-col  -mt-['30px'] items-center justify-start  " >
            <div className=" flex  justify-between items-center gap-2">
                <input style={{ border: 'solid blue 1px' }} type='text' onChange={(e) => setGuest(e.target?.value!)}
                    placeholder='Guest' className='input' />
                <button onClick={() => guestHandler(guest)} className='btn' > Find guest</button>
            </div>
            <div className="flex mt-4 justify-start w-full px-4 h-36 flex-wrap
             flex-row items-center gap-4  py-3">
                {GuestsFrontComp()}

            </div>

        </div >

    )
}
const MemoizedGuests = memo(Guests)
export default MemoizedGuests