import Posts from '@/components/Posts'
import Search from '@/components/Search'
import startDB from '@/lib/db'
import PostModel from '@/models/PostModel'
import UserModel from '@/models/UserModel'
import React from 'react'




const page = async ({ searchParams }) => {
    const search = searchParams.search || null
    const page = searchParams.page || null
    const { posts, length } = await getPosts(search, page)

    return (
        <div className='space-y-6'>
            <div className='bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 shadow-card border border-gray-100 dark:border-gray-800'>
                <Search />
            </div>
            <Posts length={length} posts={posts} />
        </div>
    )
}

async function getPosts(search, page) {
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
    const posts = await PostModel.find(searchQuery).populate({
        path: 'creator',
        model: UserModel,
        select: "name email image",
    }).skip(isNaN(page * 10) ? 0 : (page > numbrOfpages ? (numbrOfpages * 10) : page * 10)).limit(10).sort("-createdAt")
    const data = JSON.stringify({ length, posts })
    return (JSON.parse(data))
}






export default page