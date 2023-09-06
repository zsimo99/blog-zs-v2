import Posts from '@/components/Posts'
import Search from '@/components/Search'
import React from 'react'




const page = async ({ searchParams }) => {
    const search = searchParams.search || null
    const page = searchParams.page || null
    const { posts, length } = await getPosts(search, page)
    return (
        <>
            <div className='mt-4 mb-8 lg:my-8'>
                <Search />
            </div>
            <div className='flex flex-col gap-8 mb-8'>
                <Posts length={length} posts={posts} />
            </div>
        </>
    )
}

async function getPosts(search, page) {
    let url = `https://blog-zs-v2.vercel.app/api/posts`;

    // Add search parameter if it's not null or empty
    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    // Add page parameter if it's not null or empty
    if (page) {
        // Check if there's already a search parameter
        if (search) {
            url += `&page=${encodeURIComponent(page)}`;
        } else {
            url += `?page=${encodeURIComponent(page)}`;
        }
    }
    const res = await fetch(url, { cache: "no-cache" })
    const data = await res.json()
    return data
}





export default page