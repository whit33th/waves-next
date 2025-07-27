import { type FunctionReference, anyApi } from "convex/server";
import { type GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  files: {
    generateUploadUrl: FunctionReference<"mutation", "public", any, any>;
  };
  albums: {
    createAlbum: FunctionReference<
      "mutation",
      "public",
      {
        artistId: Id<"users">;
        cover: Id<"_storage">;
        description?: string;
        title: string;
      },
      any
    >;
    getAllAlbums: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
  };
  tracks: {
    createTrack: FunctionReference<
      "mutation",
      "public",
      {
        albumId: Id<"albums">;
        artistId: Id<"users">;
        duration: number;
        featuredArtists?: Array<Id<"users">>;
        order: number;
        title: string;
        trackUrl: Id<"_storage">;
        videoUrl?: Id<"_storage">;
      },
      any
    >;
    getTracks: FunctionReference<
      "query",
      "public",
      { albumId?: Id<"albums">; artistId?: Id<"users"> },
      any
    >;
    getSingleTrack: FunctionReference<
      "query",
      "public",
      { trackId: Id<"tracks"> },
      any
    >;
    getTrackUrl: FunctionReference<
      "query",
      "public",
      { trackId: Id<"_storage"> },
      any
    >;
  };
  users: {
    user: {
      createUser: FunctionReference<
        "mutation",
        "public",
        { avatar?: Id<"_storage">; bio?: string; email: string; name: string },
        any
      >;
    };
  };
};
export type InternalApiType = {};
