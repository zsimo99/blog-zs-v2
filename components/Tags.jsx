"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Tags = ({ tags }) => {
    const router = useRouter()
    return (
        <div className='flex gap-2 mt-3'>{tags.map((tag, i) => <span onClick={() => router.replace(`/blog?search=${tag}`)} className='text-sm text-[#555] cursor-pointer' key={i}>#{tag}</span>)}</div>
    )
}

export default Tags