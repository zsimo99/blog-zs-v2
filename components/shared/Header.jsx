"use client"
import Link from 'next/link'
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from 'react'
import { links } from '@/constants'
import DarkModeToggle from '../DarkModeToggle'
import { useSession, signOut } from 'next-auth/react'


const Header = () => {
    const { status, data: session } = useSession()
    const [show, setShow] = useState(false)
    const [auth, setAuth] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const path = usePathname()

    useEffect(() => {
        if (session) setAuth(true)
    }, [session])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed top-0 left-0 z-[999] w-full transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-[#0a0a0a]/90 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-[#0a0a0a]'} border-b border-gray-200 dark:border-gray-800/50`}>
            <div className="container flex justify-between items-center mx-auto w-full px-4 py-3">
                <Link href="/" className='flex items-baseline gap-0.5 group'>
                    <span className='text-2xl font-bold text-[#461F7C] dark:text-white transition-colors'>DEV</span>
                    <span className='text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-[#461F7C] dark:group-hover:text-purple-400 transition-colors'>Blog</span>
                </Link>
                
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setShow(!show)} 
                    className='flex flex-col justify-center items-center w-10 h-10 md:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                    aria-label="Toggle menu"
                >
                    <span className={`w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${show && "translate-y-1.5 rotate-45"}`}></span>
                    <span className={`w-5 h-0.5 bg-gray-600 dark:bg-gray-300 my-1 transition-all duration-300 ${show && "opacity-0"}`}></span>
                    <span className={`w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${show && "-translate-y-1.5 -rotate-45"}`}></span>
                </button>

                {/* Navigation */}
                <nav className={`flex md:items-center md:gap-1 max-md:absolute max-md:flex-col max-md:right-0 max-md:top-full max-md:w-full max-md:transition-all max-md:duration-300 max-md:origin-top max-md:bg-white max-md:dark:bg-[#0a0a0a] max-md:border-b max-md:border-gray-300 max-md:dark:border-gray-800 max-md:shadow-md ${!show && "max-md:scale-y-0 max-md:opacity-0"}`}>
                    <div className='max-md:p-4 max-md:border-b max-md:border-gray-100 max-md:dark:border-gray-800'>
                        <DarkModeToggle />
                    </div>
                    {links.map(link =>
                        <Link 
                            key={link.id}
                            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 max-md:block max-md:py-3 max-md:px-6 max-md:border-b max-md:border-gray-100 max-md:dark:border-gray-800 max-md:rounded-none
                                ${(((link.url.length > 1) && (path.includes(link.url))) || link.url === path) 
                                    ? "text-[#461F7C] dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20" 
                                    : "text-gray-600 dark:text-gray-300 hover:text-[#461F7C] dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                }`}
                            href={link.url}
                            onClick={() => setShow(false)}
                        >
                            {link.title}
                        </Link>
                    )}
                    {auth ? (
                        <button 
                            className='px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 max-md:w-full max-md:text-left max-md:py-3 max-md:px-6 max-md:rounded-none' 
                            onClick={() => { signOut(); setShow(false); }}
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link 
                            className='px-4 py-2 text-sm font-medium text-white bg-[#461F7C] hover:bg-[#5a2d9e] rounded-lg transition-all duration-200 max-md:mx-4 max-md:my-3 max-md:text-center' 
                            href="/dashboard/auth"
                            onClick={() => setShow(false)}
                        >
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header