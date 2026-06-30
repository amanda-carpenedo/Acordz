// components/Outro/Outro.tsx
import React from 'react'
import styles from './Outro.module.css'

type OutroProps = {
  title: React.ReactNode
  text: string
}

export default function Outro({ title, text }: OutroProps) {
  return (
    <section className={styles.outro}>
      <h2>{title}</h2>
      <p>{text}</p>
      <a className={styles.btn} href="#">
        Ver toda a coleção
        <svg width="14" height="14" viewBox="0 0 12 12">
          <path d="M1 6 H10 M7 3 L10 6 L7 9"
            stroke="currentColor" strokeWidth="1.8"
            fill="none" strokeLinecap="round"/>
        </svg>
      </a>
    </section>
  )
}