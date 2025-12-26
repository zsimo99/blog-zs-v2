"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Tags = ({ tags }) => {
    const router = useRouter()
    return (
        <div className='flex flex-wrap gap-2'>
            {tags.map((tag, i) => (
                <button 
                    key={i}
                    onClick={() => router.replace(`/blog?search=${tag}`)} 
                    className='text-sm font-medium text-[#461F7C] dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 px-3 py-1 rounded-full transition-colors'
                >
                    #{tag}
                </button>
            ))}
        </div>
    )
}

export default Tags