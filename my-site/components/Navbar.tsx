// components/Navbar.tsx

'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from './Navbar.module.css'
import { useCart } from '@/context/CartContext'

const HamburgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [instrumentsOpen, setInstrumentsOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const { count } = useCart()

  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    setInstrumentsOpen(false)
  }

  return (
    <>
      <nav className={styles.navbar} aria-label="Navegação principal">
        <div className={styles.navInner}>

          <Link className={styles.navLogo} href="/" onClick={closeMenu}>Acordz</Link>

          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/jogos-musicais">Jogos</Link></li>
            <li><Link href="/partituras">Partituras</Link></li>
            <li><Link href="/ebook">Ebooks</Link></li>

            <li
              ref={dropdownRef}
              className={`${styles.navDropdown} ${dropdownOpen ? styles.navDropdownOpen : ''}`}
            >
              <button
                className={styles.navDropdownToggle}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Instrumentos
                <svg className={styles.dropdownChevron} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="4 6 8 10 12 6" />
                </svg>
              </button>

              <ul className={styles.navDropdownMenu} role="menu">
                <li role="none"><Link href="/violao" role="menuitem" onClick={() => setDropdownOpen(false)}>Violão</Link></li>
                <li role="none"><Link href="/flauta" role="menuitem" onClick={() => setDropdownOpen(false)}>Flauta</Link></li>
                <li role="none"><Link href="/piano" role="menuitem" onClick={() => setDropdownOpen(false)}>Piano</Link></li>
                <li role="none"><Link href="/ukulele" role="menuitem" onClick={() => setDropdownOpen(false)}>Ukulele</Link></li>
              </ul>
            </li>

            <li><Link href="/sobre">Sobre</Link></li>
          </ul>

          <div className={styles.navActions}>
            <Link
              href="/carrinho"
              className={styles.navCart}
              aria-label={`Carrinho de compras${count > 0 ? ` — ${count} item${count > 1 ? 's' : ''}` : ''}`}
            >
              <CartIcon />
              {count > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            <Link className={styles.navLogin} href="/login">Login</Link>

            <button
              className={styles.hamburger}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <HamburgerIcon />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayOpen : ''}`}
        aria-hidden={!menuOpen}
        onClick={(e) => { if (e.target === e.currentTarget) closeMenu() }}
      >
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Menu de navegação">

          <div className={styles.mobileDrawerHeader}>
            <span className={styles.mobileDrawerLogo}>Acordz</span>
            <button className={styles.mobileClose} aria-label="Fechar menu" onClick={closeMenu}>
              <CloseIcon />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <Link href="/" className={styles.mobileNavLink} onClick={closeMenu}>Home</Link>
            <Link href="/jogos-musicais" className={styles.mobileNavLink} onClick={closeMenu}>Jogos</Link>
            <Link href="/partituras" className={styles.mobileNavLink} onClick={closeMenu}>Partituras</Link>
            <Link href="/ebook" className={styles.mobileNavLink} onClick={closeMenu}>Ebooks</Link>

            <button
              className={styles.mobileNavAccordion}
              onClick={() => setInstrumentsOpen(!instrumentsOpen)}
              aria-expanded={instrumentsOpen}
            >
              Instrumentos
              <svg
                className={`${styles.mobileChevron} ${instrumentsOpen ? styles.mobileChevronOpen : ''}`}
                viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="4 6 8 10 12 6" />
              </svg>
            </button>

            <div className={`${styles.mobileSubLinks} ${instrumentsOpen ? styles.mobileSubLinksOpen : ''}`}>
              <div>
                <Link href="/violao" className={styles.mobileSubLink} onClick={closeMenu}>Violão</Link>
                <Link href="/flauta" className={styles.mobileSubLink} onClick={closeMenu}>Flauta</Link>
                <Link href="/piano" className={styles.mobileSubLink} onClick={closeMenu}>Piano</Link>
                <Link href="/ukulele" className={styles.mobileSubLink} onClick={closeMenu}>Ukulele</Link>
              </div>
            </div>

            <Link href="/sobre" className={styles.mobileNavLink} onClick={closeMenu}>Sobre</Link>
          </nav>

          <div className={styles.mobileDrawerFooter}>
            <Link href="/carrinho" className={styles.mobileCartLink} onClick={closeMenu}>
              <CartIcon />
              Carrinho
              {count > 0 && <span className={styles.mobileCartCount}>{count}</span>}
            </Link>
            <Link href="/login" className={styles.mobileLoginBtn} onClick={closeMenu}>Login</Link>
          </div>

        </div>
      </div>
    </>
  )
}
