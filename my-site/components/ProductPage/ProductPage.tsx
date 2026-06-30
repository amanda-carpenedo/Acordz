// components/ProductPage/ProductPage.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import styles from './ProductPage.module.css'

export default function ProductPage({ product }: { product: Product }) {
  const { addItem, items } = useCart()
  const inCart = items.some(i => i.product.slug === product.slug)
  return (
    <main className={styles.main}>

      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/partituras">Loja</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className={styles.grid}>

        {/* ── Coluna esquerda: imagem ── */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrap} data-cat={product.category}>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className={styles.placeholder}>
                <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <rect x="8" y="16" width="64" height="48" rx="6"
                    stroke="currentColor" strokeWidth="2"/>
                  <circle cx="28" cy="32" r="6"
                    stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 52l16-14 12 12 10-8 26 18"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Imagem em breve</span>
              </div>
            )}
          </div>

          {/* badge de garantia */}
          <div className={styles.guarantee}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            <div>
              <strong>Garantia de 30 dias</strong>
              <span>Reembolso total se não ficar satisfeito</span>
            </div>
          </div>
        </div>

        {/* ── Coluna direita: info ── */}
        <div className={styles.infoCol}>

          <div className={styles.tag}>{product.tag}</div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>

          {/* specs */}
          <div className={styles.specs}>
            {product.specs.map(spec => (
              <div key={spec.label} className={styles.spec}>
                <span className={styles.specLabel}>{spec.label}</span>
                <span className={styles.specValue}>{spec.value}</span>
              </div>
            ))}
          </div>

          {/* preço */}
          <div className={styles.priceBlock}>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                R$ {product.originalPrice}
              </span>
            )}
            <div className={styles.price}>
              <span className={styles.priceCurrency}>R$</span>
              <span className={styles.priceValue}>{product.price}</span>
            </div>
            <span className={styles.priceLabel}>{product.priceLabel}</span>
          </div>

          <div className={styles.buyActions}>
            <button
              className={styles.buyButton}
              onClick={() => addItem(product)}
            >
              {inCart ? 'Adicionar mais um' : 'Adicionar ao carrinho'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" aria-hidden="true">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>
            {inCart && (
              <Link href="/carrinho" className={styles.viewCartLink}>
                Ver carrinho →
              </Link>
            )}
          </div>

          <p className={styles.downloadNote}>
            Download imediato após confirmação do pagamento
          </p>

          {/* o que está incluso */}
          <div className={styles.includes}>
            <h3>O que está incluso</h3>
            <ul>
              {product.category === 'jogos' && <>
                <li>Arquivo PDF pronto para imprimir</li>
                <li>Instruções de uso e sugestões de atividades</li>
                <li>Licença para uso em sala de aula</li>
              </>}
              {product.category === 'partituras' && <>
                <li>PDF com todas as partituras em alta resolução</li>
                <li>Áudios de referência MP3</li>
                <li>Dicas de digitação para cada música</li>
              </>}
              {product.category === 'ebooks' && <>
                <li>Arquivo EPUB compatível com todos os leitores</li>
                <li>Áudios MP3 de cada instrumento</li>
                <li>Versão PDF incluída</li>
              </>}
              {product.category === 'bundle' && <>
                <li>Todos os produtos do combo em um só download</li>
                <li>30% de desconto aplicado automaticamente</li>
                <li>Garantia de 30 dias em todos os itens</li>
              </>}
            </ul>
          </div>

        </div>
      </div>
    </main>
  )
}