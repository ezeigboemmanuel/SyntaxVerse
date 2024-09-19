import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getSingleBlog = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.id);
    if (blog === null) {
      throw new Error("Article not found");
    }

    const newImageUrl = blog.storageId
      ? await ctx.storage.getUrl(blog.storageId as Id<"_storage">)
      : undefined;

    const author = await ctx.db.get(blog.userId);

    const authorImageUrl = author?.storageId
      ? await ctx.storage.getUrl(author.storageId as Id<"_storage">)
      : undefined;

    return {
      ...blog,
      imageUrl: newImageUrl ? newImageUrl : blog.imageUrl,
      author: {
        ...author,
        imageUrl: authorImageUrl ? authorImageUrl : author?.imageUrl,
      },
    };
  },
});

export const updateBlog = mutation({
  args: {
    id: v.id("blogs"),
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

    const updatedBlog = ctx.db.patch(args.id, {
      title: args.title,
      article: args.article,
      categories: args.categories,
      views: args.views,
      likes: args.likes,
      imageUrl: args.imageUrl,
      storageId: args.storageId,
      format: args.format,
    });

    return updatedBlog;
  },
});

export const deleteBlog = mutation({
  args: { id: v.id("blogs") },
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

export const getAllBlogs = query({
  args: { search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const title = args.search as string;

    let blogs = [];

    if (title) {
      blogs = await ctx.db
        .query("blogs")
        .withSearchIndex("by_title", (q) => q.search("title", title))
        .collect();
    } else {
      blogs = await ctx.db.query("blogs").order("desc").collect();
    }

    const blogsWithImages = await Promise.all(
      blogs.map(async (blog) => {
        const imageUrl = await ctx.storage.getUrl(blog.storageId);
        if (!imageUrl) {
          throw new Error("Image not found");
        }
        return { ...blog, imageUrl: imageUrl };
      })
    );
    return blogsWithImages;
  },
});
