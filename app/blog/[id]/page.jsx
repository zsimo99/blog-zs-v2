import Comment from '@/components/Comment'
import CommentParams from '@/components/CommentParams'
import CreateComment from '@/components/CreateComment'
import Tags from '@/components/Tags'
import { notFound } from 'next/navigation'
import React from 'react'
import { v4 as v4uuid } from 'uuid'

const page = async ({ params }) => {

    const { id } = params
    const { post } = await getPost(id)
    if (!post) return notFound()
    return (
        <div className='py-20'>
            <h1 className='text-3xl text-purple-800 font-semibold mb-10'>{post.title}</h1>
            <div className='bg-[#FAFAFA] dark:bg-[#1F1F1F] p-4 rounded-lg' dangerouslySetInnerHTML={{ __html: post.detail }}></div>
            <div className='mt-8'>
                <h2>Tags:</h2>
                {post.tags && <Tags tags={post.tags} />}
            </div>
            <div className='bg-white dark:bg-[#1F1F1F] p-4 rounded-3xl mt-10'>
                <h2>Comments</h2>
                <div className='flex flex-col gap-3 my-10'>
                    {post.comments.map(comment => {
                        const date = new Date(comment.createdAt)

                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const day = date.getDate().toString().padStart(2, '0');
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        return (
                            <div key={v4uuid()} className='p-3 bg-[#f1f1f1] dark:bg-[#1c1c1c] rounded-xl'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-end gap-2 rounded-md py-1 px-3w-fit'>
                                        <p className='text-xl capitalize'>{comment.author.name}</p>
                                        <p className='text-xs text-gray-400'>{comment.author.email}</p>
                                    </div>
                                    <div>
                                        <CommentParams text={comment.text} userId={comment.author._id} />
                                    </div>
                                </div>
                                <Comment text={comment.text} />
                                <div className='text-gray-600 text-sm text-end'>{`${year}/${month}/${day} ${hours}:${minutes}`}</div>
                            </div>)
                    })}
                </div>
                <div>
                    <CreateComment postId={id} />
                </div>
            </div>
        </div>
    )
}

async function getPost(id) {
    const res = await fetch(`https://blog-zs-v2.vercel.app/api/posts/${id}`, { cache: "no-cache" })
    return await res.json()
}

export default page