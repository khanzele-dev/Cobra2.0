'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion'
import { useCalm } from '@/components/hooks'
import { EASE } from '@/lib/motion'

/** Одно слово на экран: скролл переключает их по очереди */
export function WordSequence({ words }: { words: string[] }) {
  const ref = useRef<HTMLElement>(null)
  const calm = useCalm()
  const [i, setI] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setI(Math.min(words.length - 1, Math.floor(v * words.length))))

  if (calm) {
    return (
      <section aria-label="Ценности" className="display px-5 py-20 text-[clamp(3.5rem,14vw,14rem)] md:px-10">
        {words.map((w) => <p key={w}>{w}</p>)}
      </section>
    )
  }

  return (
    <section ref={ref} aria-label={words.join(', ')} style={{ height: `${words.length * 80}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="spot absolute inset-0" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <m.p
            key={words[i]}
            aria-hidden="true"
            className="display relative text-[clamp(3.5rem,15vw,16rem)]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {words[i]}
          </m.p>
        </AnimatePresence>
        <p className="label absolute bottom-10 left-5 text-bone/40 md:left-10">
          {String(i + 1).padStart(2, '0')} / {String(words.length).padStart(2, '0')}
        </p>
        <p className="label absolute bottom-10 right-5 text-bone/40 md:right-10">Формула</p>
      </div>
    </section>
  )
}
