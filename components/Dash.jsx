"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'

const Dash = () => {
    const { data: session, status } = useSession()
    if (status && status === "unauthenticated") return redirect("/dashboard/auth")

    return (
        <div className='min-h-[calc(100vh-65px)] flex items-center justify-center py-8'>
            {session ? (
                <Profile user={session?.user} />
            ) : (
                <div className='flex items-center justify-center'>
                    <svg className='w-8 h-8 animate-spin text-[#461F7C]' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                </div>
            )}
        </div>
    )
}

export default Dash