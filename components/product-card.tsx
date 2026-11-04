import Link from 'next/link'
import { Cropped } from '@/components/media'
import { formatPrice, type Product } from '@/lib/products'

// Карточка каталога: товар на полке — фото, линия света, подпись. Размер шрифта подобран так,
// чтобы самое длинное слово («Тренировочный») не переносилось даже в две колонки на 320px.
export function ProductCard({ product }: { product: Product }) {
  const face = product.gallery[0]
  return (
    <Link href={`/catalog/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-char">
        <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.05]">
          <Cropped src={face.src} crop={face.crop} alt={product.name} sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" />
        </div>
      </div>
      <div className="concrete relative h-3" aria-hidden="true">
        <div className="led absolute inset-x-0 top-0 opacity-0 transition-opacity duration-700 group-hover:opacity-60" />
      </div>
      <p className="label mt-4 text-bone/50">{product.category}</p>
      <p className="display mt-2 text-[clamp(1.0625rem,4.4vw,1.25rem)] leading-[0.95] md:text-[clamp(1.25rem,2.6vw,1.75rem)]">{product.name}</p>
      <p className="mt-3 font-mono text-sm text-bone/80">{formatPrice(product.price)}</p>
    </Link>
  )
}
