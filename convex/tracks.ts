import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const createTrack = mutation({
  args: {
    title: v.string(),
    artistId: v.id("users"),
    albumId: v.id("albums"),
    featuredArtists: v.optional(v.array(v.id("users"))),
    duration: v.number(),
    order: v.number(), // position in album
    trackUrl: v.id("_storage"),
    videoUrl: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const trackId = ctx.db.insert("tracks", {
      title: args.title,
      artistId: args.artistId,
      albumId: args.albumId,
      featuredArtists: args.featuredArtists || [],
      duration: args.duration,
      order: args.order,
      trackUrl: args.trackUrl,
      videoUrl: args.videoUrl,
    });
    return trackId;
  },
});

export const getTracks = query({
  args: {
    albumId: v.optional(v.id("albums")),
    artistId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    let tracksQuery;
    if (args.albumId !== undefined) {
      tracksQuery = ctx.db
        .query("tracks")
        .withIndex("byAlbum", (q) =>
          q.eq("albumId", args.albumId as Id<"albums">),
        );
    } else if (args.artistId !== undefined) {
      tracksQuery = ctx.db
        .query("tracks")
        .withIndex("byArtist", (q) =>
          q.eq("artistId", args.artistId as Id<"users">),
        );
    } else {
      tracksQuery = ctx.db.query("tracks");
    }
    const tracks = await tracksQuery.collect();

    return await Promise.all(
      tracks.map(async (track) => {
        const artist = await ctx.db.get(track.artistId);
        const album = await ctx.db.get(track.albumId);
        const featuredArtists = await Promise.all(
          (track.featuredArtists || []).map((id) => ctx.db.get(id)),
        );
        const audioUrl = await ctx.storage.getUrl(track.trackUrl);
        const videoUrl = track.videoUrl
          ? await ctx.storage.getUrl(track.videoUrl)
          : undefined;
        let coverUrl;
        if (album?.cover && album) {
          coverUrl = (await ctx.storage.getUrl(album.cover)) || "";
        }
        return {
          ...track,
          artist,
          album,
          featuredArtists,
          audioUrl,
          videoUrl,
          coverUrl,
        };
      }),
    );
  },
});

export const getSingleTrack = query({
  args: { trackId: v.id("tracks") },
  handler: async (ctx, args) => {
    const track = await ctx.db.get(args.trackId);
    if (!track) {
      throw new Error("Track not found");
    }

    const artist = await ctx.db.get(track.artistId);
    const album = await ctx.db.get(track.albumId);
    const featuredArtists = await Promise.all(
      (track.featuredArtists || []).map((id) => ctx.db.get(id)),
    );

    const audioUrl = await ctx.storage.getUrl(track.trackUrl);
    const videoUrl = track.videoUrl
      ? await ctx.storage.getUrl(track.videoUrl)
      : undefined;

    let coverUrl;
    if (album?.cover && album) {
      coverUrl = (await ctx.storage.getUrl(album.cover)) || "";
    }

    return {
      ...track,
      artist,
      album,
      featuredArtists,
      audioUrl,
      videoUrl,
      coverUrl, // Uncomment if coverUrl is needed
    };
  },
});

export const getTrackUrl = query({
  args: { trackId: v.id("_storage") },
  handler: async (ctx, args) => {
    return ctx.storage.getUrl(args.trackId);
  },
});
