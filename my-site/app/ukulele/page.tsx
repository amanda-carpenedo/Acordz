import InstrumentPage from '@/components/InstrumentPage/InstrumentPage'

export const metadata = {
  title: 'Ukulelês — Acordz',
  description: 'Materiais para quem ama ukulele: partituras, tablaturas e tutoriais para iniciantes.',
}

const theme = {
  pageBg: 'oklch(94% 0.05 25)',
  accentColor: '#d04640',
  accentUnderline: '#905bab',
  cardHoverBorder: 'oklch(78% 0.10 70 / 0.6)',
  cardHoverShadow: '0 18px 40px -20px oklch(45% 0.13 70 / 0.3)',
  addBtnBg: 'var(--string-2)',
  addBtnColor: 'var(--color-text-primary)',
  addBtnHoverBg: 'oklch(55% 0.20 70)',
}

const products = [
  {
    slug: 'ukulele-soprano-amarelo',
    title: 'Ukulele Soprano Amarelo',
    desc: 'Ukulele soprano de madeira tília, ideal para crianças de 4 a 8 anos.',
    price: 'R$ 189,00',
  },
  {
    slug: 'ukulele-arco-iris',
    title: 'Ukulele Arco-Íris',
    desc: 'Ukulele colorido com cordas aquila, estojo incluso. Do 5 ao 10 anos.',
    price: 'R$ 249,00',
  },
  {
    slug: 'ukulele-kit-iniciante',
    title: 'Kit Iniciante Ukulele',
    desc: 'Ukulele + método impresso + acesso a vídeo-aulas. Perfeito para começar.',
    price: 'R$ 329,00',
  },
  {
    slug: 'ukulele-concert-natural',
    title: 'Ukulele Concert Natural',
    desc: 'Ukulele concert de madeira natural, escala maior e som mais rico.',
    price: 'R$ 389,00',
  },
  {
    slug: 'ukulele-aquarela-rosa',
    title: 'Ukulele Aquarela Rosa',
    desc: 'Ukulele com estampa aquarela, cordas nylon, para crianças de 6 a 12 anos.',
    price: 'R$ 219,00',
  },
  {
    slug: 'ukulele-partituras-vol1',
    title: 'Partituras para Ukulele Vol.1',
    desc: '30 músicas infantis em tablatura e notação padrão. Nível iniciante. PDF.',
    price: 'R$ 35,00',
  },
  {
    slug: 'ukulele-tenor-madeira',
    title: 'Ukulele Tenor Madeira',
    desc: 'Ukulele tenor com braço mais largo, para crianças maiores e adolescentes.',
    price: 'R$ 499,00',
  },
  {
    slug: 'ukulele-eletrico-infantil',
    title: 'Ukulele Elétrico Infantil',
    desc: 'Ukulele com captação piezo para crianças que querem amplificar o som.',
    price: 'R$ 569,00',
  },
]

export default function UkelelePage() {
  return (
    <InstrumentPage
      heading="Materiais para"
      accentText="quem ama ukulele"
      subtitle="Partituras, tablaturas e tutoriais para iniciantes"
      mascotSrc="/personagens/flicka-pulando.svg"
      mascotAlt="Mascote tocando ukulele"
      theme={theme}
      products={products}
    />
  )
}
