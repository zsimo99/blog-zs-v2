import Image from 'next/image'
import React from 'react'
import PostSettings from '../PostSettings'
import LikesComm from '../LikesComm'
import { DotSpinner } from '@uiball/loaders'
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
        <div className='p-8 bg-white dark:bg-[#1f1f1f] rounded-[20px]'>
            <div className='flex justify-between items-center'>
                <div className='text-gray-600'>{`${year}/${month}/${day} ${hours}:${minutes}`}</div>
                <PostSettings postId={post._id} detail={post.detail} creator={post.creator._id} />
            </div>
            <div className='flex gap-4 items-center '>
                <div className='rounded-full border-2 bg-[#dfdfdf] border-gray-500'>
                    <Image src={post.creator.image} width={40} height={40} className='rounded-full' alt='profile image' />
                </div>
                <div>
                    <p className='font-normal text-lg'>{post.creator.name}</p>
                    <p className='text-sm text-gray-500'>{post.creator.email}</p>
                </div>
            </div>
            <h3 className='text-2xl text-[#461F7C] font-bold mt-6 mb-2'>{post.title}</h3>
            <div>
                <div dangerouslySetInnerHTML={{ __html: post.detail.length > 300 ? post.detail.slice(0, 300) : post.detail }} className='text-base text-gray-500 dark:text-gray-200 w-fit'></div>{post.detail.length > 300 && <Link href={`/blog/${post._id}`} className='hover:underline cursor-pointer'><span className='text-lg font-bold'>...</span>see more</Link>}
            </div>
            {post.tags && <Tags tags={post.tags} />}
            <LikesComm comm={post.comments} likes={post.likes} postId={post._id} />

        </div >
    )
}

export default Post