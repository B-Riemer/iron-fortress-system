"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play on mount
    video.play().catch((error) => {
      console.warn("Video autoplay failed:", error);
    });

    // Log video events for debugging
    video.addEventListener("loadeddata", () => {
      console.log("Video loaded successfully");
    });

    video.addEventListener("error", (e) => {
      console.error("Video error:", e);
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
      {/* Video Layer - Base layer at z-0 */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      >
        <source src="/assets/hero-loop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay Layer - On top of video at z-1 */}
      <div className="absolute inset-0 bg-zinc-950/60 z-[1]" />
    </div>
  );
}

