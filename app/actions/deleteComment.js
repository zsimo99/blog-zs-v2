"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import startDB from "@/lib/db";
import CommentModel from "@/models/CommentModel";
import PostModel from "@/models/PostModel";
import { options as authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function deleteCommentAction(commentId) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    await startDB();

    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return { success: false, error: "Comment not found" };
    }

    // Only author can delete
    if (comment.author.toString() !== session.user._id.toString()) {
      return { success: false, error: "Forbidden" };
    }

    // Remove comment reference from posts
    await PostModel.updateMany(
      { comments: comment._id },
      { $pull: { comments: comment._id } }
    );

    await comment.deleteOne();

    // Revalidate the blog path to refresh comments
    revalidatePath("/blog");
    revalidatePath("/blog/[id]", "page");

    return { success: true };
  } catch (error) {
    console.error("Delete comment error:", error);
    return { success: false, error: error.message };
  }
}
