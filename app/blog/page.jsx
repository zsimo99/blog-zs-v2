import Posts from '@/components/Posts'
import Search from '@/components/Search'
import startDB from '@/lib/db'
import PostModel from '@/models/PostModel'
import React from 'react'

// const posts = [
//     {
//         creator: {
//             name: "simo", email: "simo@gmail.com", image: "/user.png"
//         },
//         title: "just a test",
//         detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio at maiores nemo? Veritatis, illum deleniti ipsam quis obcaecati reprehenderit. Provident.",
//         tags: ["tag1", "tag2"],
//     },
//     {
//         creator: {
//             name: "simo", email: "simo@gmail.com", image: "/user.png"
//         },
//         title: "just a test",
//         detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio at maiores nemo? Veritatis, illum deleniti ipsam quis obcaecati reprehenderit. Provident.",
//         tags: ["tag1", "tag2"],
//     },
//     {
//         creator: {
//             name: "simo", email: "simo@gmail.com", image: "/user.png"
//         },
//         title: "just a test",
//         detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio at maiores nemo? Veritatis, illum deleniti ipsam quis obcaecati reprehenderit. Provident.",
//         tags: ["tag1", "tag2"],
//     },
//     {
//         creator: {
//             name: "simo", email: "simo@gmail.com", image: "/user.png"
//         },
//         title: "just a test",
//         detail: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam quos beatae, maxime deleniti tempore, explicabo eos, corporis ipsa vel enim cumque aliquid reprehenderit sed. Fugiat fugit asperiores optio praesentium voluptatibus Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, culpa.",
//         tags: ["tag1", "tag2"],
//     },
// ]


const page = async ({ searchParams }) => {
    const search = searchParams.search
    const page = searchParams.page
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
    let url = `${process.env.NEXTAUTH_URL}api/posts`;

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