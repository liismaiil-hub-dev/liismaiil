import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaBars } from 'react-icons/fa'

function MenuItem({ item }) {
    const [showMenu, setShowMenu] = useState<Boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setShowMenu((showMenu) => !showMenu)
    }, [router])

    return (<div className={`
                flex  relative h-full items-center p-4 cursor-pointer font-bold
                 text-blue-500 hover:text-blue-500/20 transition-colors ease-in-out transit
                    `} >
        <Link key={`${item}`} href='/' > item </Link>
    </div>

    )
}

export default MenuItem