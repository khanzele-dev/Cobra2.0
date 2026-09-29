'use client'

import { useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/site'

// Бегущая строка крутится только пока видна на экране
export function BrandsMarquee() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section aria-label="Бренды на полках" className="overflow-hidden border-y border-bone/10 bg-ink py-10 md:py-14">
      <div className="flex justify-between px-5 md:px-10">
        <p className="label text-bone/45">На полках магазина</p>
        <p className="label hidden text-bone/45 sm:block">Только оригинальная продукция</p>
      </div>
      <p className="sr-only">{SITE.brands.join(', ')}</p>
      <div ref={ref} className="marquee mt-8 flex w-max" style={{ animationPlayState: visible ? 'running' : 'paused' }} aria-hidden="true">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0">
            {[...SITE.brands, ...SITE.brands].map((b, i) => (
              <li key={i} className="display flex items-center gap-10 px-5 text-[clamp(2.5rem,6vw,5.5rem)] text-bone/85 md:gap-16 md:px-8">
                {b}
                <span className="block h-2 w-2 rotate-45 bg-bone/25" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
