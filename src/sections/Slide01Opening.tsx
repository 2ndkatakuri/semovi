import { SectionTransition } from "@/components/SectionTransition";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { ImageReveal } from "@/components/ImageReveal";
import { VideoBackground } from "@/components/VideoBackground";
import { Mask } from "@/components/Field";
import { MEDIA } from "@/config/media";
import { gsap, prefersReducedMotion, type SceneBuilder } from "@/animations/scrollAnimations";
import { drawStrokes, revealOfficial } from "@/animations/svgAnimations";
import { layerIn, layerOut, maskHide, maskReveal, parallax, zoom } from "@/animations/transitions";

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37 + 11) % 96}%`,
  top: `${40 + ((i * 53) % 55)}%`,
  delay: `${(i * 0.9) % 9}s`,
  dx: `${((i % 5) - 2) * 14}px`,
}));

const build: SceneBuilder = (tl, q) => {
  /* ---- Abertura: tela escura → traçados desenham brasão e SEMOVI (ao carregar) ---- */
  const intro = gsap.timeline({ delay: 0.35 });
  drawStrokes(intro, q(".s1-logos .draw"), 0, 1.5, 0.045);
  revealOfficial(intro, q, ".s1-logos .brasao-mark", 2.4, 1.3, "circle");
  revealOfficial(intro, q, ".s1-logos .semovi-mark", 2.4, 1.3, "wipe");
  if (prefersReducedMotion()) intro.progress(1);

  /* ---- Scroll: imagem aérea revelada em círculo, logos sobem, título monumental ---- */
  tl.fromTo(
    q(".s1-photo"),
    { clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(85% at 50% 50%)", duration: 3.6, ease: "power2.inOut" },
    0.4
  );
  zoom(tl, q(".s1-photo-inner"), 1.45, 1.08, 0.4, 9.6);
  parallax(tl, q(".s1-photo-inner"), -7, 0.4, 9.6);
  tl.to(q(".s1-grid"), { autoAlpha: 0, duration: 2 }, 1.2);
  tl.to(q(".s1-tagline"), { autoAlpha: 0, duration: 0.8 }, 0.3);
  tl.to(
    q(".s1-logos"),
    { scale: 0.42, y: () => -window.innerHeight * 0.36, duration: 2.6, ease: "power2.inOut" },
    2.4
  );

  maskReveal(tl, q(".s1-title .mask-in"), 4.4, 1.2, 0.18);
  layerIn(tl, q(".s1-sub"), 5.3, 0.9, 0.12, 20);
  layerIn(tl, q(".s1-period"), 5.7, 0.9, 0.15, 20);

  maskHide(tl, q(".s1-title .mask-in"), 7, 0.9, 0.08);
  layerOut(tl, q(".s1-sub, .s1-period"), 6.9, 0.7);
  tl.to(q(".s1-logos"), { autoAlpha: 0, duration: 0.8 }, 7);

  layerIn(tl, q(".s1-quote-line"), 7.5, 1, 0.45, 30);
  layerOut(tl, q(".s1-quote"), 9.1, 0.8, -20);
  tl.to(q(".s1-fade"), { autoAlpha: 1, duration: 1 }, 9);
};

export default function Slide01Opening() {
  return (
    <SectionTransition id="abertura" n={1} label="Abertura" height={4.5} build={build}>
      {/* fundo escuro com grade técnica */}
      <div className="s1-grid blueprint absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay, ["--dx" as string]: p.dx }}
          />
        ))}
      </div>

      {/* imagem aérea / vídeo de abertura */}
      <div className="s1-photo absolute inset-0" style={{ clipPath: "circle(0% at 50% 50%)" }}>
        <div className="s1-photo-inner absolute -inset-[8%] will-change-transform">
          <ImageReveal
            src={MEDIA.images.altamiraAerea}
            alt="Vista aérea de Altamira"
            className="absolute inset-0"
            label="altamira-aerea.jpg"
          />
          <VideoBackground src={MEDIA.videos.abertura} poster={MEDIA.images.altamiraAerea} />
        </div>
        <div className="film absolute inset-0" />
      </div>

      {/* identidade */}
      <div className="s1-logos absolute inset-0 z-10 flex flex-col items-center justify-center will-change-transform">
        <AnimatedLogo />
        <p className="s1-tagline eyebrow mt-10 !text-white/70">Prefeitura Municipal de Altamira · Pará</p>
      </div>

      {/* título */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-20 sm:px-10 md:px-16 md:pb-24">
        <h1 className="s1-title t-mega">
          <Mask>Prestação</Mask>
          <Mask>de contas</Mask>
        </h1>
        <p className="s1-sub t-md mt-5 !font-extrabold uppercase tracking-[0.28em] text-copper-light">
          Secretaria de Obras
        </p>
        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
          <div className="s1-period border-l-2 border-white pl-4">
            <div className="font-display text-2xl font-black sm:text-3xl">2025–2026</div>
            <div className="eyebrow !text-white/70">Retrospectiva e resultados</div>
          </div>
          <div className="s1-period border-l-2 border-dashed border-copper-light pl-4">
            <div className="font-display text-2xl font-black text-copper-light sm:text-3xl">2027–2028</div>
            <div className="eyebrow !text-white/70">Perspectivas</div>
          </div>
        </div>
      </div>

      {/* frase central */}
      <div className="s1-quote pointer-events-none absolute inset-0 z-20 flex items-center px-6 sm:px-10 md:px-16">
        <p className="t-xl max-w-5xl">
          <span className="s1-quote-line block opacity-0">O trabalho que transforma a cidade.</span>
          <span className="s1-quote-line block text-copper-light opacity-0">As obras que constroem o futuro.</span>
        </p>
      </div>

      <div className="s1-fade pointer-events-none absolute inset-0 z-30 bg-navy-deep opacity-0" />
    </SectionTransition>
  );
}
