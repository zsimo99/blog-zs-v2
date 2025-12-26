import startDB from '@/lib/db';
import PostModel from '@/models/PostModel';
import Link from 'next/link';
import React from 'react'

const Trends = async () => {
    const { topTagNames: trends } = await getTrend()

    return (
        <div className='bg-white dark:bg-[#1a1a1a] rounded-2xl p-5 shadow-card border border-gray-100 dark:border-gray-800'>
            <h2 className='text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2'>
                <svg className='w-5 h-5 text-[#461F7C] dark:text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
                </svg>
                Trending Tags
            </h2>
            <div className='space-y-1'>
                {trends?.length > 0 ? trends.map((tag, i) => (
                    <Link 
                        key={i}
                        href={`/blog/?search=${tag._id}`}
                        className='flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group'
                    >
                        <span className='text-[#461F7C] dark:text-purple-400 font-medium group-hover:text-[#5a2d9e] dark:group-hover:text-purple-300 transition-colors'>
                            #{tag._id}
                        </span>
                        <span className='text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full'>
                            {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                        </span>
                    </Link>
                )) : (
                    <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-4'>
                        No trending tags yet
                    </p>
                )}
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