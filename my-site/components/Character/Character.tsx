// components/Character/Character.tsx

import Image from 'next/image'
import styles from './Character.module.css'
import { StopData } from '@/data/products'

type CharacterProps = {
  character: StopData['character']
}

export default function Character({ character }: CharacterProps) {
  return (
    <div
      className={`${styles.character} ${styles[character.name]}`}
      style={{ '--rot': character.rot } as React.CSSProperties}
    >
      <Image
        src={character.image}
        alt={character.alt}
        width={320}
        height={320}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <div className={`${styles.quote} ${character.quoteAlign === 'right' ? styles.quoteRight : ''}`}>
        {character.quote}
      </div>
    </div>
  )
}