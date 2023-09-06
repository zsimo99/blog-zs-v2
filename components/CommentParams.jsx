"use client"
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const CommentParams = ({ text, userId }) => {
    const { data: session } = useSession()
    function htmlToPlainText(html) {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
    const { id } = useParams()
    const [show, setShow] = useState(false)
    return (
        <div className='relative'>
            <span className='text-xl font-bold cursor-pointer' onClick={() => setShow(!show)}>...</span>
            {show && <ul className='p-1 bg-[#e1e1e1] dark:bg-[#222] rounded-lg absolute w-28 right-0 childb'>
                <li onClick={() => navigator.clipboard.writeText(htmlToPlainText(text))} className='p-1 text-center text-lg text-white cursor-pointer font-normal'>Copy</li>
                {session?.user._id === userId && <li className='p-1 text-center text-lg cursor-pointer font-normal text-red-500'>Delete</li>}
            </ul>}
        </div>
    )
}

export default CommentParams