import { SectionTransition } from "@/components/SectionTransition";
import { BrasaoMark } from "@/components/AnimatedLogo";
import { Field, Mask } from "@/components/Field";
import { RECURSOS } from "@/config/content";
import { brl } from "@/utils/format";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { drawStrokes, revealOfficial } from "@/animations/svgAnimations";
import { layerIn, maskReveal } from "@/animations/transitions";

const DESKTOP_LINES = ["M50 50 L38 27", "M50 50 L62 27", "M50 50 L38 77", "M50 50 L62 77"];
const MOBILE_Y = [37, 53.5, 70, 86.5];
const DESKTOP_POS = [
  "md:right-auto md:left-[4%] md:top-[12%]",
  "md:left-auto md:right-[4%] md:top-[12%]",
  "md:right-auto md:left-[4%] md:bottom-[8%] md:top-auto",
  "md:left-auto md:right-[4%] md:bottom-[8%] md:top-auto",
];
const MOBILE_TOP = ["top-[29%]", "top-[45.5%]", "top-[62%]", "top-[78.5%]"];

const build: SceneBuilder = (tl, q) => {
  maskReveal(tl, q(".s7-title .mask-in"), 0.1, 1.1, 0.14);
  layerIn(tl, q(".s7-eyebrow"), 0, 0.8, 0, 14);
  drawStrokes(tl, q(".s7-center .draw"), 0.4, 2, 0.04);
  revealOfficial(tl, q, ".s7-center .brasao-mark", 2.2, 1.2, "circle");
  tl.fromTo(q(".s7-ring"), { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2, ease: "power2.out" }, 0.4);
  drawStrokes(tl, q(".s7-spine"), 2.4, 0.8);
  RECURSOS.forEach((_, i) => {
    const at = 3.2 + i * 1.5;
    drawStrokes(tl, q(`.s7-line-d-${i}, .s7-line-m-${i}`), at, 0.9);
    tl.fromTo(q(`.s7-node-${i}`), { autoAlpha: 0, x: i % 2 === 0 ? -40 : 40 }, { autoAlpha: 1, x: 0, duration: 0.9 }, at + 0.6);
    layerIn(tl, q(`.s7-node-${i} .s7-f`), at + 1, 0.6, 0.1, 12);
    tl.fromTo(q(`.s7-node-${i} .s7-accent`), { scaleY: 0 }, { scaleY: 1, duration: 0.8 }, at + 0.7);
  });
  tl.to(q(".s7-ring"), { rotate: 90, duration: 4, ease: "none" }, 6);
};

export default function Slide07Resources() {
  return (
    <SectionTransition id="recursos" n={7} label="Recursos captados" height={4.5} build={build}>
      <div className="blueprint absolute inset-0 opacity-50" />
      <div className="absolute inset-x-0 top-[3%] z-10 px-6 pt-16 text-center md:inset-x-[38%] md:top-[6%] md:px-0 md:pt-6">
        <p className="s7-eyebrow eyebrow !text-copper-light">07 – Recursos captados</p>
        <h2 className="s7-title t-md mt-2 md:mt-4 md:!text-[1.7vw]">
          <Mask>Desenvolvimento também</Mask>
          <Mask>se constrói com parcerias.</Mask>
        </h2>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 hidden h-full w-full md:block" fill="none" aria-hidden="true">
        {DESKTOP_LINES.map((d, i) => (
          <path key={i} className={`s7-line-d-${i}`} pathLength={1} d={d} stroke="#e58f68" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full md:hidden" fill="none" aria-hidden="true">
        <path className="s7-spine" pathLength={1} d="M50 25 L50 28 L4 28 L4 86.5" stroke="#9db6c9" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        {MOBILE_Y.map((y, i) => (
          <path key={i} className={`s7-line-m-${i}`} pathLength={1} d={`M4 ${y} H9`} stroke="#e58f68" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="s7-center absolute left-1/2 top-[18%] z-10 -translate-x-1/2 -translate-y-1/2 md:top-1/2">
        <div className="s7-ring absolute -inset-6 rounded-full border border-dashed border-steel/60 md:-inset-10" />
        <BrasaoMark className="w-24 rounded-full bg-navy/80 md:w-44" />
      </div>
      {RECURSOS.map((r, i) => (
        <article
          key={r.id}
          className={`s7-node-${i} invisible absolute left-[9%] right-[3%] z-10 h-[16%] md:h-auto md:w-[34%] ${MOBILE_TOP[i]} ${DESKTOP_POS[i]} border border-white/15 bg-navy-deep/70 p-3 backdrop-blur-sm md:p-6`}
        >
          <span className="s7-accent absolute left-0 top-0 h-full w-[3px] origin-top bg-copper-light" />
          <h3 className="s7-f t-md !text-[clamp(0.85rem,1.6vw,1.5rem)]">{r.titulo}</h3>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 md:mt-5 md:gap-y-4">
            <Field className="s7-f" label="Origem" value={r.origem} valueClassName="!text-xs md:!text-sm" />
            <Field className="s7-f" label="Valor" value={brl(r.valor)} valueClassName="!text-xs md:!text-sm font-mono" />
            <Field className="s7-f" label="Objeto" value={r.objeto} valueClassName="!text-xs md:!text-sm" />
            <Field className="s7-f" label="Situação" value={r.situacao} valueClassName="!text-xs md:!text-sm" />
          </div>
        </article>
      ))}
    </SectionTransition>
  );
}