# Guia de mídias Cloudinary — site SEMOVI

O site agora carrega as mídias diretamente do Cloudinary, conta `uqhcosya`, conforme `src/config/media.ts`. Assim, os arquivos não precisam ficar dentro do repositório nem ser enviados ao GitHub. A pasta pública local `public/` deixa de ser usada para essas mídias.

## Como organizar no Cloudinary

O código está preparado para localizar os arquivos pelo **nome na raiz da conta**, sem subpastas. Mantenha os nomes e extensões abaixo exatamente como escritos, em minúsculas, sem espaços, acentos ou caracteres especiais. O trecho de versão (`v1794963691`) é omitido no código para não exigir que todos os arquivos tenham a mesma versão; o Cloudinary entrega os ativos pelos public IDs.

Se os arquivos forem colocados dentro de uma pasta do Cloudinary, o public ID terá o nome da pasta incluído. Nesse caso, será preciso acrescentar esse caminho no código.

## Fotografias

Envie como recursos do tipo **Image**, na raiz da conta:

| Nome exato | Uso no site |
|---|---|
| `altamira-aerea.jpg` | Foto de abertura e pôster do vídeo inicial |
| `orla-cais.jpg` | Entrega Orla do Cais |
| `exposicao-2025.jpg` | Entrega Exposição 2025 |
| `ponte-peixaria.jpg` | Entrega Ponte da Peixaria |
| `pavimentacao.jpg` | Resultado para o cidadão e eixo de pavimentação no planejamento |
| `terraplenagem.jpg` | Eixo de terraplenagem no planejamento |
| `vicinais.jpg` | Acesso às comunidades / conservação de vicinais |
| `iluminacao-publica.jpg` | Resultado para o cidadão e eixo de iluminação no planejamento |
| `obras-antes.jpg` | Imagem “antes” da comparação de obras |
| `obras-depois.jpg` | Imagem “depois” da comparação de obras |
| `foto-01.jpg` a `foto-10.jpg` | Dez imagens da galeria final |

As fotos raster recebem transformação `f_auto,q_auto`, para o Cloudinary escolher um formato compatível com o navegador e comprimir a entrega. O código mantém o nome de origem `.jpg` no public ID.

## Vídeos

Envie como recursos do tipo **Video**, também na raiz:

| Nome exato | Uso |
|---|---|
| `abertura.mp4` | Abertura; `altamira-aerea.jpg` funciona como pôster |
| `altamira-aerea.mp4` | Fundo da seção de território |
| `principais-obras.mp4` | Fundo da seção de principais entregas |
| `pavimentacao.mp4` | Fundo do eixo de pavimentação no planejamento |
| `terraplenagem.mp4` | Fundo do eixo de terraplenagem no planejamento |
| `iluminacao.mp4` | Fundo do eixo de iluminação no planejamento |
| `encerramento.mp4` | Fundo da seção final/galeria |

O código usa a rota de entrega de vídeo e a transformação `q_auto`. Os vídeos são decorativos, silenciados, reproduzidos inline e em loop; o site tenta tocar apenas o vídeo mais visível.

## Logos, mapas e SVGs

Envie como recursos do tipo **Image**. Os SVGs são entregues sem conversão, para preservar o vetor.

**Marcas:** `logo-prefeitura.svg`, `logo-semovi.svg`, `brasao-altamira.svg`.

**Mapa e linha do tempo:** `mapa-altamira.svg`, `timeline-2025.svg`, `timeline-2026.svg`, `timeline-2027.svg`, `timeline-2028.svg`.

**Ícones:** `icone-asfalto.svg`, `icone-terraplenagem.svg`, `icone-iluminacao.svg`.

**Ilustrações das entregas:** `orla-cais.svg`, `exposicao-2025.svg`, `ponte-peixaria.svg`.

Prefira SVG otimizado, com `viewBox` válido, fundo transparente quando apropriado, sem scripts, fontes remotas ou filtros pesados.

## Especificações recomendadas

- **Fotos:** JPEG sRGB, preferencialmente 16:9 e 1920 × 1080 px ou maior para imagens de seção. Mantenha o assunto principal afastado das bordas: várias imagens são recortadas para preencher o quadro.
- **Galeria:** JPEG; pelo menos 1600 px no lado maior, preservando a orientação original quando necessário.
- **Vídeos:** MP4/H.264, 1080p, 24 ou 30 fps, preferencialmente sem áudio e sem barras pretas. Clipes curtos em loop reduzem o tempo de carregamento.
- **SVGs:** vetor otimizado, com transparência quando adequada.

## Se um ativo ainda não foi enviado

A ausência de uma foto não impede o site de abrir: as imagens principais mostram um quadro de “FOTOGRAFIA pendente”. Vídeos com erro são ocultados; logos têm fallback textual no cabeçalho; mapas, ícones e ilustrações opcionais deixam de aparecer. Portanto, os ativos podem ser enviados aos poucos, desde que seus public IDs usem os nomes esperados acima.
