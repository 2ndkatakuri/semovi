import { SectionTransition } from "@/components/SectionTransition";
import { ImageReveal, OptionalImg } from "@/components/ImageReveal";
import { Field, Mask } from "@/components/Field";
import { MEDIA } from "@/config/media";
import { DIMENSOES } from "@/config/content";
import { gsap, type SceneBuilder } from "@/animations/scrollAnimations";
import { clipIn, layerIn, layerOut, maskHide, maskReveal, zoom } from "@/animations/transitions";

const PANELS = [
  { img: MEDIA.images.pavimentacao, icon: MEDIA.svg.iconeAsfalto, file: "pavimentacao.jpg" },
  { img: MEDIA.images.vicinais, icon: MEDIA.svg.iconeTerraplenagem, file: "vicinais.jpg" },
  { img: MEDIA.images.iluminacaoPublica, icon: MEDIA.svg.iconeIluminacao, file: "iluminacao-publica.jpg" },
];

const build: SceneBuilder = (tl, q) => {
  const poly = q(".s5-poly")[0] as unknown as SVGPolygonElement;
  const line = q(".s5-edge")[0] as unknown as SVGLineElement;
  const knob = q(".s5-knob")[0] as HTMLElement;
  const state = { x: -0.2 };
  const apply = () => {
    const x = state.x;
    const w = 0.1;
    poly.setAttribute("points", `0,0 ${x + w},0 ${x - w},1 0,1`);
    line.setAttribute("x1", String(x + w));
    line.setAttribute("x2", String(x - w));
    knob.style.left = `${Math.max(0, Math.min(1, x)) * 100}%`;
    knob.style.opacity = x <= -0.1 || x >= 1.1 ? "0" : "1";
  };
  apply();
  maskReveal(tl, q(".s5-title .mask-in"), 0.1, 1.1, 0.14);
  layerIn(tl, q(".s5-eyebrow, .s5-label-before"), 0.2, 0.8, 0.1, 14);
  zoom(tl, q(".s5-ba-zoom"), 1.25, 1.05, 0, 5);
  tl.to(state, { x: 1.2, duration: 3.6, ease: "none", onUpdate: apply }, 0.9);
  layerIn(tl, q(".s5-label-after"), 3.4, 0.7, 0, 14);
  maskHide(tl, q(".s5-title .mask-in"), 4.5, 0.7, 0.06);
  layerOut(tl, q(".s5-ba-meta"), 4.6, 0.6);

  DIMENSOES.forEach((_, i) => {
    const at = 5 + i * 0.55;
    const p = `.s5-panel-${i}`;
    clipIn(tl, q(p), at, 1.3, "bottom");
    zoom(tl, q(`${p} .s5-pz`), 1.35, 1.05, at, 4.6);
    layerIn(tl, q(`${p} .s5-pc > *`), at + 0.9, 0.7, 0.12, 24);
    tl.fromTo(q(`${p} .s5-ind-line`), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, at + 1.6);
    tl.fromTo(q(`${p} .s5-icon`), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 0.9, scale: 1, duration: 0.8 }, at + 1.2);
  });
  gsap.set(q(".s5-panel"), { willChange: "clip-path" });
};

export default function Slide05CitizenImpact() {
  return (
    <SectionTransition id="cidadao" n={5} label="Resultados para o cidadão" height={4.5} build={build}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="s5-clip" clipPathUnits="objectBoundingBox">
            <polygon className="s5-poly" points="0,0 0,0 0,1 0,1" />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0">
        <ImageReveal
          src={MEDIA.images.obrasAntes}
          alt="Local antes da obra"
          className="absolute inset-0"
          imgClassName="s5-ba-zoom"
          label="obras-antes.jpg"
        />
        <div className="absolute inset-0" style={{ clipPath: "url(#s5-clip)" }}>
          <ImageReveal
            src={MEDIA.images.obrasDepois}
            alt="Local depois da obra"
            className="absolute inset-0"
            imgClassName="s5-ba-zoom"
            label="obras-depois.jpg"
          />
        </div>
        <div className="film absolute inset-0" />
        <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="s5-ba-meta pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <line className="s5-edge" x1="0" y1="0" x2="0" y2="1" stroke="#fff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="s5-knob s5-ba-meta pointer-events-none absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-navy-deep/70 backdrop-blur" style={{ left: "0%", opacity: 0 }}>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="#fff" strokeWidth="1.5">
            <path d="M6 1L1 6l5 5M14 1l5 5-5 5" />
          </svg>
        </div>
        <div className="absolute inset-x-0 top-0 px-6 pt-24 sm:px-10 md:px-16">
          <p className="s5-eyebrow eyebrow !text-copper-light">05 – Resultados para o cidadão</p>
          <h2 className="s5-title t-xl mt-4 max-w-4xl">
            <Mask>Obras não</Mask>
            <Mask>apenas estruturas.</Mask>
            <Mask inClassName="text-copper-light">São mudanças na vida das pessoas.</Mask>
          </h2>
        </div>
        <div className="s5-ba-meta absolute inset-x-0 bottom-0 flex justify-between px-6 pb-20 sm:px-10 md:px-16">
          <span className="s5-label-before eyebrow rounded-sm bg-navy-deep/70 px-3 py-1.5 !text-white">Antes</span>
          <span className="s5-label-after eyebrow rounded-sm bg-leaf px-3 py-1.5 !text-navy-deep opacity-0">Depois</span>
        </div>
      </div>
      <div className="absolute inset-0 grid grid-rows-3 md:grid-cols-3 md:grid-rows-1">
        {DIMENSOES.map((d, i) => (
          <div key={d.id} className={`s5-panel s5-panel-${i} relative overflow-hidden`} style={{ clipPath: "inset(100% 0 0 0)" }}>
            <ImageReveal src={PANELS[i].img} alt={d.titulo} className="absolute inset-0" imgClassName="s5-pz" label={PANELS[i].file} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/55 to-navy-deep/30" />
            {i > 0 && <span className="absolute left-0 top-0 hidden h-full w-px bg-white/30 md:block" />}
            <OptionalImg
              src={PANELS[i].icon}
              alt=""
              className="s5-icon absolute right-5 top-24 hidden h-16 w-16 opacity-0 md:block"
            />
            <div className="s5-pc absolute inset-x-0 bottom-0 p-5 pb-14 md:p-10 md:pb-24">
              <p className="eyebrow !text-copper-light">0{i + 1}</p>
              <h3 className="t-lg mt-1">{d.titulo}</h3>
              <p className="body-copy mt-2 hidden max-w-[34ch] sm:block">{d.vinculo}</p>
              <div>
                <span className="s5-ind-line mb-3 mt-4 block h-0.5 w-full origin-left bg-leaf md:mt-6" />
                <Field label="Indicador de impacto" value={d.indicador} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionTransition>
  );
}