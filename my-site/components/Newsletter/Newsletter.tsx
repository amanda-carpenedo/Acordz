// components/Newsletter/Newsletter.tsx

'use client'

import { useState } from 'react'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <section className={styles.section} aria-label="Newsletter">
      <div className={styles.container}>
        <h2>Fique por dentro das novidades</h2>
        <p>Receba nossa newsletter, novos jogos e músicas exclusivas no seu email.</p>

        {sent ? (
          <p className={styles.success}>Obrigada! Você está na lista. 🎵</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="nl-email" className={styles.srOnly}>Seu melhor email</label>
            <input
              type="email"
              id="nl-email"
              className={styles.input}
              placeholder="Seu melhor email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.btn}>Assinar</button>
          </form>
        )}
      </div>
    </section>
  )
}