'use client'

import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'

/** Строка выезжает из-под маски, когда попадает в кадр */
export function Line({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`}>
      <m.span
        className="block"
        initial={{ y: '108%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.3, delay, ease: EASE }}
      >
        {children}
      </m.span>
    </span>
  )
}

export function Fade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      {children}
    </m.div>
  )
}

/** Индекс раздела в системе бренда: 13.01, 13.02… */
export function SceneLabel({ n, title, className = '', tone = 'dark' }: { n: string; title: string; className?: string; tone?: 'dark' | 'light' }) {
  const light = tone === 'light'
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`label ${light ? 'text-ink/50' : 'text-bone/50'}`}>13.{n}</span>
      <span className={`h-px w-12 ${light ? 'bg-ink/25' : 'bg-bone/25'}`} aria-hidden="true" />
      <span className={`label ${light ? 'text-ink' : 'text-bone'}`}>{title}</span>
    </div>
  )
}
