'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import styles from './carrinho.module.css'

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

const categoryLabel: Record<string, string> = {
  jogos: 'Jogos musicais',
  partituras: 'Partituras',
  ebooks: 'Ebook',
  bundle: 'Combo',
}

export default function CartPage() {
  const { items, removeItem, setQty, total, count, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="var(--color-border)" strokeWidth="2" />
              <circle cx="30" cy="62" r="3" stroke="var(--color-text-muted)" strokeWidth="2" />
              <circle cx="52" cy="62" r="3" stroke="var(--color-text-muted)" strokeWidth="2" />
              <path d="M14 22h6l7 26h22l6-18H26" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className={styles.emptyTitle}>Seu carrinho está vazio</h1>
          <p className={styles.emptyDesc}>Explore nossos jogos, partituras e ebooks e adicione os produtos que você curtiu.</p>
          <Link href="/" className={styles.emptyBtn}>Ver produtos</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Meu Carrinho</h1>
        <span className={styles.itemCount}>{count} {count === 1 ? 'item' : 'itens'}</span>
      </div>

      <div className={styles.layout}>

        {/* ── Lista de itens ── */}
        <section className={styles.itemsSection} aria-label="Itens no carrinho">
          <ul className={styles.itemList}>
            {items.map(({ product, quantity }) => (
              <li key={product.slug} className={styles.item}>
                <div className={styles.itemThumb} data-cat={product.category}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={styles.itemThumbImg}
                      sizes="96px"
                    />
                  ) : (
                    <span className={styles.itemThumbPlaceholder} aria-hidden="true">♪</span>
                  )}
                </div>

                <div className={styles.itemInfo}>
                  <span className={`${styles.itemBadge} ${styles[`badge_${product.category}`]}`}>
                    {categoryLabel[product.category]}
                  </span>
                  <h2 className={styles.itemName}>{product.name}</h2>
                  <span className={styles.itemPriceLabel}>{product.priceLabel}</span>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.qtyRow}>
                    <button
                      className={styles.qtyBtn}
                      aria-label="Diminuir quantidade"
                      onClick={() => setQty(product.slug, quantity - 1)}
                    >−</button>
                    <span className={styles.qtyValue}>{quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      aria-label="Aumentar quantidade"
                      onClick={() => setQty(product.slug, quantity + 1)}
                    >+</button>
                  </div>
                  <span className={styles.itemPrice}>
                    R$ {(product.price * quantity).toFixed(0)}
                  </span>
                  <button
                    className={styles.removeBtn}
                    aria-label={`Remover ${product.name}`}
                    onClick={() => removeItem(product.slug)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.listFooter}>
            <button className={styles.clearBtn} onClick={clearCart}>
              Limpar carrinho
            </button>
            <Link href="/" className={styles.continueBtn}>
              Continuar comprando
            </Link>
          </div>
        </section>

        {/* ── Resumo do pedido ── */}
        <aside className={styles.summary} aria-label="Resumo do pedido">
          <h2 className={styles.summaryTitle}>Resumo do pedido</h2>

          <div className={styles.summaryLines}>
            {items.map(({ product, quantity }) => (
              <div key={product.slug} className={styles.summaryLine}>
                <span className={styles.summaryLineName}>
                  {product.name}
                  {quantity > 1 && <span className={styles.summaryQty}> ×{quantity}</span>}
                </span>
                <span className={styles.summaryLinePrice}>
                  R$ {(product.price * quantity).toFixed(0)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.couponRow}>
            <input
              type="text"
              placeholder="Cupom de desconto"
              className={styles.couponInput}
              aria-label="Código de cupom de desconto"
            />
            <button className={styles.couponApply}>Aplicar</button>
          </div>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalValue}>R$ {total.toFixed(0)}</span>
          </div>

          <button className={styles.checkoutBtn}>
            Finalizar compra
            <svg viewBox="0 0 12 12" aria-hidden="true" width="12" height="12">
              <path d="M1 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </button>

          <p className={styles.secureNote}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
              <path d="M8 1l6 2.5V8c0 3.5-6 6-6 6S2 11.5 2 8V3.5L8 1z" />
              <polyline points="5.5 8 7 9.5 10.5 6" />
            </svg>
            Pagamento seguro · Download imediato
          </p>
        </aside>

      </div>
    </main>
  )
}
