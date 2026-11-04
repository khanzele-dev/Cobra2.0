'use client'

import { useState } from 'react'
import { ProductEditorial } from '@/components/product-editorial'
import { GROUPS, products, type Group } from '@/lib/products'

export type Filter = 'all' | 'nutrition' | Group

const NUTRITION: Group[] = ['protein', 'creatine', 'preworkout']
const VARIANTS = ['left-lg', 'right-md', 'left-md', 'right-lg'] as const

export function CatalogList({ initial }: { initial: Filter }) {
  const valid = initial === 'all' || initial === 'nutrition' || GROUPS.some((g) => g.key === initial)
  const [filter, setFilter] = useState<Filter>(valid ? initial : 'all')

  const visible = GROUPS.filter((g) =>
    filter === 'all' ? true : filter === 'nutrition' ? NUTRITION.includes(g.key) : g.key === filter,
  )

  const choose = (f: Filter) => {
    setFilter(f)
    const url = f === 'all' ? '/catalog' : `/catalog?g=${f}`
    window.history.replaceState(null, '', url)
  }

  const chips: { key: Filter; label: string }[] = [{ key: 'all', label: 'Все' }, ...GROUPS]

  return (
    <>
      <nav aria-label="Категории" className="sticky top-16 z-30 -mx-5 mt-10 border-y border-bone/10 bg-ink/95 px-5 md:top-20 md:-mx-10 md:px-10">
        <ul className="flex gap-7 overflow-x-auto py-4 [scrollbar-width:none]">
          {chips.map((c) => {
            const active = filter === c.key || (filter === 'nutrition' && NUTRITION.includes(c.key as Group))
            const count = c.key === 'all' ? products.length : products.filter((p) => p.group === c.key).length
            return (
              <li key={c.key} className="shrink-0">
                <button
                  type="button"
                  onClick={() => choose(c.key)}
                  aria-pressed={active}
                  className={`label flex items-baseline gap-2 transition-colors duration-500 ${active ? 'text-bone' : 'text-bone/40 hover:text-bone/80'}`}
                >
                  {c.label}
                  <sup className="text-[9px] text-bone/35">{count}</sup>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-24 py-24 md:gap-36 md:py-28">
        {visible.map((group) => {
          const items = products.filter((p) => p.group === group.key)
          if (!items.length) return null
          return (
            <section key={group.key} aria-labelledby={`g-${group.key}`}>
              <header className="mb-16 flex items-end justify-between gap-6 border-b border-bone/15 pb-5 md:mb-24">
                <h2 id={`g-${group.key}`} className="display min-w-0 text-[clamp(1.375rem,4.5vw,4rem)]">{group.label}</h2>
                <span className="label shrink-0 pb-2 text-bone/50">{String(items.length).padStart(2, '0')}</span>
              </header>
              <div className="flex flex-col gap-20 md:gap-28">
                {items.map((p, i) => (
                  <ProductEditorial parallax={false} key={p.slug} product={p} variant={VARIANTS[i % VARIANTS.length]} index={i + 1} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
