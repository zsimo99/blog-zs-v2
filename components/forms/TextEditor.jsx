import React, { useMemo } from 'react'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';


const TextEditor = ({ postForm, setPostForm, comment, text, setText }) => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],
            ['clean']                                         // remove formatting button
        ]
    }

    return (<>
        {!comment && <ReactQuill modules={modules} className='h-32' theme="snow" value={postForm?.detail} placeholder='Detail' onChange={(e) => setPostForm(prev => ({ ...prev, detail: e }))} />}
        {comment && <ReactQuill modules={modules} className='h-32' theme="snow" value={text} placeholder='Text' onChange={(e) => setText(e)} />}

    </>
    )
}

export default TextEditor