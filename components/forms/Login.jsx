"use client"

import React, { useEffect, useState } from 'react'
import { signIn } from "next-auth/react"
import Providers from '../Providers'
import FormControl from './FormControl'

const Login = ({ setPage }) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dataForm, setDataForm] = useState({
        email: "", password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await signIn("credentials", { redirect: false, email: dataForm.email, password: dataForm.password })
        setLoading(false)
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
        <div className='space-y-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <FormControl value={dataForm.email} id={"email"} setDataForm={setDataForm} type="email" text="Email address" style="bg-white dark:bg-[#1a1a1a]" />
                <FormControl value={dataForm.password} id={"password"} setDataForm={setDataForm} type="password" text="Password" style="bg-white dark:bg-[#1a1a1a]" />
                
                {error && (
                    <div className='py-2 px-3 rounded-lg text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
                        {error}
                    </div>
                )}
                
                <button 
                    disabled={loading}
                    className='w-full py-3 bg-[#461F7C] text-white font-semibold rounded-xl hover:bg-[#5a2d9e] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                    {loading ? (
                        <>
                            <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
                            Signing in...
                        </>
                    ) : 'Sign In'}
                </button>
            </form>
            
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-200 dark:border-gray-700'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                    <span className='px-4 bg-white dark:bg-[#1a1a1a] text-gray-500'>Or continue with</span>
                </div>
            </div>
            
            <Providers />
            
            <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
                Don&apos;t have an account?{' '}
                <button 
                    className='text-[#461F7C] dark:text-purple-400 font-medium hover:underline' 
                    onClick={() => setPage("register")}
                >
                    Sign up
                </button>
            </p>
        </div>
    )
}

export default Login