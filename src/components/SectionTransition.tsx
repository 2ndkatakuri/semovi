import type { ReactNode, RefObject } from "react";
import { useScene, type SceneBuilder } from "@/animations/scrollAnimations";
import { cn } from "@/utils/cn";

type Props = {
  id: string;
  n: number;
  label: string;
  /** altura do capítulo em múltiplos de 100svh (define a "duração" da cena no scroll) */
  height: number;
  build: SceneBuilder;
  className?: string;
  children: ReactNode;
};

/**
 * Contêiner de capítulo: <section> alta + palco sticky de 100svh.
 * A timeline GSAP da cena é ligada ao progresso do scroll dentro da section.
 */
export function SectionTransition({ id, n, label, height, build, className, children }: Props) {
  const ref = useScene(build);
  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      id={id}
      data-chapter={n}
      aria-label={label}
      style={{ height: `${height * 100}svh` }}
      className="relative"
    >
      <div className={cn("stage", className)}>{children}</div>
    </section>
  );
}
