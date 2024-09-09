"use client"
import React, { useState } from 'react'

function Page() {
    const [login, setLogin] = useState(true)
    const [loginData, setLoginData] = useState({})
    const [signUp, setSignUp] = useState({})

    const handleform = async(e) => {
        e.preventDefault()
        const sendform = await fetch("http://localhost:5000/signup",{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify()
        })
        const data = await sendform.json()
        console.log(loginData)
        setLoginData({})
    }
    const handleSignUp = async(e) => {
        e.preventDefault()
        const sendform = await fetch("http://localhost:5000/signup",{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(signUp)
        })
        const data = await sendform.json()
        console.log(data)
        setSignUp({})
    }
    return (
        <div className='flex justify-center items-center min-h-[80svh]'>
            {login ? <div className='border bg-slate-100 px-5 py-10 rounded-lg'>
                <h1 className='text-center mb-3'>Log in</h1>
                <form onSubmit={handleform} className='space-y-3'>
                    <div>
                        <input className='w-full border border-black rounded-lg px-3' type="text" placeholder='username' name='username' value={loginData.username || ""} onChange={(e) => setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div>
                        <input className='w-full border border-black rounded-lg px-3' type="password" name='password' value={loginData.password || ""} onChange={(e) => setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div className='button'>
                        <button type='submit' className='border border-gray-800 w-full my-3 rounded-full bg-purple-500 text-white'>Log in </button>
                    </div>
                </form>
                <div>
                    Don't have an account? <button className='text-blue-500' onClick={()=>setLogin(false)}>Sign Up</button>
                </div>
            </div>
                :
                <div className='border bg-slate-100 px-5 py-10 rounded-lg'>
                    <h1 className='text-center mb-3'>Sign Up</h1>
                    <form onSubmit={handleSignUp}  className='space-y-3'>
                    <div>
                        <input className='w-full border border-black rounded-lg px-3' type="text" name='username' placeholder='username' value={signUp.username || ""} onChange={(e) => setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div>
                        <input className='w-full border border-black rounded-lg px-3' type="mail" name='email' value={signUp.email || ""} onChange={(e) => setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div>
                        <input className='w-full border border-black rounded-lg px-3' type="password" name='password' value={signUp.password || ""} onChange={(e) => setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div>
                        <input className='w-full border border-black rounded-lg px-3' type="password" name='confirm-password' value={signUp.confirm-password || ""} onChange={(e) => setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div className='button'>
                        <button type='submit' className='border border-gray-800 w-full my-3 rounded-full bg-purple-500 text-white'>Register</button>
                    </div>
                </form>
                <div>
                    Already have an account? <button className='text-blue-500' onClick={()=>setLogin(true)}>Log in</button>
                </div>
                </div>
            }

        </div>
    )
}

export default Page
