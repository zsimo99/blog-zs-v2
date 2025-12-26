"use client"
import FormControl from './FormControl'
import React, { useState } from 'react'

const Register = ({ setPage, setAlert }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [dataForm, setDataForm] = useState({
        name: "", email: "", password: "", password2: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validation
        if (dataForm.password !== dataForm.password2) {
            setError("Passwords do not match")
            setTimeout(() => setError(null), 3000)
            return
        }
        
        if (dataForm.password.length < 6) {
            setError("Password must be at least 6 characters")
            setTimeout(() => setError(null), 3000)
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/auth/users", {
                method: "POST",
                body: JSON.stringify({ name: dataForm.name, email: dataForm.email, password: dataForm.password })
            }).then(res => res.json())
            
            if (res.user) {
                setAlert("Account created successfully! Please sign in.")
                setPage("login")
            } else if (res.error) {
                setError(res.error)
                setTimeout(() => setError(null), 3000)
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
            setTimeout(() => setError(null), 3000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='space-y-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <FormControl style="bg-white dark:bg-[#1a1a1a]" value={dataForm.name} id={"name"} setDataForm={setDataForm} type="text" text="Full name" />
                <FormControl style="bg-white dark:bg-[#1a1a1a]" value={dataForm.email} id={"email"} setDataForm={setDataForm} type="email" text="Email address" />
                <FormControl style="bg-white dark:bg-[#1a1a1a]" value={dataForm.password} id={"password"} setDataForm={setDataForm} type="password" text="Password" />
                <FormControl style="bg-white dark:bg-[#1a1a1a]" value={dataForm.password2} id={"password2"} setDataForm={setDataForm} type="password" text="Confirm password" />
                
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
                            Creating account...
                        </>
                    ) : 'Create Account'}
                </button>
            </form>
            
            <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
                Already have an account?{' '}
                <button 
                    className='text-[#461F7C] dark:text-purple-400 font-medium hover:underline' 
                    onClick={() => setPage("login")}
                >
                    Sign in
                </button>
            </p>
        </div>
    )
}

export default Register