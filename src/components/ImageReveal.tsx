import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export function MediaPlaceholder({ label, kind = "FOTOGRAFIA" }: { label: string; kind?: string }) {
  return (
    <div
      className="blueprint absolute inset-0 flex items-end bg-gradient-to-br from-[#0d3454] to-[#071f33] p-4 sm:p-6"
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full text-steel/30" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
        <rect x="3" y="3" width="94" height="94" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-steel-light/70">
        <span className="mr-2 inline-block rounded-sm border border-dashed border-copper-light/60 px-2 py-0.5 text-copper-light">
          {kind} pendente
        </span>
        <span className="hidden sm:inline">{label}</span>
      </div>
    </div>
  );
}

export function OptionalImg({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setOk(false)}
    />
  );
}

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  children?: ReactNode;
};

export function ImageReveal({ src, alt, className, imgClassName, label, children }: Props) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  return (
    <div className={cn("relative overflow-hidden bg-navy-deep", className)} data-state={state}>
      {state !== "ok" && <MediaPlaceholder label={label ?? src} />}
      {state !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState("ok")}
          onError={() => setState("error")}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            state === "ok" ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}
      {children}
    </div>
  );
}