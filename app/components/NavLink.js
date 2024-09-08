import Link from 'next/link'
import React from 'react'

function NavLink({link,page}) {
    return (
        <li className='hover:scale-105 transition-transform duration-500 hover:text-gray-700'>
            <Link href={link}>{page}</Link>
        </li>
    )
}

export default NavLink
