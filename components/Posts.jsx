import React from 'react'
import Post from './cards/Post'
import Loader from './Loader'
import { v4 as uuidV4 } from 'uuid'
import Pagination from './Pagination'



const Posts = ({ posts, length }) => {
    return (
        <>
            <h1>Result:{length}</h1>
            <Loader />
            {posts?.map((post, id) => <Post key={uuidV4()} post={post} />)}
            <Pagination length={length} />
        </>
    )
}

export default Posts