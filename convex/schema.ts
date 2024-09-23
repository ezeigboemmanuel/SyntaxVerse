import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    xLink: v.optional(v.string()),
    facebookLink: v.optional(v.string()),
    instaLink: v.optional(v.string()),
    whatsappLink: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    format: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_name", ["name"]),
  blogs: defineTable({
    userId: v.id("users"),
    title: v.string(),
    article: v.string(),
    imageUrl: v.string(),
    storageId: v.id("_storage"),
    format: v.string(),
    likes: v.optional(v.array(v.string())),
    views: v.number(),
    categories: v.array(v.string()),
  })
    .searchIndex("by_title", {
      searchField: "title",
    })
    .index("by_categories", ["categories"]),
  comments: defineTable({
    blogId: v.id("blogs"),
    userId: v.id("users"),
    comment: v.string(),
  }).index("by_blogId", ["blogId"]),
});
