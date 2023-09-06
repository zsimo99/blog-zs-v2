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
        if (status === "create") return setAlert({ message: "Try later", type: "warning" })
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
                setAlert({ message: "Done", type: "success" })
                setPostForm({ detail: "", title: "", tags: [] })
                router.refresh()
            }
        } catch (error) {
            console.log(error)
            setAlert({ message: "somthing wrong please try later", type: "error" })
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
        <>
            {alert.message && <div className={`text-white absolute top-16 right-4 py-1 px-3 rounded-md ${alert.type === "warning" && "bg-yellow-400"} ${alert.type === "success" && "bg-green-400"} ${alert.type === "error" && "bg-red-400"}`}>{alert.message}</div>}
            <div className='xl:min-h-screen text-lg max-xl:p-4 xl:sticky top-[30px] grid w-full place-items-center'>
                <div className='bg-white dark:bg-[#1F1F1F] w-full rounded-md p-4'>
                    <h2 className='mb-4 text-2xl font-semibold'>Got a Question or Something to Share?</h2>
                    <form onSubmit={handleSubmit} className=''>
                        <input className='mb-4 bg-transparent outline-none border-b border-[#727375] w-full py-1 px-3' placeholder='Title' type="text" value={postForm.title} onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))} />
                        <TextEditor postForm={postForm} setPostForm={setPostForm} />
                        <TagsMaker postForm={postForm} setPostForm={setPostForm} />
                        <div className='flex justify-end'>
                            <button type='submit' className='px-10 py-2 bg-[#461F7C] hover:bg-[#371f58] text-white font-bold text-lg mt-6 rounded-md '>{status === "create" ? "Submiting" : "Submit"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreatePost