// components/HomeHero/GuitarStrings.tsx

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const NOTES = [
  { name: 'E2', freq: 82.41,  hue: 18 },
  { name: 'A2', freq: 110.00, hue: 50 },
  { name: 'D3', freq: 146.83, hue: 130 },
  { name: 'G3', freq: 196.00, hue: 195 },
  { name: 'B3', freq: 246.94, hue: 250 },
  { name: 'E4', freq: 329.63, hue: 320 },
]

const STRINGS = [...NOTES].reverse()
const PALETTE = { bg: '#FBF6EC', ink: '#2A2418', sat: 0.16, light: 0.65 }

let _audioCtx: AudioContext | null = null

function getAudio() {
  if (!_audioCtx) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext
    if (!Ctx) return null
    _audioCtx = new Ctx()
  }
  if (_audioCtx.state === 'suspended') _audioCtx.resume()
  return _audioCtx
}

function playPluck(freq: number, volume = 0.5) {
  const ctx = getAudio()
  if (!ctx) return
  const now = ctx.currentTime

  const out = ctx.createGain()
  out.gain.setValueAtTime(0, now)
  out.gain.linearRampToValueAtTime(volume, now + 0.005)
  out.gain.exponentialRampToValueAtTime(0.0001, now + 1.6)

  const filt = ctx.createBiquadFilter()
  filt.type = 'lowpass'
  filt.frequency.setValueAtTime(freq * 8, now)
  filt.frequency.exponentialRampToValueAtTime(freq * 2, now + 1.2)
  filt.Q.value = 4

  const o1 = ctx.createOscillator()
  o1.type = 'triangle'
  o1.frequency.value = freq

  const o2 = ctx.createOscillator()
  o2.type = 'sawtooth'
  o2.frequency.value = freq * 2.003
  const o2g = ctx.createGain()
  o2g.gain.value = 0.18

  o1.connect(filt)
  o2.connect(o2g).connect(filt)
  filt.connect(out).connect(ctx.destination)

  o1.start(now); o2.start(now)
  o1.stop(now + 1.7); o2.stop(now + 1.7)
}

function hueToColor(hue: number, sat: number, light: number) {
  return `oklch(${light} ${sat} ${hue})`
}

function buildPath(
  width: number, height: number, y0: number,
  mouse: { x: number; y: number } | null,
  pluck: any, t: number, ambient: number, hoverRadius: number
) {
  const N = 64
  const pts: [number, number][] = []

  for (let i = 0; i <= N; i++) {
    const x = (i / N) * width
    let dy = 0

    dy += Math.sin(x * 0.004 + t * 0.0008 + y0 * 0.01) * ambient

    if (mouse) {
      const dx = x - mouse.x
      const dyMouse = mouse.y - y0
      const dist = Math.hypot(dx, dyMouse)
      if (dist < hoverRadius) {
        const k = Math.cos((dist / hoverRadius) * Math.PI * 0.5) ** 2
        dy += dyMouse * 0.6 * k
      }
    }

    if (pluck && pluck.alive) {
      const age = (t - pluck.start) / 1000
      if (age >= 0 && age < pluck.duration) {
        const env = Math.exp(-age * pluck.damping)
        const u = x / width
        const xc = pluck.x / width
        const spatial = u < xc
          ? u / Math.max(0.001, xc)
          : (1 - u) / Math.max(0.001, 1 - xc)
        const wave =
          Math.sin(age * pluck.omega) * 0.85 +
          Math.sin(age * pluck.omega * 2) * 0.15
        dy += pluck.amp * env * spatial * wave
      } else {
        pluck.alive = false
      }
    }

    pts.push([x, y0 + dy])
  }

  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }
  return d
}

function stringYs(h: number, n: number) {
  const margin = h * 0.12
  const usable = h - margin * 2
  return Array.from({ length: n }, (_, i) => margin + (usable * i) / (n - 1))
}

function stringThickness(i: number, scale: number) {
  return (1.4 + (6.5 - 1.4) * (i / 5)) * scale
}

type Pluck = {
  alive: boolean
  start: number
  x: number
  y: number
  amp: number
  omega: number
  damping: number
  duration: number
} | null

type Sparkle = {
  x: number; y: number
  vx: number; vy: number
  born: number; life: number
  hue: number; size: number
}

