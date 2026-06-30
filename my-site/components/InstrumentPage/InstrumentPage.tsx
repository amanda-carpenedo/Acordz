'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer/Footer'
import { useCart } from '@/context/CartContext'
import styles from './InstrumentPage.module.css'

interface Product {
  slug: string
  title: string
  desc: string
  price: string
}

function parsePriceBRL(priceStr: string): number {
  // 'R$ 1.290,00' → 1290
  return parseFloat(priceStr.replace(/[^\d,]/g, '').replace(',', '.')) || 0
}

interface Theme {
  pageBg: string
  accentColor: string
  accentUnderline: string
  cardHoverBorder: string
  cardHoverShadow: string
  addBtnBg: string
  addBtnColor: string
  addBtnHoverBg: string
}

interface InstrumentPageProps {
  heading: string
  accentText: string
  headingBreak?: boolean
  subtitle: string
  mascotSrc: string
  mascotAlt: string
  mascotMaxWidth?: string
  theme: Theme
  products: Product[]
}

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function InstrumentPage({
  heading,
  accentText,
  headingBreak = false,
  subtitle,
  mascotSrc,
  mascotAlt,
  mascotMaxWidth = '390px',
  theme,
  products,
}: InstrumentPageProps) {
  const { addItem, items } = useCart()
  const heroRef = useRef<HTMLElement>(null)
  const catalogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heroEl = heroRef.current
    const catalogEl = catalogRef.current
    if (!heroEl || !catalogEl) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // medido uma vez e atualizado só no resize — evita layout thrashing no scroll
    let heroH = heroEl.offsetHeight
    let ticking = false

    function update() {
      if (window.innerWidth <= 960 || reducedMotion) {
        catalogEl!.style.transform = 'translateX(0)'
        ticking = false
        return
      }
      const progress = Math.min(Math.max(window.scrollY / heroH, 0), 1)
      const tx = (1 - progress) * 100
      const ty = -(1 - progress) * heroH
      catalogEl!.style.transform = `translate3d(${tx}%, ${ty}px, 0)`
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    function onResize() {
      heroH = heroEl!.offsetHeight
      update()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      className={styles.page}
      style={{
        '--page-bg': theme.pageBg,
        '--accent-color': theme.accentColor,
        '--accent-underline': theme.accentUnderline,
        '--card-hover-border': theme.cardHoverBorder,
        '--card-hover-shadow': theme.cardHoverShadow,
        '--add-btn-bg': theme.addBtnBg,
        '--add-btn-color': theme.addBtnColor,
        '--add-btn-hover-bg': theme.addBtnHoverBg,
      } as React.CSSProperties}
    >
      <div className={styles.pageBg} aria-hidden="true" />

      <section className={styles.hero} ref={heroRef} aria-label="Início">
        <div>
          <h1 className={styles.heroTitle}>
            {heading}
            {headingBreak && <br />}
            {' '}
            <span className={styles.accent}>{accentText}</span>
          </h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
        </div>

        <div
          className={styles.mascotWrap}
          aria-hidden="true"
          style={{ maxWidth: mascotMaxWidth }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mascotSrc} alt={mascotAlt} className={styles.mascot} />
        </div>
      </section>

      <div className={styles.catalog} ref={catalogRef}>
        <div className={styles.productGrid}>
          {products.map((product) => {
            const inCart = items.some(i => i.product.slug === product.slug)
            return (
              <article key={product.slug} className={styles.productCard} tabIndex={0}>
                <div className={styles.productImage}>
                  <div className={styles.bgRings} />
                  <Image
                    src="/produtos/livro-placeholder.png"
                    alt=""
                    fill
                    className={styles.productThumbImg}
                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
                  />
                  <button className={styles.favBtn} aria-label="Favoritar">
                    <HeartIcon />
                  </button>
                </div>
                <div className={styles.productBody}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productDesc}>{product.desc}</p>
                  <div className={styles.productFoot}>
                    <div className={styles.priceBlock}>
                      <span className={styles.price}>{product.price}</span>
                    </div>
                    <button
                      className={`${styles.addBtn} ${inCart ? styles.addBtnInCart : ''}`}
                      aria-label={inCart ? `${product.title} já está no carrinho` : `Adicionar ${product.title} ao carrinho`}
                      onClick={() => addItem({
                        slug: product.slug,
                        category: 'jogos',
                        tag: 'Instrumento',
                        name: product.title,
                        description: product.desc,
                        image: '/produtos/livro-placeholder.png',
                        specs: [],
                        price: parsePriceBRL(product.price),
                        priceLabel: product.price,
                      })}
                    >
                      {inCart ? <CheckIcon /> : <PlusIcon />}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
