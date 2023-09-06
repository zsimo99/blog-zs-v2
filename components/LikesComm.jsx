"use client"
import { usePosts } from '@/context/PostContext'
import { useDarkMode } from '@/context/ThemeContext'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Orbit } from '@uiball/loaders'


const Likes = ({ likes, postId, comm }) => {
    const { isDark } = useDarkMode()
    const { data: session } = useSession()
    const { status, setStatus } = usePosts()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleClick = async () => {
        if (!session) return router.push("/dashboard/auth")
        if (status === "update") return
        try {
            setLoading(true)
            setStatus("update")
            const res = await fetch(`/api/posts/${postId}`, { method: "PATCH", body: JSON.stringify({ type: "toggleLike", userId: session.user._id }), headers: { "Content-Type": "application/json" } })
            const data = await res.json()
            if (data.success === true) {
                console.log("test")
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setStatus("")
                setLoading(false)
            }, 2000);
        }
    }
    return (
        <div className='flex justify-end mt-4'>
            <div className='flex gap-4'>
                {loading && <Orbit size={25} speed={1.5} color={isDark ? "white" : "black"} />}
                <div className="flex flex-col items-center gap-2">
                    <Image onClick={() => router.push(`/blog/${postId}`)} className='hover:scale-105 cursor-pointer transition-transform duration-75' src="/chat-a-bulles.png" alt='comment' width={30} height={30} />
                    <p className='text-sm'>{comm?.length}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Image onClick={handleClick} className='hover:scale-105 cursor-pointer transition-transform duration-75' src={likes.includes(session?.user._id) ? "/likeFill.svg" : isDark ? "/likeDark.svg" : "/like.svg"} alt='like' width={30} height={30} />
                    <p className='text-sm'>{likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Likes