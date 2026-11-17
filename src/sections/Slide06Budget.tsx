import { SectionTransition } from "@/components/SectionTransition";
import { Field, Mask, Pending } from "@/components/Field";
import { ORCAMENTO } from "@/config/content";
import { brl, brlCompact, pct } from "@/utils/format";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { drawStrokes } from "@/animations/svgAnimations";
import { growBars, layerIn, layerOut, maskReveal } from "@/animations/transitions";

const GROUPS = [
  { key: "dotacao", label: "Dotação", vals: ORCAMENTO.dotacao },
  { key: "empenhado", label: "Empenhado", vals: ORCAMENTO.empenhado },
  { key: "liquidado", label: "Liquidado", vals: ORCAMENTO.liquidado },
] as const;

const YEAR_TONES = ["bg-steel", "bg-copper"];
const all = GROUPS.flatMap((g) => g.vals).filter((v): v is number => v != null);
const MAX = all.length ? Math.max(...all) : null;

function ratio(i: number): number | null {
  const d = ORCAMENTO.dotacao[i];
  const l = ORCAMENTO.liquidado[i];
  return d != null && l != null && d > 0 ? l / d : null;
}

const build: SceneBuilder = (tl, q) => {
  maskReveal(tl, q(".s6-title .mask-in"), 0.1, 1.1, 0.14);
  layerIn(tl, q(".s6-eyebrow, .s6-legend, .s6-note"), 0.2, 0.8, 0.12, 14);
  drawStrokes(tl, q(".s6-axis"), 0.6, 1.4, 0.1);

  GROUPS.forEach((_, gi) => {
    const at = 1.4 + gi * 1.4;
    growBars(tl, q(`.s6-grp-${gi} .s6-bar`), at, 1.4, 0.2);
    layerIn(tl, q(`.s6-grp-${gi} .s6-val`), at + 1, 0.6, 0.15, 10);
    layerIn(tl, q(`.s6-grp-${gi} .s6-glabel`), at, 0.6, 0, 10);
  });

  // indicadores progressivos (anéis)
  drawStrokes(tl, q(".s6-ring-track"), 1.6, 1.4, 0.2);
  [0, 1].forEach((i) => {
    const r = ratio(i);
    const el = q(`.s6-ring-${i}`);
    if (r != null) {
      tl.fromTo(el, { strokeDashoffset: 1 }, { strokeDashoffset: 1 - r, duration: 2, ease: "power2.out" }, 4.8);
    }
  });
  layerIn(tl, q(".s6-ring-wrap"), 4.2, 0.8, 0.2, 14);

  // gráfico → detalhamento por programa/ação
  layerOut(tl, q(".s6-chart"), 6.8, 0.8, -30);
  layerIn(tl, q(".s6-programs"), 7.4, 0.9, 0, 30);
  layerIn(tl, q(".s6-prog-row"), 7.7, 0.8, 0.25, 24);
  growBars(tl, q(".s6-prog-bar"), 8.2, 1.2, 0.2, "x");
};

