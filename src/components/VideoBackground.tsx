import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { prefersReducedMotion } from "@/animations/scrollAnimations";

const ratios = new Map<HTMLVideoElement, number>();
function arbitrate() {
  const reduce = prefersReducedMotion();
  let best: HTMLVideoElement | null = null;
  let bestRatio = 0.2;
  for (const [video, ratio] of ratios) {
    if (ratio >= bestRatio) {
      best = video;
      bestRatio = ratio;
    }
  }
  for (const video of ratios.keys()) {
    if (video === best && !reduce) {
      if (video.preload !== "auto") video.preload = "auto";
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }
}

type Props = {
  src: string;
  poster?: string;
  className?: string;
  maxOpacity?: number;
};

export function VideoBackground({ src, poster, className, maxOpacity = 1 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    ratios.set(v, 0);
    const io = new IntersectionObserver(
      ([entry]) => {
        ratios.set(v, entry.isIntersecting ? entry.intersectionRatio : 0);
        arbitrate();
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );
    io.observe(v);
    return () => {
      io.disconnect();
      ratios.delete(v);
      arbitrate();
    };
  }, []);

  if (failed) return null;

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onLoadedData={() => setReady(true)}
      onError={() => {
        if (ref.current) ratios.delete(ref.current);
        setFailed(true);
        arbitrate();
      }}
      style={{ opacity: ready ? maxOpacity : 0 }}
      className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-1000", className)}
    />
  );
}