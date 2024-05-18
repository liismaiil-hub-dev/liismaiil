import React from 'react'
import Link from 'next/link'
function LinkButton({ href, content }: { href: string, content: string }) {
    return (
        <Link href={`${href}`} className='bg-green-500 text-white tracking-wider w-full text-center font-bold cursor-pointer uppercase px-4 py-2 rounded-md
    hover:bg-green-600 transition-colors block'>{content}</Link>
    )
}

export default LinkButton