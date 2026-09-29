import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductView } from '@/components/product-view'
import { Cropped } from '@/components/media'
import { formatPrice, getProduct, products } from '@/lib/products'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug)
  return product ? { title: `${product.name} — 13 COBRA`, description: product.short } : {}
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug)
  if (!product) notFound()

  const more = products.filter((p) => p.slug !== product.slug && p.group === product.group)
  const related = [...more, ...products.filter((p) => p.slug !== product.slug && p.group !== product.group)].slice(0, 3)

  return (
    <>
      <ProductView product={product} />

      <section aria-label="Ещё в коллекции" className="px-5 pb-32 md:px-10">
        <div className="flex items-end justify-between border-b border-bone/15 pb-5">
          <h2 className="display text-3xl md:text-5xl">Ещё в коллекции</h2>
          <Link href="/catalog" className="label link-u pb-1">Каталог →</Link>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6">
          {related.map((p) => (
            <li key={p.slug}>
              <Link href={`/catalog/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-char">
                  <div className="absolute inset-0 transition-transform duration-[1800ms] ease-[var(--ease-cine)] group-hover:scale-[1.04]">
                    <Cropped src={p.gallery[0].src} crop={p.gallery[0].crop} alt={p.name} sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  </div>
                </div>
                <p className="label mt-5 text-bone/45">{p.category}</p>
                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <span className="display text-2xl">{p.name}</span>
                  <span className="font-mono text-xs text-bone/70">{formatPrice(p.price)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
