import React, { useState } from 'react'

const TagsMaker = ({ postForm, setPostForm }) => {
    const [text, setText] = useState("")
    const [alert, setAlert] = useState("")
    const removeTag = (id) => {
        setPostForm(prev => ({ ...prev, tags: prev.tags.filter((tag, i) => i !== id) }))
    }
    const addTag = () => {
        if (text === "") return
        if (postForm?.tags.includes(text)) {
            setAlert(`${text} , already exists`)
            return setTimeout(() => {
                setAlert("")
            }, 3000);
        }
        if (postForm?.tags.length < 4) {
            setPostForm(prev => ({ ...prev, tags: [...prev.tags, text] }))
            setText("")
        }
    }
    const handleChange = (e) => {
        if (postForm?.tags.length < 4) return setText(e.target.value)
    }
    return (
        <div className='mt-32 sm:mt-20 lg:mt-28'>
            <div className='flex gap-2 my-2'>
                {postForm?.tags.map((tag, i) => <div className='px-2 relative py-1 rounded-2xl text-sm dark:bg-[#111] bg-[#d7d7d7]' key={i}>
                    #{tag}
                    <div onClick={() => removeTag(i)} className='absolute cursor-pointer -top-1 -right-1 text-red-700 bg-white leading-none dark:bg-black w-4 flex justify-center items-center h-4 rounded-full'>x</div>
                </div>)}
            </div>
            {alert && <div className='flex justify-end mb-4'><span className='bg-red-500 px-4 py-1 rounded-md text-white'>{alert}</span></div>}
            <div className='flex justify-start'>
                <input placeholder={postForm?.tags.length === 0 ? "#tag (you can add 4 only)" : postForm?.tags.length < 4 ? `#tag  (you can add ${4 - postForm?.tags.length} more)` : "max 4"} className='px-3 outline-none py-1 bg-transparent border-b border-[#727375] w-10/12' type="text" value={text} onChange={handleChange} />
                <button type='button' onClick={addTag} className={`dark:bg-[#727375] text-gray-800 font-semibold bg-[#aeafaf] w-2/12 ${(postForm?.tags.length === 4 || text === "") && "cursor-no-drop"}`}>Add</button>
            </div>
        </div>
    )
}

export default TagsMaker