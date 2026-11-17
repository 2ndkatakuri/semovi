/** Formatação brasileira */
export const brl = (value: number | null | undefined): string | null =>
  value == null
    ? null
    : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const brlCompact = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const num = (value: number | null | undefined): string | null =>
  value == null ? null : new Intl.NumberFormat("pt-BR").format(value);

export const pct = (value: number): string =>
  `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(value)}%`;
