/**
 * CONFIGURAÇÃO CENTRAL DE MÍDIAS
 * ------------------------------------------------------------------
 * Todos os arquivos ficam na pasta /public e são referenciados a partir
 * da raiz pública. Para trocar uma fotografia ou vídeo, basta substituir
 * o arquivo (mesmo nome) ou alterar o caminho aqui — nenhum componente
 * precisa ser modificado.
 *
 * Enquanto um arquivo não existir, o site exibe um quadro técnico
 * "mídia pendente" no lugar (nunca imagens genéricas ou externas).
 */

const pad = (n: number) => String(n).padStart(2, "0");

export const MEDIA = {
  /** Logotipos e identidade — arquivos oficiais fornecidos pela Prefeitura */
  logos: {
    prefeitura: "/img/logo-prefeitura.svg",
    semovi: "/img/logo-semovi.svg",
    brasao: "/img/brasao-altamira.svg",
  },

  /** Ilustrações vetoriais */
  svg: {
    mapa: "/img/mapa-altamira.svg",
    timeline2025: "/img/timeline-2025.svg",
    timeline2026: "/img/timeline-2026.svg",
    timeline2027: "/img/timeline-2027.svg",
    timeline2028: "/img/timeline-2028.svg",
    iconeAsfalto: "/img/icone-asfalto.svg",
    iconeTerraplenagem: "/img/icone-terraplenagem.svg",
    iconeIluminacao: "/img/icone-iluminacao.svg",
    orlaCais: "/img/orla-cais.svg",
    exposicao2025: "/img/exposicao-2025.svg",
    pontePeixaria: "/img/ponte-peixaria.svg",
  },

  /** Fotografias */
  images: {
    altamiraAerea: "/images/altamira-aerea.jpg",
    orlaCais: "/images/orla-cais.jpg",
    exposicao2025: "/images/exposicao-2025.jpg",
    pontePeixaria: "/images/ponte-peixaria.jpg",
    pavimentacao: "/images/pavimentacao.jpg",
    terraplenagem: "/images/terraplenagem.jpg",
    vicinais: "/images/vicinais.jpg",
    iluminacaoPublica: "/images/iluminacao-publica.jpg",
    obrasAntes: "/images/obras-antes.jpg",
    obrasDepois: "/images/obras-depois.jpg",
  },

  /** Galeria (até 10 fotografias): /images/galeria/foto-01.jpg ... foto-10.jpg */
  galeria: Array.from({ length: 10 }, (_, i) => `/images/galeria/foto-${pad(i + 1)}.jpg`),

  /** Vídeos MP4 (H.264) */
  videos: {
    abertura: "/videos/abertura.mp4",
    altamiraAerea: "/videos/altamira-aerea.mp4",
    pavimentacao: "/videos/pavimentacao.mp4",
    terraplenagem: "/videos/terraplenagem.mp4",
    iluminacao: "/videos/iluminacao.mp4",
    principaisObras: "/videos/principais-obras.mp4",
    encerramento: "/videos/encerramento.mp4",
  },
} as const;
