import InstrumentPage from '@/components/InstrumentPage/InstrumentPage'

export const metadata = {
  title: 'Pianos — Acordz',
  description: 'Materiais para pequenos pianistas: partituras, escalas e exercícios para iniciantes.',
}

const theme = {
  pageBg: 'oklch(94% 0.04 310)',
  accentColor: 'oklch(35% 0.18 200)',
  accentUnderline: 'oklch(68% 0.18 310)',
  cardHoverBorder: 'oklch(78% 0.1 200 / 0.6)',
  cardHoverShadow: '0 18px 40px -20px oklch(40% 0.13 200 / 0.3)',
  addBtnBg: 'var(--string-4)',
  addBtnColor: 'white',
  addBtnHoverBg: 'oklch(50% 0.18 200)',
}

const products = [
  {
    slug: 'piano-teclado-32-teclas',
    title: 'Teclado Infantil 32 Teclas',
    desc: 'Teclado eletrônico compacto com 32 teclas, ideal para crianças de 4 a 8 anos.',
    price: 'R$ 249,00',
  },
  {
    slug: 'piano-digital-61-teclas',
    title: 'Piano Digital 61 Teclas',
    desc: 'Piano digital com teclas sensitivas ao toque e 128 timbres. A partir de 6 anos.',
    price: 'R$ 789,00',
  },
  {
    slug: 'piano-kit-iniciante',
    title: 'Kit Iniciante Piano',
    desc: 'Teclado + método impresso + acesso a vídeo-aulas. Tudo para começar bem.',
    price: 'R$ 449,00',
  },
  {
    slug: 'piano-teclado-colorido',
    title: 'Teclado Colorido Infantil',
    desc: 'Teclas coloridas para facilitar o aprendizado por cores. De 3 a 6 anos.',
    price: 'R$ 199,00',
  },
  {
    slug: 'piano-digital-com-suporte',
    title: 'Piano Digital com Suporte',
    desc: 'Piano digital 88 teclas com suporte regulável em altura, para casa ou escola.',
    price: 'R$ 1.290,00',
  },
  {
    slug: 'piano-metodo-vol1',
    title: 'Método Piano Divertido Vol.1',
    desc: 'Método com músicas infantis e exercícios progressivos para iniciantes. PDF.',
    price: 'R$ 39,00',
  },
  {
    slug: 'piano-teclado-bluetooth',
    title: 'Teclado Bluetooth Portátil',
    desc: 'Teclado dobrável com conexão Bluetooth, leve e ideal para levar à aula.',
    price: 'R$ 349,00',
  },
  {
    slug: 'piano-brinquedo-classico',
    title: 'Piano de Brinquedo Clássico',
    desc: 'Piano de madeira com 25 teclas, seguro e resistente para crianças de 2 a 5 anos.',
    price: 'R$ 149,00',
  },
]

export default function PianoPage() {
  return (
    <InstrumentPage
      heading="Materiais para"
      accentText="pequenos pianistas"
      subtitle="Partituras, escalas e exercícios para iniciantes"
      mascotSrc="/personagens/funky-pulando.svg"
      mascotAlt="Mascote tocando piano"
      theme={theme}
      products={products}
    />
  )
}
