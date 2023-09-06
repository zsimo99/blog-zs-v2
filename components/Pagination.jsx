"use client"
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Pagination = ({ length }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pageN = +searchParams.get("page")
    const search = searchParams.get("search")
    const [page, setPage] = useState(pageN || 0)

    const handleNavigate = (where) => {
        const numberOfPages = Math.floor(length / 10)
        let targetPage
        if (where === "prev") {
            if ((page - 1) < 0) return
            targetPage = page - 1
            setPage(prev => --prev)
        }
        if (where === "next") {
            if ((page + 1) > numberOfPages) return
            targetPage = page + 1
            setPage(prev => ++prev)
        }
        router.push(`/blog?${search ? `search=${search}&` : ""}page=${targetPage}`)
    }

    // useEffect(() => {
    //     setPage(page + 1)
    // }, [page])

    return (
        <>
            {length > 10 && <div>
                <div className='flex gap-3 items-center w-fit mx-auto'>
                    <button className={`px-4 py-1 rounded-md bg-gray-400 text-xl font-bold text-white ${(page - 1) < 0 && "opacity-30 cursor-not-allowed"}`} onClick={() => handleNavigate("prev")}>&lt;</button>
                    <p>{page + 1}</p>
                    <button className={`px-4 py-1 rounded-md bg-gray-400 text-xl font-bold text-white ${(page + 1) > Math.floor(length / 10) && "opacity-30 cursor-not-allowed"}`} onClick={() => handleNavigate("next")}>&gt;</button>
                </div>
            </div>}
        </>
    )
}

export default Pagination