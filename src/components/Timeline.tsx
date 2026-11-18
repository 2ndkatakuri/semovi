import { ANOS } from "@/config/content";
import { cn } from "@/utils/cn";

const SEGMENTS = [
  { d: "M0 20 H125", planning: false },
  { d: "M125 20 H375", planning: false },
  { d: "M375 20 H625", planning: false },
  { d: "M625 20 H875", planning: true },
  { d: "M875 20 H1000", planning: true },
];

export function Timeline({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="grid grid-cols-4">
        {ANOS.map((a) => (
          <div
            key={a.ano}
            className={cn("text-center", a.tipo === "planejamento" ? "text-copper-light" : "text-white")}
          >
            <span className="mask">
              <span className="mask-in tl-year num-mega block">{a.ano}</span>
            </span>
            <div className="tl-label eyebrow mt-3 !text-inherit opacity-90">{a.rotulo}</div>
            <div className="tl-note mt-1 hidden text-xs text-white/60 md:block">{a.nota}</div>
          </div>
        ))}
      </div>
      <div className="relative mt-5 h-10 md:mt-8">
        <svg
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 20 H1000" stroke="#5a7d9a" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {SEGMENTS.map((s, i) => (
            <path
              key={i}
              className="tl-seg"
              pathLength={1}
              d={s.d}
              stroke={s.planning ? "#e58f68" : "#ffffff"}
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {ANOS.map((a, i) => (
          <div
            key={a.ano}
            className="absolute top-1/2 -mt-3 h-6 w-6"
            style={{ left: `${12.5 + 25 * i}%`, marginLeft: -12 }}
          >
            <span
              className={cn(
                "tl-dot block h-full w-full rounded-full border-2",
                a.tipo === "retrospectiva"
                  ? "border-white bg-white"
                  : "border-dashed border-copper-light bg-navy"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}