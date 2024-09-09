"use client"
import React, { useState } from 'react'

function Page() {
    const [login, setLogin] = useState(true)
    const [formdata,setFormdata] = useState("")
  return (
    <div className='flex justify-center items-center'>
        <div className="login">
            <div>
                {/* <input type="text" name='username' value={username} onChange={(e)=>setFormdata(prev=>({...prev,[e.target.name]:e.target.value}))}/> */}
            </div>
        </div>
    </div>
  )
}

export default Page
