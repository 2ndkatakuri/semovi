import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export { gsap, ScrollTrigger };

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const SCENE_LENGTH = 10;

export type SceneBuilder = (
  tl: gsap.core.Timeline,
  q: gsap.utils.SelectorFunc,
  root: HTMLElement
) => void;

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
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      build(tl, gsap.utils.selector(root), root);
      const d = tl.duration();
      if (d < SCENE_LENGTH) tl.to({}, { duration: SCENE_LENGTH - d, ease: "none" }, d);
    }, root);
    return () => ctx.revert();
  }, []);
  return ref;
}

export function getChapterTops(): number[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")).map(
    (el) => el.getBoundingClientRect().top + window.scrollY
  );
}

export function scrollToY(y: number) {
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
