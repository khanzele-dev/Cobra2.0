'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { Fade } from '@/components/reveal'
import { useCalm, useIsMobile } from '@/components/hooks'
import { PHILOSOPHY, PRINCIPLES } from '@/lib/brand'

export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const still = useCalm()
  const mobile = useIsMobile()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const a = mobile ? 14 : 22
  const x1 = useTransform(p, [0, 1], still ? ['0%', '0%'] : [`-${a}%`, `${a / 2}%`])
  const x2 = useTransform(p, [0, 1], still ? ['0%', '0%'] : [`${a}%`, `-${a / 2}%`])

  return (
    <section ref={ref} aria-label="Философия" className="relative overflow-hidden bg-ink pb-20 pt-32 md:pb-32 md:pt-48">
      <div className="display select-none text-[clamp(4rem,17vw,17rem)] leading-[0.84]" aria-label="Сила. Дисциплина. Результат.">
        <m.p style={{ x: x1 }} className="whitespace-nowrap pl-[6vw]" aria-hidden="true">Сила</m.p>
        <m.p style={{ x: x2 }} className="outline-text whitespace-nowrap text-right" aria-hidden="true">Дисциплина</m.p>
        <m.p style={{ x: x1 }} className="whitespace-nowrap pl-[18vw]" aria-hidden="true">Результат</m.p>
      </div>

      <div className="mt-28 grid grid-cols-1 gap-16 px-5 md:mt-40 md:grid-cols-12 md:px-10">
        <Fade className="md:col-span-6 md:col-start-2">
          <p className="label text-bone/45">Позиция</p>
          <blockquote className="mt-6 font-display text-[clamp(1.75rem,3.4vw,3.25rem)] font-light leading-[1.08]">
            {PHILOSOPHY}
          </blockquote>
        </Fade>
        <ol className="md:col-span-4 md:col-start-9 md:pt-10">
          {PRINCIPLES.map((item, i) => (
            <Fade key={item.title} delay={i * 0.08}>
              <li className="grid grid-cols-[2.5rem_1fr] border-t border-bone/12 py-5">
                <span className="label pt-1 text-bone/35">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-[15px] text-bone">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-bone/50">{item.desc}</span>
                </span>
              </li>
            </Fade>
          ))}
        </ol>
      </div>
    </section>
  )
}
