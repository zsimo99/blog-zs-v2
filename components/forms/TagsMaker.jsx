import React, { useState } from 'react'

const TagsMaker = ({ postForm, setPostForm }) => {
    const [text, setText] = useState("")
    const [alert, setAlert] = useState("")

    const removeTag = (id) => {
        setPostForm(prev => ({ ...prev, tags: prev.tags.filter((tag, i) => i !== id) }))
    }

    const addTag = () => {
        if (text.trim() === "") return
        if (postForm?.tags.includes(text.trim())) {
            setAlert(`"${text}" already exists`)
            return setTimeout(() => {
                setAlert("")
            }, 3000)
        }
        if (postForm?.tags.length < 4) {
            setPostForm(prev => ({ ...prev, tags: [...prev.tags, text.trim()] }))
            setText("")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }

    const handleChange = (e) => {
        if (postForm?.tags.length < 4) return setText(e.target.value)
    }

    return (
        <div className='space-y-3'>
            {/* Tags Display */}
            {postForm?.tags.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                    {postForm?.tags.map((tag, i) => (
                        <span 
                            key={i}
                            className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-[#461F7C] dark:text-purple-300 rounded-full text-sm font-medium'
                        >
                            #{tag}
                            <button 
                                onClick={() => removeTag(i)} 
                                className='w-4 h-4 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-500 hover:bg-red-200 dark:hover:bg-red-900 transition-colors'
                                type="button"
                            >
                                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Alert */}
            {alert && (
                <div className='text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg'>
                    {alert}
                </div>
            )}

            {/* Input */}
            <div className='flex gap-2'>
                <input 
                    placeholder={postForm?.tags.length === 0 
                        ? "Add tags (max 4)" 
                        : postForm?.tags.length < 4 
                            ? `Add ${4 - postForm?.tags.length} more tag${4 - postForm?.tags.length > 1 ? 's' : ''}` 
                            : "Maximum tags reached"
                    } 
                    className='flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800/50 rounded-xl outline-none border-2 border-transparent focus:border-[#461F7C] dark:focus:border-purple-500 transition-colors text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 disabled:opacity-50' 
                    type="text" 
                    value={text} 
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={postForm?.tags.length === 4}
                />
                <button 
                    type='button' 
                    onClick={addTag} 
                    disabled={postForm?.tags.length === 4 || text.trim() === ""}
                    className='px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm'
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default TagsMaker