"use client";
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
    const [login, setLogin] = useState(true);
    const [loginData, setLoginData] = useState({});
    const [signUp, setSignUp] = useState({});
    const [errors, setErrors] = useState([]);
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            console.log(session, "session");
        };
        fetchSession();
    }, []);

    // useEffect(()=>{
    //     const fet
    // },[])

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push('Password must be at least 8 characters long.');
        if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter.');
        if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter.');
        if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number.');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password must contain at least one special character.');
        return errors;
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const getcredentials = async () => {
            const res = await fetch("http://localhost:5000/login", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ username: loginData.username ,password: loginData.password})
            })

            const data = await res.json()
            if (data.user) {
                const login = await signIn("credentials", {
                    username:data.user.username,
                    password:data.user.password,
                    redirect: false
                });
                console.log(login)
            } else {
                toast('Wrong credentials', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
        }
        getcredentials()
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const validationErrors = validatePassword(signUp.password);
        if (validationErrors.length === 0) {
            const sendform = await fetch("http://localhost:5000/signup", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(signUp)
            });
            const data = await sendform.json();
            console.log(data);
            if(data.res){
                toast.success(data.res, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
            setSignUp({});
        } else {
            setErrors(validationErrors);
            console.log(validationErrors, "failed");
        }
    };

    const handleChange = (e) => {
        setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className='flex justify-center items-center min-h-[80svh]'>
            {login ? (
                <div className='border bg-slate-100 px-5 py-10 rounded-lg'>
                    <h1 className='text-center mb-3'>Log in</h1>
                    <form onSubmit={handleForm} className='space-y-3'>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="text"
                                placeholder='username'
                                name='username'
                                value={loginData.username || ""}
                                onChange={(e) => setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                            />
                        </div>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="password"
                                placeholder='password'
                                name='password'
                                value={loginData.password || ""}
                                onChange={(e) => setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                            />
                        </div>
                        <div className='button'>
                            <button
                                type='submit'
                                className='border border-gray-800 w-full my-3 rounded-full bg-purple-500 text-white'
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                    <div>
                        Don't have an account? <button className='text-blue-500' onClick={() => setLogin(false)}>Sign Up</button>
                    </div>
                    <div>
                        <button onClick={signOut}>logout</button>
                    </div>
                </div>
            ) : (
                <div className='border bg-slate-100 px-5 py-10 rounded-lg'>
                    <h1 className='text-center mb-3'>Sign Up</h1>
                    <form onSubmit={handleSignUp} className='space-y-3'>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="text"
                                name='username'
                                placeholder='username'
                                value={signUp.username || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="email"
                                name='email'
                                placeholder='email'
                                value={signUp.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="password"
                                name='password'
                                placeholder='password'
                                value={signUp.password || ""}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.length > 0 && (
                            <div className="text-red-600 max-w-60">
                                <ul className="list-disc space-y-2">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="password"
                                name='confirm'
                                placeholder='confirm password'
                                value={signUp.confirm || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='button'>
                            <button
                                type='submit'
                                className='border border-gray-800 w-full my-3 rounded-full bg-purple-500 text-white'
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div>
                        Already have an account? <button className='text-blue-500' onClick={() => setLogin(true)}>Log in</button>
                    </div>
                </div>
            )}

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    );
}

export default Page;
