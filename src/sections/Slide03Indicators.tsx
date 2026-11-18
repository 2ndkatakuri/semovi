import { SectionTransition } from "@/components/SectionTransition";
import { Pending, Mask } from "@/components/Field";
import { INDICADORES } from "@/config/content";
import { num } from "@/utils/format";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { countTo, drawStrokes } from "@/animations/svgAnimations";
import { clipIn, growBars, layerIn, maskReveal } from "@/animations/transitions";

const TINTS = ["#a44a2a", "#5a7d9a", "#4fb633"];

const build: SceneBuilder = (tl, q) => {
  maskReveal(tl, q(".s3-title .mask-in"), 0.1, 1.1, 0.14);
  layerIn(tl, q(".s3-eyebrow"), 0, 0.8);
  tl.fromTo(q(".s3-divider"), { scaleY: 0 }, { scaleY: 1, duration: 1.6, stagger: 0.3, ease: "power2.inOut" }, 0.4);
  INDICADORES.forEach((ind, i) => {
    const at = 1.2 + i * 2.5;
    const col = `.s3-col-${i}`;
    clipIn(tl, q(`${col} .s3-bg`), at, 1.2, "bottom");
    tl.to(q(".s3-tint"), { backgroundColor: TINTS[i], duration: 1.4, ease: "none" }, at);
    layerIn(tl, q(`${col} .s3-head`), at + 0.4, 0.8, 0.1, 24);
    layerIn(tl, q(`${col} .s3-number`), at + 0.6, 0.7, 0, 40);
    const counter = q(`${col} .s3-count`)[0] as HTMLElement | undefined;
    const target = ind.out2026;
    if (counter && target != null) countTo(tl, counter, target, at + 0.7, 1.8);
    drawStrokes(tl, q(`${col} .s3-cota`), at + 0.8, 1, 0.1);
    layerIn(tl, q(`${col} .s3-rowlabel`), at + 1, 0.6, 0.15, 10);
    growBars(tl, q(`${col} .s3-bar`), at + 1.1, 1.3, 0.25, "x");
  });
  tl.to(q(".s3-col .s3-number"), { y: -14, duration: 1.2, stagger: 0.1, ease: "none" }, 8.6);
};

function Bars({ a, b }: { a: number | null; b: number | null }) {
  const both = a != null && b != null;
  const max = both ? Math.max(a!, b!, 1) : 1;
  const rows = [
    { label: "Dez / 2024", v: a, w: both ? (a! / max) * 100 : 100, tone: "bg-steel" },
    { label: "Out / 2026", v: b, w: both ? (b! / max) * 100 : 100, tone: "bg-leaf" },
  ];
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label} className="s3-rowlabel">
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="eyebrow">{r.label}</span>
            <span className="font-mono text-xs text-white">{r.v == null ? <Pending /> : num(r.v)}</span>
          </div>
          <div className="h-1.5 bg-white/10" style={{ width: "100%" }}>
            <div
              className={`s3-bar h-full origin-left ${r.v == null ? "hatch !bg-transparent border border-dashed border-white/30" : r.tone}`}
              style={{ width: `${r.w}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Slide03Indicators() {
  return (
    <SectionTransition id="numeros" n={3} label="Os números da gestão" height={4} build={build}>
      <div className="s3-tint absolute inset-0 opacity-[0.22]" style={{ backgroundColor: "#0a2a43" }} />
      <div className="blueprint absolute inset-0 opacity-50" />
      <div className="absolute inset-0 flex flex-col pt-16 md:pt-20">
        <div className="px-6 pb-3 md:px-14 md:pb-6">
          <p className="s3-eyebrow eyebrow !text-copper-light">03 – Os números da gestão</p>
          <h2 className="s3-title t-lg mt-2 md:mt-3">
            <Mask>O resultado também pode ser medido.</Mask>
          </h2>
        </div>
        <div className="relative grid flex-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1">
          {INDICADORES.map((ind, i) => (
            <div key={ind.id} className={`s3-col s3-col-${i} relative flex min-h-0 flex-col justify-between p-4 pb-12 md:p-10 md:pb-16`}>
              <div className="s3-bg absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.01]" />
              {i > 0 && (
                <span className="s3-divider absolute left-0 top-0 hidden h-full w-px origin-top bg-white/25 md:block" />
              )}
              {i > 0 && <span className="absolute left-0 top-0 h-px w-full bg-white/15 md:hidden" />}
              <div className="s3-head relative">
                <span className="eyebrow !text-copper-light">Indicador 0{i + 1}</span>
                <h3 className="t-md mt-1.5 max-w-[22ch]">{ind.titulo}</h3>
              </div>
              <div className="s3-number relative">
                {ind.out2026 != null ? (
                  <span className="s3-count num-mega block">0</span>
                ) : (
                  <>
                    <span className="s3-count num-mega outline-text block">000</span>
                    <span className="mt-2 inline-block">
                      <Pending>valor oficial pendente</Pending>
                    </span>
                  </>
                )}
                <p className="eyebrow mt-1 hidden md:block">{ind.unidade}</p>
              </div>
              <div className="relative">
                <svg viewBox="0 0 200 10" className="mb-3 hidden h-2.5 w-full md:block" fill="none" aria-hidden="true">
                  <line className="s3-cota" pathLength={1} x1="0" y1="5" x2="200" y2="5" stroke="#9db6c9" strokeWidth="1" />
                  <line className="s3-cota" pathLength={1} x1="0.5" y1="0" x2="0.5" y2="10" stroke="#9db6c9" strokeWidth="1" />
                  <line className="s3-cota" pathLength={1} x1="199.5" y1="0" x2="199.5" y2="10" stroke="#9db6c9" strokeWidth="1" />
                </svg>
                <Bars a={ind.dez2024} b={ind.out2026} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}