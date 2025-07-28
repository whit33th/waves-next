"use client";

import { useState, useEffect } from "react";
import { Clock, TrendingUp, Users, Music, Activity } from "lucide-react";
import { motion } from "framer-motion";

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
      avatar: "bg-primary",
      currentTrack: "Bohemian Rhapsody",
      artist: "Queen",
      timeListening: 142, // seconds
    },
    {
      name: "Sarah",
      avatar: "bg-secondary",
      currentTrack: "Shape of You",
      artist: "Ed Sheeran",
      timeListening: 89,
    },
    {
      name: "Mike",
      avatar: "bg-neutral-600",
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
    {
      action: "Shared",
      track: "As It Was",
      artist: "Harry Styles",
      time: "1h ago",
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
    <div className="w-full p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Session Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="col-span-12 rounded-lg border border-neutral-700/50 bg-neutral-800/50 p-4 backdrop-blur-xl md:col-span-3"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg">
              <Clock className="text-primary h-4 w-4" />
            </div>
            <h3 className="text-sm font-medium text-white">Session Time</h3>
          </div>

          <div className="text-center">
            <div className="mb-2 font-mono text-2xl font-bold text-white">
              {formatTime(sessionTime)}
            </div>
            <div className="mb-3 text-xs text-neutral-400">
              {isSessionActive ? "Active listening" : "Paused"}
            </div>
            <button
              onClick={() => setIsSessionActive(!isSessionActive)}
              className={`w-full rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isSessionActive
                  ? "border border-red-500/30 bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-primary/20 border-primary/30 text-primary hover:bg-primary/30 border"
              }`}
            >
              {isSessionActive ? "Stop Session" : "Start Session"}
            </button>
          </div>
        </motion.div>

        {/* Top Tracks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="col-span-12 rounded-lg border border-neutral-700/50 bg-neutral-800/50 p-4 backdrop-blur-xl md:col-span-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg">
              <TrendingUp className="text-primary h-4 w-4" />
            </div>
            <h3 className="text-sm font-medium text-white">Top Tracks</h3>
            <div className="ml-auto text-xs text-neutral-500">This week</div>
          </div>

          <div className="space-y-3">
            {mockData.topTracks.map((track, index) => (
              <motion.div
                key={track.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-700/30"
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                    track.rank === 1
                      ? "bg-primary text-black"
                      : track.rank === 2
                        ? "bg-secondary text-white"
                        : "bg-neutral-600 text-white"
                  }`}
                >
                  {track.rank}
                </div>
                <div className="h-8 w-8 rounded-md bg-neutral-600"></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {track.title}
                  </p>
                  <p className="truncate text-xs text-neutral-400">
                    {track.artist}
                  </p>
                </div>
                <div className="text-xs text-neutral-500">{track.plays}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="col-span-12 rounded-lg border border-neutral-700/50 bg-neutral-800/50 p-4 backdrop-blur-xl md:col-span-4"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-secondary/20 flex h-8 w-8 items-center justify-center rounded-lg">
              <Activity className="text-secondary h-4 w-4" />
            </div>
            <h3 className="text-sm font-medium text-white">Activity</h3>
          </div>

          <div className="space-y-3">
            {mockData.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-700/30"
              >
                <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-md bg-neutral-600"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white">
                    <span className="text-secondary font-medium">
                      {activity.action}
                    </span>{" "}
                    {activity.track}
                  </p>
                  <p className="truncate text-xs text-neutral-400">
                    {activity.artist} • {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Friends Online */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="col-span-12 rounded-lg border border-neutral-700/50 bg-neutral-800/50 p-4 backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg">
              <Users className="text-primary h-4 w-4" />
            </div>
            <h3 className="text-sm font-medium text-white">Friends Online</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
              <span className="text-xs text-neutral-400">
                {mockData.activeFriends.length} online
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {mockData.activeFriends.map((friend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 rounded-lg bg-neutral-700/30 p-3 transition-colors hover:bg-neutral-700/50"
              >
                <div
                  className={`h-10 w-10 ${friend.avatar} relative flex items-center justify-center rounded-full text-sm font-bold text-white`}
                >
                  {friend.name[0]}
                  <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-neutral-800 bg-green-400"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">
                    {friend.name}
                  </p>
                  <p className="truncate text-xs text-neutral-400">
                    {friend.currentTrack}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {friend.artist} •{" "}
                    {formatListeningTime(friend.timeListening)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
