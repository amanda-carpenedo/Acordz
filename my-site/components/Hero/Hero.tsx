// components/Hero/HeroPartituras.tsx

// components/Hero/Hero.tsx

import Image from 'next/image'
import styles from './Hero.module.css'

type HeroProps = {
  title: React.ReactNode
  image: string
  imageAlt: string
  imageSize?: 'normal' | 'small'
}

export default function Hero({ title, image, imageAlt, imageSize = 'normal' }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div>
        <Image
          src={image}
          alt={imageAlt}
          width={500}
          height={500}
          className={imageSize === 'small' ? styles.imageSmall : styles.image}
          priority
        />
      </div>

      <div className={styles.scrollCue}>
        role para ver <span className={styles.arrow}></span>
      </div>
    </section>
  )
}