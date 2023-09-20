import Posts from '@/components/Posts'
import Search from '@/components/Search'
import startDB from '@/lib/db'
import PostModel from '@/models/PostModel'
import React from 'react'




const page = async ({ searchParams }) => {
    const search = searchParams.search || null
    const page = searchParams.page || null
    const { posts, length } = await getPosts(search, page)
    return (
        <>
            {/* <div className='mt-4 mb-8 lg:my-8'>
                <Search />
            </div>
            <div className='flex flex-col gap-8 mb-8'>
                <Posts length={length} posts={posts} />
            </div> */}
            <h1 className='mt-[100px] text-5xl text-center '>test</h1>
        </>
    )
}

async function getPosts(search, page) {


    // Extract just the tag names from the result
    await startDB()

    let searchArray = null
    if (search) {
        const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        searchArray = escapedSearch.split(' ');
    }
    const searchQuery = search ?
        {
            $and: searchArray.map(word => ({
                $or: [
                    { title: { $regex: word, $options: 'i' } },
                    { detail: { $regex: word, $options: 'i' } },
                    { tags: { $elemMatch: { $regex: word, $options: 'i' } } },
                ],
            })),
        } : {};
    const allposts = await PostModel.find(searchQuery)
    const length = allposts.length
    const numbrOfpages = Math.floor(length / 10)
    const posts = await PostModel.find(searchQuery).populate("creator", "name email image").skip(isNaN(page * 10) ? 0 : (page > numbrOfpages ? (numbrOfpages * 10) : page * 10)).limit(10).sort("-createdAt")
    const data = JSON.stringify({ length, posts })
    return (JSON.parse(data))
}





export default page