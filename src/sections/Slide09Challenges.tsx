import { SectionTransition } from "@/components/SectionTransition";
import { Field, Mask, Pending } from "@/components/Field";
import { DESAFIOS } from "@/config/content";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { drawStrokes } from "@/animations/svgAnimations";
import { layerIn, layerOut, maskReveal } from "@/animations/transitions";

const build: SceneBuilder = (tl, q) => {
  const desktop = window.matchMedia("(min-width: 768px)").matches;
  maskReveal(tl, q(".s9-title .mask-in"), 0.1, 1.1, 0.14);
  layerIn(tl, q(".s9-eyebrow"), 0, 0.8, 0, 14);
  drawStrokes(tl, q(".s9-segA"), 0.8, 3);
  layerIn(tl, q(".s9-lab-start"), 1, 0.7, 0, 10);
  tl.to(q(".s9-segA"), { stroke: "#e58f68", duration: 0.8, ease: "none" }, 3.8);
  tl.fromTo(q(".s9-ghost"), { autoAlpha: 0 }, { autoAlpha: 0.9, duration: 0.6 }, 3.8);
  tl.fromTo(q(".s9-pause"), { scaleY: 0, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }, 3.9);
  layerIn(tl, q(".s9-lab-break"), 4.2, 0.7, 0, 10);
  tl.to(q(".s9-tint"), { opacity: 0.2, duration: 1.2, ease: "none" }, 3.8);
  if (desktop) {
    layerIn(tl, q(".s9-card"), 4.7, 0.9, 0.25, 30);
  } else {
    DESAFIOS.forEach((_, i) => {
      const at = 4.6 + i * 1.5;
      layerIn(tl, q(`.s9-card-${i}`), at, 0.7, 0, 24);
      if (i < DESAFIOS.length - 1) layerOut(tl, q(`.s9-card-${i}`), at + 1.1, 0.4, -16);
    });
  }
  tl.to(q(".s9-tint"), { opacity: 0, duration: 1.4, ease: "none" }, 6.8);
  drawStrokes(tl, q(".s9-segB"), 6.6, 2.8);
  tl.to(q(".s9-ghost"), { autoAlpha: 0.25, duration: 0.6 }, 6.6);
  tl.to(q(".s9-prov"), { borderLeftColor: "#4fb633", duration: 0.8, stagger: 0.3 }, 7);
  layerIn(tl, q(".s9-lab-resume"), 8, 0.7, 0, 10);
  tl.fromTo(q(".s9-arrow"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 9.3);
};

export default function Slide09Challenges() {
  return (
    <SectionTransition id="desafios" n={9} label="O que não avançou" height={4} build={build} className="!bg-[#071c2d]">
      <div className="s9-tint pointer-events-none absolute inset-0 bg-copper opacity-0" />
      <div className="blueprint absolute inset-0 opacity-30" />
      <div className="absolute inset-x-0 top-0 px-6 pt-20 md:px-14">
        <p className="s9-eyebrow eyebrow !text-copper-light">09 – O que não avançou</p>
        <h2 className="s9-title t-xl mt-3 max-w-4xl">
          <Mask>Transparência também</Mask>
          <Mask>é reconhecer desafios.</Mask>
        </h2>
      </div>
      <div className="absolute inset-x-0 top-[37%] h-10 px-6 md:px-14">
        <div className="relative h-full w-full">
          <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
            <path className="s9-segA" pathLength={1} d="M0 20 H430" stroke="#ffffff" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <path className="s9-ghost" d="M430 20 H570" stroke="#e58f68" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" opacity="0" />
            <path className="s9-segB" pathLength={1} d="M570 20 H1000" stroke="#4fb633" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="s9-pause fb absolute left-[47%] top-1/2 -mt-4 h-8 w-1.5 origin-center bg-copper-light opacity-0" />
          <span className="s9-pause fb absolute left-[51%] top-1/2 -mt-4 h-8 w-1.5 origin-center bg-copper-light opacity-0" />
          <svg className="s9-arrow absolute right-0 top-1/2 -mt-3 opacity-0" width="14" height="24" viewBox="0 0 14 24" fill="none" stroke="#4fb633" strokeWidth="3">
            <path d="M2 2l10 10L2 22" />
          </svg>
          <span className="s9-lab-start eyebrow absolute -top-7 left-0 opacity-0">Execução</span>
          <span className="s9-lab-break eyebrow absolute -top-7 left-[43%] opacity-0 !text-copper-light">Interrupção</span>
          <span className="s9-lab-resume eyebrow absolute -top-7 right-[6%] opacity-0 !text-leaf">Retomada – providências</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[47%] grid content-start px-6 pb-16 pt-4 md:grid-cols-3 md:gap-5 md:px-14">
        {DESAFIOS.map((d, i) => (
          <article
            key={d.id}
            className={`s9-card s9-card-${i} border border-white/15 bg-navy-deep/70 p-4 opacity-0 [grid-area:1/1] md:p-5 md:[grid-area:auto]`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-copper-light">Desafio 0{i + 1}</span>
              {d.situacao ? (
                <span className="rounded-full border border-copper-light px-3 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider text-copper-light">
                  {d.situacao}
                </span>
              ) : (
                <Pending>paralisada / atrasada</Pending>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              <Field label="Ação" value={d.acao} className="col-span-2" valueClassName="!text-xs md:!text-sm" />
              <Field label="Motivo" value={d.motivo} valueClassName="!text-xs md:!text-sm" />
              <div className="s9-prov border-l-2 border-transparent pl-2">
                <Field label="Providência" value={d.providencia} valueClassName="!text-xs md:!text-sm" />
              </div>
              <Field label="Novo prazo" value={d.novoPrazo} className="col-span-2" valueClassName="!text-xs md:!text-sm" />
            </div>
          </article>
        ))}
      </div>
    </SectionTransition>
  );
}