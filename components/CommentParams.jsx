"use client"
import { deleteCommentAction } from '@/app/actions/deleteComment'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'

const CommentParams = ({ text, userId ,id}) => {
    const { data: session } = useSession()
    const [show, setShow] = useState(false)
    const [copied, setCopied] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const menuRef = useRef(null)

    function htmlToPlainText(html) {
        const div = document.createElement("div")
        div.innerHTML = html
        return div.textContent || div.innerText || ""
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(htmlToPlainText(text))
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
            setShow(false)
        }, 1000)
    }

    const handleDelete = async () => {
        setDeleting(true)
        try {
            const result = await deleteCommentAction(id)
            if (result.success) {
                setShow(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setDeleting(false)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShow(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className='relative' ref={menuRef}>
            <button 
                onClick={() => setShow(!show)}
                className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                aria-label="Comment options"
            >
                <svg className='w-4 h-4 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                </svg>
            </button>
            
            {show && (
                <div className='absolute right-0 top-full mt-1 w-32 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-20 animate-fade-in'>
                    <button 
                        onClick={handleCopy} 
                        className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                    >
                        {copied ? (
                            <>
                                <svg className='w-4 h-4 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                                </svg>
                                Copy
                            </>
                        )}
                    </button>
                    {session?.user._id === userId && (
                        <button 
                            onClick={handleDelete}
                            disabled={deleting}
                            className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {deleting ? (
                                <>
                                    <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                    </svg>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                    </svg>
                                    Delete
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default CommentParams