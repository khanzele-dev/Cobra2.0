'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { useCalm } from '@/components/hooks'

/** «1000+» → отсчёт от нуля до 1000, суффикс остаётся. Без движения — сразу итог. */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const calm = useCalm()
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const [n, setN] = useState<number | null>(null)

  useEffect(() => {
    if (!match || calm || !inView) return
    const c = animate(0, target, { duration: 2.2, ease: [0.22, 0.61, 0.12, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, calm, target]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span className={className}>{value}</span>
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {n ?? (calm ? target : 0)}
        {suffix}
      </span>
    </span>
  )
}
