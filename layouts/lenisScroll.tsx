"use client";
import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }: React.PropsWithChildren) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return <>{children}</>;
}
