// components/ScrollStage/ScrollStage.tsx

'use client'

import { useEffect, useRef } from 'react'
import { stops, products } from '@/data/products'
import ProductCard from '@/components/ProductCard/ProductCard'
import Character from '@/components/Character/Character'
import styles from './ScrollStage.module.css'

const STOP_HEIGHT = 900

function buildCablePath(count: number): string {
  const lines: string[] = []
  const L = 180
  const R = 820
  const C = 500
  const H = 800

  // começa no centro do primeiro stop, não no topo do stage
  const startY = 400

  lines.push(`M ${C},${startY}`)
  lines.push(`C ${C},${startY + 80} ${R},${startY + 160} ${R},${startY + 280}`)

  for (let i = 0; i < count; i++) {
    const base  = startY + 280 + i * H
    const xCur  = i % 2 === 0 ? R : L
    const xNext = i % 2 === 0 ? L : R

    lines.push(
      `C ${xCur},${base + H * 0.4} ` +
      `${xNext},${base + H * 0.6} ` +
      `${xNext},${base + H}`
    )
  }

  return lines.join(' ')
}

export default function ScrollStage() {
  const stageRef   = useRef<HTMLDivElement>(null)
  const svgRef     = useRef<SVGSVGElement>(null)
  const pathRef    = useRef<SVGPathElement>(null)
  const coreRef    = useRef<SVGPathElement>(null)
  const barRef     = useRef<HTMLElement>(null)
  const pctRef     = useRef<HTMLSpanElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  const cablePath   = buildCablePath(stops.length)
const cableHeight = 400 + 280 + stops.length * 900 + 200

  useEffect(() => {
    const stage = stageRef.current
    const svg   = svgRef.current
    const path  = pathRef.current
    const core  = coreRef.current
    if (!stage || !svg || !path || !core) return

    function syncHeight() {
      svg!.style.height = stage!.offsetHeight + 'px'
    }

    // aguarda fonte carregar para medir getTotalLength corretamente
    const len = path.getTotalLength()
    path.style.strokeDasharray  = String(len)
    path.style.strokeDashoffset = String(len)
    core.style.strokeDasharray  = String(len)
    core.style.strokeDashoffset = String(len)

    function update() {
      const stageRect = stage!.getBoundingClientRect()
      const vh        = window.innerHeight
      const scrolled  = -stageRect.top

      const firstStop = stage!.querySelector('.stop:first-child')
      const lastCard  = stage!.querySelector('.stop:last-child [class*="cards"]')

      // .top/.bottom - stageRect.top é constante durante o scroll (ambos se deslocam juntos).
      // scrollStart corresponde ao disparo do IO (threshold 0.2): 20% do stop visível.
      const stopH       = (firstStop as HTMLElement | null)?.offsetHeight ?? 900
      const scrollStart = firstStop
        ? firstStop.getBoundingClientRect().top - stageRect.top - vh + stopH * 0.2
        : 0
      const scrollEnd = lastCard
        ? lastCard.getBoundingClientRect().bottom - stageRect.top - vh * 0.5
        : stageRect.height - vh

      const cableP = Math.max(0, Math.min(1, (scrolled - scrollStart) / (scrollEnd - scrollStart)))
      path!.style.strokeDashoffset = String(len * (1 - cableP))
      core!.style.strokeDashoffset = String(len * (1 - cableP))

      // progress bar (página inteira)
      const docH    = document.documentElement.scrollHeight - window.innerHeight
      const overall = Math.max(0, Math.min(1, window.scrollY / docH))
      if (barRef.current)  barRef.current.style.width = (overall * 100) + '%'
      if (pctRef.current)  pctRef.current.textContent = Math.round(overall * 100) + '%'

      // counter do stop ativo
      const stopEls = document.querySelectorAll('.stop')
      let active = 0
      stopEls.forEach((s, i) => {
        const r = s.getBoundingClientRect()
        if (r.top < vh * 0.6 && r.bottom > vh * 0.4) active = i + 1
      })
      if (counterRef.current) {
        counterRef.current.textContent =
          String(active).padStart(2, '0') + ' / ' +
          String(stops.length).padStart(2, '0')
      }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in')
      })
    }, { threshold: 0.2 })

    document.querySelectorAll('.stop').forEach(s => io.observe(s))

    let ticking = false
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => { syncHeight(); update() })
    syncHeight()
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', () => { syncHeight(); update() })
      io.disconnect()
    }
  }, [])

  return (
    <>
      {/* Progress indicator */}
      <div className={styles.progress} aria-hidden="true">
        <span ref={counterRef} className={styles.counter}>00 / 04</span>
        <span className={styles.bar}>
          <i ref={barRef}></i>
        </span>
        <span ref={pctRef} className={styles.pct}>0%</span>
      </div>

      {/* Scroll stage */}
      <div className={styles.stage} id="stage" ref={stageRef}>

        {/* Cabo SVG */}
        <div className={styles.cableLayer}>
          <svg
            ref={svgRef}
            preserveAspectRatio="none"
            viewBox={`0 0 1000 ${cableHeight}`}
          >
            <path
              ref={pathRef}
              className={styles.cableStroke}
              d={cablePath}
            />
            <path
              ref={coreRef}
              className={styles.cableCore}
              d={cablePath}
            />
          </svg>
        </div>

        {/* Stops */}
        {stops.map((stop) => {
          const stopProducts = stop.productSlugs
            .map(slug => products.find(p => p.slug === slug))
            .filter((p): p is NonNullable<typeof p> => p !== undefined)
          const charSide = stop.character.positionSide

          return (
            <section
              key={stop.stopNumber}
              className={`stop ${styles.stop}`}
              data-side={stop.side}
              data-stop={stop.stopNumber}
            >
              {/* Personagem — visível em todas as telas */}
              <div
                className={styles.characterWrap}
                data-side={charSide}
              >
                <Character character={stop.character} />
              </div>

              {/* Dois cards */}
              <div className={styles.cards}>
                {stopProducts.map((product, i) => (
                  <div
                    key={product.slug}
                    className={styles.cardWrapper}
                    style={{ transitionDelay: `${i * 0.12}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}