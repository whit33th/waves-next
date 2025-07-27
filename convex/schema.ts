import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.id("_storage")),
    bio: v.optional(v.string()),
  }),

  tracks: defineTable({
    title: v.string(),
    artistId: v.id("users"),
    albumId: v.id("albums"),
    featuredArtists: v.optional(v.array(v.id("users"))),
    duration: v.number(),
    order: v.number(), // position in album

    trackUrl: v.id("_storage"),
    videoUrl: v.optional(v.id("_storage")),
  })
    .index("byAlbum", ["albumId"])
    .index("byArtist", ["artistId"]),

  albums: defineTable({
    title: v.string(),
    artistId: v.id("users"),
    cover: v.id("_storage"),
    description: v.optional(v.string()),
  }).index("byArtist", ["artistId"]),

  playlists: defineTable({
    title: v.string(),
    userId: v.id("users"),
    description: v.optional(v.string()),
  }).index("byUser", ["userId"]),

  playlistTracks: defineTable({
    playlistId: v.id("playlists"),
    trackId: v.id("tracks"),
  }).index("byPlaylist", ["playlistId"]),
});
