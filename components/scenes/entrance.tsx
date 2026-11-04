'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { Media } from '@/components/media'
import { SceneLabel } from '@/components/reveal'
import { Logo } from '@/components/logo'
import { useCalm } from '@/components/hooks'
import { LOCATION } from '@/lib/contacts'

// 13.01. Тёмный экран, белая надпись по центру. Скролл открывает зал магазина.
export function Entrance() {
  const ref = useRef<HTMLElement>(null)
  const calm = useCalm()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const markOpacity = useTransform(p, [0.15, 0.4], calm ? [1, 1] : [1, 0])
  const markY = useTransform(p, [0, 0.4], calm ? ['0%', '0%'] : ['0%', '-20%'])
  const photoOpacity = useTransform(p, [0.35, 0.7], [0, 0.85])
  const photoScale = useTransform(p, [0.35, 1], [1.15, 1])
  const captionOpacity = useTransform(p, [0.68, 0.88], [0, 1])
  const captionY = useTransform(p, [0.68, 0.88], [30, 0])

  return (
    <section ref={ref} aria-label="Вход" className={calm ? 'relative h-[100svh]' : 'relative h-[220svh] md:h-[280vh]'}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        {!calm && (
          <m.div className="absolute inset-0 will-change-transform" style={{ opacity: photoOpacity, scale: photoScale }}>
            <Media src="/media/store-hall.jpg" alt="Зал магазина 13 COBRA: полки с подсветкой и стальная стойка" sizes="100vw" className="object-cover lg:object-[50%_22%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
          </m.div>
        )}

        <m.div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-bone" style={{ opacity: markOpacity, y: markY }}>
          <h1 className="overflow-hidden pb-2 text-[clamp(1.6rem,7vw,6.75rem)]">
            <span className="anim-rise block" style={{ animationDelay: '0.4s' }}>
              <Logo width="clamp(15rem, 62vw, 58rem)" />
            </span>
          </h1>
          <p className="label anim-fade mt-6 text-bone/55" style={{ animationDelay: '1.2s' }}>
            Сила · Дисциплина · Результат
          </p>
        </m.div>

        {!calm && (
          <m.div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 md:pb-14" style={{ opacity: captionOpacity, y: captionY }}>
            <SceneLabel n="01" title="Вход" />
            <p className="display mt-6 max-w-4xl text-[clamp(2rem,5vw,4.5rem)]">Магазин спортивного питания и экипировки</p>
            <p className="label mt-5 text-bone/55">{LOCATION}</p>
          </m.div>
        )}

        <div className="anim-fade absolute bottom-8 right-5 flex items-center gap-3 md:right-10" style={{ animationDelay: '2s' }} aria-hidden="true">
          <span className="label text-bone/40">Листайте</span>
          <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
            <span className="anim-cue absolute inset-0 bg-bone/70" />
          </span>
        </div>
      </div>
    </section>
  )
}
