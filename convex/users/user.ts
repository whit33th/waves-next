import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.id("_storage")),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      avatar: args.avatar,
      bio: args.bio,
    });
    return userId;
  },
});
