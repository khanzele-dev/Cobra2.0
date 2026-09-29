import Link from 'next/link'
import { Cropped } from '@/components/media'
import { Fade, Line, SceneLabel } from '@/components/reveal'
import { formatPrice, products } from '@/lib/products'

const ITEMS = products.filter((p) => p.group === 'accessories')

// Сцена 05. Мелкие предметы на бетонной плите под одной линией света.
export function Accessories() {
  return (
    <section id="accessories" aria-label="Аксессуары" className="cv-auto relative bg-ink px-5 py-32 md:px-10 md:py-48">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SceneLabel n="06" title="Аксессуары" />
          <h2 className="display mt-8 text-[clamp(3rem,9vw,8.5rem)]">
            <Line>Мелочи,</Line>
            <Line delay={0.1} className="text-bone/40">которые решают</Line>
          </h2>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 items-end gap-x-6 gap-y-20 md:grid-cols-12">
        {ITEMS.map((p, i) => (
          <Fade key={p.slug} delay={i * 0.15} className={i === 0 ? 'md:col-span-5 md:col-start-2' : 'md:col-span-4 md:col-start-8 md:mb-24'}>
            <Link href={`/catalog/${p.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden bg-char">
                <div className="absolute inset-0 transition-transform duration-[1800ms] ease-[var(--ease-cine)] group-hover:scale-[1.05]">
                  <Cropped src={p.gallery[0].src} crop={p.gallery[0].crop} alt={p.name} sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                </div>
              </div>
              <div className="concrete relative h-4" aria-hidden="true">
                <div className="led absolute inset-x-0 top-0 opacity-50" />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <div>
                  <p className="label text-bone/45">{p.category}</p>
                  <p className="display mt-2 text-3xl md:text-4xl">{p.name}</p>
                </div>
                <span className="font-mono text-sm text-bone/80">{formatPrice(p.price)}</span>
              </div>
            </Link>
          </Fade>
        ))}
      </div>
    </section>
  )
}
