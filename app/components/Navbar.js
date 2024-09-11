"use client "
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import NavLink from './NavLink'

function Navbar() {
  
  return (
    <header className='sticky top-0 z-50'>
      <nav className='border-2 shadow-md flex items-center justify-around bg-white  w-full'>
        <div className="logo h-20  ">
            <Link href={"/"}>
              <Image className='h-full w-full object-cover' src={"/images/Untitled design.jpg"} width={1000} height={1000} alt='logo'/>
            </Link>
        </div>
        <ul className="navigation flex space-x-5 font-bold">
            <NavLink link={"/about"} page={"About"} />
            <NavLink link={"#"} page={"Shows"} />
            <NavLink link={"#"} page={"Booked Tickets"} />
            <NavLink link={"#"} page={"Guide"} />
            <NavLink link={"/login"} page={"Login"} />
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
