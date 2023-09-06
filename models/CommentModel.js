import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    // postId: { type: Schema.Types.ObjectId, ref: 'Post' },
}, { timestamps: true });

const CommentModel = models.Comment || model("Comment", commentSchema)
export default CommentModel