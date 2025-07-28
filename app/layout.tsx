import { PlayerProvider } from "@/components/context/PlayerContext/PlayerContext";
import Sidebar from "@/components/containers/Sidebar/sidebar";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/layouts/ConvexClientProvider";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache/provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const robotoSans = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["cyrillic", "greek", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Waves - Your Music Experience",
    template: "%s | Waves",
  },
  description:
    "Discover, stream, and enjoy your favorite music with Waves. The ultimate music streaming platform for audiophiles.",
  keywords: [
    "music",
    "streaming",
    "audio",
    "playlist",
    "songs",
    "albums",
    "artists",
  ],
  authors: [{ name: "Waves Team" }],
  creator: "Waves",
  metadataBase: new URL("https://waves-music.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waves-music.app",
    title: "Waves - Your Music Experience",
    description: "Discover, stream, and enjoy your favorite music with Waves.",
    siteName: "Waves",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waves - Your Music Experience",
    description: "Discover, stream, and enjoy your favorite music with Waves.",
    creator: "@waves_music",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSans.className} antialiased`}>
        <ErrorBoundary>
          <ConvexClientProvider>
            <ConvexQueryCacheProvider>
              <PlayerProvider>
                <Sidebar>{children}</Sidebar>
              </PlayerProvider>
            </ConvexQueryCacheProvider>
          </ConvexClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
