// components/ProductCard/ProductCard.tsx

import Link from 'next/link'
import { Product } from '@/data/products'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.card} data-cat={product.category}>
      <div className={styles.tag}>{product.tag}</div>
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.sub}>{product.description}</p>

      <div className={styles.specs}>
        {product.specs.map((spec) => (
          <div key={spec.label}>
            {spec.label}
            <span>{spec.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.priceRow}>
        <div className={styles.price}>
          {product.originalPrice && (
            <span className={styles.strike}>R$ {product.originalPrice}</span>
          )}
          R$ {product.price}
          <small>{product.priceLabel}</small>
        </div>

        <Link href={`/produto/${product.slug}`} className={styles.cta}>
          Ver produto
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M1 6 H10 M7 3 L10 6 L7 9"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}