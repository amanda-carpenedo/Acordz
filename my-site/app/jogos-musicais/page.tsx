// app/jogos-musicais/page.ts
import Hero from '@/components/Hero/Hero'
import ScrollStage from '@/components/ScrollStage/ScrollStage'
import Outro from '@/components/Outro/Outro'
import Footer from '@/components/Footer/Footer'

export const metadata = {
  title: 'Acordz | Jogos Musicais',
  description: 'Jogos musicais para crianças aprenderem música brincando.',
}

export default function JogosPage() {
  return (
    <main>
      <Hero
        title={<>
          Descubra a música{' '}
          <span className="accent">brincando.</span><br />
          Aprender pode ser muito{' '}
          <span className="wavy">divertido!</span>
        </>}
        image="/personagens/hero-loja.png"
        imageAlt="Turma da Acordz tocando"
      />
      <ScrollStage />
      <Outro
        title={<>Já decidiu o que vai jogar hoje?<br /> Agora é <span className="accent">diversão.</span></>}
        text="Frete grátis pra material físico em todo Brasil este mês. Downloads digitais ficam disponíveis na hora, na sua conta."
      />
      <Footer />
    </main>
  )
}