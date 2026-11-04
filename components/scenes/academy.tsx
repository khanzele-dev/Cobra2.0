import Link from 'next/link'
import { Media } from '@/components/media'
import { CountUp } from '@/components/count-up'
import { Fade, Line, SceneLabel } from '@/components/reveal'
import { COACH } from '@/lib/brand'
import { SITE } from '@/lib/site'

// 13.08. Зал, из которого вырос бренд. Документально, чёрно-белое.
export function Academy() {
  const { academy } = SITE

  return (
    <section id="academy" aria-labelledby="academy-title" className="cv-auto relative bg-ink px-5 py-20 md:px-10 md:py-32">
      <SceneLabel n="08" title="Зал «Кобра»" />
      <h2 id="academy-title" className="display mt-8 text-[clamp(3.5rem,12vw,12rem)]">
        <Line>Сначала</Line>
        <Line delay={0.1} className="text-bone/40">был зал</Line>
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-12">
        <Fade className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-char">
            <Media src="/media/coach-efgan.jpg" alt={`${COACH.name}, тренер зала «Кобра», на турнире`} sizes="(max-width: 768px) 100vw, 42vw" className="object-cover grayscale" />
          </div>
          <p className="label mt-4 text-bone/35">{COACH.name} · тренер по BJJ</p>
        </Fade>

        <div className="md:col-span-6 md:col-start-7 md:self-end">
          <dl className="grid grid-cols-2 border-t border-bone/15">
            {academy.stats.map((s, i) => (
              <div key={s.label} className={`border-b border-bone/10 py-6 ${i === 0 ? 'border-r' : 'pl-6'}`}>
                <dd className="display whitespace-nowrap text-[clamp(2.5rem,6.6vw,7rem)]">
                  <CountUp value={s.value} />
                </dd>
                <dt className="label mt-3 text-bone/45">{s.label}</dt>
              </div>
            ))}
          </dl>

          <Fade className="mt-12">
            <p className="max-w-lg text-[15px] leading-relaxed text-bone/60">
              В Каспийске есть зал «Кобра», где преподают бразильское джиу-джитсу. Там тренер {COACH.name} день за
              днём учит своих подопечных дисциплине и характеру. Из этого зала и вырос 13 COBRA — магазин и бренд с тем
              же отношением к делу.
            </p>
            <blockquote className="mt-12 border-l border-bone/25 pl-6">
              <p className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light uppercase leading-[1.04]">«{COACH.quote}»</p>
              <footer className="label mt-5 text-bone/45">{COACH.name} · тренер по BJJ</footer>
            </blockquote>
          </Fade>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={academy.instagram} target="_blank" rel="noopener noreferrer" className="label link-u text-bone">
              {academy.handle} →
            </a>
            <Link href="/brand#history" className="label link-u text-bone/60">История бренда</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
