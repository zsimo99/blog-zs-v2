import startDB from '@/lib/db';
import PostModel from '@/models/PostModel';
import Link from 'next/link';
import React from 'react'

const Trends = async () => {
    const { topTagNames: trends } = await getTrend()

    return (
        <div className='max-md:hidden basis-3/12 p-3 h-[calc(100vh-65px)] sticky top-0 grid place-items-center'>
            <div className='flex flex-col w-full gap-4 p-2 rounded-[20px] bg-white dark:bg-[#1f1f1f]'>
                <h1 className='text-2xl font-bold text-[#461F7C]'>Popular :</h1>
                {trends?.map((tag, i) => (
                    <div className='p-1' key={i}>
                        <div className='flex flex-col'>
                            <Link className='text-gray-600 dark:text-gray-400 text-lg hover:underline' href={`/blog/?search=${tag._id}`}>#{tag._id}</Link>
                            <div className='text-sm text-gray-500 -translate-y-2 text-end'>{tag.count === 1 ? "1 post" : `${tag.count} posts`}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

async function getTrend() {
    await startDB()
    const pipeline = [
        {
            $unwind: "$tags"
        },
        {
            $group: {
                _id: "$tags",
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        },
        {
            $limit: 5
        }
    ];

    const topTagNames = await PostModel.aggregate(pipeline);
    return ({ topTagNames })
}


export default Trends