"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import NavLink from './NavLink'
import Hamburger from 'hamburger-react'

function Navbar() {
  const [isOpen, setOpen] = useState(false)
  return (
    <header className='sticky top-0 z-50'>
      <nav className='border-2 shadow-md flex items-center justify-around bg-white  w-full relative'>
        <div className="logo h-20  ">
            <Link href={"/"}>
              <Image className='h-full w-full object-cover' src={"/images/Untitled design.jpg"} width={1000} height={1000} alt='logo'/>
            </Link>
        </div>
        <ul className={`navigation flex space-y-3 md:space-y-0 md:space-x-5 font-bold py-5 md:p-0 top-[100%] items-center  shadow-lg md:shadow-none bg-white left-0 w-full md:w-auto flex-col md:flex-row absolute  md:static transition-transform duration-500 ${isOpen?"scale-y-100":"scale-y-0"} origin-top  md:scale-100`}>
            <NavLink link={"/about"} page={"About"} />
            <NavLink link={"#"} page={"Shows"} />
            <NavLink link={"#"} page={"Booked Tickets"} />
            <NavLink link={"#"} page={"Guide"} />
            <NavLink link={"/login"} page={"Login"} />
        </ul>
        <span className=' md:hidden'><Hamburger toggled={isOpen} toggle={setOpen} /></span>
      </nav>
    </header>
  )
}

export default Navbar
