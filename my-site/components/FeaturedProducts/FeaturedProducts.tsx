// components/FeaturedProducts/FeaturedProducts.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import styles from './FeaturedProducts.module.css'

// pega um produto de cada categoria para destacar
const featured = [
  products.find(p => p.category === 'jogos'),
  products.find(p => p.category === 'partituras'),
  products.find(p => p.category === 'ebooks'),
  products.find(p => p.category === 'bundle'),
].filter(Boolean)

function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

export default function FeaturedProducts() {
  const { addItem } = useCart()

  return (
    <section className={styles.section} aria-label="Destaques da semana">
      <div className={styles.container}>
        <h2 className={styles.title}>Destaques da Semana</h2>
        <div className={styles.grid}>
          {featured.map((product) => (
            <article key={product!.slug} className={styles.card}>
              <div className={`${styles.thumb} ${styles[product!.category]}`} aria-hidden="true">
                {product!.image && (
                  <Image
                    src={product!.image}
                    alt=""
                    fill
                    className={styles.thumbImg}
                    sizes="(max-width: 900px) 50vw, 25vw"
                  />
                )}
              </div>
              <div className={styles.body}>
                <span className={`${styles.badge} ${styles[`badge_${product!.category}`]}`}>
                  {product!.tag}
                </span>
                <h3 className={styles.productTitle}>{product!.name}</h3>
                <p className={styles.desc}>{product!.description}</p>
                <div className={styles.footer}>
                  <span className={styles.price}>R$ {product!.price}</span>
                  <div className={styles.footerActions}>
                    <Link href={`/produto/${product!.slug}`} className={styles.btn}>
                      Ver produto
                    </Link>
                    <button
                      className={styles.addCartBtn}
                      aria-label={`Adicionar ${product!.name} ao carrinho`}
                      onClick={() => addItem(product!)}
                    >
                      <CartIcon />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.cta}>
          <Link href="/partituras" className={styles.ctaBtn}>
            Conheça nossa loja
          </Link>
        </div>
      </div>
    </section>
  )
}