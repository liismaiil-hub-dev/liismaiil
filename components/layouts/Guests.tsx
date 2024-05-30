'use client'
import { useEffect, useState } from 'react'

import { FLAG_FILES } from '@/store/constants/flagArray'
import { GuestType } from 'app/api/sprint/sprint.types'
export default function Guests({ guests }: { guests: GuestType[] }) {
    const [guest, setGuest] = useState('')
    useEffect(() => {
        console.log(guest)
    }, [guest])
    const guestHandler = () => {

    }
    return (

        <div
            className="mx-20 max-w-full border-t-2 border-teal-700/50 h-10 
            bg-slate-400 border-slate-300 hover:border-indigo-300 flex 
            flex-col rounded-sm 
            items-center justify-start  
            min-h-[400px] bg-fixed bg-center " >
            <div className="mb-4 mt-4 flex gap-2 mb-20">
                <input type='text' onChange={(e) => setGuest(e.target.value)}
                    placeholder='Guest' className='input' />
                <div onClick={guestHandler} className='btn' > Find guest</div>
            </div>
            <div className="flex mt-4 justify-start w-full px-4 h-36
            snap-x overflow-x-auto
             flex-row items-center gap-4 pb-10">

                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 11, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1].map((gust, index) =>
                        <div key={index} style={{ "backgroundImage": `url(/assets/img/flags/${FLAG_FILES[gust]})` }}
                            onClick={() => setGuest(gust)}
                            className=' border cursor-pointer hover:animate-zoomIn
                border-slate-300 hover:border-indigo-300
                items-center justify-center snap-center bg-cover bg-center shadow-md shadow-black/10
                     p-8 rounded-full h-20 w-20 ' > {gust}</div>)
                }
            </div>

        </div >

    )
}

