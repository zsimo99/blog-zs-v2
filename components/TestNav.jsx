"use client"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const TestNav = () => {
    const id = useSearchParams().get("id")
    const router = useRouter()
    return (
        <div>
            <button onClick={() => router.push(`http://localhost:3000/posts?id=${Number(id) - 1}`)}>prev</button>
            <button onClick={() => router.push(`http://localhost:3000/posts?id=${Number(id) + 1}`)}>next</button>
        </div>
    )
}

export default TestNav