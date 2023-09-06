"use client"
import { usePosts } from '@/context/PostContext'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Orbit } from '@uiball/loaders'
import { useDarkMode } from '@/context/ThemeContext'



const PostSettings = ({ creator, detail, postId }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showForget, setForget] = useState(false)
    const forget = useRef(null)

    const { status, setStatus } = usePosts()
    const { isDark } = useDarkMode()

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
            }, 2000);
        }
    }
    function htmlToPlainText(html) {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showForget && forget.current) {
                // Clicked outside the "Update" dialog
                setForget(false);
            }
        };

        // Attach the event listener when `showForget` is true
        if (showForget) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remove the event listener when `showForget` is false
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            // Clean up the event listener when the component unmounts
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForget]);


    return (
        <div className='flex justify-end font-bold text-3xl relative'>
            {loading && <div className='flex justify-end mb-6'><Orbit size={25} speed={1.5} color={isDark ? "white" : "black"}
            /></div>}
            <span onClick={() => setShow(prev => !prev)} className='cursor-pointer'>...</span>
            <ul className={`absolute flex flex-col w-fit top-full right-0 bg-gray-200 dark:bg-[#272727] childb shadow-2xl shadow-[#00000010] dark:shadow-[#ffffff05] rounded-lg ${!show && "hidden"}`}>
                <li><Link href={`/blog/${postId}`} className='px-10 py-2 text-sm cursor-pointer'>Detail</Link></li>
                <li onClick={() => navigator.clipboard.writeText(htmlToPlainText(detail))} className='px-10 py-2 text-sm cursor-pointer'>copy</li>
                {session?.user._id === creator && <>
                    <li onClick={handleDelete} className='px-10 py-2 text-sm text text-red-600 cursor-pointer'>Delete</li>
                    <li onClick={() => setForget(true)} className='px-10 py-2 text-sm text text-green-400 cursor-pointer'>Update</li>
                </>}
            </ul>
            {
                showForget &&
                <div ref={forget} className='fixed w-screen h-screen top-0 left-0 z-[100] bg-[#00000060] grid place-items-center'>
                    <div className='bg-white dark:bg-[#222] p-20'>
                        :( sorry forget to add this task
                        <p className='text-sm text-gray-500'>Click anywher to go back</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default PostSettings