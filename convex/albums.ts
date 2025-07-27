import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAlbum = mutation({
  args: {
    title: v.string(),
    artistId: v.id("users"),
    cover: v.id("_storage"),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const albumId = await ctx.db.insert("albums", {
      title: args.title,
      artistId: args.artistId,
      cover: args.cover,
      description: args.description,
    });
    return albumId;
  },
});

export const getAllAlbums = query({
  args: {},
  handler: async (ctx, args) => {
    const albums = await ctx.db.query("albums").order("desc").collect();
    return Promise.all(
      albums.map(async (album) => {
        const artist = await ctx.db.get(album.artistId);
        const coverUrl = await ctx.storage.getUrl(album.cover);

        return {
          ...album,
          artist,
          coverUrl,
        };
      }),
    );
  },
});
