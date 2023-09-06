import startDB from "@/lib/db"
import PostModel from "@/models/PostModel"
import UserModel from "@/models/UserModel"
import { NextResponse } from "next/server"


export const GET = async (req) => {
    const search = req.nextUrl.searchParams.get("search")
    const page = req.nextUrl.searchParams.get("page") || 0
    try {
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


        // Extract just the tag names from the result
        let searchArray = null
        if (search) {
            const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            searchArray = escapedSearch.split(' ');
        }
        const searchQuery = search ?
            {
                $and: searchArray.map(word => ({
                    $or: [
                        { title: { $regex: word, $options: 'i' } },
                        { detail: { $regex: word, $options: 'i' } },
                        { tags: { $elemMatch: { $regex: word, $options: 'i' } } },
                    ],
                })),
            } : {};
        const allposts = await PostModel.find(searchQuery)
        const length = allposts.length
        const numbrOfpages = Math.floor(length / 10)
        const posts = await PostModel.find(searchQuery).populate("creator", "name email image").skip(isNaN(page * 10) ? 0 : (page > numbrOfpages ? (numbrOfpages * 10) : page * 10)).limit(10).sort("-createdAt")
        return NextResponse.json({ topTagNames, length, posts }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }



}

export const POST = async (req) => {
    try {
        if (req.body) {
            const body = await req.json()
            await startDB()
            const user = await UserModel.findById(body.creator)
            if (!user) throw new Error("no user")
            const newPost = await PostModel.create(body)
            const post = await PostModel.findById(newPost._id).populate("creator")
            return NextResponse.json({ sucesse: true, post }, { status: 200 })
        } else throw new Error("no data")
    } catch (error) {
        console.log(error)
        let status
        switch (error.message) {
            case "no user":
                status = 403
                break;
            case "no data":
                status = 401
                break;

            default:
                status = 500
                break;
        }
        return NextResponse.json({ error }
            // { err: { message: error.message || error } }
            , { status })
    }
}

