import gsap from "gsap";

type Tl = gsap.core.Timeline;

export function prepareStrokes(els: gsap.TweenTarget) {
  gsap.utils.toArray<SVGElement>(els).forEach((el) => {
    const len = el.tagName.toLowerCase() === "text" ? 1500 : 1;
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
  });
}

export function drawStrokes(tl: Tl, els: gsap.TweenTarget, at: number, dur: number, stagger = 0) {
  prepareStrokes(els);
  return tl.to(els, { strokeDashoffset: 0, duration: dur, ease: "none", stagger }, at);
}

export function countTo(
  tl: Tl,
  el: Element,
  to: number,
  at: number,
  dur: number,
  format: (v: number) => string = (v) => Math.round(v).toLocaleString("pt-BR")
) {
  const o = { v: 0 };
  el.textContent = format(0);
  return tl.to(
    o,
    {
      v: to,
      duration: dur,
      ease: "power1.out",
      onUpdate: () => {
        el.textContent = format(o.v);
      },
    },
    at
  );
}

export function revealOfficial(
  tl: Tl,
  q: gsap.utils.SelectorFunc,
  markSel: string,
  at: number,
  dur = 1.2,
  shape: "circle" | "wipe" = "wipe"
) {
  const official = q(`${markSel} .official`);
  const fills = q(`${markSel} .fallback-fill, ${markSel} .fallback-sub`);
  const [from, to] =
    shape === "circle"
      ? ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)"]
      : ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"];
  tl.fromTo(official, { autoAlpha: 1, clipPath: from }, { clipPath: to, duration: dur, ease: "power2.inOut" }, at);
  tl.fromTo(fills, { autoAlpha: 0 }, { autoAlpha: 1, duration: dur }, at);
}