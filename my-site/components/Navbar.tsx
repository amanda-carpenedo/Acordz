// components/Navbar.tsx

'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from './Navbar.module.css'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
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

  return (
    <nav className={styles.navbar} aria-label="Navegação principal">
      <div className={styles.navInner}>

        <Link className={styles.navLogo} href="/">Acordz</Link>

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
          <Link href="/carrinho" className={styles.navCart} aria-label={`Carrinho de compras${count > 0 ? ` — ${count} item${count > 1 ? 's' : ''}` : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className={styles.cartBadge} aria-hidden="true">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          <Link className={styles.navLogin} href="/login">Login</Link>
        </div>

      </div>
    </nav>
  )
}