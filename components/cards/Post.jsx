import Image from 'next/image'
import React from 'react'
import PostSettings from '../PostSettings'
import LikesComm from '../LikesComm'
import Tags from '../Tags'
import Link from 'next/link'




const Post = ({ post }) => {
    const date = new Date(post.createdAt)

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return (
        <article className='p-6 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 dark:border-gray-800'>
            {/* Header */}
            <div className='flex justify-between items-start mb-4'>
                <time className='text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md'>
                    {`${year}/${month}/${day} ${hours}:${minutes}`}
                </time>
                <PostSettings postId={post._id} detail={post.detail} creator={post.creator._id} />
            </div>
            
            {/* Author Info */}
            <div className='flex gap-3 items-center mb-4'>
                <div className='relative'>
                    <Image 
                        src={post.creator.image} 
                        width={44} 
                        height={44} 
                        className='rounded-full ring-2 ring-gray-100 dark:ring-gray-700 object-cover' 
                        alt='profile image' 
                    />
                    <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-[#1a1a1a]'></div>
                </div>
                <div>
                    <p className='font-semibold text-gray-900 dark:text-gray-100'>{post.creator.name}</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>{post.creator.email}</p>
                </div>
            </div>
            
            {/* Content */}
            <Link href={`/blog/${post._id}`} className='group'>
                <h3 className='text-xl font-bold text-[#461F7C] dark:text-purple-400 mb-3 group-hover:text-[#5a2d9e] dark:group-hover:text-purple-300 transition-colors'>
                    {post.title}
                </h3>
            </Link>
            <div className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                <div 
                    dangerouslySetInnerHTML={{ __html: post.detail.length > 300 ? post.detail.slice(0, 300) : post.detail }} 
                    className='post_details prose prose-sm dark:prose-invert max-w-none'
                />
                {post.detail.length > 300 && (
                    <Link href={`/blog/${post._id}`} className='inline-flex items-center gap-1 mt-2 text-[#461F7C] dark:text-purple-400 hover:underline font-medium text-sm'>
                        Read more
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </Link>
                )}
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-800'>
                    <Tags tags={post.tags} />
                </div>
            )}
            
            {/* Actions */}
            <LikesComm comm={post.comments} likes={post.likes} postId={post._id} />
        </article>
    )
}

export default Post