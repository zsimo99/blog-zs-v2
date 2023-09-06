"use client"
import React, { useEffect, useState } from 'react'

const input = ({ id, type, value, setDataForm, text, style }) => {
    const [onTop, setOnTop] = useState(false)
    const handleClick = () => setOnTop(true)
    const handleBlur = () => {
        if (value.length === 0) {
            setOnTop(false)
        }
    }
    useEffect(() => {
        if (value) setOnTop(true)
    }, [])
    return (
        <div className='relative w-full h-10 z-0'>
            <label className={`-translate-y-1/2 text-sm font-medium left-2 transition-[font-size top] duration-200 absolute ${onTop ? `text-xs ${style} px-1 top-0 z-10` : " -z-10 top-1/2"}`} htmlFor={id}>{text}</label>
            <input onClick={handleClick} onBlur={handleBlur} className='w-full h-full top-0 left-0 bg-transparent outline-none rounded-md border-[3px] border-b-[5px] text-sm border-[#461F7C] p-2' type={type} id={id} name={id} value={value} onChange={(e) => setDataForm(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
        </div>
    )
}

export default input    