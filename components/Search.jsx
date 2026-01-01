"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Search = () => {
    const searchParams = useSearchParams()
    const searchValue = searchParams.get("search")
    const router = useRouter()
    const [search, setSearch] = useState(searchValue || "")
    const [alert, setAlert] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search.trim() === "") {
            setAlert("Please enter a search term")
            return setTimeout(() => {
                setAlert("")
            }, 3000)
        }
        router.push(`/blog/?search=${search.trim().replace(/ /g, "+")}`)
    }

    useEffect(() => {
        if (searchValue) setSearch(searchValue)
    }, [searchValue])

    return (
        <div className='w-full'>
            {alert && (
                <div className='mb-4 py-2 px-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg animate-fade-in'>
                    {alert}
                </div>
            )}
            <form onSubmit={handleSubmit} className={`flex items-stretch overflow-hidden rounded-xl border-2 transition-all duration-200 ${isFocused ? 'border-[#461F7C] dark:border-purple-500 shadow-lg shadow-purple-500/10' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-[#1a1a1a]`}>
                <div className='flex-1 flex items-center px-4'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                    </svg>
                    <input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        type="text" 
                        className='flex-1 bg-transparent px-3 py-4 outline-none text-gray-800 dark:text-gray-200 text-base md:text-lg  placeholder:text-gray-400 dark:placeholder:text-gray-500' 
                        placeholder='Search posts, tags, or topics...' 
                    />
                </div>
                <button 
                    type='submit' 
                    className='px-6 md:px-8 bg-[#461F7C] hover:bg-[#5a2d9e] text-white font-semibold text-base transition-colors duration-200'
                >
                    Search
                </button>
            </form>
        </div>
    )
}

export default Search