'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { Cropped } from '@/components/media'
import { Fade, Line } from '@/components/reveal'
import { useCalm, useIsMobile } from '@/components/hooks'
import { formatPrice, type Product } from '@/lib/products'

type Variant = 'left-lg' | 'right-lg' | 'left-md' | 'right-md'

// Tailwind видит только статичные строки классов
const LAYOUT: Record<Variant, { img: string; text: string }> = {
  'left-lg': { img: 'lg:col-start-1 lg:col-span-7', text: 'lg:col-start-8 lg:col-span-5' },
  'right-lg': { img: 'lg:col-start-6 lg:col-span-7', text: 'lg:col-start-1 lg:col-span-5' },
  'left-md': { img: 'lg:col-start-2 lg:col-span-5', text: 'lg:col-start-8 lg:col-span-5' },
  'right-md': { img: 'lg:col-start-7 lg:col-span-5', text: 'lg:col-start-1 lg:col-span-5' },
}

type Props = { product: Product; variant?: Variant; index?: number; parallax?: boolean }

export function ProductEditorial({ product, variant = 'left-lg', index, parallax = true }: Props) {
  const face = product.gallery[0]
  const href = `/catalog/${product.slug}`
  const image = (
    <div className="relative aspect-[4/5] overflow-hidden bg-char">
      <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.04]">
        <Cropped src={face.src} crop={face.crop} alt={product.name} sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" />
      </div>
    </div>
  )

  return (
    <article className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-6">
      <Link href={href} className={`group relative block md:mx-auto md:w-[80%] lg:mx-0 lg:w-auto lg:row-start-1 ${LAYOUT[variant].img}`} aria-label={product.name} tabIndex={-1}>
        {parallax ? <Parallax>{image}</Parallax> : image}
      </Link>

      <div className={`lg:row-start-1 lg:pb-6 ${LAYOUT[variant].text}`}>
        {index !== undefined && <p className="label mb-6 text-bone/50">№ {String(index).padStart(2, '0')}</p>}
        <p className="label text-bone/70">{product.category}</p>
        <h3 className="display mt-4 text-[clamp(2rem,6vw,4.5rem)] lg:text-[clamp(2.75rem,3.6vw,4.25rem)]">
          <Line>{product.name}</Line>
        </h3>
        <Fade delay={0.1}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-bone/80">{product.short}</p>
          <div className="mt-8 flex items-center justify-between gap-6 border-t border-bone/15 pt-5">
            <span className="font-mono text-base text-bone">{formatPrice(product.price)}</span>
            <Link href={href} className="label link-u text-bone">
              Посмотреть →
            </Link>
          </div>
        </Fade>
      </div>
    </article>
  )
}

// Отдельный компонент, чтобы в каталоге (parallax=false) не висели лишние подписки на скролл
function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const calm = useCalm()
  const mobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], calm || mobile ? [0, 0] : [50, -50])
  return (
    <m.div ref={ref} style={{ y }}>
      {children}
    </m.div>
  )
}
