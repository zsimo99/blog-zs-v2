"use client"
import React, { useState } from 'react'
import Login from "@/components/forms/Login"
import Register from '@/components/forms/Register'
import { redirect, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const AuthPage = () => {
    const { status } = useSession()
    const searchParams = useSearchParams()
    const formName = searchParams.get("formName")

    const [alert, setAlert] = useState(null)
    const [page, setPage] = useState(formName || "login")

    if (status && status === "authenticated") return redirect("/dashboard")

    return (
        <div className='min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-8'>
            <div className='w-full max-w-5xl'>
                <div className='relative pres md:flex bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-card-hover overflow-hidden border border-gray-100 dark:border-gray-800'>
                    {/* Login Panel */}
                    <div className={`flex-1 p-8 md:p-12 ${page === "register" && "max-md:hidden"}`}>
                        <div className='max-w-sm mx-auto'>
                            <div className='text-center mb-8'>
                                <div className='w-16 h-16 bg-gradient-to-br from-[#461F7C] to-[#9180FF] rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                    <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                                    </svg>
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Welcome Back</h2>
                                <p className='text-gray-500 dark:text-gray-400 mt-1'>Sign in to continue to DEV Blog</p>
                            </div>
                            {alert && (
                                <div className='mb-4 py-3 px-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm rounded-xl'>
                                    {alert}
                                </div>
                            )}
                            {page === "login" && <Login setPage={setPage} />}
                        </div>
                    </div>
                    
                    {/* Register Panel */}
                    <div className={`flex-1 p-8 md:p-12 ${page === "register" ? "max-md:block" : "max-md:hidden"}`}>
                        <div className='max-w-sm mx-auto'>
                            <div className='text-center mb-8'>
                                <div className='w-16 h-16 bg-gradient-to-br from-[#9180FF] to-[#461F7C] rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                    <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                                    </svg>
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Create Account</h2>
                                <p className='text-gray-500 dark:text-gray-400 mt-1'>Join the DEV Blog community</p>
                            </div>
                            {page === "register" && <Register setPage={setPage} setAlert={setAlert} />}
                        </div>
                    </div>
                    
                    {/* Decorative Panel */}
                    <div className={`max-md:hidden cont relative text-white ${page === "register" && "rotate"}`}>
                        <div className='backFace'>
                            <img className='absolute w-full h-full object-cover' src="/zsimo.png" alt="decoration" />
                        </div>
                        <div className='frontFace'>
                            <img className='absolute w-full h-full object-cover' src="/zsimo.png" alt="decoration" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage