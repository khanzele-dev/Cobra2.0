'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { m, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Cropped } from '@/components/media'
import { SceneLabel } from '@/components/reveal'
import { useCalm } from '@/components/hooks'
import { formatPrice, getProduct } from '@/lib/products'

const KIT = getProduct('training-kit-blue')!
const STEPS = ['Спереди', 'Сзади']

// 13.05. Кадр спины открывается «шторкой» за линией света — только transform, без 3D.
export function Apparel() {
  const ref = useRef<HTMLElement>(null)
  const calm = useCalm()
  const [step, setStep] = useState(0)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const wipe = useTransform(p, [0.3, 0.7], ['100%', '0%'])
  const counter = useTransform(p, [0.3, 0.7], ['-100%', '0%'])
  const edge = useTransform(p, [0.26, 0.32, 0.68, 0.74], [0, 1, 1, 0])
  const zoom = useTransform(p, [0, 1], [1.06, 1])

  useMotionValueEvent(p, 'change', (v) => setStep(v < 0.5 ? 0 : 1))

  if (calm) {
    return (
      <section id="apparel" aria-label="Одежда" className="bg-ink px-5 py-32 md:px-10">
        <SceneLabel n="05" title="Одежда" />
        <h2 className="display mt-8 text-[clamp(3rem,9vw,8rem)]">{KIT.name}</h2>
        <div className="mt-12 grid grid-cols-2 gap-4">
          {KIT.gallery.slice(0, 2).map((g) => (
            <div key={g.label} className="relative aspect-[3/4]">
              <Cropped src={g.src} crop={g.crop} alt={`${KIT.name} — ${g.label}`} sizes="50vw" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="apparel" aria-label="Одежда" className="relative h-[200svh] bg-black md:h-[260vh]">
      <div className="sticky top-0 grid h-[100svh] grid-rows-[1fr_auto] overflow-hidden md:grid-cols-12 md:grid-rows-1">
        <div className="spot pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 order-2 flex flex-col justify-end px-5 pb-8 md:order-1 md:col-span-5 md:justify-center md:px-10 md:pb-0">
          <SceneLabel n="05" title="Одежда" />
          <h2 className="display mt-5 text-[clamp(2.25rem,5.5vw,5.5rem)] md:mt-8">
            Тренировочный<br />комплект
          </h2>
          <p className="mt-4 hidden max-w-sm text-[15px] leading-relaxed text-bone/55 md:block">{KIT.description}</p>

          <ol className="mt-6 grid max-w-[14rem] grid-cols-2 gap-3 md:mt-10" aria-label="Ракурс">
            {STEPS.map((s, i) => (
              <li key={s} aria-current={i === step ? 'step' : undefined}>
                <span className={`block h-px transition-colors duration-700 ${i <= step ? 'bg-bone' : 'bg-bone/15'}`} />
                <span className={`label mt-3 block transition-colors duration-700 ${i === step ? 'text-bone' : 'text-bone/30'}`}>{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex max-w-sm items-center justify-between border-t border-bone/15 pt-5 md:mt-12">
            <span className="font-mono text-sm">{formatPrice(KIT.price)}</span>
            <Link href={`/catalog/${KIT.slug}`} className="label link-u">Посмотреть →</Link>
          </div>
        </div>

        <div className="relative order-1 flex min-h-0 items-center justify-center md:order-2 md:col-span-7">
          <m.div className="relative aspect-[3/4] h-[92%] max-w-[92vw] overflow-hidden md:h-[86%]" style={{ scale: zoom }}>
            <div className="absolute inset-0">
              <Cropped src={KIT.gallery[0].src} crop="left" alt={`${KIT.name} — спереди`} sizes="(max-width: 768px) 90vw, 50vw" eager />
            </div>
            <m.div className="absolute inset-0 overflow-hidden bg-black will-change-transform" style={{ x: wipe }}>
              <m.div className="absolute inset-0 will-change-transform" style={{ x: counter }}>
                <Cropped src={KIT.gallery[1].src} crop="right" alt={`${KIT.name} — сзади`} sizes="(max-width: 768px) 90vw, 50vw" />
              </m.div>
              <m.div className="led absolute inset-y-0 left-0 h-auto w-px" style={{ opacity: edge }} aria-hidden="true" />
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
