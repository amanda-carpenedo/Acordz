import InstrumentPage from '@/components/InstrumentPage/InstrumentPage'

export const metadata = {
  title: 'Flautas — Acordz',
  description: 'Materiais para pequenos flautistas: partituras, exercícios e tutoriais para iniciantes.',
}

const theme = {
  pageBg: 'oklch(94.036% 0.05427 79.65 / 0.501)',
  accentColor: '#e6bd33',
  accentUnderline: 'oklch(68% 0.18 70)',
  cardHoverBorder: 'oklch(78% 0.10 145 / 0.6)',
  cardHoverShadow: '0 18px 40px -20px oklch(35% 0.13 145 / 0.3)',
  addBtnBg: 'var(--string-3)',
  addBtnColor: 'white',
  addBtnHoverBg: 'oklch(55% 0.20 145)',
}

const products = [
  {
    slug: 'flauta-doce-soprano',
    title: 'Flauta Doce Soprano',
    desc: 'Flauta doce em plástico ABS, ideal para crianças de 5 a 8 anos.',
    price: 'R$ 49,00',
  },
  {
    slug: 'flauta-verde-musgo',
    title: 'Flauta Verde Musgo',
    desc: 'Flauta doce colorida com estojo, perfeita para levar à escola.',
    price: 'R$ 65,00',
  },
  {
    slug: 'flauta-kit-iniciante',
    title: 'Kit Iniciante Flauta',
    desc: 'Flauta + método impresso + acesso a vídeo-aulas para começar do zero.',
    price: 'R$ 129,00',
  },
  {
    slug: 'flauta-bambu-mini',
    title: 'Flauta de Bambu Mini',
    desc: 'Flauta em bambu natural, leve e com som suave para crianças de 6 a 10 anos.',
    price: 'R$ 89,00',
  },
  {
    slug: 'flauta-doce-contralto',
    title: 'Flauta Doce Contralto',
    desc: 'Flauta contralto para crianças a partir de 8 anos, som mais encorpado.',
    price: 'R$ 149,00',
  },
  {
    slug: 'flauta-transversal-infantil',
    title: 'Flauta Transversal Infantil',
    desc: 'Flauta transversal de tamanho reduzido, para crianças de 7 a 12 anos.',
    price: 'R$ 219,00',
  },
  {
    slug: 'flauta-metodo-alegria',
    title: 'Método Alegria na Flauta',
    desc: 'Livro de partituras com músicas infantis populares, nível iniciante. PDF.',
    price: 'R$ 29,00',
  },
  {
    slug: 'flauta-doce-colorida',
    title: 'Flauta Doce Colorida',
    desc: 'Conjunto de 3 flautas em cores vibrantes para uso em sala de aula.',
    price: 'R$ 79,00',
  },
]

export default function FlautaPage() {
  return (
    <InstrumentPage
      heading="Materiais para"
      accentText="pequenos flautistas"
      headingBreak
      subtitle="Partituras, exercícios e tutoriais para iniciantes"
      mascotSrc="/personagens/patrick-pulando.svg"
      mascotAlt="Mascote tocando flauta"
      mascotMaxWidth="380px"
      theme={theme}
      products={products}
    />
  )
}
