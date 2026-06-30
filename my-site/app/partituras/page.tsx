// app/partituras/page.tsx
import Hero from '@/components/Hero/Hero'
import ScrollStage from '@/components/ScrollStage/ScrollStage'
import Outro from '@/components/Outro/Outro'
import Footer from '@/components/Footer/Footer'

export const metadata = {
  title: 'Acordz | Partituras',
  description: 'Partituras simplificadas para crianças aprenderem música com alegria.',
}

export default function PartiurasPage() {
  return (
    <main>
      <Hero
        title={<>
          Vamos conhecer o mundo das{' '}
          <span className="accent">notas</span><br />
          Através das{' '}
          <span className="wavy">partituras</span>
        </>}
        image="/personagens/ritmos.svg"
        imageAlt="Turma da Acordz tocando"
        imageSize="small"
      />
      <ScrollStage />
      <Outro
        title={<>Qual será a próxima música?<br /> Hora de<span className="accent"> tocar!</span></>}
        text="Frete grátis pra material físico em todo Brasil este mês. Downloads digitais ficam disponíveis na hora, na sua conta."
      />
      <Footer />
    </main>
  )
}