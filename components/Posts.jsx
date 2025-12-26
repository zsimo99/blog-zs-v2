import React from 'react'
import Post from './cards/Post'
import Loader from './Loader'
import { v4 as uuidV4 } from 'uuid'
import Pagination from './Pagination'



const Posts = ({ posts, length }) => {
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h2 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {length === 0 ? 'No posts found' : `${length} ${length === 1 ? 'post' : 'posts'} found`}
                </h2>
            </div>
            <Loader />
            <div className='space-y-4'>
                {posts?.map((post) => <Post key={uuidV4()} post={post} />)}
            </div>
            {length > 0 && <Pagination length={length} />}
        </div>
    )
}

export default Posts