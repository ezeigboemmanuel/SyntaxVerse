import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const storeBlog = mutation({
  args: {
    title: v.string(),
    article: v.string(),
    imageUrl: v.string(),
    categories: v.array(v.string()),
    views: v.number(),
    likes: v.optional(v.number()),
    storageId: v.id("_storage"),
    format: v.string(),
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
    await ctx.db.insert("blogs", {
      userId: user._id,
      title: args.title,
      article: args.article,
      categories: args.categories,
      views: args.views,
      likes: args.likes,
      imageUrl: args.imageUrl,
      storageId: args.storageId,
      format: args.format,
    });
  },
});
