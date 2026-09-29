'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { Cropped } from '@/components/media'
import { Fade, Line, SceneLabel } from '@/components/reveal'
import { useCalm } from '@/components/hooks'
import { formatPrice, products } from '@/lib/products'

const PIECE = products.find((p) => p.group === 'equipment')!

// Сцена 03. Один предмет, свет сверху, табличка как в музее.
export function Equipment() {
  const ref = useRef<HTMLElement>(null)
  const calm = useCalm()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(p, [0, 1], calm ? [1, 1] : [0.92, 1])
  const light = useTransform(p, [0.2, 1], calm ? [1, 1] : [0, 1])
  // затемнение слоем с opacity вместо filter: brightness — не перерисовывает картинку
  const shade = useTransform(p, [0, 1], calm ? [0, 0] : [0.7, 0])
  const face = PIECE.gallery[0]

  return (
    <section ref={ref} id="equipment" aria-label="Экипировка" className="concrete relative overflow-hidden px-5 py-32 md:px-10 md:py-48">
      <SceneLabel n="04" title="Экипировка" />

      <div className="mt-20 grid grid-cols-1 items-end gap-16 md:grid-cols-12">
        <div className="relative md:col-span-7 md:col-start-2">
          <m.div className="spot pointer-events-none absolute -top-40 left-[-30%] right-[-30%] h-[130%]" style={{ opacity: light }} aria-hidden="true" />
          <m.div className="led absolute -top-10 left-[20%] right-[20%]" style={{ opacity: light }} aria-hidden="true" />
          <Link href={`/catalog/${PIECE.slug}`} className="group relative mx-auto block max-w-xl" aria-label={PIECE.name}>
            <m.div className="relative aspect-[3/4] overflow-hidden bg-char" style={{ scale }}>
              <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.04]">
                <Cropped src={face.src} crop={face.crop} alt={PIECE.name} sizes="(max-width: 768px) 90vw, 36rem" className="object-cover" />
              </div>
              <m.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
            </m.div>
          </Link>
          <div className="mx-auto h-5 max-w-xl bg-gradient-to-b from-[#2a2a28] to-[#121211] shadow-[0_30px_60px_rgba(0,0,0,.6)]" aria-hidden="true" />
        </div>

        <Fade className="md:col-span-3 md:col-start-10">
          <dl className="border-t border-bone/15">
            <div className="flex justify-between border-b border-bone/10 py-3">
              <dt className="label text-bone/40">Экспонат</dt>
              <dd className="label text-bone">{PIECE.category}</dd>
            </div>
            {PIECE.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 border-b border-bone/10 py-3">
                <dt className="label text-bone/40">{s.label}</dt>
                <dd className="label text-right text-bone">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Fade>
      </div>

      <div className="mt-16 flex flex-col gap-6 md:mt-24 md:flex-row md:items-end md:justify-between">
        <h2 className="display text-[clamp(3rem,9vw,8.5rem)]">
          <Line>{PIECE.name}</Line>
        </h2>
        <Fade className="flex items-center gap-10 md:pb-4">
          <span className="font-mono text-sm">{formatPrice(PIECE.price)}</span>
          <Link href={`/catalog/${PIECE.slug}`} className="label link-u">Посмотреть →</Link>
        </Fade>
      </div>
    </section>
  )
}
