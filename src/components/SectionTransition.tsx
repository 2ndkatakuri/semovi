import type { ReactNode, RefObject } from "react";
import { useScene, type SceneBuilder } from "@/animations/scrollAnimations";
import { cn } from "@/utils/cn";

type Props = {
  id: string;
  n: number;
  label: string;
  height: number;
  build: SceneBuilder;
  className?: string;
  children: ReactNode;
};

export function SectionTransition({ id, n, label, height, build, className, children }: Props) {
  const ref = useScene(build);
  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      id={id}
      data-chapter={n}
      aria-label={label}
      style={{ height: `${height * 100}dvh` }}
      className="relative"
    >
      <div className={cn("stage", className)}>{children}</div>
    </section>
  );
}
