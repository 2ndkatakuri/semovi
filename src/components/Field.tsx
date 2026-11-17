import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Pending({ children = "pendente" }: { children?: ReactNode }) {
  return <span className="pending">{children}</span>;
}

type FieldProps = {
  label: string;
  value: string | number | null | undefined;
  className?: string;
  valueClassName?: string;
};

/** Campo editável: exibe o dado oficial ou o selo "pendente de preenchimento". */
export function Field({ label, value, className, valueClassName }: FieldProps) {
  const empty = value == null || value === "";
  return (
    <div className={cn("min-w-0", className)}>
      <span className="eyebrow block">{label}</span>
      <span className={cn("mt-1 block text-sm leading-snug text-white", valueClassName)}>
        {empty ? <Pending /> : value}
      </span>
    </div>
  );
}

/** Máscara de texto: use com maskReveal sobre `.mask-in` */
export function Mask({
  children,
  className,
  inClassName,
}: {
  children: ReactNode;
  className?: string;
  inClassName?: string;
}) {
  return (
    <span className={cn("mask", className)}>
      <span className={cn("mask-in", inClassName)}>{children}</span>
    </span>
  );
}
