import { useState } from "react";
import { MEDIA } from "@/config/media";
import { CHAPTERS, ORG } from "@/config/content";
import { cn } from "@/utils/cn";
import { useActiveChapter } from "./useActiveChapter";

function HeaderLogo({ src, alt, fallback }: { src: string; alt: string; fallback: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span className="font-display text-xs font-black uppercase tracking-[0.18em] text-white">{fallback}</span>
    );
  return <img src={src} alt={alt} className="h-7 w-auto sm:h-9" onError={() => setFailed(true)} />;
}

/** Cabeçalho discreto: identidade institucional + capítulo atual. */
export function Header() {
  const active = useActiveChapter();
  const chapter = CHAPTERS[active];
  const hidden = active === 0;

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between px-5 pb-10 pt-5 transition-all duration-700 sm:px-8",
        "bg-gradient-to-b from-navy-deep/80 to-transparent",
        hidden ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="flex items-center gap-4">
        <HeaderLogo src={MEDIA.logos.prefeitura} alt="Prefeitura de Altamira" fallback="Altamira" />
        <span className="h-6 w-px bg-white/25" />
        <HeaderLogo src={MEDIA.logos.semovi} alt={ORG.secretaria} fallback={ORG.sigla} />
      </div>
      <div className="hidden text-right sm:block">
        <div className="eyebrow !text-copper-light">
          {String(chapter.n).padStart(2, "0")} / {CHAPTERS.length}
        </div>
        <div className="mt-1 font-display text-sm font-bold uppercase tracking-wide text-white/85">
          {chapter.title}
        </div>
      </div>
    </header>
  );
}
