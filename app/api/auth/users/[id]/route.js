import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import UserModel from "@/models/UserModel";
import bcrypt from "bcrypt"

export const PATCH = async (req, { params }) => {
    const body = await req.json()
    console.log(body)
    await startDB()
    const { id } = params
    try {
        let user = await UserModel.findById(id)
        user.name = body.name
        user.image = body.image
        if (body.updatePassword.update) {
            if (!user.provider) {
                console.log(body.updatePassword.oldPassword)
                const passwordMatch = await user.comparePassword(body.updatePassword.oldPassword)
                if (passwordMatch) {
                    user.password = body.updatePassword.newPassword
                } else throw new Error("wrong password")
            }
        }
        await user.save()
        delete user.password
        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "somthing wrong try later" }, { status: 500 })
    }
}