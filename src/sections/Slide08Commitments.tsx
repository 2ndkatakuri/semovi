import { SectionTransition } from "@/components/SectionTransition";
import { Field, Mask, Pending } from "@/components/Field";
import { COMPROMISSOS, STATUS_META, type StatusCompromisso } from "@/config/content";
import { num } from "@/utils/format";
import type { SceneBuilder } from "@/animations/scrollAnimations";
import { layerIn, maskReveal } from "@/animations/transitions";

const build: SceneBuilder = (tl, q) => {
  const track = q(".s8-track")[0] as HTMLElement;
  const fill = q(".s8-fill")[0] as HTMLElement;
  const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
  const head = () => window.innerWidth * 0.3;
  maskReveal(tl, q(".s8-title .mask-in"), 0.1, 1.1, 0.14);
  layerIn(tl, q(".s8-eyebrow, .s8-legend > *"), 0.2, 0.8, 0.1, 14);
  const START = 0.8;
  const SPAN = 9;
  tl.fromTo(track, { x: 0 }, { x: () => -dist(), duration: SPAN, ease: "none" }, START);
  tl.fromTo(
    fill,
    { scaleX: () => head() / track.scrollWidth },
    { scaleX: () => (dist() + head()) / track.scrollWidth, duration: SPAN, ease: "none" },
    START
  );
  const D = dist();
  q(".s8-card").forEach((card, i) => {
    const el = card as HTMLElement;
    const p = D > 0 ? Math.max(0, (el.offsetLeft - window.innerWidth * 0.86) / D) : 0;
    const at = p === 0 ? 0.5 + i * 0.25 : START + p * SPAN;
    tl.fromTo(q(`.s8-card-${i} .s8-body`), { autoAlpha: 0, y: i % 2 ? 40 : -40 }, { autoAlpha: 1, y: 0, duration: 0.9 }, at);
    tl.fromTo(q(`.s8-card-${i} .s8-node`), { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2)" }, at);
  });
};

function StatusBadge({ status }: { status: StatusCompromisso | null }) {
  if (!status) return <Pending>a classificar</Pending>;
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider"
      style={{ borderColor: m.color, color: m.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
      {m.label}
    </span>
  );
}

export default function Slide08Commitments() {
  const classified = COMPROMISSOS.some((c) => c.status);
  const count = (s: StatusCompromisso) => COMPROMISSOS.filter((c) => c.status === s).length;
  return (
    <SectionTransition id="compromissos" n={8} label="Compromissos de governo" height={5} build={build}>
      <div className="blueprint absolute inset-0 opacity-40" />
      <div className="absolute inset-0 flex flex-col pb-16 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4 px-6 md:px-14">
          <div>
            <p className="s8-eyebrow eyebrow !text-copper-light">08 – Compromissos de governo</p>
            <h2 className="s8-title t-lg mt-2">
              <Mask>O que foi planejado,</Mask>
              <Mask>o que está acontecendo.</Mask>
            </h2>
          </div>
          <ul className="s8-legend flex flex-wrap gap-x-6 gap-y-2">
            {(Object.keys(STATUS_META) as StatusCompromisso[]).map((s) => (
              <li key={s} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_META[s].color }} />
                {STATUS_META[s].label}
                <span className="font-mono text-white/60">{classified ? count(s) : <Pending> </Pending>}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="s8-head relative mt-3 min-h-0 flex-1">
          <div className="s8-track absolute left-0 top-0 flex h-full w-max items-stretch gap-6 pl-[8vw] pr-[40vw] will-change-transform md:gap-10 md:pl-14">
            <span className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-white/15" />
            <span className="s8-fill absolute left-0 right-0 top-1/2 h-[3px] origin-left -translate-y-1/2 bg-gradient-to-r from-copper-light via-white to-leaf" />
            {COMPROMISSOS.map((c, i) => {
              const color = c.status ? STATUS_META[c.status].color : "#5a7d9a";
              const up = i % 2 === 0;
              return (
                <div key={c.id} className={`s8-card s8-card-${i} relative w-[74vw] shrink-0 sm:w-[44vw] md:w-[26vw]`}>
                  <span
                    className="s8-node absolute left-0 top-1/2 z-10 -ml-2 -mt-2 h-4 w-4 rounded-full border-2 bg-navy"
                    style={{ borderColor: color, borderStyle: c.status ? "solid" : "dashed", boxShadow: c.status ? `0 0 14px ${color}` : undefined }}
                  />
                  <div
                    className={`s8-body absolute left-0 w-full border border-white/15 bg-navy-deep/75 p-4 backdrop-blur-sm md:p-5 ${
                      up ? "bottom-[calc(50%+22px)]" : "top-[calc(50%+22px)]"
                    }`}
                  >
                    <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: color }} />
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-xs text-copper-light">0{i + 1}</span>
                      <StatusBadge status={c.status} />
                    </div>
                    <h3 className="t-md mt-2 !text-[clamp(0.95rem,1.45vw,1.35rem)]">{c.area}</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Field label="Meta PPA (previsto)" value={c.metaPPA} valueClassName="!text-xs" />
                      <Field label="Executado" value={c.executado} valueClassName="!text-xs" />
                    </div>
                    <div className="mt-3 h-1.5 bg-white/10">
                      <div
                        className={`h-full ${c.progresso != null ? "" : "hatch border border-dashed border-white/30"}`}
                        style={{ width: c.progresso != null ? `${c.progresso}%` : "100%", background: c.progresso != null ? color : undefined }}
                      />
                    </div>
                    <p className="eyebrow mt-1.5 !text-[0.58rem]">
                      Progresso executado {c.progresso != null ? `– ${num(c.progresso)}%` : "– pendente"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute left-[30vw] top-1/2 z-20 -ml-px h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </div>
    </SectionTransition>
  );
}