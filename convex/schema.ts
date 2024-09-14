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
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_name", ["name"]),
});
