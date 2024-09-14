import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className='min-h-52 bg-white border md:px-5 lg:px-20 xl:px-40 py-5 flex items-center justify-center flex-col md:flex-row space-y-10 md:space-x-14 lg:space-x-32  xl:space-x-52'>
      <div className="logo w-40 h-fit">
        <Image className='w-full h-full object-cover' src={"/images/Untitled design.jpg"} width={1000} height={1000} alt='logo' />
      </div>
      <div>
        <h4 className='font-bold border-b border-black mb-2'>Get help</h4>
        <div>chat with us</div>
        <div>call us</div>
        <div>Email us</div>
      </div>
      <div>
        <h4 className='font-bold border-b border-black mb-2'>Navigation</h4>
        <div><Link href={"/about"}>About</Link></div>
        <div><Link href={"/shows"}>Shows</Link></div>
        <div><Link href={"/guide"}>Guide</Link></div>
      </div>
      <div>
        <h4 className='font-bold border-b border-black mb-2 flex'>Social links</h4>
        <div className='flex space-x-3'>
          <div><FaInstagram /></div>
          <div><FaGithub /></div>
          <div><FaLinkedin /></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
