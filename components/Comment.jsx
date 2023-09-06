"use client"
import React, { useState } from 'react'

const Comment = ({ text }) => {
    const [showAll, setShowAll] = useState(false)
    return (
        <>
            <div>
                <div className='text-lg p-3 rounded-xl font-normal first-line:ms-5 mt-3 text-gray-700 dark:text-gray-300' dangerouslySetInnerHTML={{ __html: showAll ? text : text.slice(0, 200) }}></div>
                <p onClick={() => setShowAll(prev => !prev)} className='my-3 w-fit hover:underline cursor-pointer text-gray-500'>{showAll ? "...show less" : "...show more"}</p>
            </div>
        </>
    )
}

export default Comment