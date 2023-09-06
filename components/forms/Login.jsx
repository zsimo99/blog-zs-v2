"use client"

import React, { useEffect, useState } from 'react'
import Input from "./input"
import { signIn } from "next-auth/react"
import Providers from '../Providers'

const Login = ({ setPage }) => {
    const [error, setError] = useState(null)
    const [dataForm, setDataForm] = useState({
        email: "", password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await signIn("credentials", { redirect: false, email: dataForm.email, password: dataForm.password })
        if (res?.error) {
            setError(res?.error)
        }
    }
    useEffect(() => {
        if (error) {
            setTimeout(() => setError(null), 3000)
        }
    }, [error])
    return (
        <>
            <form onSubmit={handleSubmit} className='max-w-4xl flex flex-col gap-10'>
                <div className='flex flex-col gap-3'>
                    <Input value={dataForm.email} id={"email"} setDataForm={setDataForm} type="email" text="Your Email" style="bg-white dark:bg-[#202020]" />
                    <Input value={dataForm.password} id={"password"} setDataForm={setDataForm} type="password" text="Password" style="bg-white dark:bg-[#202020]" />
                    {error && <div className=' p-1 px-2 rounded-md text-white bg-red-500'>{error}</div>}
                </div>
                <button className='bg-[#461F7C] text-white transition-colors duration-300 hover:bg-[#502d81] py-2 rounded-lg'>Submit</button>
            </form>
            <div className='text-xl font-semibold text-center mt-4 relative bg-inherit z-0'><span className='bg-white dark:bg-[#202020] px-2'>Or</span> <div className='w-full h-1 bg-gray-500 absolute top-1/2 -translate-y-1/2 -z-10' /></div>
            <Providers />
            <p>Don't have an account? <span className='text-[#461F7C] hover:underline cursor-pointer dark:text-[#9180FF] mt-4' onClick={() => setPage("register")}>Sigup now</span></p>
        </>
    )
}

export default Login