// components/Categories/Categories.tsx

import Link from 'next/link'
import styles from './Categories.module.css'

function ClapsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 513 525" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1,0,0,1,-63.95,-48)">
        <path d="M408,72L408,136C408,149.3 397.3,160 384,160C370.7,160 360,149.3 360,136L360,72C360,58.7 370.7,48 384,48C397.3,48 408,58.7 408,72ZM284,74.7L316,122.7C323.4,133.7 320.4,148.6 309.3,156C298.2,163.4 283.4,160.4 276,149.3L244,101.3C236.6,90.3 239.6,75.4 250.7,68C261.8,60.6 276.6,63.7 284,74.7ZM199,183C208.4,173.6 223.6,173.6 232.9,183L356.7,306.7C366.8,316.8 384,309.6 384,295.4L384,256C384,238.3 398.3,224 416,224C433.7,224 448,238.3 448,256L448,409.6C448,466.7 418,519.6 369.1,549C305.1,587.4 223.3,577.3 170.6,524.6L71,425C61.6,415.6 61.6,400.4 71,391.1C80.4,381.8 95.6,381.7 104.9,391.1L157.9,444.1C164,450.2 173.9,450.2 180,444.1C186.1,438 186.1,428.1 180,422L87,329C77.6,319.6 77.6,304.4 87,295.1C96.4,285.8 111.6,285.7 120.9,295.1L213.9,388.1C220,394.2 229.9,394.2 236,388.1C242.1,382 242.1,372.1 236,366L119,249C109.6,239.6 109.6,224.4 119,215.1C128.4,205.8 143.6,205.7 152.9,215.1L269.9,332.1C276,338.2 285.9,338.2 292,332.1C298.1,326 298.1,316.1 292,310L199,217C189.6,207.6 189.6,192.4 199,183.1L199,183ZM497.1,548.9C472.9,563.4 446.2,571 419.4,572C467.5,532.4 496,473 496,409.6L496,311.5C504.2,311.4 512,305.1 512,295.5L512,256.1C512,238.4 526.3,224.1 544,224.1C561.7,224.1 576,238.4 576,256.1L576,409.7C576,466.8 546,519.7 497.1,549.1L497.1,548.9ZM517.3,68C528.3,75.4 531.3,90.3 524,101.3L492,149.3C484.6,160.3 469.7,163.3 458.7,156C447.7,148.7 444.7,133.7 452,122.7L484,74.7C491.4,63.7 506.3,60.7 517.3,68Z" fill="white"/>
      </g>
    </svg>
  )
}

function RhythmIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 385 453" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1,0,0,1,-127.980744,-96.036428)">
        <path d="M509.9,452.2C503.5,479.6 482.7,495 454.8,500.2C430.3,504.7 409.9,505.8 390.3,490C366.4,469.9 366.1,436.6 387.6,415.6C404.6,399.4 428.5,396.1 464.4,389.8C470.4,388.7 475.6,387.3 480,382.4C486.4,375.2 484.4,378.3 484.4,219.2C484.4,208 478.9,204.9 467.4,206.9C459.2,208.3 281.7,241.5 281.7,241.5C271.5,243.7 268.3,246.7 268.3,258.2C268.3,492.9 269.4,482.1 265.8,497.7C261.6,515.9 250.4,529.6 235.6,537.2C218.8,546.5 188.4,550.6 172.2,547.6C129,539.5 113.8,489.6 143.1,461C160.1,444.8 184,441.5 219.9,435.2C225.9,434.1 231.1,432.7 235.5,427.8C245.6,416.3 237.3,171.2 240.7,157.6C241.5,152.4 243.7,148 247.8,144.7C252,141.2 259.6,139.2 261.2,139.2C465.2,101 490.1,96.1 493.6,96.1C505.1,95.3 511.7,102.1 511.7,113.7C511.9,458.2 512.8,439.7 509.9,452.2Z" fill="white"/>
      </g>
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 512 486" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1,0,0,1,-64,-96)">
        <path d="M320,205.3L320,514.6L320.5,514.4C375.1,491.7 433.7,480 492.8,480L512,480L512,160L492.8,160C450.6,160 408.7,168.4 369.7,184.6C352.9,191.6 336.3,198.5 320,205.3ZM294.9,125.5L320,136L345.1,125.5C391.9,106 442.1,96 492.8,96L528,96C554.5,96 576,117.5 576,144L576,496C576,522.5 554.5,544 528,544L492.8,544C442.1,544 391.9,554 345.1,573.5L332.3,578.8C324.4,582.1 315.6,582.1 307.7,578.8L294.9,573.5C248.1,554 197.9,544 147.2,544L112,544C85.5,544 64,522.5 64,496L64,144C64,117.5 85.5,96 112,96L147.2,96C197.9,96 248.1,106 294.9,125.5Z" fill="white"/>
      </g>
    </svg>
  )
}

const categories = [
  {
    slug: 'jogos-musicais',
    label: 'Jogos Musicais',
    description: 'Aprenda brincando e divirta-se jogando com músicas que as crianças adoram.',
    btnLabel: 'Ver Jogos',
    icon: <ClapsIcon />,
    style: 'jogos',
  },
  {
    slug: 'partituras',
    label: 'Partituras',
    description: 'Arranjos feitos e detalhados para iniciantes, com repertório variado e acessível.',
    btnLabel: 'Tocar Agora',
    icon: <RhythmIcon />,
    style: 'partituras',
  },
  {
    slug: 'ebook',
    label: 'Ebooks',
    description: 'Materiais de educação musical infantil para usar em casa e na sala de aula.',
    btnLabel: 'Ler Mais',
    icon: <BookIcon />,
    style: 'ebooks',
  },
]

export default function Categories() {
  return (
    <section className={styles.section} aria-label="Categorias">
      <div className={styles.grid}>
        {categories.map((cat) => (
          <article key={cat.slug} className={`${styles.card} ${styles[cat.style]}`}>
            <div className={styles.iconWrap}>
              {cat.icon}
            </div>
            <h2>{cat.label}</h2>
            <p>{cat.description}</p>
            <Link className={styles.btn} href={`/${cat.slug}`}>
              {cat.btnLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}