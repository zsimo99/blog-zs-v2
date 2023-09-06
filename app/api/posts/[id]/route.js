import startDB from "@/lib/db"
import CommentModel from "@/models/CommentModel"
import PostModel from "@/models/PostModel"
import { NextResponse } from "next/server"


export const DELETE = async (req, { params }) => {

    try {
        await startDB()
        const { id } = params
        await PostModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "somthing wrong please try later" }, { status: 500 })
    }
}

export const GET = async (req, { params }) => {

    try {
        await startDB()
        const { id } = params
        const post = await PostModel.findById(id).populate({
            path: 'comments',
            model: CommentModel,
            options: {
                sort: { createdAt: -1 } // Sort by createdAt field in ascending order
            },
            populate: {
                path: 'author',
                model: 'User',
                select: "name email image"
            }
        })
        return NextResponse.json({ post }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "somthing wrong please try later" }, { status: 500 })
    }
}
export const PATCH = async (req, { params }) => {

    try {
        const { type, userId } = await req.json()
        await startDB()
        const { id } = params
        const post = await PostModel.findById(id)
        if (type === "toggleLike") {
            if (post.likes.includes(userId)) {
                post.likes = post.likes.filter(id => id.toString() !== userId.toString())
            }
            else {
                post.likes.push(userId)
            }
        }
        await post.save()

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "somthing wrong please try later" }, { status: 500 })
    }
}