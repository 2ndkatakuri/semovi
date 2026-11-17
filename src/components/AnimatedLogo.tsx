import { useState } from "react";
import { MEDIA } from "@/config/media";
import { cn } from "@/utils/cn";

/**
 * Brasão: o traçado vetorial é apenas a GEOMETRIA DE CONSTRUÇÃO (círculos, eixos, cotas)
 * que "monta" a revelação. O brasão em si é SEMPRE o arquivo oficial
 * (/img/brasao-altamira.svg) — nunca redesenhado nem modificado.
 */
const TICKS = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 15 * Math.PI) / 180;
  const r1 = i % 2 === 0 ? 86 : 90;
  return { x1: 100 + Math.cos(a) * r1, y1: 100 + Math.sin(a) * r1, x2: 100 + Math.cos(a) * 94, y2: 100 + Math.sin(a) * 94 };
});

export function BrasaoMark({ className }: { className?: string }) {
  const [official, setOfficial] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("brasao-mark relative aspect-square", className)} data-official={official ? "1" : "0"}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <g className="text-steel" stroke="currentColor" strokeWidth="1">
          <circle className="ghost" cx="100" cy="100" r="97" opacity="0.18" />
          <circle className="draw" pathLength={1} cx="100" cy="100" r="97" />
          <circle className="draw" pathLength={1} cx="100" cy="100" r="80" strokeOpacity="0.6" />
        </g>
        <g stroke="#9db6c9" strokeWidth="1">
          {TICKS.map((t, i) => (
            <line key={i} className="draw" pathLength={1} {...t} />
          ))}
        </g>
        <g stroke="#e58f68" strokeWidth="0.8">
          <line className="draw" pathLength={1} x1="100" y1="2" x2="100" y2="198" strokeDasharray="1" />
          <line className="draw" pathLength={1} x1="2" y1="100" x2="198" y2="100" />
        </g>
        <path
          className="draw"
          pathLength={1}
          stroke="#fff"
          strokeWidth="1.4"
          d="M58 44 H142 V108 C142 138 122 156 100 168 C78 156 58 138 58 108 Z"
        />
      </svg>
      {!failed && (
      <img
        src={MEDIA.logos.brasao}
        alt="Brasão da Prefeitura de Altamira"
        loading="eager"
        decoding="async"
        onLoad={() => setOfficial(true)}
        onError={() => setFailed(true)}
        className="official absolute left-[28%] top-[22%] h-[56%] w-[44%] object-contain opacity-0"
      />
      )}
      {!official && (
        <span className="fallback-sub pointer-events-none absolute inset-x-0 top-[44%] text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-copper-light/80">
          brasão oficial
          <br />
          pendente
        </span>
      )}
    </div>
  );
}

export function SemoviMark({ className }: { className?: string }) {
  const [official, setOfficial] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("semovi-mark relative aspect-[4/1]", className)} data-official={official ? "1" : "0"}>
      <svg viewBox="0 0 440 110" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <text
          className="draw fallback-stroke"
          x="0"
          y="74"
          fontSize="88"
          fontWeight="900"
          letterSpacing="-2"
          fontFamily="Helvetica Neue, Arial, sans-serif"
          stroke="#fff"
          strokeWidth="1.4"
        >
          SEMOVI
        </text>
        <text
          className="fallback-fill"
          x="0"
          y="74"
          fontSize="88"
          fontWeight="900"
          letterSpacing="-2"
          fontFamily="Helvetica Neue, Arial, sans-serif"
          fill="#fff"
        >
          SEMOVI
        </text>
        <line className="draw" pathLength={1} x1="0" y1="88" x2="440" y2="88" stroke="#a44a2a" strokeWidth="3" />
        <text
          className="fallback-sub"
          x="0"
          y="106"
          fontSize="11"
          letterSpacing="2.4"
          fill="#9db6c9"
          fontFamily="ui-monospace, Menlo, monospace"
        >
          SECRETARIA MUNICIPAL DE OBRAS E VIAÇÃO
        </text>
      </svg>
      {!failed && (
      <img
        src={MEDIA.logos.semovi}
        alt="SEMOVI — Secretaria Municipal de Obras e Viação"
        loading="eager"
        decoding="async"
        onLoad={() => setOfficial(true)}
        onError={() => setFailed(true)}
        className="official absolute inset-0 h-full w-full object-contain object-left opacity-0"
      />
      )}
    </div>
  );
}

/** Conjunto brasão + identidade SEMOVI */
export function AnimatedLogo({ className, stacked }: { className?: string; stacked?: boolean }) {
  return (
    <div className={cn("flex items-center", stacked ? "flex-col gap-6" : "gap-6", className)}>
      <BrasaoMark className="w-28 shrink-0 sm:w-40 md:w-48" />
      <SemoviMark className="w-44 sm:w-64 md:w-80" />
    </div>
  );
}
