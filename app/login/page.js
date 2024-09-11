"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

function Page() {
    const [login, setLogin] = useState(true)
    const [loginData, setLoginData] = useState({})
    const [signUp, setSignUp] = useState({})
    const [errors, setErrors] = useState([]);

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter.');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number.');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character.');
        }
        return errors;
    };

    const handleform = async (e) => {
        // e.preventDefault()
        // const sendform = await fetch("http://localhost:5000/signup", {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: "POST",
        //     body: JSON.stringify()
        // })
        // const data = await sendform.json()
        // console.log(loginData.username)
        const res = await signIn("credentials", {
            username: loginData.username,
            password: loginData.password,
            redirect: false
          })

          const session = await getSession()
      const email = session?.user?.email
          console.log(res,"user",email)
          
        setLoginData({})
    }
    const handleSignUp = async (e) => {
        if(!errors){
            console.log(errors)
            const sendform = await fetch("http://localhost:5000/signup", {
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
        }else{
            console.log(errors,"failed")
        }
    }

    const handleChange = (e) => {
        setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setErrors(validatePassword(e.target.value));
      };

    //   const handelSignIn = async (e) => {
    //     e.preventDefault()
    //     const res = await signIn("credentials", {
    //       username,
    //       password,
    //       redirect: false
    //     })
    //     console.log(res)
    //     // if (res.error) {
    //     //   toast.error(res.error.replace("Error:", ""), {
    //     //     position: "bottom-center",
    //     //     autoClose: 3000,
    //     //     hideProgressBar: false,
    //     //     closeOnClick: true,
    //     //     pauseOnHover: true,
    //     //     draggable: true,
    //     //     progress: undefined,
    //     //     theme: "light",
    //     //     transition: Bounce,
    //     //   });
    //     // }
    //   }
    return (
        <div className='flex justify-center items-center min-h-[80svh]'>
            {login ? <div className='border bg-slate-100 px-5 py-10 rounded-lg'>
                <h1 className='text-center mb-3'>Log in</h1>
                <form action={handleform} className='space-y-3'>
                    <div>
                        <input className='w-full border border-black rounded-lg px-3' type="text" placeholder='username' name='username' value={loginData.username || ""} onChange={(e) => setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div>
                        <input className='w-full border border-black rounded-lg px-3' type="password" placeholder='password' name='password' value={loginData.password || ""} onChange={(e) => setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div className='button'>
                        <button type='submit' className='border border-gray-800 w-full my-3 rounded-full bg-purple-500 text-white'>Log in </button>
                    </div>
                </form>
                <div>
                    Don't have an account? <button className='text-blue-500' onClick={() => setLogin(false)}>Sign Up</button>
                </div>
                <div>
                    <button onClick={signOut}>logout</button>
                </div>
            </div>
                :
                <div className='border bg-slate-100 px-5 py-10 rounded-lg'>
                    <h1 className='text-center mb-3'>Sign Up</h1>
                    <form action={handleSignUp} className='space-y-3'>
                        <div>
                            <input className='w-full border border-black rounded-lg px-3' type="text" name='username' placeholder='username' value={signUp.username || ""} onChange={(e) => setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                        </div>
                        <div>
                            <input className='w-full border border-black rounded-lg px-3' type="email" name='email' placeholder='email' value={signUp.email || ""} onChange={(e) => setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                        </div>
                        <div>
                            <input className='w-full border border-black rounded-lg px-3' type="password" name='password' placeholder='password' value={signUp.password || ""} onChange={handleChange} />
                        </div>
                        {errors.length > 0 && <div className="text-red-600 max-w-60">
                            <ul className="list-disc space-y-2">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>}
                        <div>
                            <input className='w-full border border-black rounded-lg px-3' type="password" name='confirm' placeholder='confirm password' value={signUp.confirm || ""} onChange={(e) => setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                        </div>
                        <div className='button'>
                            <button type='submit' className='border border-gray-800 w-full my-3 rounded-full bg-purple-500 text-white'>Register</button>
                        </div>
                    </form>
                    <div>
                        Already have an account? <button className='text-blue-500' onClick={() => setLogin(true)}>Log in</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default Page
