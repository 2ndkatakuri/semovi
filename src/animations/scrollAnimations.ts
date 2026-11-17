import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// mídias/logotipos oficiais podem estar ausentes: não poluir o console
gsap.config({ nullTargetWarn: false });

export { gsap, ScrollTrigger };

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Duração normalizada de toda timeline de capítulo (o scroll a mapeia de 0 a 1). */
export const SCENE_LENGTH = 10;

export type SceneBuilder = (
  tl: gsap.core.Timeline,
  q: gsap.utils.SelectorFunc,
  root: HTMLElement
) => void;

/**
 * Cria uma cena controlada pelo scroll.
 * A <section> (altura = N × 100svh) é o gatilho; o palco interno é sticky.
 * Toda a timeline é sincronizada com o progresso real da rolagem (scrub),
 * portanto rolar para cima reverte as transições.
 */
export function useScene(build: SceneBuilder) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: prefersReducedMotion() ? true : 0.8,
          invalidateOnRefresh: true,
        },
      });
      build(tl, gsap.utils.selector(root), root);
      const d = tl.duration();
      if (d < SCENE_LENGTH) tl.to({}, { duration: SCENE_LENGTH - d, ease: "none" }, d);
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/** Posições (px) do início de cada capítulo, calculadas a partir do DOM. */
export function getChapterTops(): number[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")).map(
    (el) => el.getBoundingClientRect().top + window.scrollY
  );
}

export function scrollToY(y: number) {
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
