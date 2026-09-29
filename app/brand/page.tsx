import type { Metadata } from 'next'
import Link from 'next/link'
import { Media } from '@/components/media'
import { Fade, Line } from '@/components/reveal'
import { WordSequence } from '@/components/word-sequence'
import { COACH, PHILOSOPHY, PRINCIPLES, VALUES } from '@/lib/brand'
import { LOCATION } from '@/lib/contacts'

export const metadata: Metadata = {
  title: 'О бренде — 13 COBRA',
  description: 'История 13 COBRA: от зала BJJ «Кобра» в Каспийске до магазина спортивного питания и экипировки.',
}

export default function BrandPage() {
  return (
    <>
      <section className="px-5 pb-24 pt-40 md:px-10 md:pb-40 md:pt-56">
        <p className="label text-bone/45">О бренде</p>
        <h1 className="display mt-8 max-w-[14ch] text-[clamp(3.25rem,9vw,9rem)]">
          <Line>13 COBRA —</Line>
          <Line delay={0.08}>это про характер,</Line>
          <Line delay={0.16} className="text-bone/40">а не про моду.</Line>
        </h1>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-12">
          <Fade className="space-y-5 text-[15px] leading-relaxed text-bone/60 md:col-span-4 md:col-start-7">
            <p>
              Мы начали с простой идеи: спортивное питание и экипировка не должны быть компромиссом. Слишком много
              продуктов обещают результат и слишком мало держат слово.
            </p>
            <p>
              Мы выбираем только то, чему доверяли бы сами. Проверенные бренды, честный состав, экипировка, которая
              выдерживает настоящую нагрузку. Ничего лишнего — только инструменты для роста.
            </p>
          </Fade>
        </div>
      </section>

      <WordSequence words={['Сила', 'Дисциплина', 'Характер', 'Результат']} />

      <section id="history" className="scroll-mt-20 px-5 py-32 md:px-10 md:py-48">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-bone/45">История</p>
            <h2 className="display mt-8 text-[clamp(3rem,7vw,7rem)]">
              <Line>Зал «Кобра».</Line>
              <Line delay={0.1} className="text-bone/40">Каспийск.</Line>
            </h2>
            <Fade delay={0.15} className="mt-10 max-w-md space-y-5 text-[15px] leading-relaxed text-bone/60">
              <p>
                Всё началось в Каспийске — в зале «Кобра», где преподают бразильское джиу-джитсу. Именно там тренер
                Эфган Галоев день за днём учит своих подопечных дисциплине, стойкости и характеру.
              </p>
              <p>
                Из этого зала и вырос 13 COBRA — собственный магазин спортивного питания и экипировки. Не витрина ради
                витрины, а продолжение той же философии: давать спортсменам только то, чему доверяешь сам.
              </p>
            </Fade>
          </div>
          <Fade className="md:col-span-6 md:col-start-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-char">
              <Media src="/media/store-hall.jpg" alt="Магазин 13 COBRA на Кавказской, 16а" sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale" />
            </div>
            <p className="label mt-4 text-bone/35">{LOCATION}</p>
          </Fade>
        </div>
      </section>

      <section id="coach" aria-label="Тренер" className="concrete relative px-5 py-32 md:px-10 md:py-48">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:items-center">
          <Fade className="md:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-char">
              <Media src="/media/coach-efgan.jpg" alt={`${COACH.name}, тренер зала «Кобра»`} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale contrast-125" />
            </div>
          </Fade>
          <figure className="md:col-span-7 md:col-start-6">
            <p className="label text-bone/45">Тренер</p>
            <blockquote className="mt-8 font-display text-[clamp(2.25rem,5.2vw,5.25rem)] font-light uppercase leading-[0.98]">
              <Fade>«{COACH.quote}»</Fade>
            </blockquote>
            <figcaption className="mt-10">
              <span className="display block text-3xl">{COACH.name}</span>
              <span className="label mt-3 flex items-center gap-4 text-bone/55">
                <span className="h-px w-12 bg-bone/30" aria-hidden="true" />
                {COACH.role}
              </span>
            </figcaption>
            <Fade delay={0.15} className="mt-14 max-w-xl space-y-4 border-l border-bone/20 pl-6 text-[15px] leading-relaxed text-bone/60">
              {COACH.statement.map((s) => <p key={s}>{s}</p>)}
            </Fade>
          </figure>
        </div>
      </section>

      <section aria-label="Позиция" className="px-5 pt-32 md:px-10 md:pt-48">
        <p className="label text-bone/45">Позиция</p>
        <Fade className="mt-8 max-w-5xl font-display text-[clamp(2rem,4.6vw,4.5rem)] font-light leading-[1.05]">
          <p>{PHILOSOPHY}</p>
        </Fade>
      </section>

      <section aria-label="Ценности" className="px-5 py-32 md:px-10 md:py-48">
        <p className="label text-bone/45">Ценности</p>
        <ol className="mt-12 border-t border-bone/15">
          {VALUES.map((v, i) => (
            <li key={v} className="group flex items-baseline gap-6 border-b border-bone/10 py-4 md:gap-12">
              <span className="label w-8 text-bone/35">{String(i + 1).padStart(2, '0')}</span>
              <span className="display text-[clamp(2.5rem,7vw,6.5rem)] text-bone/30 transition-colors duration-700 group-hover:text-bone">
                {v}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-32 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Fade key={p.title} delay={i * 0.08} className="border-t border-bone/15 pt-5">
              <p className="label text-bone/35">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-4 text-[15px]">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-bone/50">{p.desc}</p>
            </Fade>
          ))}
        </div>

        <Link href="/catalog" className="label link-u mt-24 inline-block">Перейти в каталог →</Link>
      </section>
    </>
  )
}
