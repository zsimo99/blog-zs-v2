"use client"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Pagination = ({ length }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pageN = +searchParams.get("page")
    const search = searchParams.get("search")
    const [page, setPage] = useState(pageN || 0)

    const numberOfPages = Math.floor(length / 10)

    const handleNavigate = (where) => {
        let targetPage
        if (where === "prev") {
            if ((page - 1) < 0) return
            targetPage = page - 1
            setPage(prev => --prev)
        }
        if (where === "next") {
            if ((page + 1) > numberOfPages) return
            targetPage = page + 1
            setPage(prev => ++prev)
        }
        router.push(`/blog?${search ? `search=${search}&` : ""}page=${targetPage}`)
    }

    useEffect(() => {
        if (page > numberOfPages) setPage(numberOfPages)
        if (page < 0) setPage(0)
    }, [page, length, numberOfPages])

    if (length <= 10) return null

    return (
        <div className='flex items-center justify-center gap-2 mt-8'>
            <button 
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${(page - 1) < 0 ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed" : "bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"}`} 
                onClick={() => handleNavigate("prev")}
                disabled={(page - 1) < 0}
            >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
                Previous
            </button>
            
            <div className='flex items-center gap-1 px-4'>
                <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>Page</span>
                <span className='px-3 py-1 bg-[#461F7C] text-white rounded-lg font-semibold text-sm'>{page + 1}</span>
                <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>of {numberOfPages + 1}</span>
            </div>
            
            <button 
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${(page + 1) > numberOfPages ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed" : "bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"}`} 
                onClick={() => handleNavigate("next")}
                disabled={(page + 1) > numberOfPages}
            >
                Next
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
            </button>
        </div>
    )
}

export default Pagination