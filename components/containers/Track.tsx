// "use client";

// import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
// import { SongItemProps } from "@/helpers/constants/Interfaces/song";
// import { Pause, Play } from "lucide-react";
// import Image from "next/image";

// interface TrackProps {
//   position: number;
//   title: string;
//   artist: string;
//   duration: string;
//   imageUrl: string;
//   trackId: string;
// }

// export function Track({
//   position,
//   title,
//   artist,
//   duration,
//   imageUrl,
//   trackId,
// }: TrackProps) {
//   const { track, isPlaying, handlePlayChosen } = usePlayer();

//   const isCurrentTrack = track?._id === trackId;
//   const showPlayIcon = isCurrentTrack && isPlaying;

//   const handlePlay = () => {
//     const trackData: SongItemProps = {
//       id: Number(trackId),
//       title,
//       artist,
//       album: "Unknown Album",
//       genre: "Unknown Genre",
//       filePath: `/api/stream/${trackId}`,
//       image: imageUrl,
//     };
//     handlePlayChosen(trackData);
//   };

//   return (
//     <div className="group flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white/5">
//       <div className="relative flex w-8 justify-center">
//         <span className="text-sm text-white/60 group-hover:hidden">
//           {position}
//         </span>
//         <button
//           onClick={handlePlay}
//           className="hidden items-center justify-center group-hover:flex"
//         >
//           {showPlayIcon ? (
//             <Pause size={16} className="text-white" />
//           ) : (
//             <Play size={16} className="text-white" />
//           )}
//         </button>
//       </div>

//       <div className="flex items-center gap-3">
//         <Image
//           src={imageUrl}
//           alt={title}
//           width={40}
//           height={40}
//           className="rounded"
//         />
//         <div>
//           <h4 className="text-sm font-medium text-white">{title}</h4>
//           <p className="text-xs text-white/60">{artist}</p>
//         </div>
//       </div>

//       <div className="ml-auto">
//         <span className="text-sm text-white/60">{duration}</span>
//       </div>
//     </div>
//   );
// }
