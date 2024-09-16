"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavLink from './NavLink'
import Hamburger from 'hamburger-react'
import { useRouter } from 'next/navigation'
import { getSession, signOut } from 'next-auth/react'


function Navbar() {
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()
  const [session, setSession] = useState(null)

  const fetchSession = async () => {
    const session = await getSession();
    console.log(session, "session");
   setSession(session)
  };
  useEffect(() => {
    fetchSession();
  }, [router]);

  return (
    <header className='sticky top-0 z-50'>
      <nav className='border-0 shadow-md flex items-center justify-around bg-white  w-full relative'>
        <div onClick={() => setOpen(false)} className="logo h-20  ">
          <Link href={"/"}>
            <Image className='h-full w-full object-cover' src={"/images/Untitled design.jpg"} width={1000} height={1000} alt='logo' />
          </Link>
        </div>
        <ul className={`navigation flex space-y-3 md:space-y-0 md:space-x-5 font-bold py-5 md:p-0 top-[100%] items-center  shadow-lg md:shadow-none bg-white left-0 w-full md:w-auto flex-col md:flex-row absolute  md:static transition-transform duration-500 ${isOpen ? "scale-y-100" : "scale-y-0"} origin-top  md:scale-100`}>
          <NavLink link={"/about"} page={"About"} fun={setOpen} />
          <NavLink link={"#"} page={"Shows"} fun={setOpen} />
          <NavLink link={"#"} page={"Booked Tickets"} fun={setOpen} />
          <NavLink link={"#"} page={"Guide"} fun={setOpen} />
          {session?.user?<button onClick={signOut}>Logout</button>:<NavLink link={"/login"} page={"Login"} fun={setOpen} />}
        </ul>
        <span className=' md:hidden'><Hamburger toggled={isOpen} toggle={setOpen} /></span>
      </nav>
    </header>
  )
}

export default Navbar
