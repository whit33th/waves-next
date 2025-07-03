
export default function usePlayer() {

  return {};
}

// import { useAudioStore } from "@/data/globalState/AudioStore";
// import { RefObject, useEffect, useRef } from "react";

// export default function usePlayer(src: string) {
//   const {
//     currentTrack,
//     isPlaying,
//     setTrack,
//     setIsPlaying,
//     currentAudio,
//     setCurrentAudio,
//   } = useAudioStore();
//   const audioRef = useRef<HTMLAudioElement>(null);

//   useEffect(() => {
//     if (!audioRef.current) {
//       const audio = new Audio(src);
//       audioRef.current = audio;
//     }

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//       }
//     };
//   }, [src]);

//   function handlePlay() {
//     if (!audioRef.current) return;

//     if (currentTrack === src) {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         audioRef.current.play();
//         setIsPlaying(true);
//       }
//     } else {
//       if (currentAudio) {
//         currentAudio.pause();
//         currentAudio.currentTime = 0;
//       }

//       setCurrentAudio(audioRef.current);
//       setTrack(src);
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   }

//   const isCurrentTrack = currentTrack === src;
//   const isCurrentlyPlaying = isCurrentTrack && isPlaying;

//   return { handlePlay, isCurrentlyPlaying, isCurrentTrack };
// }
