import { SectionTransition } from "@/components/SectionTransition";
import { ImageReveal, OptionalImg } from "@/components/ImageReveal";
import { VideoBackground } from "@/components/VideoBackground";
import { Field, Mask } from "@/components/Field";
import { MEDIA } from "@/config/media";
import { ENTREGAS } from "@/config/content";
import { brl } from "@/utils/format";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { clipIn, layerIn, layerOut, maskHide, maskReveal, zoom } from "@/animations/transitions";

const ASSETS = [
  { img: MEDIA.images.orlaCais, svg: MEDIA.svg.orlaCais, file: "orla-cais.jpg" },
  { img: MEDIA.images.exposicao2025, svg: MEDIA.svg.exposicao2025, file: "exposicao-2025.jpg" },
  { img: MEDIA.images.pontePeixaria, svg: MEDIA.svg.pontePeixaria, file: "ponte-peixaria.jpg" },
];

const SEG = 10 / 3;

const build: SceneBuilder = (tl, q) => {
  layerIn(tl, q(".s4-intro"), 0, 0.6, 0, 16);
  layerOut(tl, q(".s4-intro"), 0.8, 0.5, -10);

  ENTREGAS.forEach((_, i) => {
    const S = i * SEG;
    const item = `.s4-item-${i}`;
    const enter = i === 0 ? 1.0 : S - 0.3;

    clipIn(tl, q(item), enter, 1.2, i === 1 ? "right" : "bottom");
    zoom(tl, q(`${item} .s4-zoom`), 1.5, 1.08, enter, SEG + 0.6);
    tl.fromTo(q(`${item} .s4-svg`), { autoAlpha: 0, x: 40 }, { autoAlpha: 0.9, x: 0, duration: 1 }, enter + 0.9);

    maskReveal(tl, q(`${item} .s4-name .mask-in`), enter + 0.7, 1, 0.15);
    layerIn(tl, q(`${item} .s4-eyebrow`), enter + 0.6, 0.7, 0, 16);
    layerIn(tl, q(`${item} .s4-data > *`), enter + 1.1, 0.7, 0.1, 22);

    tl.fromTo(q(`.s4-ind-${i}`), { opacity: 0.35 }, { opacity: 1, duration: 0.5 }, enter + 0.5);
    tl.fromTo(q(`.s4-ind-${i} .s4-ind-bar`), { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, enter + 0.5);

    if (i < ENTREGAS.length - 1) {
      const out = S + SEG - 0.6;
      maskHide(tl, q(`${item} .s4-name .mask-in`), out - 0.3, 0.6, 0.05);
      layerOut(tl, q(`${item} .s4-data, ${item} .s4-eyebrow, ${item} .s4-svg`), out - 0.3, 0.6, -14);
      tl.to(q(`${item} .s4-parallax`), { yPercent: -10, scale: 0.94, duration: 1.2, ease: "none" }, out - 0.3);
      tl.to(q(`.s4-ind-${i}`), { opacity: 0.35, duration: 0.4 }, out);
    }
  });
};

export default function Slide04Deliveries() {
  return (
    <SectionTransition id="entregas" n={4} label="Principais entregas" height={5.5} build={build}>
      <VideoBackground src={MEDIA.videos.principaisObras} maxOpacity={0.4} />

      <div className="s4-intro pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 text-center opacity-0 md:px-16">
        <p className="eyebrow !text-copper-light">04 · Principais entregas</p>
        <h2 className="t-xl mt-3">Do planejamento à realidade.</h2>
      </div>

      {ENTREGAS.map((e, i) => (
        <article key={e.id} className={`s4-item s4-item-${i} absolute inset-0`} style={{ clipPath: "inset(100% 0 0 0)" }}>
          <div className="s4-parallax absolute inset-0">
            <ImageReveal
              src={ASSETS[i].img}
              alt={`${e.nome}`}
              className="absolute inset-0"
              imgClassName="s4-zoom"
              label={ASSETS[i].file}
            />
          </div>
          <div className="film absolute inset-0" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-navy-deep/80 via-navy-deep/25 to-transparent" />
          <OptionalImg
            src={ASSETS[i].svg}
            alt={`Ilustração técnica — ${e.nome}`}
            className="s4-svg absolute right-8 top-24 hidden w-44 opacity-0 md:block lg:w-60"
          />

          <div className="absolute inset-x-0 bottom-0 grid items-end gap-6 px-6 pb-20 sm:px-10 md:grid-cols-[1.25fr_1fr] md:gap-12 md:px-16 md:pb-16">
            <div>
              <p className="s4-eyebrow eyebrow !text-copper-light">
                Entrega 0{i + 1} / 03
              </p>
              <h3 className="s4-name t-mega mt-3 !text-[clamp(2.4rem,8.4vw,8.4rem)]">
                {e.nome.split(" ").reduce<string[]>((lines, w) => {
                  const last = lines[lines.length - 1];
                  if (last && (last + " " + w).length <= 11) lines[lines.length - 1] = last + " " + w;
                  else lines.push(w);
                  return lines;
                }, []).map((line) => (
                  <Mask key={line}>{line}</Mask>
                ))}
              </h3>
            </div>

            <div className="s4-data grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/30 pt-4 md:gap-y-4">
              <Field label="Localização" value={e.localizacao} />
              <Field label="Período de execução" value={e.periodo} />
              <Field label="Investimento" value={brl(e.investimento)} />
              <Field label="Origem do recurso" value={e.origem} />
              <Field label="Descrição do serviço" value={e.descricao} className="col-span-2" />
            </div>
          </div>
        </article>
      ))}

      {/* indicador lateral */}
      <div className="pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 sm:left-8 md:flex">
        {ENTREGAS.map((e, i) => (
          <div key={e.id} className={`s4-ind-${i} opacity-35`}>
            <span className="font-mono text-xs text-white">0{i + 1}</span>
            <span className="mt-1 block h-px w-8 bg-white/25">
              <span className="s4-ind-bar block h-full origin-left bg-copper-light" />
            </span>
          </div>
        ))}
      </div>
    </SectionTransition>
  );
}
