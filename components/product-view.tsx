'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Cropped } from '@/components/media'
import { Line } from '@/components/reveal'
import { EASE } from '@/lib/motion'
import { orderUrl } from '@/lib/contacts'
import { formatPrice, GROUPS, type Product } from '@/lib/products'

export function ProductView({ product }: { product: Product }) {
  const [active, setActive] = useState(0)
  const [option, setOption] = useState<string>()
  const [qty, setQty] = useState(1)
  const needsOption = !!product.options && !option
  const slide = product.gallery[active]
  const group = GROUPS.find((g) => g.key === product.group)

  return (
    <article className="grid grid-cols-1 gap-12 px-5 pb-32 pt-24 md:grid-cols-12 md:gap-6 md:px-10 md:pt-32">
      <div className="md:col-span-6 lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden bg-char md:sticky md:top-24 md:aspect-auto md:h-[calc(100svh-8rem)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <Cropped
                src={slide.src}
                crop={slide.crop}
                alt={`${product.name} — ${slide.label}`}
                sizes="(max-width: 768px) 100vw, 58vw"
                eager
                className={slide.crop || slide.src.startsWith('/media/') ? 'object-contain' : 'object-cover'}
              />
            </m.div>
          </AnimatePresence>

          {product.gallery.length > 1 && (
            <ul className="absolute inset-x-0 bottom-0 flex gap-6 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-5 pt-16">
              {product.gallery.map((g, i) => (
                <li key={g.label}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={`label border-b pb-1 transition-colors duration-500 ${i === active ? 'border-bone text-bone' : 'border-transparent text-bone/45 hover:text-bone'}`}
                  >
                    {g.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="md:col-span-6 md:col-start-7 md:pt-10 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
        <nav aria-label="Путь" className="label text-bone/55">
          <Link href="/catalog" className="link-u hover:text-bone">Каталог</Link>
          <span className="mx-2">/</span>
          <Link href={`/catalog?g=${product.group}`} className="link-u hover:text-bone">{group?.label}</Link>
        </nav>

        <p className="label mt-12 text-bone/70">{product.category}</p>
        <h1 className="display mt-4 text-[clamp(2.5rem,9vw,4rem)] md:text-[clamp(2.5rem,4.2vw,4.25rem)]">
          <Line>{product.name}</Line>
        </h1>
        <p className="mt-6 font-mono text-lg">{formatPrice(product.price)}</p>
        <p className="mt-8 text-base leading-relaxed text-bone/80">{product.description}</p>

        {product.options && (
          <fieldset className="mt-12">
            <legend className="label text-bone/65">{product.options.label}</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.options.values.map((v) => (
                <label key={v} className="cursor-pointer">
                  <input type="radio" name="option" value={v} className="peer sr-only" checked={option === v} onChange={() => setOption(v)} />
                  <span className="label flex h-11 min-w-12 items-center justify-center border border-bone/20 px-3 transition-colors duration-300 hover:border-bone/60 peer-checked:border-bone peer-checked:bg-bone peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4">
                    {v}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-10 flex items-stretch gap-3">
          <div className="flex items-center border border-bone/20" role="group" aria-label="Количество">
            <button type="button" className="h-14 w-12 text-bone/70 hover:text-bone disabled:opacity-30" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Меньше">−</button>
            <output className="w-8 text-center font-mono text-sm" aria-live="polite">{qty}</output>
            <button type="button" className="h-14 w-12 text-bone/70 hover:text-bone disabled:opacity-30" onClick={() => setQty((q) => Math.min(20, q + 1))} disabled={qty >= 20} aria-label="Больше">+</button>
          </div>
          <a
            href={needsOption ? undefined : orderUrl(product.name, option, qty)}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={needsOption}
            onClick={(e) => needsOption && e.preventDefault()}
            className={`label flex h-14 flex-1 items-center justify-center transition-colors duration-500 ${
              needsOption ? 'cursor-not-allowed bg-bone/15 text-bone/40' : 'bg-bone text-ink hover:bg-white'
            }`}
          >
            Заказать
          </a>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p className="label text-bone/55">
            {needsOption ? `Выберите: ${product.options!.label.toLowerCase()}` : 'Заказ через WhatsApp'}
          </p>
          <a href="https://t.me/SportPitCOBRA13" target="_blank" rel="noopener noreferrer" className="label link-u text-bone/60 hover:text-bone">
            Telegram →
          </a>
        </div>

        <dl className="mt-14 border-t border-bone/15">
          {product.specs.map((s) => (
            <div key={s.label} className="flex justify-between gap-6 border-b border-bone/10 py-4">
              <dt className="label text-bone/60">{s.label}</dt>
              <dd className="text-right text-[15px]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
