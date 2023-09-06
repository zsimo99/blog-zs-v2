"use client"
import { usePosts } from '@/context/PostContext'
import React from 'react'
import Post from './cards/Post'
import { DotPulse } from '@uiball/loaders'
import { useDarkMode } from '@/context/ThemeContext'



const Loader = () => {
    const { status } = usePosts()
    const { isDark } = useDarkMode()
    return (
        <>
            {status === "create" &&
                <div className='h-24 w-full grid place-items-center'>
                    <DotPulse size={80} speed={1.3} color={isDark ? "white" : "black"} />
                </div>
            }
        </>
    )
}

export default Loader