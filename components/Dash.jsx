"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'

const Dash = () => {
    const { data: session, status } = useSession()
    if (status && status === "unauthenticated") return redirect("/dashboard/auth")


    return (
        <div className='grid place-items-center md:min-h-screen max-md:min-h-[700px] max-md:h-screen relative '>
            {session && <Profile user={session?.user} />}
        </div>
    )
}

export default Dash