import InstrumentPage from '@/components/InstrumentPage/InstrumentPage'

export const metadata = {
  title: 'Violões — Acordz',
  description: 'Materiais para pequenos violonistas: partituras, tablaturas e tutoriais para iniciantes.',
}

const theme = {
  pageBg: 'oklch(94% 0.04 260)',
  accentColor: '#905bab',
  accentUnderline: '#3c5c62',
  cardHoverBorder: 'oklch(78% 0.10 260 / 0.6)',
  cardHoverShadow: '0 18px 40px -20px oklch(45% 0.13 260 / 0.3)',
  addBtnBg: 'oklch(68% 0.18 310)',
  addBtnColor: 'var(--color-text-primary)',
  addBtnHoverBg: 'var(--color-primary-dark)',
}

const products = [
  {
    slug: 'violao-mini-coral',
    title: 'Violão Mini Coral',
    desc: 'Violão 1/4 com cordas em nylon, ideal para crianças de 3 a 5 anos.',
    price: 'R$ 289,00',
  },
  {
    slug: 'violao-sereno-azul',
    title: 'Violão Sereno Azul',
    desc: 'Violão 1/4 com corpo azul e cordas em nylon, ideal para crianças de 3 a 5 anos.',
    price: 'R$ 289,00',
  },
  {
    slug: 'violao-kit-tum-tum',
    title: 'Kit Iniciante Tum Tum',
    desc: 'Violão 1/4 com cordas em nylon, ideal para crianças de 3 a 5 anos.',
    price: 'R$ 289,00',
  },
  {
    slug: 'violao-bosque-verde',
    title: 'Violão Bosque Verde',
    desc: 'Violão 1/4 com acabamento verde, ideal para crianças de 3 a 5 anos.',
    price: 'R$ 289,00',
  },
  {
    slug: 'violao-pequeno-lilas',
    title: 'Violão Pequeno Lilás',
    desc: 'Violão 1/4 com cordas em nylon, ideal para crianças de 3 a 5 anos.',
    price: 'R$ 289,00',
  },
  {
    slug: 'violao-compacto-ambar',
    title: 'Violão Compacto Âmbar',
    desc: 'Violão 1/4 com cordas em nylon, ideal para crianças de 3 a 5 anos.',
    price: 'R$ 289,00',
  },
  {
    slug: 'violao-folk-natural',
    title: 'Violão Folk Natural',
    desc: 'Violão 1/4 com acabamento natural, madeira tília, ideal para iniciantes.',
    price: 'R$ 319,00',
  },
  {
    slug: 'violao-classico-infantil',
    title: 'Violão Clássico Infantil',
    desc: 'Violão clássico 1/2 com braço estreito, para crianças de 6 a 9 anos.',
    price: 'R$ 349,00',
  },
]

export default function ViolaoPage() {
  return (
    <InstrumentPage
      heading="Materiais para"
      accentText="pequenos violonistas"
      subtitle="Partituras, tablaturas e tutoriais para iniciantes"
      mascotSrc="/personagens/jake-pulando.svg"
      mascotAlt="Mascote: jake sentado tocando violão"
      mascotMaxWidth="400px"
      theme={theme}
      products={products}
    />
  )
}
