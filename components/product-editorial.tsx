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
  'left-lg': { img: 'md:col-start-1 md:col-span-7', text: 'md:col-start-9 md:col-span-4' },
  'right-lg': { img: 'md:col-start-6 md:col-span-7', text: 'md:col-start-1 md:col-span-4' },
  'left-md': { img: 'md:col-start-2 md:col-span-5', text: 'md:col-start-8 md:col-span-4' },
  'right-md': { img: 'md:col-start-7 md:col-span-5', text: 'md:col-start-2 md:col-span-4' },
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
    <article className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-6">
      <Link href={href} className={`group relative block md:row-start-1 ${LAYOUT[variant].img}`} aria-label={product.name} tabIndex={-1}>
        {parallax ? <Parallax>{image}</Parallax> : image}
      </Link>

      <div className={`md:row-start-1 md:pb-6 ${LAYOUT[variant].text}`}>
        {index !== undefined && <p className="label mb-6 text-bone/35">№ {String(index).padStart(2, '0')}</p>}
        <p className="label text-bone/55">{product.category}</p>
        <h3 className="display mt-4 text-[clamp(2.5rem,5.5vw,5.25rem)]">
          <Line>{product.name}</Line>
        </h3>
        <Fade delay={0.1}>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-bone/60">{product.short}</p>
          <div className="mt-8 flex items-center justify-between gap-6 border-t border-bone/15 pt-5">
            <span className="font-mono text-sm text-bone">{formatPrice(product.price)}</span>
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
