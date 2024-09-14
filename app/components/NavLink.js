"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

function NavLink({link,page,fun}) {
    const path = usePathname()
    const handleclick=()=>{
        fun(false)
    }
    return (
        <li onClick={handleclick} className={`${path!==link&&"hover:text-gray-500"}  transition duration-500 rounded-full px-2 py-1 ${path===link&&"bg-purple-600 text-white "}`}>
            <Link href={link}>{page}</Link>
        </li>
    )
}

export default NavLink
