"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Search = () => {
    const searchParams = useSearchParams()
    const searchValue = searchParams.get("search")
    const router = useRouter()
    const [search, setSearch] = useState(searchValue || "")
    const [alert, setAlert] = useState("")
    const handleSubmi = (e) => {
        e.preventDefault()
        if (search === "") {
            setAlert("test")
            return setTimeout(() => {
                setAlert("")
            }, 3000)
        }
        router.push(`/blog/?search=${search.replace(/ /g, "+")}`)
    }
    useEffect(() => {
        if (searchValue) setSearch(searchValue)
    }, [searchValue])
    return (
        <div>
            {alert && <div className='py-1 px-4 bg-red-400 text-lg text-white font-normal rounded-md mb-3'>{alert}</div>}
            <form onSubmit={handleSubmi} className='flex border-2 border-b-8 border-r-8 rounded-xl border-[#461F7C] dark:border-[#303030]'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='text-[#461F7C] bg-transparent w-9/12 sm:w-10/12 px-8 py-4  outline-none  font-semibold text-lg md:text-xl lg:text-2xl dark:text-gray-300 placeholder:dark:text-gray-300 placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-0' placeholder='Search' />
                <button type='submit' className='bg-[#461F7C] hover:bg-[#59338f] text-white dark:bg-[#303030] w-3/12 sm:w-2/12 transition-colors duration-300 dark:hover:bg-[#404040] text-lg md:text-xl lg:text-2xl'>Search</button>
            </form>
        </div>
    )
}

export default Search