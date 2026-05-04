# claude.md — Site de Jogos Musicais Infantis

## Visão geral do projeto

Site de e-commerce voltado para **pais e professores de música** que buscam produtos educativos musicais para crianças. O site comercializa três categorias de produtos:

- **Jogos musicais** interativos
- **Partituras** para iniciantes
- **Ebooks** de educação musical infantil

O conteúdo final é consumido por crianças, mas os **compradores são adultos** — pais e professores. O visual deve ser acolhedor e lúdico sem perder credibilidade para quem está comprando.

---

## Público-alvo

**Pais** — 28 a 45 anos, buscam atividades lúdicas e educativas para os filhos. Priorizam segurança, acessibilidade e clareza na compra.

**Professores de música** — educadores com turmas infantis que precisam de materiais pedagógicos de qualidade. Valorizam organização, detalhamento técnico e variedade de repertório.

---

## Identidade visual

### Tom e estética

Warm + playful. Fundo em cream quente, formas arredondadas, espaço generoso. Não infantilizado em excesso — o layout deve ser limpo e navegável para adultos, com elementos lúdicos estratégicos (animação do violão, ícones musicais, cores das cordas).

### Tipografia

**Nunito** é a fonte principal — arredondada, amigável, adequada para o público infantil sem parecer amadora. **JetBrains Mono** entra em elementos técnicos como preços, badges e labels.

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

--font-heading: 'Nunito', sans-serif;
--font-body:    'Nunito', sans-serif;
--font-mono:    'JetBrains Mono', monospace;
```

Hierarquia tipográfica:

| Elemento          | Fonte          | Peso | Tamanho sugerido              |
|-------------------|----------------|------|-------------------------------|
| Hero title        | Nunito         | 800  | clamp(2rem, 5vw, 3.5rem)      |
| Section headings  | Nunito         | 700  | 1.75rem                       |
| Subtítulos        | Nunito         | 600  | 1.125rem                      |
| Corpo de texto    | Nunito         | 400  | 1rem                          |
| Preços / badges   | JetBrains Mono | 500  | 0.95rem                       |

### Paleta de cores

Background principal em cream quente (oklch off-white). Os 6 acentos são derivados das cordas do violão — Mi, Si, Sol, Ré, Lá, Mi — todos com chroma e lightness equivalentes para harmonizarem entre si.

```css
/* Base */
--color-bg:           oklch(97% 0.018 85);   /* cream quente — fundo principal */
--color-surface:      oklch(99% 0.010 80);   /* branco levemente quente — cards */
--color-text-primary: oklch(22% 0.020 60);   /* marrom escuro — texto principal */
--color-text-muted:   oklch(55% 0.020 70);   /* marrom médio — texto secundário */
--color-border:       oklch(88% 0.018 75);   /* borda sutil */

/* 6 acentos — cordas do violão */
--string-1: oklch(68% 0.18 25);   /* coral       — Mi agudo */
--string-2: oklch(68% 0.18 70);   /* âmbar       — Si       */
--string-3: oklch(68% 0.18 145);  /* verde musgo — Sol      */
--string-4: oklch(68% 0.18 200);  /* teal        — Ré       */
--string-5: oklch(68% 0.18 260);  /* azul médio  — Lá       */
--string-6: oklch(68% 0.18 310);  /* lilás       — Mi grave */

