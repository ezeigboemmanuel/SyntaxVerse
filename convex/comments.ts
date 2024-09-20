import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const storeComments = mutation({
  args: {
    userId: v.id("users"),
    blogId: v.id("blogs"),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      return;
    }

    const blog = await ctx.db.get(args.blogId);
    if (!blog) {
      throw new Error("Article not found");
    }

    await ctx.db.insert("comments", {
      userId: args.userId,
      blogId: args.blogId,
      comment: args.comment,
    });
  },
});

export const getAllComments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      return;
    }

    const comments = await ctx.db.query("comments").order("desc").collect();
    const commentWithCreator = await Promise.all(
      comments.map(async (comment) => {
        const commentCreator = await ctx.db.get(comment.userId);
        const commentCreatorImageUrl = commentCreator?.storageId
        ? await ctx.storage.getUrl(commentCreator.storageId as Id<"_storage">)
        : undefined;
        return { ...comment, commentCreator: {
          ...commentCreator,
          imageUrl: commentCreatorImageUrl ? commentCreatorImageUrl : commentCreator?.imageUrl,
        } };
      })
    );

    return commentWithCreator;
  },
});

export const updateComment = mutation({
  args: {
    id: v.id("comments"),
    userId: v.id("users"),
    blogId: v.id("blogs"),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      return;
    }

    if (!args.id) {
      return;
    }

    await ctx.db.patch(args.id, {
      userId: args.userId,
      comment: args.comment,
      blogId: args.blogId,
    });
  },
});

export const deleteComment = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      return;
    }

    await ctx.db.delete(args.id);
  },
});