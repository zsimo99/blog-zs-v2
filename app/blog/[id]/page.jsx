import Comment from '@/components/Comment'
import CommentParams from '@/components/CommentParams'
import CreateComment from '@/components/CreateComment'
import Tags from '@/components/Tags'
import startDB from '@/lib/db'
import CommentModel from '@/models/CommentModel'
import PostModel from '@/models/PostModel'
import UserModel from '@/models/UserModel'
import { notFound } from 'next/navigation'
import React from 'react'
import { v4 as v4uuid } from 'uuid'
import Image from 'next/image'





const page = async ({ params }) => {

    const { id } = params
    const { post } = await getPost(id)
    if (!post) return notFound()

    return (
        <article className='py-6 max-w-4xl mx-auto'>
            {/* Post Header */}
            <header className='mb-8'>
                <h1 className='text-3xl md:text-4xl font-bold text-[#461F7C] dark:text-purple-400 mb-4 leading-tight'>
                    {post.title}
                </h1>
                {post.tags && post.tags.length > 0 && (
                    <div className='mb-4'>
                        <Tags tags={post.tags} />
                    </div>
                )}
            </header>

            {/* Post Content */}
            <div className='bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-8 shadow-card border border-gray-100 dark:border-gray-800 mb-8'>
                <div 
                    className='post_details prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-[#461F7C] dark:prose-a:text-purple-400'
                    dangerouslySetInnerHTML={{ __html: post.detail }}
                />
            </div>

            {/* Comments Section */}
            <section className='bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-8 shadow-card border border-gray-100 dark:border-gray-800'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
                    <svg className='w-5 h-5 text-[#461F7C] dark:text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                    </svg>
                    Comments ({post.comments?.length || 0})
                </h2>

                {/* Comments List */}
                <div className='space-y-4 mb-8'>
                    {post.comments?.length > 0 ? post.comments.map(comment => {
                        const date = new Date(comment.createdAt)
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const day = date.getDate().toString().padStart(2, '0');
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        
                        return (
                            <div key={v4uuid()} className='p-4 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-gray-800'>
                                <div className='flex justify-between items-start mb-3'>
                                    <div className='flex items-center gap-3'>
                                        {comment.author?.image && (
                                            <Image 
                                                src={comment.author.image} 
                                                width={36} 
                                                height={36} 
                                                className='rounded-full ring-2 ring-gray-100 dark:ring-gray-700' 
                                                alt='profile' 
                                            />
                                        )}
                                        <div>
                                            <p className='font-semibold text-gray-900 dark:text-gray-100 capitalize'>
                                                {comment.author?.name}
                                            </p>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                                {comment.author?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <CommentParams text={comment.text} userId={comment.author?._id} />
                                </div>
                                <Comment text={comment.text} />
                                <time className='block text-xs text-gray-400 dark:text-gray-500 text-right mt-2'>
                                    {`${year}/${month}/${day} ${hours}:${minutes}`}
                                </time>
                            </div>
                        )
                    }) : (
                        <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                            <svg className='w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                            </svg>
                            <p>No comments yet. Be the first to comment!</p>
                        </div>
                    )}
                </div>

                {/* Add Comment Form */}
                <div className='border-t border-gray-100 dark:border-gray-800 pt-6'>
                    <CreateComment postId={id} />
                </div>
            </section>
        </article>
    )
}

async function getPost(id) {
    await startDB()
    const post = await PostModel.findById(id).populate({
        path: 'comments',
        model: CommentModel,
        options: {
            sort: { createdAt: -1 }
        },
        populate: {
            path: 'author',
            model: UserModel,
            select: "name email image"
        }
    })
    const data = JSON.stringify({ post })
    return (JSON.parse(data))
}

export default page