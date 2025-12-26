"use client"
import { usePosts } from '@/context/PostContext'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'



const PostSettings = ({ creator, detail, postId }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showForget, setForget] = useState(false)
    const forget = useRef(null)
    const menuRef = useRef(null)

    const { status, setStatus } = usePosts()

    const handleDelete = async () => {
        if (status === "delete") return
        try {
            setShow(false)
            setStatus("delete")
            setLoading(true)
            const res = await fetch(`/api/posts/${postId}`, {
                method: "DELETE"
            })
            const data = await res.json()
            if (data.success === true) router.refresh()
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setStatus("")
                setLoading(false)
            }, 2000)
        }
    }

    function htmlToPlainText(html) {
        const div = document.createElement("div")
        div.innerHTML = html
        return div.textContent || div.innerText || ""
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShow(false)
            }
            if (showForget && forget.current && !forget.current.contains(event.target)) {
                setForget(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showForget])


    return (
        <div className='relative' ref={menuRef}>
            {loading && (
                <div className='absolute -left-8 top-1/2 -translate-y-1/2'>
                    <svg className='w-4 h-4 animate-spin text-gray-500' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                </div>
            )}
            
            <button 
                onClick={() => setShow(prev => !prev)} 
                className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                aria-label="Post options"
            >
                <svg className='w-5 h-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                </svg>
            </button>
            
            {show && (
                <div className='absolute right-0 top-full mt-1 w-40 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-20 animate-fade-in'>
                    <Link 
                        href={`/blog/${postId}`} 
                        className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                        </svg>
                        View
                    </Link>
                    <button 
                        onClick={() => { navigator.clipboard.writeText(htmlToPlainText(detail)); setShow(false); }} 
                        className='w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                        </svg>
                        Copy
                    </button>
                    {session?.user._id === creator && (
                        <>
                            <hr className='my-1 border-gray-100 dark:border-gray-800' />
                            <button 
                                onClick={() => { setForget(true); setShow(false); }} 
                                className='w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'
                            >
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                </svg>
                                Edit
                            </button>
                            <button 
                                onClick={handleDelete} 
                                className='w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
                            >
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                </svg>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            )}
            
            {showForget && (
                <div className='fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4'>
                    <div ref={forget} className='bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 max-w-sm w-full text-center shadow-xl'>
                        <div className='w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-8 h-8 text-yellow-600 dark:text-yellow-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                            </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>Coming Soon!</h3>
                        <p className='text-gray-500 dark:text-gray-400 mb-6'>This feature is still in development. Check back later!</p>
                        <button 
                            onClick={() => setForget(false)}
                            className='px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium'
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostSettings