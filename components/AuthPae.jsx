"use client"
import React, { useState } from 'react'
import Login from "@/components/forms/Login"
import Register from '@/components/forms/Register'
import { redirect, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const AuthPae = () => {
    const { status } = useSession()
    const searchParams = useSearchParams()
    const formName = searchParams.get("formName")

    const [alert, setAlert] = useState(null)
    const [page, setPage] = useState(formName || "login")

    if (status && status === "authenticated") return redirect("/dashboard")

    return (
        <>
            <div className='translate-y-24 container mx-auto  p-4 md:px-10 lg:px-20 xl:px-48  '>
                <div className='relative pres md:flex transition-[background-color] duration-300 bg-white dark:bg-[#202020] py-7 rounded-lg'>
                    <div className={`min-h-[400px] md:basis-1/2 px-10 ${page === "register" && "max-md:hidden"}`}>
                        <h2 className='text-4xl text-center mb-7'>Login</h2>
                        {alert && <div className='bg-green-500 text-white py-1 px-2 rounded-md mb-4'>{alert}</div>}
                        {page === "login" && <Login setPage={setPage} />}
                    </div>
                    <div className={`min-h-[400px] md:basis-1/2 px-10 ${page === "register" ? "max-md:block" : "max-md:hidden"}`}>
                        <h2 className='text-4xl text-center mb-7'>Register</h2>
                        {page === "register" && <Register setPage={setPage} setAlert={setAlert} />}
                    </div>
                    <div className={`max-md:hidden cont relative text-white ${page === "register" && "rotate"}`} >
                        <div className='backFace'>
                            <img className=' absolute w-full h-full object-cover' src="/zsimo.png" alt="tzz " />
                        </div>
                        <div className='frontFace'>
                            <img className='absolute w-full h-full object-cover' src="/zsimo.png" alt="tzz" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthPae