/**
 * CONTEÚDO DA APRESENTAÇÃO
 * ------------------------------------------------------------------
 * Regra institucional: nenhum valor, obra ou quantitativo é inventado.
 * Todo campo com `null` é exibido como "pendente de preenchimento".
 * Para publicar um dado oficial, basta substituir `null` pelo valor.
 *   - Valores monetários: número (ex.: 1250000.5) → formatado em R$ pt-BR
 *   - Quantitativos: número
 *   - Textos: string
 */

export type Maybe<T> = T | null;

export const ORG = {
  municipio: "Prefeitura Municipal de Altamira — Pará",
  secretaria: "Secretaria Municipal de Obras e Viação",
  sigla: "SEMOVI",
};

export const CHAPTERS = [
  { n: 1, id: "abertura", title: "Abertura" },
  { n: 2, id: "territorio", title: "Identificação e território" },
  { n: 3, id: "numeros", title: "Os três números da gestão" },
  { n: 4, id: "entregas", title: "Principais entregas" },
  { n: 5, id: "cidadao", title: "Resultados para o cidadão" },
  { n: 6, id: "orcamento", title: "Execução orçamentária" },
  { n: 7, id: "recursos", title: "Recursos captados" },
  { n: 8, id: "compromissos", title: "Compromissos de governo" },
  { n: 9, id: "desafios", title: "O que não avançou" },
  { n: 10, id: "futuro", title: "Próximos passos 2027–2028" },
  { n: 11, id: "galeria", title: "Registro e encerramento" },
] as const;

/* ------------------------------ SLIDE 02 ------------------------------ */
export const IDENTIFICACAO = {
  secretaria: "Secretaria Municipal de Obras e Viação — SEMOVI",
  titular: null as Maybe<string>,
  pontoFocal: null as Maybe<string>,
  estrutura: null as Maybe<string>,
  equipes: null as Maybe<string>,
};

export const TERRITORIOS = [
  { id: "bairros", label: "Bairros", detalhe: "Zona urbana", quantidade: null as Maybe<number> },
  { id: "distritos", label: "Distritos", detalhe: "Sedes distritais", quantidade: null as Maybe<number> },
  { id: "rurais", label: "Áreas rurais", detalhe: "Vicinais e glebas", quantidade: null as Maybe<number> },
  { id: "ribeirinhas", label: "Comunidades ribeirinhas", detalhe: "Rios e ilhas", quantidade: null as Maybe<number> },
];

/* ------------------------------ SLIDE 03 ------------------------------ */
export const INDICADORES = [
  {
    id: "pavimentacao",
    titulo: "Pavimentação e recuperação de vias",
    unidade: "metros / km — definir unidade oficial",
    dez2024: null as Maybe<number>,
    out2026: null as Maybe<number>,
  },
  {
    id: "servicos",
    titulo: "Serviços e intervenções realizados",
    unidade: "intervenções",
    dez2024: null as Maybe<number>,
    out2026: null as Maybe<number>,
  },
  {
    id: "iluminacao",
    titulo: "Iluminação pública atendida",
    unidade: "pontos de luz",
    dez2024: null as Maybe<number>,
    out2026: null as Maybe<number>,
  },
];

/* ------------------------------ SLIDE 04 ------------------------------ */
export const ENTREGAS = [
  {
    id: "orla",
    nome: "Orla do Cais",
    localizacao: null as Maybe<string>,
    periodo: null as Maybe<string>,
    investimento: null as Maybe<number>,
    origem: null as Maybe<string>,
    descricao: null as Maybe<string>,
  },
  {
    id: "exposicao",
    nome: "Exposição 2025",
    localizacao: null as Maybe<string>,
    periodo: null as Maybe<string>,
    investimento: null as Maybe<number>,
    origem: null as Maybe<string>,
    descricao: null as Maybe<string>,
  },
  {
    id: "ponte",
    nome: "Ponte da Peixaria",
    localizacao: null as Maybe<string>,
    periodo: null as Maybe<string>,
    investimento: null as Maybe<number>,
    origem: null as Maybe<string>,
    descricao: null as Maybe<string>,
  },
];

/* ------------------------------ SLIDE 05 ------------------------------ */
export const DIMENSOES = [
  {
    id: "mobilidade",
    titulo: "Mobilidade urbana",
    vinculo: "Pavimentação → mobilidade",
    indicador: null as Maybe<string>,
  },
  {
    id: "acesso",
    titulo: "Acesso às comunidades",
    vinculo: "Conservação de vicinais → conexão entre comunidades",
    indicador: null as Maybe<string>,
  },
  {
    id: "qualidade",
    titulo: "Qualidade de vida",
    vinculo: "Iluminação pública → melhoria da infraestrutura urbana",
    indicador: null as Maybe<string>,
  },
];

/* ------------------------------ SLIDE 06 ------------------------------ */
/** Valores em reais — somente dados validados pela Contabilidade. */
export const ORCAMENTO = {
  anos: [2025, 2026] as const,
  /** [2025, 2026] */
  dotacao: [null, null] as Maybe<number>[],
  empenhado: [null, null] as Maybe<number>[],
  liquidado: [null, null] as Maybe<number>[],
  programas: [
    { nome: "Pavimentação e recuperação de vias", dotacao: null as Maybe<number>, empenhado: null as Maybe<number>, liquidado: null as Maybe<number> },
    { nome: "Conservação de vicinais e terraplenagem", dotacao: null as Maybe<number>, empenhado: null as Maybe<number>, liquidado: null as Maybe<number> },
    { nome: "Iluminação pública", dotacao: null as Maybe<number>, empenhado: null as Maybe<number>, liquidado: null as Maybe<number> },
  ],
};

/* ------------------------------ SLIDE 07 ------------------------------ */
export const RECURSOS = [
  { id: "convenios", titulo: "Convênios", origem: null as Maybe<string>, valor: null as Maybe<number>, objeto: null as Maybe<string>, situacao: null as Maybe<string> },
  { id: "emendas", titulo: "Emendas parlamentares", origem: null as Maybe<string>, valor: null as Maybe<number>, objeto: null as Maybe<string>, situacao: null as Maybe<string> },
  { id: "transferencias", titulo: "Transferências", origem: null as Maybe<string>, valor: null as Maybe<number>, objeto: null as Maybe<string>, situacao: null as Maybe<string> },
  { id: "parcerias", titulo: "Parcerias institucionais", origem: null as Maybe<string>, valor: null as Maybe<number>, objeto: null as Maybe<string>, situacao: null as Maybe<string> },
];

/* ------------------------------ SLIDE 08 ------------------------------ */
export type StatusCompromisso = "concluido" | "andamento" | "nao-iniciado";

export const STATUS_META: Record<StatusCompromisso, { label: string; color: string }> = {
  concluido: { label: "Concluído", color: "#4FB633" },
  andamento: { label: "Em andamento", color: "#E58F68" },
  "nao-iniciado": { label: "Não iniciado", color: "#5A7D9A" },
};

export const COMPROMISSOS = [
  { id: "c1", area: "Pavimentação e recuperação de vias", metaPPA: null as Maybe<string>, executado: null as Maybe<string>, status: null as Maybe<StatusCompromisso>, progresso: null as Maybe<number> },
  { id: "c2", area: "Operações de tapa-buracos", metaPPA: null as Maybe<string>, executado: null as Maybe<string>, status: null as Maybe<StatusCompromisso>, progresso: null as Maybe<number> },
  { id: "c3", area: "Conservação de vicinais", metaPPA: null as Maybe<string>, executado: null as Maybe<string>, status: null as Maybe<StatusCompromisso>, progresso: null as Maybe<number> },
  { id: "c4", area: "Terraplenagem e acessos", metaPPA: null as Maybe<string>, executado: null as Maybe<string>, status: null as Maybe<StatusCompromisso>, progresso: null as Maybe<number> },
  { id: "c5", area: "Iluminação pública", metaPPA: null as Maybe<string>, executado: null as Maybe<string>, status: null as Maybe<StatusCompromisso>, progresso: null as Maybe<number> },
  { id: "c6", area: "Obras estruturantes e equipamentos", metaPPA: null as Maybe<string>, executado: null as Maybe<string>, status: null as Maybe<StatusCompromisso>, progresso: null as Maybe<number> },
];

/* ------------------------------ SLIDE 09 ------------------------------ */
export const DESAFIOS = [
  { id: "d1", acao: null as Maybe<string>, situacao: null as Maybe<"Paralisada" | "Atrasada">, motivo: null as Maybe<string>, providencia: null as Maybe<string>, novoPrazo: null as Maybe<string> },
  { id: "d2", acao: null as Maybe<string>, situacao: null as Maybe<"Paralisada" | "Atrasada">, motivo: null as Maybe<string>, providencia: null as Maybe<string>, novoPrazo: null as Maybe<string> },
  { id: "d3", acao: null as Maybe<string>, situacao: null as Maybe<"Paralisada" | "Atrasada">, motivo: null as Maybe<string>, providencia: null as Maybe<string>, novoPrazo: null as Maybe<string> },
];

/* ------------------------------ SLIDE 10 ------------------------------ */
export const ANOS = [
  { ano: 2025, tipo: "retrospectiva" as const, rotulo: "Retrospectiva", nota: "Obras e serviços realizados" },
  { ano: 2026, tipo: "retrospectiva" as const, rotulo: "Retrospectiva", nota: "Execução em curso" },
  { ano: 2027, tipo: "planejamento" as const, rotulo: "Planejamento", nota: "Meta — ainda não executada" },
  { ano: 2028, tipo: "planejamento" as const, rotulo: "Planejamento", nota: "Meta — ainda não executada" },
];

export const EIXOS = [
  {
    id: "asfalto",
    n: "01",
    titulo: "Asfalto e pavimentação",
    itens: ["Ampliação da pavimentação", "Recuperação de vias", "Operações de tapa-buracos"],
    meta: null as Maybe<string>,
    prazo: null as Maybe<string>,
    responsavel: null as Maybe<string>,
  },
  {
    id: "vicinais",
    n: "02",
    titulo: "Terraplenagem e conservação de vicinais",
    itens: ["Manutenção de estradas rurais", "Terraplenagem", "Recuperação de acessos", "Atendimento às comunidades"],
    meta: null as Maybe<string>,
    prazo: null as Maybe<string>,
    responsavel: null as Maybe<string>,
  },
  {
    id: "iluminacao",
    n: "03",
    titulo: "Iluminação pública",
    itens: ["Ampliação", "Modernização", "Recuperação dos pontos de iluminação"],
    meta: null as Maybe<string>,
    prazo: null as Maybe<string>,
    responsavel: null as Maybe<string>,
  },
];

/* ------------------------------ SLIDE 11 ------------------------------ */
export const GALERIA_META: {
  identificacao: Maybe<string>;
  data: Maybe<string>;
  local: Maybe<string>;
  descricao: Maybe<string>;
}[] = Array.from({ length: 10 }, () => ({
  identificacao: null,
  data: null,
  local: null,
  descricao: null,
}));
