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
        setLoading(true)
        e.preventDefault()
        if (loading) return console.log("...")
        try {
            if (!session) router.push("/dashboard/auth")
            const res = await fetch("/api/comments", { method: "POST", headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, userId: session.user._id, postId }) })
            const data = await res.json()
            if (data.success === true) router.refresh()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setText("")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3 className='text-2xl font-semibold mb-8'>Add comment :</h3>
            <TextEditor text={text} setText={setText} comment={true} />
            <div className='flex justify-end mt-14 max-sm:mt-20'>
                <button type='submit' className='px-10 py-2 bg-[#461F7C] hover:bg-[#371f58] text-white font-bold text-lg rounded-md '>{loading ? "Submiting..." : "Submit"}</button>
            </div>
        </form>
    )
}

export default CreateComment