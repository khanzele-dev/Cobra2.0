import type { Metadata } from 'next'
import { CatalogList, type Filter } from '@/components/catalog-list'
import { Line } from '@/components/reveal'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Каталог — 13 COBRA',
  description: 'Протеин, креатин, предтренировочные комплексы, экипировка, одежда и аксессуары.',
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ g?: string }> }) {
  const { g } = await searchParams
  return (
    <div className="px-5 pt-28 md:px-10 md:pt-32">
      <p className="label text-bone/45">{products.length} позиций · Каспийск</p>
      <h1 className="display mt-6 text-[clamp(4.5rem,18vw,18rem)] leading-[0.8]">
        <Line>Каталог</Line>
      </h1>
      <CatalogList initial={(g as Filter) ?? 'all'} />
    </div>
  )
}
