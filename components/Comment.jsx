"use client"
import React, { useState } from 'react'

const Comment = ({ text }) => {
    const [showAll, setShowAll] = useState(false)
    const isLong = text.length > 200

    return (
        <div className='mt-2'>
            <div 
                className='.post_details text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none'
                dangerouslySetInnerHTML={{ __html: showAll || !isLong ? text : text.slice(0, 200) + '...' }}
            />
            {isLong && (
                <button 
                    onClick={() => setShowAll(prev => !prev)} 
                    className='mt-2 text-sm text-[#461F7C] dark:text-purple-400 hover:underline font-medium'
                >
                    {showAll ? "Show less" : "Show more"}
                </button>
            )}
        </div>
    )
}

export default Comment