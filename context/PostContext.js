"use client"
import { createContext, useState, useContext } from "react"


const PostContext = createContext()

export function usePosts() {
    return useContext(PostContext)
}

export function PostProvider({ children }) {
    const [newPosts, setNewPosts] = useState([])
    const [status, setStatus] = useState(null)
    return (
        <PostContext.Provider value={{ newPosts, setNewPosts, status, setStatus }}>
            {children}
        </PostContext.Provider>
    )
}