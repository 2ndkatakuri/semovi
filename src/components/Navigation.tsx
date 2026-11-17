import { useCallback, useEffect, useRef, useState } from "react";
import { CHAPTERS } from "@/config/content";
import { ScrollTrigger, getChapterTops, scrollToY } from "@/animations/scrollAnimations";
import { cn } from "@/utils/cn";
import { useActiveChapter } from "./useActiveChapter";

/**
 * Navegação mínima: trilho vertical numerado, botões avançar/voltar, tela cheia,
 * indicador de scroll e atalhos de teclado. A rolagem natural nunca é bloqueada.
 */
export function Navigation() {
  const active = useActiveChapter();
  const fill = useRef<HTMLDivElement>(null);
  const [fs, setFs] = useState(false);
  const canFullscreen = typeof document !== "undefined" && document.fullscreenEnabled;

  const goTo = useCallback((i: number) => {
    const tops = getChapterTops();
    const idx = Math.max(0, Math.min(tops.length - 1, i));
    scrollToY(tops[idx]);
  }, []);

  const next = useCallback(() => {
    const tops = getChapterTops();
    const y = window.scrollY + 4;
    const i = tops.findIndex((t) => t > y);
    if (i === -1) scrollToY(document.documentElement.scrollHeight - window.innerHeight);
    else scrollToY(tops[i]);
  }, []);

  const prev = useCallback(() => {
    const tops = getChapterTops();
    const y = window.scrollY - 4;
    let i = 0;
    tops.forEach((t, k) => {
      if (t < y) i = k;
    });
    scrollToY(tops[i]);
  }, []);

  const end = useCallback(
    () => scrollToY(document.documentElement.scrollHeight - window.innerHeight),
    []
  );

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (fill.current) fill.current.style.transform = `scaleY(${self.progress})`;
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          next();
          break;
        case "ArrowUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          end();
          break;
        case "f":
        case "F":
          toggleFs();
          break;
      }
    };
    const onFs = () => setFs(Boolean(document.fullscreenElement));
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, [next, prev, goTo, end]);

  function toggleFs() {
    if (!document.fullscreenEnabled) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => undefined);
  }

  const btn =
    "pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-navy-deep/60 text-white backdrop-blur transition hover:border-copper-light hover:text-copper-light";

  return (
    <>
      {/* trilho de capítulos */}
      <nav
        aria-label="Capítulos"
        className="fixed right-2 top-1/2 z-40 -translate-y-1/2 sm:right-5"
      >
        <div className="relative flex flex-col items-end gap-[7px] py-2">
          <div className="absolute bottom-3 right-[5px] top-3 w-px bg-white/15">
            <div ref={fill} className="h-full origin-top bg-copper-light" style={{ transform: "scaleY(0)" }} />
          </div>
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => goTo(i)}
              aria-label={`Capítulo ${c.n}: ${c.title}`}
              aria-current={active === i ? "step" : undefined}
              className="group relative flex items-center gap-3 py-[1px]"
            >
              <span
                className={cn(
                  "pointer-events-none hidden whitespace-nowrap rounded-sm bg-navy-deep/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white opacity-0 transition group-hover:opacity-100 md:block",
                  active === i && "opacity-100 !text-copper-light"
                )}
              >
                {String(c.n).padStart(2, "0")} · {c.title}
              </span>
              <span
                className={cn(
                  "relative z-10 block rounded-full transition-all duration-300",
                  active === i
                    ? "h-[11px] w-[11px] bg-copper-light shadow-[0_0_12px_2px_rgba(229,143,104,.7)]"
                    : "h-[11px] w-[11px] scale-50 border border-white/60 bg-navy-deep group-hover:scale-90"
                )}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* controles */}
      <div className="pointer-events-none fixed bottom-5 right-4 z-40 flex items-center gap-2 sm:right-8">
        <button className={btn} onClick={prev} aria-label="Voltar um capítulo" title="Voltar (↑)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 10l5-5 5 5" />
          </svg>
        </button>
        <button className={btn} onClick={next} aria-label="Avançar um capítulo" title="Avançar (↓)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 6l5 5 5-5" />
          </svg>
        </button>
        {canFullscreen && (
          <button className={btn} onClick={toggleFs} aria-label="Alternar tela cheia" title="Tela cheia (F)">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              {fs ? (
                <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" />
              ) : (
                <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* indicador de scroll */}
      <div
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3 transition-opacity duration-700",
          active === 0 ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      >
        <span className="eyebrow !text-white/70">Role para avançar</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <span className="cue-line absolute inset-0 bg-copper-light" />
        </span>
      </div>
    </>
  );
}
