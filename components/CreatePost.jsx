"use client"
import React, { useEffect, useState } from 'react'
import TextEditor from './forms/TextEditor'
import TagsMaker from './forms/TagsMaker'
import { usePosts } from '@/context/PostContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const CreatePost = () => {

    const [postForm, setPostForm] = useState({ detail: "", title: "", tags: [] })
    const [alert, setAlert] = useState({ message: "", type: "" })

    const router = useRouter()
    const { data: session } = useSession()
    const { status, setStatus } = usePosts()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (status === "create") return setAlert({ message: "Please wait...", type: "warning" })
        if (!session) return router.push("/dashboard/auth")
        if (postForm.detail === "" || postForm.title === "") return setAlert({ message: "Please add a title and provide more details before submitting.", type: "error" })
        try {
            setStatus("create")
            const res = await fetch("/api/posts", {
                body: JSON.stringify({ creator: session.user._id, ...postForm }),
                headers: { 'content-type': 'application/json' },
                method: "POST"
            })
            const data = await res.json()
            if (data.sucesse === true) {
                setAlert({ message: "Post created successfully!", type: "success" })
                setPostForm({ detail: "", title: "", tags: [] })
                router.refresh()
            }
        } catch (error) {
            console.log(error)
            setAlert({ message: "Something went wrong. Please try again.", type: "error" })
        } finally {
            setStatus(null)
        }
    }
    useEffect(() => {
        if (alert.message) setTimeout(() => {
            setAlert({ message: "", type: "" })
        }, 3000);
    }, [alert])

    return (
        <div className='relative'>
            {/* Alert Toast */}
            {alert.message && (
                <div className={`fixed top-20 right-4 z-50 py-3 px-4 rounded-xl shadow-lg animate-slide-up flex items-center gap-2
                    ${alert.type === "warning" && "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800"} 
                    ${alert.type === "success" && "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"} 
                    ${alert.type === "error" && "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"}`}
                >
                    {alert.type === "success" && <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'><path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' /></svg>}
                    {alert.type === "error" && <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'><path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' /></svg>}
                    {alert.type === "warning" && <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'><path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' /></svg>}
                    <span className='font-medium text-sm'>{alert.message}</span>
                </div>
            )}
            
            <div className='bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800'>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 bg-gradient-to-br from-[#461F7C] to-[#9180FF] rounded-xl flex items-center justify-center'>
                        <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                        </svg>
                    </div>
                    <div>
                        <h2 className='text-lg font-bold text-gray-900 dark:text-gray-100'>Create Post</h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>Share your thoughts with the community</p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input 
                        className='w-full bg-gray-100 dark:bg-gray-800/50 rounded-xl px-4 py-3 outline-none border-2 border-transparent focus:border-[#461F7C] dark:focus:border-purple-500 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-500' 
                        placeholder='Post title...' 
                        type="text" 
                        value={postForm.title} 
                        onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))} 
                    />
                    <TextEditor postForm={postForm} setPostForm={setPostForm} />
                    <TagsMaker postForm={postForm} setPostForm={setPostForm} />
                    <div className='flex justify-end pt-2'>
                        <button 
                            type='submit' 
                            disabled={status === "create"}
                            className='px-6 py-2.5 bg-[#461F7C] hover:bg-[#5a2d9e] disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed flex items-center gap-2'
                        >
                            {status === "create" ? (
                                <>
                                    <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                    </svg>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                                    </svg>
                                    Publish
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost