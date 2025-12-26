"use client"
import React, { useState } from 'react'
import UpdateProfile from './UpdateProfile'
import Image from 'next/image'
import Alert from './Alert'

const Profile = ({ user }) => {
    const [userData, setUserData] = useState(user)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ message: "", type: "", show: false })

    return (
        <div className='w-full max-w-md mx-auto p-4'>
            <div className='bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-card border border-gray-100 dark:border-gray-800 relative'>
                {loading && (
                    <div className='absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-500'>
                        <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        Saving...
                    </div>
                )}
                
                <Alert type={alert.type} text={alert.message} show={alert.show} />
                
                {/* Profile Header */}
                <div className='flex flex-col items-center mb-6'>
                    <div className='relative mb-4'>
                        <Image 
                            priority={true} 
                            className='w-24 h-24 rounded-full ring-4 ring-purple-100 dark:ring-purple-900/50 object-cover' 
                            width={96} 
                            height={96} 
                            src={userData.image} 
                            alt="profile image" 
                        />
                        <div className='absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white dark:border-[#1a1a1a]'></div>
                    </div>
                    <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>{userData.name}</h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>{userData.email}</p>
                </div>
                
                {/* Profile Info */}
                <div className='space-y-4 mb-6'>
                    <div className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
                        <div className='w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center'>
                            <svg className='w-5 h-5 text-[#461F7C] dark:text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>Username</p>
                            <p className='font-medium text-gray-900 dark:text-gray-100'>{userData.name}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
                        <div className='w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center'>
                            <svg className='w-5 h-5 text-[#461F7C] dark:text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>Email</p>
                            <p className='font-medium text-gray-900 dark:text-gray-100'>{userData.email}</p>
                        </div>
                    </div>
                </div>
                
                <UpdateProfile setAlert={setAlert} setLoading={setLoading} user={userData} setUserData={setUserData} />
            </div>
        </div>
    )
}

export default Profile