"use client"
import { useDarkMode } from '@/context/ThemeContext'
import React, { useEffect, useState } from 'react'

const DarkModeToggle = () => {
    const { isDark, toggleDarkMode } = useDarkMode()
    useEffect(() => {
        const html = document.querySelector("html")
        if (isDark && !html.classList.contains("dark")) {
            html.classList.add("dark")
        } else {
            html.classList.remove("dark")
        }
    }, [isDark])
    return (
        <div className='w-10 h-2 cursor-pointer bg-[#525252] relative rounded-lg' onClick={toggleDarkMode}>
            <div className={`text-xs transition-[left background-color] duration-300 p-0.5 absolute w-fit aspect-square rounded-full  top-1/2 -translate-y-1/2 ${isDark ? "bg-[#000000] left-0" : "bg-[#a5a5a5] left-[calc(40px-50%)]"}`}>{isDark ? "🌙" : "☀️"}</div>
        </div>
    )
}

export default DarkModeToggle