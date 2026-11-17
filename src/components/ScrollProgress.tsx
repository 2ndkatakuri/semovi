import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/animations/scrollAnimations";

/** Barra fina de progresso global no topo da página. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-white/5" aria-hidden="true">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-copper via-copper-light to-leaf"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
