// app/ebook/page.tsx
import Hero from '@/components/Hero/Hero'
import ScrollStage from '@/components/ScrollStage/ScrollStage'
import Outro from '@/components/Outro/Outro'
import Footer from '@/components/Footer/Footer'

export const metadata = {
  title: 'Acordz | E-books',
  description: 'Ebooks ilustrados para crianças explorarem o mundo da música.',
}

export default function EbookPage() {
  return (
    <main>
      <Hero
        title={<>
          Lendo podemos{' '}
          <span className="accent">viajar</span><br />
          para lugares cheios de{' '}
          <span className="wavy">conhecimento</span>
        </>}
        image="/personagens/leiturapartitura.svg"
        imageAlt="Turma da Acordz lendo"
        imageSize="small"
      />
      <ScrollStage />
      <Outro
        title={<>Chegou até aqui? Agora é hora de nos divertirmos com nossos <span className="accent">livros!</span></>}
        text="Frete grátis pra material físico em todo Brasil este mês. Downloads digitais ficam disponíveis na hora, na sua conta."
      />
      <Footer />
    </main>
  )
}