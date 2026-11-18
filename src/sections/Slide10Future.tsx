import { SectionTransition } from "@/components/SectionTransition";
import { Timeline } from "@/components/Timeline";
import { ImageReveal, OptionalImg } from "@/components/ImageReveal";
import { VideoBackground } from "@/components/VideoBackground";
import { Field, Mask } from "@/components/Field";
import { MEDIA } from "@/config/media";
import { EIXOS } from "@/config/content";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { drawStrokes, prepareStrokes } from "@/animations/svgAnimations";
import { layerIn, layerOut, maskReveal } from "@/animations/transitions";

const TINTS = ["#5a7d9a", "#9db6c9", "#a44a2a", "#e58f68"];
const ASSETS = [
  { img: MEDIA.images.pavimentacao, video: MEDIA.videos.pavimentacao, icon: MEDIA.svg.iconeAsfalto, file: "pavimentacao.jpg" },
  { img: MEDIA.images.terraplenagem, video: MEDIA.videos.terraplenagem, icon: MEDIA.svg.iconeTerraplenagem, file: "terraplenagem.jpg" },
  { img: MEDIA.images.iluminacaoPublica, video: MEDIA.videos.iluminacao, icon: MEDIA.svg.iconeIluminacao, file: "iluminacao-publica.jpg" },
];
const YEAR_SVGS = [MEDIA.svg.timeline2025, MEDIA.svg.timeline2026, MEDIA.svg.timeline2027, MEDIA.svg.timeline2028];

