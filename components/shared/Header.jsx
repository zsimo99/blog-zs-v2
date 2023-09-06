"use client"
import Link from 'next/link'
import { usePathname } from "next/navigation"
import React, { useState } from 'react'
import { links } from '@/constants'
import DarkModeToggle from '../DarkModeToggle'
import { useSession, signOut } from 'next-auth/react'


const Header = () => {
    const { status } = useSession()
    const [show, setShow] = useState(false)
    const path = usePathname()
    return (
        <header className={`bg-[#461f7c] top-0 left-0 transition-colors duration-200 shadow-md  text-white fixed z-[999] w-full ${!show && "rounded-b-xl"} dark:bg-[#202020]`}>
            <div className="container flex justify-between items-center mx-auto w-full p-4 relative">
                <div>
                    <Link href="/" className='text-2xl  font-bold tracking-tighter'>DEV<span className='ml-0.5 text-xs translate-y-2 inline-block tracking-tight'>Blog</span></Link>
                </div>
                <div onClick={() => setShow(!show)} className='flex flex-col justify-between h-[23px] md:hidden cursor-pointer'>
                    <span className={`w-8 h-[3px] transition-[transform] duration-200 bg-white ${show && "translate-y-[10px] rotate-45"}`}></span>
                    <span className={`w-8 h-[3px] transition-[transform] duration-200 bg-white ${show && "opacity-0"}`}></span>
                    <span className={`w-8 h-[3px] transition-[transform] duration-200 bg-white ${show && "-translate-y-[10px] -rotate-45"}`}></span>
                </div>
                <ul className={`flex md:items-center md:gap-4 max-md:absolute max-md:flex-col right-0 top-full md:scale-100 max-md:w-full max-md:transition-[transform] max-md:duration-300 text-[#d6d6d6] origin-top max-md:bg-[#3d2166]  dark:max-md:bg-[#111111] ${!show && "scale-y-0"}`}>
                    <li className='max-md:order-last max-md:p-4 max-md:pb-4'>
                        <DarkModeToggle />
                    </li>
                    {links.map(link =>
                        <li className='md:relative' key={link.id}>
                            <Link className={`max-md:p-2 block max-md:border-b max-md:border-b-gray-300 hover:text-[#fff]  transition-[color] duration-100 ${(((link.url.length > 1) && (path.includes(link.url))) ? "text-white " : "") || link.url === path && "text-white "}`} href={link.url}>{link.title}</Link>
                            {((link.url.length > 1 && path.includes(link.url)) || link.url === path) && <div className='max-md:hidden absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-white ' />}
                        </li>)}
                    {/* <Link href={!session ? "/dashboard/auth" : "/logout"}>{!session ? "login" : "logout"}</Link> */}
                    {status === "authenticated" ? <li><button className='max-md:p-2 block max-md:border-b max-md:border-b-gray-300 hover:text-[#fff] w-full text-start  transition-[color] duration-100' onClick={signOut}>SignOut</button></li> : <li><Link className='max-md:p-2 block max-md:border-b max-md:border-b-gray-300 hover:text-[#fff]  transition-[color] duration-100' href="/dashboard/auth">Login</Link></li>}
                </ul>
            </div>
        </header>
    )
}

export default Header