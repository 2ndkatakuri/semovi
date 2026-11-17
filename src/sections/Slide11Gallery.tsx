import { SectionTransition } from "@/components/SectionTransition";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { ImageReveal } from "@/components/ImageReveal";
import { VideoBackground } from "@/components/VideoBackground";
import { Field, Mask } from "@/components/Field";
import { MEDIA } from "@/config/media";
import { GALERIA_META } from "@/config/content";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { drawStrokes, revealOfficial } from "@/animations/svgAnimations";
import { clipIn, layerIn, layerOut, maskReveal, zoom } from "@/animations/transitions";

const DIRS = ["bottom", "right", "top", "left"] as const;
const STEP = 0.72;

const build: SceneBuilder = (tl, q) => {
  /* Galeria: cada fotografia entra e sai conforme a rolagem */
  layerIn(tl, q(".s11-eyebrow"), 0, 0.6, 0, 10);
  MEDIA.galeria.forEach((_, i) => {
    const S = i * STEP;
    const item = `.s11-item-${i}`;
    clipIn(tl, q(item), S, 0.8, DIRS[i % 4]);
    zoom(tl, q(`${item} .s11-zoom`), 1.45, 1.05, S, 1.9);
    layerIn(tl, q(`${item} .s11-cap > *`), S + 0.4, 0.5, 0.08, 20);
    if (i < MEDIA.galeria.length - 1) layerOut(tl, q(`${item} .s11-cap`), S + STEP + 0.05, 0.3, -10);
  });

  /* Encerramento: reconstrução vetorial do brasão e da identidade SEMOVI */
  const F = MEDIA.galeria.length * STEP;
  tl.to(q(".s11-gallery, .s11-eyebrow"), { autoAlpha: 0, duration: 0.7, ease: "none" }, F);
  tl.fromTo(q(".s11-final"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, ease: "none" }, F - 0.1);
  drawStrokes(tl, q(".s11-final .draw"), F + 0.3, 1.5, 0.04);
  revealOfficial(tl, q, ".s11-final .brasao-mark", F + 1.5, 0.9, "circle");
  revealOfficial(tl, q, ".s11-final .semovi-mark", F + 1.5, 0.9, "wipe");
  maskReveal(tl, q(".s11-phrase .mask-in"), F + 1.9, 0.9, 0.2);
  layerIn(tl, q(".s11-credit"), F + 2.5, 0.6, 0, 10);
};

export default function Slide11Gallery() {
  return (
    <SectionTransition id="galeria" n={11} label="Registro fotográfico e encerramento" height={11} build={build}>
      <p className="s11-eyebrow eyebrow pointer-events-none absolute left-6 top-24 z-20 !text-copper-light opacity-0 sm:left-10 md:left-16">
        11 · Registro fotográfico
      </p>

      <div className="s11-gallery absolute inset-0">
        {MEDIA.galeria.map((src, i) => {
          const m = GALERIA_META[i];
          return (
            <figure key={src} className={`s11-item s11-item-${i} absolute inset-0 m-0`} style={{ clipPath: "inset(100% 0 0 0)" }}>
              <ImageReveal
                src={src}
                alt={m.identificacao ?? `Registro fotográfico ${i + 1}`}
                className="absolute inset-0"
                imgClassName="s11-zoom"
                label={`galeria/foto-${String(i + 1).padStart(2, "0")}.jpg`}
              />
              <div className="film absolute inset-0" />
              <figcaption className="s11-cap absolute inset-x-0 bottom-0 grid gap-4 px-6 pb-20 sm:px-10 md:grid-cols-[auto_1fr_1fr_1fr_1.4fr] md:items-end md:gap-8 md:px-16 md:pb-14">
                <div className="font-display text-5xl font-black leading-none text-white/90 md:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-lg text-white/50">/{MEDIA.galeria.length}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 md:contents">
                  <Field label="Identificação" value={m.identificacao} />
                  <Field label="Data" value={m.data} />
                  <Field label="Local" value={m.local} />
                </div>
                <Field label="Descrição" value={m.descricao} className="hidden md:block" />
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* encerramento */}
      <div className="s11-final invisible absolute inset-0 flex flex-col items-center justify-center bg-navy-deep px-6 text-center opacity-0">
        <VideoBackground src={MEDIA.videos.encerramento} maxOpacity={0.3} />
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="relative">
          <AnimatedLogo stacked className="[&_.brasao-mark]:w-36 sm:[&_.brasao-mark]:w-48 md:[&_.brasao-mark]:w-56" />
        </div>
        <h2 className="s11-phrase t-xl relative mt-10 max-w-5xl">
          <Mask>Altamira em movimento.</Mask>
          <Mask inClassName="text-leaf">O trabalho continua.</Mask>
        </h2>
        <p className="s11-credit eyebrow relative mt-8 opacity-0">
          Prefeitura Municipal de Altamira · Secretaria Municipal de Obras e Viação
        </p>
      </div>
    </SectionTransition>
  );
}