const build: SceneBuilder = (tl, q) => {
  layerIn(tl, q(".s10-eyebrow"), 0, 0.8, 0, 14);
  maskReveal(tl, q(".s10-title .mask-in"), 0.1, 1.1, 0.14);
  drawStrokes(tl, q(".s10-ring .draw"), 0, 4.5, 0.3);
  tl.to(q(".s10-ring"), { rotate: 150, duration: 10, ease: "none" }, 0);
  const segs = q(".tl-seg");
  prepareStrokes(segs);
  segs.forEach((seg, i) => drawStrokes(tl, seg, 0.4 + i * 0.95, 1.05));
  const years = q(".tl-year");
  years.forEach((y, i) => {
    const at = 0.7 + i * 0.95;
    tl.fromTo(y, { yPercent: 115 }, { yPercent: 0, duration: 1, ease: "power3.out" }, at);
    tl.fromTo(q(".tl-dot")[i], { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2.5)" }, at + 0.2);
    layerIn(tl, q(".tl-label")[i], at + 0.3, 0.6, 0, 10);
    layerIn(tl, q(".tl-note")[i], at + 0.4, 0.6, 0, 10);
    tl.to(q(".s10-tint"), { backgroundColor: TINTS[i], duration: 0.9, ease: "none" }, at);
    tl.fromTo(q(`.s10-yearsvg-${i}`), { autoAlpha: 0, y: 20 }, { autoAlpha: 0.9, y: 0, duration: 0.8 }, at + 0.3);
  });
  tl.fromTo(q(".s10-brace-a"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut" }, 2.4);
  tl.fromTo(q(".s10-brace-b"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut" }, 3.9);
  layerIn(tl, q(".s10-brace-a + span, .s10-brace-b + span"), 2.8, 0.7, 1.2, 10);

  const T = 5.2;
  layerOut(tl, q(".s10-head, .s10-braces, .s10-yearsvg"), T - 0.2, 0.7, -10);
  tl.to(
    q(".s10-tl"),
    { scale: 0.4, y: () => -(window.innerHeight * 0.4 - 78), duration: 1, ease: "power3.inOut" },
    T
  );
  tl.to(q(".s10-ring"), { opacity: 0.25, duration: 1 }, T);
  EIXOS.forEach((_, i) => {
    const at = T + 0.6 + i * 1.5;
    const p = `.s10-panel-${i}`;
    tl.fromTo(q(p), { xPercent: 100 }, { xPercent: 0, duration: 1.1, ease: "power3.inOut" }, at);
    tl.fromTo(q(`${p} .s10-pimg`), { xPercent: -14, scale: 1.25 }, { xPercent: 0, scale: 1.05, duration: 3, ease: "none" }, at);
    layerIn(tl, q(`${p} .s10-pc > *`), at + 0.8, 0.7, 0.12, 24);
    layerIn(tl, q(`${p} .s10-it`), at + 1.2, 0.6, 0.12, 16);
    tl.fromTo(q(`${p} .s10-badge`), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, at + 1.4);
    if (i > 0) tl.to(q(`.s10-panel-${i - 1} .s10-pimg`), { xPercent: 12, duration: 1.1, ease: "none" }, at);
  });
};

export default function Slide10Future() {
  return (
    <SectionTransition id="futuro" n={10} label="Próximos passos 2027-2028" height={8} build={build}>
      <div className="s10-tint absolute inset-0 opacity-[0.2]" style={{ backgroundColor: "#0a2a43" }} />
      <div className="blueprint absolute inset-0 opacity-40" />
      <svg viewBox="0 0 400 400" className="s10-ring pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2" fill="none" aria-hidden="true">
        <circle className="draw" pathLength={1} cx="200" cy="200" r="190" stroke="#5a7d9a" strokeOpacity="0.45" strokeWidth="0.8" />
        <circle className="draw" pathLength={1} cx="200" cy="200" r="140" stroke="#5a7d9a" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="1" />
        <line className="draw" pathLength={1} x1="200" y1="0" x2="200" y2="400" stroke="#e58f68" strokeOpacity="0.5" strokeWidth="0.8" />
        <line className="draw" pathLength={1} x1="0" y1="200" x2="400" y2="200" stroke="#e58f68" strokeOpacity="0.5" strokeWidth="0.8" />
      </svg>
      <div className="s10-head absolute inset-x-0 top-0 px-6 pt-20 md:px-14">
        <p className="s10-eyebrow eyebrow !text-copper-light">10 – Próximos passos 2027-2028</p>
        <h2 className="s10-title t-lg mt-3">
          <Mask>O próximo capítulo</Mask>
          <Mask>começa agora.</Mask>
        </h2>
      </div>
      <div className="s10-tl absolute inset-x-0 top-[40%] z-20 px-4 will-change-transform md:px-14" style={{ transformOrigin: "50% 0" }}>
        <Timeline />
        <div className="s10-braces mt-5 grid grid-cols-2 gap-2">
          <div>
            <span className="s10-brace-a block h-px origin-left bg-white" />
            <span className="eyebrow mt-2 block !text-white opacity-0">2025–2026 – retrospectiva – realizado</span>
          </div>
          <div>
            <span className="s10-brace-b block h-px origin-left bg-copper-light" />
            <span className="eyebrow mt-2 block !text-copper-light opacity-0">2027–2028 – planejamento – metas</span>
          </div>
        </div>
        <div className="mt-6 hidden justify-between gap-4 md:flex">
          {YEAR_SVGS.map((src, i) => (
            <div key={src} className={`s10-yearsvg s10-yearsvg-${i} flex h-16 flex-1 justify-center opacity-0`}>
              <OptionalImg src={src} alt={`Linha do tempo ${2025 + i}`} className="h-full w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
      {EIXOS.map((e, i) => (
        <article key={e.id} className={`s10-panel s10-panel-${i} absolute inset-0 z-10`} style={{ transform: "translateX(100%)" }}>
          <div className="absolute inset-0 overflow-hidden bg-navy-deep">
            <div className="s10-pimg absolute -inset-[8%] will-change-transform">
              <ImageReveal src={ASSETS[i].img} alt={e.titulo} className="absolute inset-0" label={ASSETS[i].file} />
              <VideoBackground src={ASSETS[i].video} poster={ASSETS[i].img} maxOpacity={0.7} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/75 to-navy-deep/25" />
          <OptionalImg
            src={ASSETS[i].icon}
            alt=""
            className="absolute bottom-24 right-8 hidden h-28 w-28 opacity-80 lg:block"
          />
          <div className="s10-pc absolute inset-0 grid content-end gap-6 px-6 pb-20 pt-36 md:grid-cols-[1.25fr_1fr] md:content-center md:items-center md:gap-14 md:px-16 md:pb-8 md:pt-44">
            <div>
              <p className="eyebrow !text-copper-light">Eixo estratégico {e.n} / 03</p>
              <h3 className="t-xl mt-2 max-w-[16ch]">{e.titulo}</h3>
              <ul className="mt-5 space-y-2 md:mt-8 md:space-y-3">
                {e.itens.map((it) => (
                  <li key={it} className="s10-it flex items-center gap-3 text-sm md:text-lg">
                    <span className="h-px w-6 bg-copper-light md:w-10" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l border-copper-light/60 pl-5">
              <span className="s10-badge mb-4 inline-block border border-dashed border-copper-light px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-copper-light opacity-0">
                Planejamento – previsão, não obra executada
              </span>
              <div className="grid grid-cols-3 gap-4 md:grid-cols-1 md:gap-5">
                <Field label="Meta" value={e.meta} />
                <Field label="Prazo" value={e.prazo} />
                <Field label="Responsável" value={e.responsavel} />
              </div>
            </div>
          </div>
        </article>
      ))}
    </SectionTransition>
  );
}