import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const storeUser = mutation({
  args: {},
  handler: async (ctx) => {
    // Check identity is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated.");
    }

    // Check if identity has already been stored
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user) {
      return;
    }

    // If new, store the user in database

    const userId = await ctx.db.insert("users", {
      name: identity.name!,
      imageUrl: identity.profileUrl,
      tokenIdentifier: identity.tokenIdentifier,
    });

    return userId;
  },
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    // throw new Error("Unauthenticated call to query");
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

      if(!user){
        return;
      }


    // const userWithImage = await Promise.all(
    //   // await ctx.storage.getUrl(user?.storageId);
      
    // )

    return {...user, imageUrl: await ctx.storage.getUrl(user?.storageId as Id<"_storage">)};
    // return user;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.string(),
    bio: v.string(),
    xLink: v.optional(v.string()),
    facebookLink: v.optional(v.string()),
    instaLink: v.optional(v.string()),
    whatsappLink: v.optional(v.string()),
    storageId: v.id("_storage"),
    format: v.string(),
    imageUrl: v.string(),
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

    const updatedUser = ctx.db.patch(args.id, {
      name: args.name,
      bio: args.bio,
      xLink: args.xLink,
      facebookLink: args.facebookLink,
      instaLink: args.instaLink,
      whatsappLink: args.whatsappLink,
      format: args.format,
      storageId: args.storageId,
      imageUrl: args.imageUrl,
    });

    return updatedUser;
  },
});
