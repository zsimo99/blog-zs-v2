import { Model, model, models, Document, Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, trim: true },
    image: { type: String, default: "/user.png" },
    provider: { type: String }
})

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return (next)
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        throw error
    }
})
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const UserModel = models.User || model("User", userSchema)
export default UserModel