import startDB from "@/lib/db";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json()
    await startDB()
    const oldUser = await UserModel.findOne({ email: body.email })
    if (oldUser) {
        return NextResponse.json({ error: "emal already in use" }, { status: 422 })
    }
    const user = await UserModel.create({ ...body })
    return NextResponse.json({ user: { id: user._id, email: user.email, name: user.name } }, { status: 201 })
}