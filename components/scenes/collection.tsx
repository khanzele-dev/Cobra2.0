'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Cropped } from '@/components/media'
import { SceneLabel } from '@/components/reveal'
import { useCalm, useIsMobile } from '@/components/hooks'
import { products } from '@/lib/products'

// Комплект в центре сетки: камера начинает на нём и отъезжает
const KIT = products.find((p) => p.slug === 'training-kit-blue')!
const REST = products.filter((p) => p !== KIT)
const CELLS = [...REST.slice(0, 4), KIT, ...REST.slice(4, 8)]

// Сцена 06. Шоурум превращается в каталог.
export function Collection() {
  const ref = useRef<HTMLElement>(null)
  const calm = useCalm()
  const mobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Прогресс только растёт: раз коллекция раскрылась, надпись и товары остаются — и ниже секции, и при прокрутке назад
  const p = useMotionValue(0)
  const reach = (v: number) => {
    if (v > p.get()) p.set(v)
  }
  useMotionValueEvent(scrollYProgress, 'change', reach)
  useEffect(() => {
    reach(scrollYProgress.get())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const scale = useTransform(p, [0, 0.65], calm ? [1, 1] : [mobile ? 3.1 : 2.9, 1])
  const others = useTransform(p, [0.1, 0.5], calm ? [0.55, 0.55] : [0, 0.55])
  const headOpacity = useTransform(p, [0.55, 0.8], calm ? [1, 1] : [0, 1])

  return (
    <section ref={ref} id="collection" aria-label="Коллекция" className={calm ? 'relative' : 'relative h-[240svh] md:h-[280vh]'}>
      <div className={`${calm ? '' : 'sticky top-0'} flex h-[100svh] items-center justify-center overflow-hidden bg-ink`}>
        <m.ul className="grid w-[min(92vw,78svh)] grid-cols-3 gap-2 will-change-transform md:gap-3" style={{ scale }}>
          {CELLS.map((prod, i) => (
            <m.li key={prod.slug} className="relative aspect-square overflow-hidden bg-char" style={i === 4 ? undefined : { opacity: others }}>
              <Link href={`/catalog/${prod.slug}`} aria-label={prod.name} tabIndex={-1}>
                <Cropped src={prod.gallery[0].src} crop={prod.gallery[0].crop} alt="" sizes="(max-width: 768px) 60vw, 30vw" className={i === 4 ? 'object-contain' : 'object-cover'} />
              </Link>
            </m.li>
          ))}
        </m.ul>

        <m.div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-ink via-ink/20 to-ink/70 px-5 pb-10 pt-24 md:px-10 md:pb-14" style={{ opacity: headOpacity }}>
          <SceneLabel n="07" title="Коллекция" />
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[clamp(3.5rem,13vw,13rem)]">Коллекция</h2>
            <Link href="/catalog" className="label link-u pointer-events-auto self-start text-bone md:self-auto md:pb-6">
              Открыть каталог →
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  )
}
