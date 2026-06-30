// components/Testimonials/Testimonials.tsx

import styles from './Testimonials.module.css'

const testimonials = [
  {
    text: 'Os jogos valeram o estudo de piano da minha filha. Ela pede pra jogar todos os dias!',
    name: 'Mariana C.',
    role: 'Mãe de Sofia (7 anos)',
    initial: 'M',
    color: 'var(--string-1)',
  },
  {
    text: 'Uso as partituras nas minhas aulas de musicalização. O material é muito claro e estruturado!',
    name: 'Rafael T.',
    role: 'Professor de Música',
    initial: 'R',
    color: 'var(--string-4)',
  },
  {
    text: 'As partituras do kit fizeram meu filho tocar a primeira música no ukulele em poucos dias!',
    name: 'Carlos M.',
    role: 'Pai de Luca (8 anos)',
    initial: 'C',
    color: 'var(--string-5)',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.section} aria-label="Depoimentos">
      <div className={styles.container}>
        <h2 className={styles.title}>Quem Aprende com a Gente</h2>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <article key={t.name} className={styles.card}>
              <div className={styles.stars} aria-label="5 estrelas">★★★★★</div>
              <p className={styles.text}>"{t.text}"</p>
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: t.color }}
                  aria-hidden="true"
                >
                  {t.initial}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}