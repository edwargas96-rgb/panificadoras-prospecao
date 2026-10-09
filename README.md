# Panificadoras – Prospecção

Site estático (HTML/CSS/JS, sem build) usado como demo para prospecção de panificadoras.
Deploy na Vercel direto da raiz.

## Como funciona
- `main`: template/demo base (hoje com o conteúdo da Panificadora Santtini).
- `demo/<nome-da-padaria>`: uma branch por prospecto. A Vercel gera uma URL de preview por branch.
- Se o cliente fechar: cria-se repo + projeto Vercel próprios a partir da branch dele.

## Fotos
Coloque as fotos em `assets/photos/` com estes nomes (JPG): `hero`, `paes`, `bolos`, `coffee-break`, `sopas`, `almoco`, `cafe-colonial`, `g1` a `g6`.
Sem arquivo, o espaço mostra um placeholder.

## Cores (em `styles.css`)
Vermelho `#E3261B`, laranja `#F28C1B`, vinho `#3A0B08`, creme `#FBF3E8`.
