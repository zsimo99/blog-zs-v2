"use client"
import React, { useState } from 'react'
import TextEditor from './forms/TextEditor'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CreateComment = ({ postId }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loading) return
        if (!text.trim()) return
        
        setLoading(true)
        try {
            if (!session) {
                router.push("/dashboard/auth")
                return
            }
            const res = await fetch("/api/comments", { 
                method: "POST", 
                headers: { 'content-type': 'application/json' }, 
                body: JSON.stringify({ text, userId: session.user._id, postId }) 
            })
            const data = await res.json()
            if (data.success === true) {
                setText("")
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2'>
                <svg className='w-5 h-5 text-[#461F7C] dark:text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                </svg>
                Add a comment
            </h3>
            <TextEditor text={text} setText={setText} comment={true} />
            <div className='flex justify-end mt-16'>
                <button 
                    type='submit' 
                    disabled={loading || !text.trim()}
                    className='px-6 py-2.5 bg-[#461F7C] hover:bg-[#5a2d9e] disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed flex items-center gap-2'
                >
                    {loading ? (
                        <>
                            <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
                            Posting...
                        </>
                    ) : (
                        <>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                            </svg>
                            Post Comment
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

export default CreateComment