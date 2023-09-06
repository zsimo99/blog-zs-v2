"use client"
import Input from './input'
import React, { useState } from 'react'

const Register = ({ setPage, setAlert }) => {
    const [dataForm, setDataForm] = useState({
        name: "", email: "", password: "", password2: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/auth/users", {
            method: "POST",
            body: JSON.stringify({ name: dataForm.name, email: dataForm.email, password: dataForm.password })
        }).then(res => res.json())
        console.log(res)
        if (res.user) {
            setAlert("account has been created")
            setPage("login")
        }
    }
    return (
        <form onSubmit={handleSubmit} className='max-w-4xl flex flex-col gap-10'>
            <div className='flex flex-col gap-3'>
                <Input style="bg-white dark:bg-[#202020]" value={dataForm.name} id={"name"} setDataForm={setDataForm} type="text" text="Your Name" />
                <Input style="bg-white dark:bg-[#202020]" value={dataForm.email} id={"email"} setDataForm={setDataForm} type="email" text="Your Email" />
                <Input style="bg-white dark:bg-[#202020]" value={dataForm.password} id={"password"} setDataForm={setDataForm} type="password" text="Password" />
                <Input style="bg-white dark:bg-[#202020]" value={dataForm.password2} id={"password2"} setDataForm={setDataForm} type="password" text="Confirme Password" />
            </div>
            <button className='bg-[#461F7C] text-white transition-colors duration-300 hover:bg-[#502d81] py-2 rounded-lg'>Submit</button>
            <p>Already have an account? <span className='text-[#461F7C] hover:underline cursor-pointer dark:text-[#9180FF]' onClick={() => setPage("login")}>Login now</span></p>
        </form>
    )
}

export default Register