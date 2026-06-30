// components/Instruments/Instruments.tsx

import Link from 'next/link'
import Image from 'next/image'
import styles from './Instruments.module.css'

const instruments = [
  {
    slug: 'violao',
    label: 'Violão',
    char: '/personagens/background-button.svg',
    hands: '/personagens/background-button.svg',
    wrapper: 'violaoWrapper',
    card: 'violao',
    char_class: 'violaoChar',
    hands_class: 'violaoHands',
    aspect: '413 / 264',
  },
  {
    slug: 'piano',
    label: 'Piano',
    char: '/personagens/background-roxo.svg',
    hands: '/personagens/background-roxo.svg',
    wrapper: 'pianoWrapper',
    card: 'piano',
    char_class: 'pianoChar',
    hands_class: 'pianoHands',
    aspect: '410 / 262',
  },
  {
    slug: 'flauta',
    label: 'Flauta Doce',
    char: '/personagens/background-amarelo.svg',
    hands: '/personagens/background-amarelo.svg',
    wrapper: 'flautaWrapper',
    card: 'flauta',
    char_class: 'flautaChar',
    hands_class: 'flautaHands',
    aspect: '412 / 268',
  },
  {
    slug: 'ukulele',
    label: 'Ukulele',
    char: '/personagens/background-vermelho.svg',
    hands: '/personagens/background-vermelho.svg',
    wrapper: 'ukuleleWrapper',
    card: 'ukulele',
    char_class: 'ukuleleChar',
    hands_class: 'ukuleleHands',
    aspect: '541 / 251',
  },
]

export default function Instruments() {
  return (
    <section className={styles.section} aria-label="Explorar por instrumento">
      <div className={styles.container}>
        <h2 className={styles.title}>Explore por Instrumento</h2>
        <div className={styles.grid}>
          {instruments.map((inst) => (
            <div key={inst.slug} className={`${styles.wrapper} ${styles[inst.wrapper]}`}>
              <img
                className={`${styles.char} ${styles[inst.char_class]}`}
                src={inst.char}
                alt=""
                aria-hidden="true"
              />
              <img
                className={`${styles.hands} ${styles[inst.hands_class]}`}
                src={inst.hands}
                alt=""
                aria-hidden="true"
              />
              <Link
                className={`${styles.card} ${styles[inst.card]}`}
                href={`/${inst.slug}`}
                aria-label={inst.label}
              >
                <span>{inst.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}