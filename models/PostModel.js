import { model, models, Schema } from "mongoose";

const postSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    detail: { type: String, required: true },
    likes: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], default: [] },
    tags: { type: Array, default: [] },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: "Comment" }], default: [] }
}, { timestamps: true })

const PostModel = models.Post || model("Post", postSchema)
export default PostModel