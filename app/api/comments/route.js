import startDB from "@/lib/db"
import CommentModel from "@/models/CommentModel"
import PostModel from "@/models/PostModel"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await startDB()
        const { userId, postId, text } = await req.json()
        const comment = await CommentModel.create({ author: userId, text })
        const post = await PostModel.findById(postId)
        post.comments.push(comment._id)
        post.save()
        return NextResponse.json({ post, success: true }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "somthing wronge please try later" }, { status: 500 })
    }
}

