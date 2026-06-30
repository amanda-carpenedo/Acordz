// components/HomeHero/HomeHero.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
import GuitarStrings from './GuitarStrings'
import styles from './HomeHero.module.css'

export default function HomeHero() {
  const [audioOn, setAudioOn] = useState(true)

  return (
    <section className={styles.heroSection} aria-label="Início">
      <GuitarStrings audioOn={audioOn} hoverRadius={130} thicknessScale={2} />

      <div className={styles.heroOverlay}>
        <h1 className={styles.heroTitle}>
          Descubra a música<br /><em>brincando</em>
        </h1>
        <p className={styles.heroSubtitle}>
          Jogos, partituras e ebooks para crianças curiosas que amam aprender música
        </p>
        <div className={styles.heroCtas}>
          <Link className={styles.btnPrimary} href="/jogos-musicais">Explorar Jogos</Link>
          <Link className={styles.btnSecondary} href="/sobre">Saiba Mais</Link>
        </div>
      </div>

      <p className={styles.heroHint}>
        passe o mouse pelas cordas para tocar · <kbd>clique</kbd> para dedilhar
      </p>

      <button
        className={styles.muteBtn}
        data-muted={!audioOn}
        aria-label={audioOn ? 'Silenciar som' : 'Ativar som'}
        onClick={() => setAudioOn(v => !v)}
      >
        {audioOn ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none"/>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
            <path d="M18.5 5.5a9 9 0 0 1 0 13"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none"/>
            <line x1="16" y1="9" x2="22" y2="15"/>
            <line x1="22" y1="9" x2="16" y2="15"/>
          </svg>
        )}
      </button>
    </section>
  )
}