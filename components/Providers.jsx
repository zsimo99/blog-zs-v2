import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const Providers = () => {
    return (
        <div className='flex gap-3 justify-center'>
            <button 
                onClick={() => signIn("google")}
                className='flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm'
            >
                <Image src="/google.png" width={20} height={20} alt='google' />
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Google</span>
            </button>
            <button 
                onClick={() => signIn("github")}
                className='flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-gray-100 border border-gray-900 dark:border-gray-100 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm'
            >
                <Image src="/github.png" width={20} height={20} alt='github' className='dark:invert' />
                <span className='text-sm font-medium text-white dark:text-gray-900'>GitHub</span>
            </button>
        </div>
    )
}

export default Providers