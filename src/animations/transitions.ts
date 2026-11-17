type Tl = gsap.core.Timeline;
type T = gsap.TweenTarget;

/** Texto revelado por máscara (.mask > .mask-in) */
export const maskReveal = (tl: Tl, targets: T, at: number, dur = 1, stagger = 0.12) =>
  tl.fromTo(targets, { yPercent: 115 }, { yPercent: 0, duration: dur, ease: "power3.out", stagger }, at);

export const maskHide = (tl: Tl, targets: T, at: number, dur = 0.8, stagger = 0.05) =>
  tl.to(targets, { yPercent: -115, duration: dur, ease: "power2.in", stagger }, at);

/** Entrada em camadas: fade + deslocamento vertical */
export const layerIn = (tl: Tl, targets: T, at: number, dur = 0.9, stagger = 0.1, y = 36) =>
  tl.fromTo(targets, { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: dur, stagger }, at);

export const layerOut = (tl: Tl, targets: T, at: number, dur = 0.8, y = -24) =>
  tl.to(targets, { autoAlpha: 0, y, duration: dur, ease: "power2.in" }, at);

/** Revelação por clip-path */
export const clipIn = (
  tl: Tl,
  targets: T,
  at: number,
  dur = 1.4,
  from: "bottom" | "top" | "left" | "right" = "bottom"
) => {
  const start = {
    bottom: "inset(100% 0% 0% 0%)",
    top: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[from];
  return tl.fromTo(
    targets,
    { clipPath: start },
    { clipPath: "inset(0% 0% 0% 0%)", duration: dur, ease: "power3.inOut" },
    at
  );
};

/** Zoom suave de fotografia (Ken Burns sincronizado ao scroll) */
export const zoom = (tl: Tl, targets: T, from: number, to: number, at: number, dur: number) =>
  tl.fromTo(targets, { scale: from }, { scale: to, duration: dur, ease: "none" }, at);

/** Parallax vertical controlado */
export const parallax = (tl: Tl, targets: T, yPercent: number, at: number, dur: number) =>
  tl.to(targets, { yPercent, duration: dur, ease: "none" }, at);

/** Crescimento de barras (transform-origin: bottom ou left) */
export const growBars = (
  tl: Tl,
  targets: T,
  at: number,
  dur = 1.2,
  stagger = 0.15,
  axis: "y" | "x" = "y"
) =>
  tl.fromTo(
    targets,
    axis === "y" ? { scaleY: 0 } : { scaleX: 0 },
    { scaleY: 1, scaleX: 1, duration: dur, stagger, ease: "power3.out" },
    at
  );
