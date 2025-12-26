"use client"
import { usePosts } from '@/context/PostContext'
import { useDarkMode } from '@/context/ThemeContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Likes = ({ likes, postId, comm }) => {
    const { isDark } = useDarkMode()
    const { data: session } = useSession()
    const { status, setStatus } = usePosts()
    const [loading, setLoading] = useState(false)
    const [isLiked, setIsLiked] = useState(likes?.includes(session?.user?._id))
    const [likeCount, setLikeCount] = useState(likes?.length || 0)
    const router = useRouter()

    const handleClick = async () => {
        if (!session) return router.push("/dashboard/auth")
        if (status === "update") return
        
        // Optimistic update
        setIsLiked(!isLiked)
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
        
        try {
            setLoading(true)
            setStatus("update")
            const res = await fetch(`/api/posts/${postId}`, { 
                method: "PATCH", 
                body: JSON.stringify({ type: "toggleLike", userId: session.user._id }), 
                headers: { "Content-Type": "application/json" } 
            })
            const data = await res.json()
            if (data.success === true) {
                router.refresh()
            }
        } catch (error) {
            // Revert on error
            setIsLiked(isLiked)
            setLikeCount(prev => isLiked ? prev + 1 : prev - 1)
            console.log(error)
        } finally {
            setTimeout(() => {
                setStatus("")
                setLoading(false)
            }, 1000)
        }
    }

    return (
        <div className='flex items-center justify-end gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800'>
            {/* Comments */}
            <button 
                onClick={() => router.push(`/blog/${postId}`)}
                className='flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#461F7C] dark:hover:text-purple-400 transition-colors group'
            >
                <svg className='w-5 h-5 group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
                <span className='text-sm font-medium'>{comm?.length || 0}</span>
            </button>
            
            {/* Likes */}
            <button 
                onClick={handleClick}
                disabled={loading}
                className={`flex items-center gap-2 transition-colors group ${isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500'}`}
            >
                <svg 
                    className={`w-5 h-5 transition-all ${loading ? 'animate-pulse' : 'group-hover:scale-110'}`} 
                    fill={isLiked ? 'currentColor' : 'none'} 
                    stroke='currentColor' 
                    viewBox='0 0 24 24'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
                <span className='text-sm font-medium'>{likeCount}</span>
            </button>
        </div>
    )
}

export default Likes