const pad = (n: number) => String(n).padStart(2, "0");
const CLOUDINARY = "https://res.cloudinary.com/uqhcosya";

// Fotos raster: formato automático e compressão adaptada ao navegador.
const photo = (filename: string) => `${CLOUDINARY}/image/upload/f_auto,q_auto/${filename}`;
// SVGs: entrega direta para preservar o formato vetorial.
const vector = (filename: string) => `${CLOUDINARY}/image/upload/${filename}`;
// Vídeos: entrega como recurso de vídeo do Cloudinary.
const video = (filename: string) => `${CLOUDINARY}/video/upload/q_auto/${filename}`;

export const MEDIA = {
  logos: {
    prefeitura: vector("logo-prefeitura.svg"),
    semovi: vector("logo-semovi.svg"),
    brasao: vector("brasao-altamira.svg"),
  },
  svg: {
    mapa: vector("mapa-altamira.svg"),
    timeline2025: vector("timeline-2025.svg"),
    timeline2026: vector("timeline-2026.svg"),
    timeline2027: vector("timeline-2027.svg"),
    timeline2028: vector("timeline-2028.svg"),
    iconeAsfalto: vector("icone-asfalto.svg"),
    iconeTerraplenagem: vector("icone-terraplenagem.svg"),
    iconeIluminacao: vector("icone-iluminacao.svg"),
    orlaCais: vector("orla-cais.svg"),
    exposicao2025: vector("exposicao-2025.svg"),
    pontePeixaria: vector("ponte-peixaria.svg"),
  },
  images: {
    altamiraAerea: photo("altamira-aerea.jpg"),
    orlaCais: photo("orla-cais.jpg"),
    exposicao2025: photo("exposicao-2025.jpg"),
    pontePeixaria: photo("ponte-peixaria.jpg"),
    pavimentacao: photo("pavimentacao.jpg"),
    terraplenagem: photo("terraplenagem.jpg"),
    vicinais: photo("vicinais.jpg"),
    iluminacaoPublica: photo("iluminacao-publica.jpg"),
    obrasAntes: photo("obras-antes.jpg"),
    obrasDepois: photo("obras-depois.jpg"),
  },
  // Os arquivos da galeria estão no diretório raiz do Cloudinary, como foto-01.jpg.
  galeria: Array.from({ length: 10 }, (_, i) => photo(`foto-${pad(i + 1)}.jpg`)),
  videos: {
    abertura: video("abertura.mp4"),
    altamiraAerea: video("altamira-aerea.mp4"),
    pavimentacao: video("pavimentacao.mp4"),
    terraplenagem: video("terraplenagem.mp4"),
    iluminacao: video("iluminacao.mp4"),
    principaisObras: video("principais-obras.mp4"),
    encerramento: video("encerramento.mp4"),
  },
} as const;
