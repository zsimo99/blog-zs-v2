"use client"
import React, { useEffect, useState } from 'react'

const FormControl = ({ id, type, value, setDataForm, text, style }) => {
    const [onTop, setOnTop] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => {
        setOnTop(true)
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
        if (value.length === 0) {
            setOnTop(false)
        }
    }

    useEffect(() => {
        if (value) setOnTop(true)
    }, [value])

    return (
        <div className='relative'>
            <label 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    onTop 
                        ? `text-xs -top-2.5 ${style} px-2 text-[#461F7C] dark:text-purple-400 font-medium` 
                        : "top-1/2 -translate-y-1/2 text-gray-400"
                }`} 
                htmlFor={id}
            >
                {text}
            </label>
            <input 
                onFocus={handleFocus} 
                onBlur={handleBlur} 
                className={`w-full h-12 bg-transparent outline-none rounded-xl border-2 px-4 transition-all duration-200 text-gray-900 dark:text-gray-100 ${
                    isFocused 
                        ? 'border-[#461F7C] dark:border-purple-500' 
                        : 'border-gray-300 dark:border-gray-700'
                }`} 
                type={type} 
                id={id} 
                name={id} 
                value={value} 
                onChange={(e) => setDataForm(prev => ({ ...prev, [e.target.name]: e.target.value }))} 
            />
        </div>
    )
}

export default FormControl