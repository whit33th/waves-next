"use client";

import { useState, useEffect } from "react";
import { Clock, TrendingUp, Users, Music } from "lucide-react";

// Mock data
const mockData = {
  topTracks: [
    {
      rank: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      plays: "2.1k",
    },
    {
      rank: 2,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      plays: "1.8k",
    },
    {
      rank: 3,
      title: "Levitating",
      artist: "Dua Lipa",
      plays: "1.6k",
    },
  ],
  activeFriends: [
    {
      name: "Alex",
      avatar: "bg-blue-500",
      currentTrack: "Bohemian Rhapsody",
      artist: "Queen",
      timeListening: 142, // seconds
    },
    {
      name: "Sarah",
      avatar: "bg-pink-500",
      currentTrack: "Shape of You",
      artist: "Ed Sheeran",
      timeListening: 89,
    },
    {
      name: "Mike",
      avatar: "bg-green-500",
      currentTrack: "Starboy",
      artist: "The Weeknd",
      timeListening: 201,
    },
  ],
  recentActivity: [
    {
      action: "Liked",
      track: "Anti-Hero",
      artist: "Taylor Swift",
      time: "2m ago",
    },
    {
      action: "Added to playlist",
      track: "Flowers",
      artist: "Miley Cyrus",
      time: "15m ago",
    },
  ],
};

export default function WidgetBoard() {
  const [sessionTime, setSessionTime] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const formatListeningTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-8 grid-rows-4 gap-3 rounded-3xl">
        {/* Session Timer - Top Left */}
        {/* Top Tracks - Top Right */}
        <div className="relative col-span-5 row-span-2 overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-purple-900/80 to-purple-800/80 p-3 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-800/20"></div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">Top Tracks</h3>
            </div>

            <div className="flex-1 space-y-2">
              {mockData.topTracks.map((track) => (
                <div
                  key={track.rank}
                  className="flex items-center gap-2 rounded-lg bg-white/5 p-2"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/80 text-xs font-bold text-white">
                    {track.rank}
                  </div>
                  <div className="h-6 w-6 rounded-md bg-gradient-to-br from-purple-400 to-purple-600"></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-white">
                      {track.title}
                    </p>
                    <p className="truncate text-xs text-purple-300">
                      {track.artist}
                    </p>
                  </div>
                  <div className="text-xs text-purple-400">{track.plays}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-blue-900/80 to-blue-800/80 p-3 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/20"></div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Session</span>
            </div>

            <div className="flex flex-1 flex-col justify-center text-center">
              <div className="mb-1 font-mono text-xl font-bold text-white">
                {formatTime(sessionTime)}
              </div>
              {/* <div className="mb-3 text-xs text-blue-300">
                {isSessionActive ? "Active" : "Stopped"}
              </div> */}
            </div>

            {/* <button
              onClick={() => setIsSessionActive(!isSessionActive)}
              className={`w-full rounded-lg py-1.5 text-xs font-medium transition-all ${
                isSessionActive
                  ? "bg-red-500/80 text-white hover:bg-red-500"
                  : "bg-white/90 text-black hover:bg-white"
              }`}
            >
              {isSessionActive ? "Stop" : "Start"}
            </button> */}
          </div>
        </div>
        {/* Active Friends - Bottom Left */}
        <div className="relative col-span-2 row-span-4 overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-green-900/80 to-green-800/80 p-3 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-800/20"></div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-green-400" />
              <h3 className="text-sm font-semibold text-white">
                Friends Online
              </h3>
              <div className="ml-auto rounded-full bg-green-500/20 px-2 py-0.5">
                <span className="text-xs text-green-400">
                  {mockData.activeFriends.length}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {mockData.activeFriends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-white/5 p-2"
                >
                  <div
                    className={`h-6 w-6 ${friend.avatar} flex items-center justify-center rounded-full text-xs font-bold text-white`}
                  >
                    {friend.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-medium text-white">
                        {friend.name}
                      </p>
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></div>
                    </div>
                    <p className="truncate text-xs text-green-300">
                      {friend.currentTrack} • {friend.artist}
                    </p>
                  </div>
                  <div className="text-xs text-green-400">
                    {formatListeningTime(friend.timeListening)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-blue-900/80 to-blue-800/80 p-3 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/20"></div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Session</span>
            </div>

            <div className="flex flex-1 flex-col justify-center text-center">
              <div className="mb-1 font-mono text-xl font-bold text-white">
                {formatTime(sessionTime)}
              </div>
              {/* <div className="mb-3 text-xs text-blue-300">
                {isSessionActive ? "Active" : "Stopped"}
              </div> */}
            </div>

            {/* <button
              onClick={() => setIsSessionActive(!isSessionActive)}
              className={`w-full rounded-lg py-1.5 text-xs font-medium transition-all ${
                isSessionActive
                  ? "bg-red-500/80 text-white hover:bg-red-500"
                  : "bg-white/90 text-black hover:bg-white"
              }`}
            >
              {isSessionActive ? "Stop" : "Start"}
            </button> */}
          </div>
        </div>
        {/* Recent Activity - Bottom Right */}
        <div className="relative col-span-3 row-span-2 overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-pink-900/80 to-pink-800/80 p-3 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-pink-800/20"></div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-3 flex items-center gap-2">
              <Music className="h-4 w-4 text-pink-400" />
              <h3 className="text-sm font-semibold text-white">
                Recent Activity
              </h3>
            </div>

            <div className="flex-1 space-y-2">
              {mockData.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-white/5 p-2"
                >
                  <div className="h-6 w-6 rounded-md bg-gradient-to-br from-pink-400 to-pink-600"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white">
                      <span className="text-pink-400">{activity.action}</span>{" "}
                      {activity.track}
                    </p>
                    <p className="truncate text-xs text-pink-300">
                      {activity.artist} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>{" "}
        <div className="relative col-span-3 row-span-2 overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-pink-900/80 to-pink-800/80 p-3 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-pink-800/20"></div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-3 flex items-center gap-2">
              <Music className="h-4 w-4 text-pink-400" />
              <h3 className="text-sm font-semibold text-white">
                Recent Activity
              </h3>
            </div>

            <div className="flex-1 space-y-2">
              {mockData.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-white/5 p-2"
                >
                  <div className="h-6 w-6 rounded-md bg-gradient-to-br from-pink-400 to-pink-600"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white">
                      <span className="text-pink-400">{activity.action}</span>{" "}
                      {activity.track}
                    </p>
                    <p className="truncate text-xs text-pink-300">
                      {activity.artist} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
