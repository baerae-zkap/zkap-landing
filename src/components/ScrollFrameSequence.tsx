"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ScrollFrameSequenceProps {
  frames: string[];
  className?: string;
}

export default function ScrollFrameSequence({
  frames,
  className = "",
}: ScrollFrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
      const frameIndex = Math.min(
        frames.length - 1,
        Math.floor(progress * frames.length)
      );
      setCurrentFrame(frameIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [frames.length]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${frames.length * 60 + 100}vh` }}
    >
      <div className="sticky top-1/2 -translate-y-1/2 flex justify-center">
        <div className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[660px] bg-slate-900 rounded-[40px] p-3 shadow-2xl">
          <div className="w-full h-full rounded-[32px] overflow-hidden bg-slate-100 relative">
            {frames.map((frame, i) => (
              <Image
                key={frame}
                src={frame}
                alt={`App screen ${i + 1}`}
                fill
                className={`object-cover transition-opacity duration-200 ${
                  i === currentFrame ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