export default function Slide06Budget() {
  return (
    <SectionTransition id="orcamento" n={6} label="Execução orçamentária" height={3.5} build={build}>
      <div className="blueprint absolute inset-0 opacity-40" />
      <div className="absolute inset-0 grid grid-rows-[auto_1fr] gap-4 px-6 pb-20 pt-20 md:grid-cols-[0.85fr_1.15fr] md:grid-rows-1 md:items-center md:gap-14 md:px-14 md:pt-16">
        {/* texto, legenda e anéis */}
        <div>
          <p className="s6-eyebrow eyebrow !text-copper-light">06 · Execução orçamentária</p>
          <h2 className="s6-title t-xl mt-3 md:mt-5">
            <Mask>Recursos públicos.</Mask>
            <Mask inClassName="text-copper-light">Responsabilidade</Mask>
            <Mask>e resultado.</Mask>
          </h2>
          <div className="s6-legend mt-4 flex gap-6 md:mt-8">
            {ORCAMENTO.anos.map((a, i) => (
              <span key={a} className="flex items-center gap-2 font-mono text-xs">
                <span className={`h-3 w-3 ${YEAR_TONES[i]}`} /> {a}
              </span>
            ))}
          </div>
          <div className="mt-5 hidden gap-6 md:flex">
            {[0, 1].map((i) => {
              const r = ratio(i);
              return (
                <div key={i} className="s6-ring-wrap relative h-28 w-28 opacity-0">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" fill="none">
                    <circle className="s6-ring-track" pathLength={1} cx="50" cy="50" r="44" stroke="#5a7d9a" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="0.02 0.02" />
                    <circle className={`s6-ring-${i}`} pathLength={1} cx="50" cy="50" r="44" stroke="#4fb633" strokeWidth="5" strokeDasharray="1" strokeDashoffset="1" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display text-xl font-black">{r != null ? pct(r * 100) : "—%"}</span>
                    <span className="eyebrow !text-[0.55rem]">{ORCAMENTO.anos[i]}</span>
                  </div>
                </div>
              );
            })}
            <p className="s6-note self-center text-xs leading-relaxed text-white/60">
              Liquidado ÷ dotação.
              <br />
              <Pending>validação da Contabilidade</Pending>
            </p>
          </div>
        </div>

        {/* gráfico / detalhamento */}
        <div className="grid min-h-0">
          <div className="s6-chart flex flex-col justify-end [grid-area:1/1]">
            <div className="relative flex h-[34svh] items-end gap-4 border-b border-white/30 pb-0 md:h-[48svh] md:gap-10">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
                {[25, 50, 75].map((y) => (
                  <line key={y} className="s6-axis" pathLength={1} x1="0" y1={y} x2="100" y2={y} stroke="#5a7d9a" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="1" />
                ))}
              </svg>
              {GROUPS.map((g, gi) => (
                <div key={g.key} className={`s6-grp-${gi} relative flex h-full flex-1 items-end justify-center gap-1.5 md:gap-3`}>
                  {g.vals.map((v, yi) => {
                    const h = v != null && MAX ? Math.max(4, (v / MAX) * 82) : 38;
                    return (
                      <div key={yi} className="flex h-full w-1/2 max-w-[84px] flex-col justify-end">
                        <div className="s6-val mb-2 text-center font-mono text-[10px] leading-tight md:text-xs">
                          {v != null ? brlCompact(v) : <Pending>R$ —</Pending>}
                        </div>
                        <div
                          className={`s6-bar origin-bottom ${v != null ? YEAR_TONES[yi] : "hatch border border-dashed border-white/40"}`}
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-4 md:gap-10">
              {GROUPS.map((g, gi) => (
                <div key={g.key} className={`s6-grp-${gi} flex-1 text-center`}>
                  <span className="s6-glabel eyebrow !text-white">{g.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="s6-programs invisible space-y-4 self-center opacity-0 [grid-area:1/1] md:space-y-6">
            <p className="eyebrow !text-copper-light">Valores por programa / ação</p>
            {ORCAMENTO.programas.map((p) => (
              <div key={p.nome} className="s6-prog-row border-t border-white/25 pt-3">
                <h3 className="t-md">{p.nome}</h3>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <Field label="Dotação" value={brl(p.dotacao)} valueClassName="font-mono text-xs" />
                  <Field label="Empenhado" value={brl(p.empenhado)} valueClassName="font-mono text-xs" />
                  <Field label="Liquidado" value={brl(p.liquidado)} valueClassName="font-mono text-xs" />
                </div>
                <div className="mt-3 h-1.5 bg-white/10">
                  <div
                    className={`s6-prog-bar h-full origin-left ${p.dotacao != null && p.liquidado != null && p.dotacao > 0 ? "bg-leaf" : "hatch border border-dashed border-white/30"}`}
                    style={{
                      width: `${p.dotacao != null && p.liquidado != null && p.dotacao > 0 ? Math.min(100, (p.liquidado / p.dotacao) * 100) : 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
