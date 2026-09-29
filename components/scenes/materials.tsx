import { Media } from '@/components/media'
import { Fade, Line, SceneLabel } from '@/components/reveal'

// 13.02. Магазин как место: материалы из реального интерьера. Светлая секция — как стены магазина.
// Раскладка «вразброс»: на телефоне — две колонки со сдвигом, на широком экране — ступени по сетке.
const SHOTS = [
  {
    src: '/media/store-counter.jpg',
    alt: 'Стальная панель с надписью COBRA и стойка магазина',
    cls: 'md:col-span-5 md:col-start-1',
    ratio: 'aspect-[3/4]',
  },
  {
    src: '/media/store-column.jpg',
    alt: 'Бетонная колонна рядом с полками креатина',
    cls: 'mt-16 md:col-span-4 md:col-start-8 md:mt-48',
    ratio: 'aspect-[3/4]',
  },
  {
    src: '/media/store-perforated.jpg',
    alt: 'Перфорированный металл со знаком 13',
    cls: '-mt-16 md:col-span-6 md:col-start-2 md:mt-0',
    ratio: 'aspect-[3/4] md:aspect-[5/4]',
  },
  {
    src: '/media/store-hall.jpg',
    alt: 'Полки со спортивным питанием и линиями света',
    cls: 'md:col-span-4 md:col-start-9 md:-mt-32',
    ratio: 'aspect-[3/4]',
  },
]

export function Materials() {
  return (
    <section id="store" aria-labelledby="store-title" className="bg-wall px-5 pb-20 pt-14 text-ink md:px-10 md:pb-32 md:pt-20 lg:pb-40 lg:pt-28">
      <SceneLabel n="02" title="Магазин" tone="light" />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:gap-10">
        <h2 id="store-title" className="display text-[clamp(3rem,11vw,11rem)] md:col-span-7">
          <Line>Бетон.</Line>
          <Line delay={0.08}>Сталь.</Line>
          <Line delay={0.16} className="text-ink/35">Свет.</Line>
        </h2>
        <Fade className="md:col-span-5 md:pb-4 lg:col-span-4 lg:col-start-9">
          <p className="max-w-md text-[15px] leading-relaxed text-ink/70">
            Магазин на Кавказской устроен как зал: ничего лишнего. Сырой бетон, шлифованная сталь, линии света над
            полками — и продукты, которые на них стоят.
          </p>
        </Fade>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-3 md:mt-20 md:grid-cols-12 md:gap-x-6 md:gap-y-16 lg:mt-28">
        {SHOTS.map((s, i) => (
          <Fade key={s.src} delay={i % 2 ? 0.08 : 0} className={s.cls}>
            <div className={`relative overflow-hidden bg-steel ${s.ratio}`}>
              <Media src={s.src} alt={s.alt} sizes="(max-width: 768px) 50vw, 45vw" className="object-cover" />
            </div>
          </Fade>
        ))}
      </div>
    </section>
  )
}
