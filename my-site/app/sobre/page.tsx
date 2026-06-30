import Footer from '@/components/Footer/Footer'
import styles from './sobre.module.css'

export const metadata = {
  title: 'Acordz | Sobre',
  description: 'Conheça a história da Acordz e nossa missão de tornar a música acessível para crianças.',
}

export default function SobrePage() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.duo}>

            <div className={styles.card} aria-labelledby="sobre-titulo">
              <h1 id="sobre-titulo" className={styles.title}>Nossa História</h1>
              <div className={styles.textBox}>
                <p>
                  A ideia da Acordz nasce do desejo de criar algo criativo e com a
                  cara das crianças. Sempre gostei de inventar jogos musicais para
                  levar a sala de aula e com mais de 15 anos de experiência em
                  ensino, entendi que ensinar e aprender música deve ser um
                  processo divertido e curioso.
                </p>
                <p>
                  Minha missão com a Acordz é fornecer materiais didáticos de alta
                  qualidade, que sejam acessíveis a pais e professores que queiram
                  utilizar a música como ferramenta de aprendizado. Acredito que a
                  música tem um poder incrível de transformar as nossas vidas,
                  ajudando na socialização, bem-estar coletivo e no desenvolvimento
                  cognitivo.
                </p>
                <p>Sejam bem-vindos à Acordz!<br />Bons estudos e muita diversão!</p>
              </div>
            </div>

            <div
              className={styles.character}
              aria-label="Espaço para imagem do personagem"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/personagens/amanda.svg"
                alt="Ilustração de Amanda, a fundadora da Acordz"
                className={styles.characterImg}
              />
              <div className={styles.founderCard}>
                <h2 className={styles.founderName}>Amanda Carpenedo</h2>
                <p className={styles.founderRole}>Fundadora / CEO</p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