/* Ações */
--color-primary:      var(--string-2);        /* âmbar — CTA principal */
--color-primary-dark: oklch(55% 0.20 70);     /* hover do CTA */
```

Uso semântico das cores de acento:

| Cor         | Variável     | Uso                        |
|-------------|--------------|----------------------------|
| Coral       | `--string-1` | Categoria jogos musicais   |
| Âmbar       | `--string-2` | CTAs e botões principais   |
| Verde musgo | `--string-3` | Destaques e promoções      |
| Teal        | `--string-4` | Categoria partituras       |
| Azul        | `--string-5` | Categoria ebooks           |
| Lilás       | `--string-6` | Tags, badges secundários   |

---

## Componente: animação do violão

Uma animação SVG/JSX de um violão já foi criada pelo Claude Design. Ela é usada como elemento visual hero na homepage.

- **Desktop**: posicionada à direita do headline principal
- **Mobile**: centralizada abaixo do headline
- As cordas animam ao hover ou em loop automático suave
- O componente aceita as 6 cores das cordas como props opcionais para manter coerência com o design system

```jsx
<GuitarAnimation
  string1="oklch(68% 0.18 25)"
  string2="oklch(68% 0.18 70)"
  string3="oklch(68% 0.18 145)"
  string4="oklch(68% 0.18 200)"
  string5="oklch(68% 0.18 260)"
  string6="oklch(68% 0.18 310)"
/>
```

---

## Estrutura de páginas

```
/                    → Homepage
/jogos               → Catálogo de jogos musicais
/partituras          → Catálogo de partituras
/ebooks              → Catálogo de ebooks
/produto/[slug]      → Página de produto individual
/sobre               → Sobre o projeto
/contato             → Contato
```

---

## Homepage — seções e ordem

1. **Header / Nav** — logo, links de categoria, carrinho, CTA de login
2. **Hero** — headline principal + subtítulo + CTA + animação do violão
3. **Categorias** — 3 cards: Jogos, Partituras, Ebooks (com cor de acento por categoria)
4. **Produtos em destaque** — grid de 4 produtos mais vendidos ou recentes
5. **Depoimentos** — 2 a 3 depoimentos curtos de pais e professores
6. **Newsletter** — captura de e-mail com oferta ou conteúdo gratuito
7. **Footer** — links, redes sociais, política de privacidade

---

## Componentes reutilizáveis

### ProductCard

```
- Thumbnail do produto
- Badge de categoria (cor da string correspondente)
- Título (Nunito 700)
- Descrição curta (Nunito 400, 2 linhas máx.)
- Preço (JetBrains Mono)
- Botão "Comprar" ou "Ver mais"
```

### CategoryCard

```
- Ícone SVG da categoria
- Título da categoria
- Descrição de uma linha
- Fundo com cor de acento em 10% de opacidade e borda colorida
```

### NavBar

```
- Logo à esquerda
- Links centralizados: Jogos | Partituras | Ebooks | Sobre
- Ícone de carrinho + contador à direita
- Sticky no scroll, com blur sutil ao rolar
```

---

## Diretrizes de conteúdo

**Tom de voz**: acolhedor, animado, direto. Evitar jargões técnicos na interface voltada a pais. Para professores, termos pedagógicos podem ser usados com moderação.

**Títulos**: curtos e verbais — "Descubra a música brincando", "Partituras que as crianças amam".

**Descrições de produto**: sempre mencionar faixa etária recomendada, formato do arquivo (PDF, ZIP, MP3) e nível de dificuldade.

**Acessibilidade**: todos os elementos interativos com `aria-label`, contraste mínimo 4.5:1 para texto, animações com `prefers-reduced-motion`.

---

## Stack técnica sugerida

| Camada            | Tecnologia             |
|-------------------|------------------------|
| Framework         | Next.js (App Router)   |
| Estilização       | CSS Modules ou Tailwind|
| Animações         | Framer Motion          |
| Pagamentos        | Stripe                 |
| CMS / produtos    | Sanity ou Notion API   |
| Deploy            | Vercel                 |

---

## Convenções de código

- Componentes em PascalCase: `ProductCard.jsx`, `GuitarAnimation.jsx`
- Arquivos de estilo co-localizados: `ProductCard.module.css`
- Tokens de design em `styles/tokens.css` (variáveis CSS desta documentação)
- Imagens em `/public/images/`, organizadas por categoria
- Tamanhos de fonte sempre em `rem`, nunca `px` hardcoded
