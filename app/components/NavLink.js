import Link from 'next/link'
import React from 'react'

function NavLink({link,page}) {
    return (
        <li className=' hover:text-gray-500 transition duration-500'>
            <Link href={link}>{page}</Link>
        </li>
    )
}

export default NavLink
