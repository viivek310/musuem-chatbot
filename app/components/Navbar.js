import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLink from './NavLink'

function Navbar() {
  return (
    <header>
      <nav className='border-2 shadow-md flex items-center justify-around bg-white'>
        <div className="logo h-20  ">
            <Image className='h-full w-full object-cover' src={"/images/Untitled design.jpg"} width={1000} height={1000} alt='logo'/>
        </div>
        <ul className="navigation flex space-x-10 font-bold">
            <NavLink link={"/about"} page={"About"} />
            <NavLink link={"/about"} page={"Shows"} />
            <NavLink link={"/about"} page={"Booked Tickets"} />
            <NavLink link={"/about"} page={"Guide"} />
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
