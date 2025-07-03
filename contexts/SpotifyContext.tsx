"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
}

interface SpotifyContextType {
  token: string | null;
  isLoading: boolean;
  refreshToken: () => Promise<void>;
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTokenFromStorage = (): SpotifyToken | null => {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem("spotify_token");
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      // Проверяем, не истек ли токен
      if (Date.now() >= parsed.expires_at) {
        localStorage.removeItem("spotify_token");
        return null;
      }
      return parsed;
    } catch {
      localStorage.removeItem("spotify_token");
      return null;
    }
  };

  const fetchNewToken = async (): Promise<SpotifyToken> => {
    const response = await fetch("/api/spotify/token");
    if (!response.ok) {
      throw new Error("Failed to fetch Spotify token");
    }
    const data = await response.json();

    // Добавляем время истечения
    const tokenWithExpiry = {
      ...data,
      expires_at: Date.now() + data.expires_in * 1000 - 60000, // -1 минута для безопасности
    };

    localStorage.setItem("spotify_token", JSON.stringify(tokenWithExpiry));
    return tokenWithExpiry;
  };

  const refreshToken = async () => {
    setIsLoading(true);
    try {
      const newToken = await fetchNewToken();
      setToken(newToken.access_token);
    } catch (error) {
      console.error("Error refreshing Spotify token:", error);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeToken = async () => {
      const existingToken = getTokenFromStorage();

      if (existingToken) {
        setToken(existingToken.access_token);
        setIsLoading(false);
      } else {
        await refreshToken();
      }
    };

    initializeToken();
  }, []);

  return (
    <SpotifyContext.Provider value={{ token, isLoading, refreshToken }}>
      {children}
    </SpotifyContext.Provider>
  );
}

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};
