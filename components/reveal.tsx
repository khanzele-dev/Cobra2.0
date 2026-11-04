'use client'

import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'

/** Строка выезжает из-под маски, когда попадает в кадр */
export function Line({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    // Видимость ловим на маске: сама строка до старта спрятана под ней, и наблюдатель её «не видит».
    // Маска режет только по вертикали — длинное слово не обрезается сбоку.
    // Запас под хвосты букв (у, р, д) снизу и кратку «й» сверху; отрицательные отступы возвращают прежнюю высоту строки.
    <m.span className={`block overflow-x-visible overflow-y-clip -mb-[0.18em] -mt-[0.24em] pb-[0.24em] pt-[0.24em] ${className}`} initial="hidden" whileInView="shown" viewport={{ once: true, margin: '-10% 0px' }}>
      <m.span
        className="block"
        variants={{ hidden: { y: '108%' }, shown: { y: '0%' } }}
        transition={{ duration: 1.3, delay, ease: EASE }}
      >
        {children}
      </m.span>
    </m.span>
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
