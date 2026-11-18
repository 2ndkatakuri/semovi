import { SectionTransition } from "@/components/SectionTransition";
import { OptionalImg } from "@/components/ImageReveal";
import { VideoBackground } from "@/components/VideoBackground";
import { Field, Mask } from "@/components/Field";
import { MEDIA } from "@/config/media";
import { IDENTIFICACAO, TERRITORIOS } from "@/config/content";
import { num } from "@/utils/format";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { drawStrokes } from "@/animations/svgAnimations";
import { layerIn, layerOut, maskReveal } from "@/animations/transitions";

const COLORS: Record<string, string> = {
  bairros: "#ffffff",
  distritos: "#e58f68",
  rurais: "#9db6c9",
  ribeirinhas: "#4fb633",
};

const POINTS: Record<string, [number, number][]> = {
  bairros: [[300, 250], [330, 230], [275, 225], [320, 270], [355, 255], [285, 275]],
  distritos: [[150, 170], [470, 150], [440, 360]],
  rurais: [[210, 120], [390, 110], [500, 230], [180, 300], [250, 420]],
  ribeirinhas: [[140, 330], [230, 345], [370, 300], [470, 295]],
};

const CONTOUR =
  "M70 250 C60 170 130 90 230 70 C310 55 360 90 430 80 C510 70 560 140 548 220 C540 290 575 340 520 400 C470 455 390 440 330 470 C250 500 170 470 120 410 C80 365 78 310 70 250 Z";
const RIVER = "M10 335 C110 300 190 365 280 325 C370 285 420 335 500 295 C545 275 580 285 600 272";

const build: SceneBuilder = (tl, q) => {
  tl.fromTo(q(".s2-grid"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 0);
  maskReveal(tl, q(".s2-title .mask-in"), 0.2, 1.2, 0.15);
  layerIn(tl, q(".s2-eyebrow"), 0, 0.8);
  drawStrokes(tl, q(".s2-contour"), 0.4, 3.2);
  drawStrokes(tl, q(".s2-river"), 2, 2.2);
  drawStrokes(tl, q(".s2-line"), 3, 1.5, 0.12);
  tl.fromTo(q(".s2-contour-fill"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 }, 3);
  TERRITORIOS.forEach((t, i) => {
    const at = 4 + i * 0.95;
    tl.fromTo(
      q(`.s2-pt-${t.id}`),
      { scale: 0, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: "back.out(2)" },
      at
    );
    tl.fromTo(q(`.s2-leg-${t.id}`), { opacity: 0.28, x: -12 }, { opacity: 1, x: 0, duration: 0.7 }, at);
  });
  tl.fromTo(q(".s2-official-map"), { autoAlpha: 0 }, { autoAlpha: 0.9, duration: 1.5 }, 7.3);
  layerOut(tl, q(".s2-panelA"), 8.1, 0.7, -30);
  layerIn(tl, q(".s2-panelB"), 8.6, 0.9, 0.1, 30);
};

export default function Slide02Territory() {
  return (
    <SectionTransition id="territorio" n={2} label="Identificação e território" height={4} build={build}>
      <VideoBackground src={MEDIA.videos.altamiraAerea} maxOpacity={0.16} />
      <div className="s2-grid blueprint absolute inset-0 opacity-0" />
      <div className="absolute inset-0 grid grid-rows-[auto_1fr] gap-2 px-6 pb-20 pt-20 md:grid-cols-[0.9fr_1.1fr] md:grid-rows-1 md:items-center md:gap-10 md:px-14 md:pt-16">
        <div className="grid">
          <div className="s2-panelA [grid-area:1/1]">
            <p className="s2-eyebrow eyebrow !text-copper-light">02 – Identificação e território</p>
            <h2 className="s2-title t-xl mt-3 md:mt-5">
              <Mask>Uma cidade,</Mask>
              <Mask>muitas realidades.</Mask>
              <Mask inClassName="text-copper-light">Um compromisso.</Mask>
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:mt-10 md:grid-cols-1 md:gap-y-4">
              {TERRITORIOS.map((t) => (
                <li key={t.id} className={`s2-leg-${t.id} flex items-center gap-3 opacity-30`}>
                  <span className="glow-dot h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COLORS[t.id], boxShadow: `0 0 12px 2px ${COLORS[t.id]}` }} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sm font-bold uppercase tracking-wide md:text-base">{t.label}</span>
                    <span className="eyebrow hidden md:block">{t.detalhe}</span>
                  </span>
                  <Field label="" value={num(t.quantidade)} className="hidden text-right md:block [&>span:first-child]:hidden" />
                </li>
              ))}
            </ul>
          </div>
          <div className="s2-panelB invisible opacity-0 [grid-area:1/1]">
            <p className="eyebrow !text-copper-light">Identificação da Secretaria</p>
            <h3 className="t-lg mt-3">{IDENTIFICACAO.secretaria}</h3>
            <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <Field label="Titular" value={IDENTIFICACAO.titular} />
              <Field label="Ponto focal" value={IDENTIFICACAO.pontoFocal} />
              <Field label="Estrutura administrativa" value={IDENTIFICACAO.estrutura} />
              <Field label="Equipes" value={IDENTIFICACAO.equipes} />
            </div>
          </div>
        </div>
        <div className="relative min-h-0">
          <svg viewBox="0 0 600 520" className="absolute inset-0 h-full w-full" fill="none" aria-label="Mapa esquemático de Altamira">
            <g stroke="#5a7d9a" strokeWidth="0.8" strokeOpacity="0.7">
              {[130, 260, 390].map((x) => (
                <line key={`v${x}`} className="s2-line" pathLength={1} x1={x} y1="20" x2={x} y2="500" strokeDasharray="1" />
              ))}
              {[130, 260, 390].map((y) => (
                <line key={`h${y}`} className="s2-line" pathLength={1} x1="20" y1={y} x2="580" y2={y} />
              ))}
            </g>
            <path className="s2-contour-fill opacity-0" d={CONTOUR} fill="rgba(90,125,154,0.14)" />
            <path className="s2-contour" pathLength={1} d={CONTOUR} stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
            <path className="s2-contour" pathLength={1} d={CONTOUR} stroke="#5a7d9a" strokeWidth="1" transform="translate(300 260) scale(.94) translate(-300 -260)" />
            <path className="s2-river" pathLength={1} d={RIVER} stroke="#9db6c9" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.55" />
            <path className="s2-river" pathLength={1} d={RIVER} stroke="#fff" strokeWidth="1" strokeLinecap="round" />
            {TERRITORIOS.map((t) =>
              POINTS[t.id].map(([x, y], i) => (
                <g key={`${t.id}${i}`} className={`s2-pt-${t.id} fb`} opacity="0">
                  <circle cx={x} cy={y} r="15" fill={COLORS[t.id]} opacity="0.12" />
                  <circle className="glow-dot fb" cx={x} cy={y} r="9" stroke={COLORS[t.id]} strokeWidth="1" />
                  <circle cx={x} cy={y} r="3.6" fill={COLORS[t.id]} />
                </g>
              ))
            )}
            <text x="24" y="512" fontSize="10" fill="#9db6c9" fontFamily="ui-monospace, monospace" letterSpacing="2">
              ESQUEMA ILUSTRATIVO – NÃO GEORREFERENCIADO
            </text>
          </svg>
          <OptionalImg
            src={MEDIA.svg.mapa}
            alt="Mapa oficial de Altamira"
            className="s2-official-map absolute inset-0 h-full w-full object-contain opacity-0"
          />
        </div>
      </div>
    </SectionTransition>
  );
}