export default function GuitarStrings({
  audioOn,
  hoverRadius = 130,
  thicknessScale = 2,
}: {
  audioOn: boolean
  hoverRadius?: number
  thicknessScale?: number
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null)
  const lastPluckTimeRef = useRef(STRINGS.map(() => 0))
  const plucksRef = useRef<Pluck[]>(STRINGS.map(() => null))
  const sparklesRef = useRef<Sparkle[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const sparkleLayerRef = useRef<SVGGElement>(null)
  const audioOnRef = useRef(audioOn)
  audioOnRef.current = audioOn

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const triggerPluck = useCallback((idx: number, x: number, y: number, intensity = 1) => {
    if (idx < 0 || idx >= STRINGS.length) return
    const note = STRINGS[idx]
    const amp = (24 + 18 * (1 - idx / (STRINGS.length - 1))) * (0.5 + 0.5 * intensity)
    plucksRef.current[idx] = {
      alive: true, start: performance.now(), x, y, amp,
      omega: 6 + (idx / (STRINGS.length - 1)) * 16,
      damping: 2.4, duration: 1.6,
    }
    if (audioOnRef.current) playPluck(note.freq, 0.18 + 0.22 * intensity)

    const now = performance.now()
    const count = Math.round(8 + 8 * intensity)
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count + Math.random() * 0.4
      const speed = (40 + Math.random() * 120) * (0.5 + 0.5 * intensity)
      sparklesRef.current.push({
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed - 30,
        born: now,
        life: 600 + Math.random() * 500,
        hue: note.hue + (Math.random() - 0.5) * 30,
        size: 2 + Math.random() * 3,
      })
    }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const r = wrapRef.current?.getBoundingClientRect()
      if (!r) return
      const x = e.clientX - r.left
      const y = e.clientY - r.top

      if (x < 0 || x > r.width || y < 0 || y > r.height) {
        mouseRef.current = null
        lastMouseRef.current = null
        return
      }

      const prev = lastMouseRef.current
      mouseRef.current = { x, y }

      if (prev && size.h > 0) {
        const ys = stringYs(size.h, STRINGS.length)
        const now = performance.now()
        const COOLDOWN = 180
        const speed = Math.hypot(x - prev.x, y - prev.y)
        const intensity = Math.min(1, 0.3 + speed / 60)

        for (let i = 0; i < ys.length; i++) {
          const sy = ys[i]
          const crossed = (prev.y - sy) * (y - sy) <= 0 && prev.y !== y
          if (!crossed) continue
          if (now - lastPluckTimeRef.current[i] < COOLDOWN) continue
          lastPluckTimeRef.current[i] = now
          const t = (sy - prev.y) / ((y - prev.y) || 1)
          triggerPluck(i, prev.x + (x - prev.x) * t, sy, intensity)
        }
      }
      lastMouseRef.current = { x, y }
    }

    const onLeave = () => {
      mouseRef.current = null
      lastMouseRef.current = null
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [size.h, triggerPluck])

  const handleClick = (e: React.MouseEvent) => {
    const r = wrapRef.current!.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const ys = stringYs(size.h, STRINGS.length)
    let best = 0, bestD = Infinity
    for (let i = 0; i < ys.length; i++) {
      const d = Math.abs(y - ys[i])
      if (d < bestD) { bestD = d; best = i }
    }
    if (bestD > 80) return
    triggerPluck(best, x, ys[best], 1)
  }

  useEffect(() => {
    if (!size.w || !size.h) return
    let raf: number

    const tick = () => {
      const t = performance.now()
      const ys = stringYs(size.h, STRINGS.length)

      for (let i = 0; i < STRINGS.length; i++) {
        const ambient = 1.2 + (1 - i / (STRINGS.length - 1)) * 1.8
        const d = buildPath(size.w, size.h, ys[i], mouseRef.current, plucksRef.current[i], t, ambient, hoverRadius)
        const glow  = pathRefs.current[i]
        const sharp = pathRefs.current[i + STRINGS.length]
        if (glow)  glow.setAttribute('d', d)
        if (sharp) sharp.setAttribute('d', d)
      }

      if (sparkleLayerRef.current) {
        const layer = sparkleLayerRef.current
        const now = t
        const alive = sparklesRef.current.filter(s => (now - s.born) <= s.life)
        sparklesRef.current = alive

        if (layer.childElementCount !== alive.length) {
          layer.replaceChildren()
          for (let i = 0; i < alive.length; i++) {
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            c.setAttribute('r', '0')
            layer.appendChild(c)
          }
        }

        for (let i = 0; i < alive.length; i++) {
          const s = alive[i]
          const age = (now - s.born) / 1000
          const cx = s.x + s.vx * age
          const cy = s.y + s.vy * age + 0.5 * 240 * age * age
          const k = 1 - (now - s.born) / s.life
          const c = layer.children[i] as SVGCircleElement
          c.setAttribute('cx', cx.toFixed(1))
          c.setAttribute('cy', cy.toFixed(1))
          c.setAttribute('r', (s.size * k).toFixed(2))
          c.setAttribute('fill', hueToColor(s.hue, 0.18, 0.7))
          c.setAttribute('opacity', k.toFixed(2))
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [size.w, size.h, hoverRadius])

  const pal = PALETTE

  return (
    <div ref={wrapRef} className="gs-wrap" onClick={handleClick}
         style={{ background: pal.bg, position: 'absolute', inset: 0, overflow: 'hidden', cursor: 'pointer' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
           width={size.w} height={size.h}>
        <defs>
          {STRINGS.map((s, i) => (
            <linearGradient key={s.name} id={`g-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={hueToColor(s.hue, pal.sat * 0.6, pal.light + 0.05)} />
              <stop offset="50%"  stopColor={hueToColor(s.hue, pal.sat, pal.light)} />
              <stop offset="100%" stopColor={hueToColor(s.hue, pal.sat * 0.6, pal.light + 0.05)} />
            </linearGradient>
          ))}
          <filter id="glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {[0.18, 0.36, 0.54, 0.72, 0.88].map((p, i) => (
          <line key={i}
                x1={size.w * p} y1={0}
                x2={size.w * p} y2={size.h}
                stroke={pal.ink} strokeOpacity="0.04" strokeWidth="1" />
        ))}

        {STRINGS.map((s, i) => (
          <path key={s.name + '-glow'} d=""
                ref={(el) => { pathRefs.current[i] = el }}
                stroke={`url(#g-${i})`}
                strokeWidth={stringThickness(i, thicknessScale)}
                strokeLinecap="round" fill="none"
                filter="url(#glow)" opacity={0.35}
                style={{ pointerEvents: 'none' }} />
        ))}

        {STRINGS.map((s, i) => (
          <path key={s.name + '-sharp'} d=""
                ref={(el) => { pathRefs.current[STRINGS.length + i] = el }}
                stroke={`url(#g-${i})`}
                strokeWidth={stringThickness(i, thicknessScale) * 0.55}
                strokeLinecap="round" fill="none"
                style={{ pointerEvents: 'stroke' }} />
        ))}

        <g ref={sparkleLayerRef} />
      </svg>
    </div>
  )
}