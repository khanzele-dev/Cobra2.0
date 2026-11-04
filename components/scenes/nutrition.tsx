'use client'

import { useEffect, useRef } from 'react'
import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Media } from '@/components/media'
import { Line, SceneLabel } from '@/components/reveal'
import { ProductEditorial } from '@/components/product-editorial'
import { useCalm, useIsMobile } from '@/components/hooks'
import { products } from '@/lib/products'

const NUTRITION = products.filter((p) => ['protein', 'creatine', 'preworkout'].includes(p.group))
const VARIANTS = ['left-lg', 'right-md', 'left-md', 'right-lg'] as const

// Сцена 02. Камера подходит к полке — полка темнеет, товары выходят вперёд.
export function Nutrition() {
  const ref = useRef<HTMLElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const calm = useCalm()
  const mobile = useIsMobile()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(p, [0, 0.3], calm ? [1, 1] : [1.02, mobile ? 1.25 : 1.55])
  const y = useTransform(p, [0, 0.3], calm ? ['0%', '0%'] : ['0%', '6%'])
  // Сначала заголовок на полке, затем он уходит и полка темнеет — и только потом снизу выезжает первый товар.
  // Прогресс копируем в обычное значение — иначе браузер за пределами диапазона возвращает заголовку видимость.
  const { scrollYProgress: listP } = useScroll({ target: list, offset: ['start 125%', 'start 65%'] })
  const q = useMotionValue(0)
  useMotionValueEvent(listP, 'change', (v) => q.set(v))
  useEffect(() => q.set(listP.get()), [q, listP])
  const dark = useTransform(q, [0, 0.6], [0.25, 0.94])
  const titleOpacity = useTransform(q, [0, 0.4], [1, 0])
  const titleY = useTransform(q, [0, 0.4], calm ? ['0%', '0%'] : ['0%', '-12%'])

  return (
    <section ref={ref} id="nutrition" aria-label="Спортивное питание" className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <m.div className="absolute inset-0 will-change-transform" style={{ scale, y }}>
          <Media src="/media/store-shelf.jpg" alt="Полки с протеином Scitec Nutrition в магазине 13 COBRA" sizes="100vw" className="object-cover object-[35%_40%]" />
        </m.div>
        <m.div className="absolute inset-0 bg-ink" style={{ opacity: dark }} />
        <div className="vignette absolute inset-0" />
        {/* Затемнение снизу: заголовок не теряется на ярких банках */}
        <m.div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/55 to-transparent px-5 pb-12 pt-40 md:px-10 md:pb-16 md:pt-56" style={{ opacity: titleOpacity, y: titleY }}>
          <SceneLabel n="03" title="Спортивное питание" />
          <h2 className="display mt-6 text-[clamp(2.5rem,11vw,12rem)]">
            <Line>Полка</Line>
            <Line delay={0.1} className="text-bone/60">без случайностей</Line>
          </h2>
        </m.div>
      </div>

      <div ref={list} className="relative mt-[25svh] flex flex-col gap-20 px-5 pb-24 md:gap-32 md:px-10">
        {NUTRITION.map((product, i) => (
          <ProductEditorial key={product.slug} product={product} variant={VARIANTS[i % VARIANTS.length]} index={i + 1} />
        ))}
      </div>
    </section>
  )
}
