"use client"
import { usePosts } from '@/context/PostContext'
import React from 'react'


const Loader = () => {
    const { status } = usePosts()
    
    if (status !== "create") return null

    return (
        <div className='p-6 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 animate-pulse'>
            <div className='flex items-center gap-3 mb-4'>
                <div className='w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
                <div className='space-y-2'>
                    <div className='w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
                    <div className='w-32 h-3 bg-gray-200 dark:bg-gray-700 rounded'></div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='w-3/4 h-5 bg-gray-200 dark:bg-gray-700 rounded'></div>
                <div className='w-full h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
                <div className='w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
            </div>
        </div>
    )
}

export default Loader