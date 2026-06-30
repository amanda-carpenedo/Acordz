// data/products.ts

export type ProductSpec = {
  label: string
  value: string
}

export type Product = {
  slug: string
  category: 'jogos' | 'partituras' | 'ebooks' | 'bundle'
  tag: string
  name: string
  description: string
  image: string | null  //← atualizado
  specs: ProductSpec[]
  price: number
  originalPrice?: number
  priceLabel: string
}

export type StopData = {
  stopNumber: string
  side: 'left' | 'right'
  productSlugs: [string, string]
  character: {
    name: 'flicka' | 'patrick' | 'jake' | 'funky'
    image: string
    alt: string
    quote: string
    quoteAlign: 'left' | 'right'
    rot: string
    positionSide: 'left' | 'right'
  }
}
export const products: Product[] = [
  {
    slug: 'maos-em-jogo',
    category: 'jogos',
    tag: 'Jogos musicais',
    name: 'Mãos em Jogo',
    description: 'Jogo digital onde a criança encontra notas escondidas pelo cenário e aprende as figuras musicais sem nem perceber.',
    image: '/produtos/maos-em-jogo.png', 
    specs: [
      { label: 'Idade',   value: '6 a 9' },
      { label: 'Formato', value: 'PDF' },
      { label: 'Nível',   value: 'Iniciante' },
    ],
    price: 29,
    originalPrice: 49,
    priceLabel: 'licença anual',
  },
  {
    slug: 'Bate-círculo',
    category: 'jogos',
    tag: 'Jogos musicais',
    name: 'Bate-círculo',
    description: 'Jogo de cartas onde as crianças formam padrões rítmicos e desafiam os colegas a reproduzi-los.',
    image: '/produtos/bate-circulo.png', 
    specs: [
      { label: 'Idade',   value: '7 a 12' },
      { label: 'Formato', value: 'PDF' },
      { label: 'Nível',   value: 'Iniciante' },
    ],
    price: 24,
    priceLabel: 'download imediato',
  },
  {
    slug: 'jogo-da-memoria',
    category: 'partituras',
    tag: 'Partituras',
    name: 'Jogo da memória',
    description: '25 partituras simplificadas com notas coloridas — perfeito para os primeiros passos no piano e na flauta doce.',
    image: '/produtos/jogo-da-memoria.png', 
    specs: [
      { label: 'Páginas', value: '62' },
      { label: 'Formato', value: 'PDF + MP3' },
      { label: 'Nível',   value: 'Iniciante' },
    ],
    price: 39,
    priceLabel: 'download imediato',
  },
  {
    slug: 'onde-estao-as-notas',
    category: 'partituras',
    tag: 'Partituras',
    name: 'Onde estão as notas?',
    description: '30 arranjos simplificados de clássicos da música erudita adaptados para piano iniciante.',
    image: '/produtos/onde-estao-as-notas-2.png', 
    specs: [
      { label: 'Páginas', value: '74' },
      { label: 'Formato', value: 'PDF' },
      { label: 'Nível',   value: 'Básico' },
    ],
    price: 44,
    priceLabel: 'download imediato',
  },
  {
    slug: 'percussao-com-as-maos',
    category: 'ebooks',
    tag: 'Ebook',
    name: 'Percussão com as mãos',
    description: 'Ebook ilustrado em 6 capítulos que apresenta a orquestra para crianças, com áudios curtos de cada instrumento.',
    image: '/produtos/percussao-com-as-maos.png', 
    specs: [
      { label: 'Capítulos', value: '6' },
      { label: 'Formato',   value: 'EPUB + MP3' },
      { label: 'Idade',     value: '5 a 10' },
    ],
    price: 44,
    originalPrice: 59,
    priceLabel: 'com áudios inclusos',
  },
  {
    slug: 'cards-ritmicos',
    category: 'ebooks',
    tag: 'Ebook',
    name: 'Cards Rítmicos',
    description: 'Coleção de cartões rítmicos para crianças aprenderem sobre diferentes instrumentos musicais.',
    image: '/produtos/cards-ritmicos.png', 
    specs: [
      { label: 'Capítulos', value: '8' },
      { label: 'Formato',   value: 'EPUB' },
      { label: 'Idade',     value: '8 a 14' },
    ],
    price: 39,
    priceLabel: 'download imediato',
  },
  {
    slug: 'casa-toda-tocando',
    category: 'bundle',
    tag: 'Combo Funky',
    name: 'Casa Toda Tocando',
    description: 'Um jogo + duas coletâneas de partituras + um ebook. Tudo que a criança precisa pra começar — com 30% de desconto.',
    image: '/produtos/casa-toda-tocando.png', 
    specs: [
      { label: 'Itens',    value: '4 produtos' },
      { label: 'Economia', value: 'R$ 52' },
      { label: 'Garantia', value: '30 dias' },
    ],
    price: 119,
    originalPrice: 171,
    priceLabel: 'combo · melhor preço',
  },
  {
    slug: 'combo-professor',
    category: 'bundle',
    tag: 'Combo Professor',
    name: 'Combo Professor',
    description: 'Tudo que o professor de música precisa: jogos, partituras e ebooks para montar uma aula completa e divertida.',
    image: null, // placeholder
    specs: [
      { label: 'Itens',    value: '6 produtos' },
      { label: 'Economia', value: 'R$ 80' },
      { label: 'Garantia', value: '30 dias' },
    ],
    price: 159,
    originalPrice: 239,
    priceLabel: 'licença professor',
  },
]

export const stops: StopData[] = [
  {
    stopNumber: '01',
    side: 'right',
    productSlugs: ['maos-em-jogo', 'Bate-círculo'],
    character: {
      name: 'flicka',
      image: '/personagens/flicka-sentada.svg',
      alt: 'Flicka sentada',
      quote: 'Meus alunos pedem pra jogar de novo no fim da aula.',
      quoteAlign: 'left',
      rot: '-3deg',
      positionSide: 'left',
    },
  },
  {
    stopNumber: '02',
    side: 'left',
    productSlugs: ['jogo-da-memoria', 'onde-estao-as-notas'],
    character: {
      name: 'patrick',
      image: '/personagens/patrick-sentado.svg',
      alt: 'Patrick sentado',
      quote: 'A Helena aprendeu "Marcha Soldado" em uma tarde — e não parou mais.',
      quoteAlign: 'right',
      rot: '4deg',
      positionSide: 'right',
    },
  },
  {
    stopNumber: '03',
    side: 'right',
    productSlugs: ['percussao-com-as-maos', 'cards-ritmicos'],
    character: {
      name: 'jake',
      image: '/personagens/jake-sentado.svg',
      alt: 'Jake sentado',
      quote: 'Material rico e sem encheção de linguiça. Já adotei nas minhas turmas.',
      quoteAlign: 'left',
      rot: '-5deg',
      positionSide: 'left',
    },
  },
  {
    stopNumber: '04',
    side: 'left',
    productSlugs: ['combo-casa-toda-tocando', 'combo-professor'],
    character: {
      name: 'funky',
      image: '/personagens/funky-sentada.svg',
      alt: 'Funky sentada',
      quote: 'Comprei o combo e meu filho montou uma "banda" no sofá da sala.',
      quoteAlign: 'right',
      rot: '6deg',
      positionSide: 'right',
    },
  },
]