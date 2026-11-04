'use client'

import { useState } from 'react'
import { Media } from '@/components/media'
import { Fade, Line, SceneLabel } from '@/components/reveal'
import { orderUrl } from '@/lib/contacts'
import { SITE } from '@/lib/site'

const { belts: BELTS, uniform: UNIFORM } = SITE.equipment

// Сцена 04. Слева — пояса академии по рангу, справа — витрина с формой.
// Наведение или нажатие выбирает пояс; он же уходит в заказ формы.
export function Equipment() {
  const [active, setActive] = useState(0)
  const belt = BELTS[active]
  const ext = { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <section id="equipment" aria-labelledby="equipment-title" className="concrete relative overflow-hidden px-5 py-20 md:px-10 md:py-28 lg:py-32">
      <SceneLabel n="04" title="Экипировка" />

      <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 lg:grid-cols-12 lg:items-end lg:gap-6">
        <h2 id="equipment-title" className="display text-[clamp(3rem,9vw,8.5rem)] lg:col-span-7">
          <Line>Пояса</Line>
          <Line delay={0.1} className="text-bone/40">академии</Line>
        </h2>
        <Fade className="lg:col-span-4 lg:col-start-9 lg:pb-4">
          <p className="max-w-md text-[15px] leading-relaxed text-bone/70">
            Фирменные пояса Cobra Academy — от белого до чёрного. Форма академии и пояса продаются в магазине на
            Кавказской.
          </p>
        </Fade>
      </div>

      {/* Телефон: манекен → пояса → заказ, выбор виден сразу. Ноутбук: пояса слева, манекен и заказ справа */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:gap-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-8">
        <Fade className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <div className="relative aspect-[4/5] overflow-hidden border border-bone/10 bg-ink/50 sm:aspect-square lg:aspect-auto lg:h-[min(76svh,50rem)]">
            <div className="spot pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="led absolute left-[18%] right-[18%] top-0 opacity-70" aria-hidden="true" />
            {UNIFORM.image ? (
              <Media src={UNIFORM.image} alt={`${UNIFORM.name} на манекене`} sizes="(max-width: 1024px) 100vw, 58vw" className="object-contain" />
            ) : (
              <MannequinPlaceholder belt={belt.color} />
            )}
          </div>
          <div className="mx-auto h-4 w-[86%] bg-gradient-to-b from-[#2a2a28] to-[#121211] shadow-[0_30px_60px_rgba(0,0,0,.6)]" aria-hidden="true" />
        </Fade>

        <BeltList active={active} onSelect={setActive} />

        <div className="flex flex-col gap-5 border-t border-bone/15 pt-5 sm:flex-row sm:items-baseline sm:justify-between lg:col-span-7 lg:col-start-6 lg:row-start-2">
          <div>
            <p className="display text-3xl md:text-4xl">{UNIFORM.name}</p>
            <p className="label mt-2 text-bone/55">Пояс: {belt.name.toLowerCase()}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-x-8 gap-y-3">
            <a href={orderUrl(UNIFORM.name, `пояс: ${belt.name.toLowerCase()}`)} {...ext} className="label link-u text-bone">
              Заказать форму →
            </a>
            <a href={orderUrl(`${belt.name} пояс Cobra Academy`)} {...ext} className="label link-u text-bone/60 hover:text-bone">
              Только пояс →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function BeltList({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:self-center xl:col-span-4">
      <p className="label text-bone/50" id="belts-label">Выберите пояс</p>
      {/* Телефон/планшет — лента с прокруткой, ноутбук — список сверху вниз */}
      <ul
        role="group"
        aria-labelledby="belts-label"
        className="relative -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:scroll-px-10 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:mt-6 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-bone/10 lg:p-0"
      >
        {/* Световая полоса едет к активному поясу */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 hidden w-px bg-bone shadow-[0_0_18px_1px_rgba(255,238,210,0.45)] transition-[top] duration-700 ease-[var(--ease-cine)] lg:block"
          style={{ top: `${(active * 100) / BELTS.length}%`, height: `${100 / BELTS.length}%` }}
        />
        {BELTS.map((b, i) => {
          const on = i === active
          return (
            <li key={b.image} className="w-[42vw] max-w-[15rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onSelect(i)}
                onMouseEnter={() => onSelect(i)}
                onFocus={() => onSelect(i)}
                className={`group flex w-full flex-col gap-3 border p-3 text-left transition-colors duration-500 lg:grid lg:grid-cols-[3.75rem_1fr_6rem] lg:items-center lg:gap-4 lg:border-0 lg:border-b lg:border-bone/10 lg:py-4 lg:pl-6 lg:pr-0 xl:grid-cols-[4.25rem_1fr_8.5rem] ${
                  on ? 'border-bone/50 bg-bone/[0.04] lg:bg-transparent' : 'border-bone/10'
                }`}
              >
                <span className={`label order-2 transition-colors duration-500 lg:order-none ${on ? 'text-bone/70' : 'text-bone/35'}`}>
                  13.04.{i + 1}
                </span>
                <span className="order-3 lg:order-none">
                  <span
                    className={`display block text-[clamp(1.125rem,5.6vw,1.5rem)] transition-[color,transform] duration-700 ease-[var(--ease-cine)] lg:text-[clamp(1.75rem,2.6vw,2.75rem)] ${
                      on ? 'text-bone lg:translate-x-2' : 'text-bone/40 group-hover:text-bone/70'
                    }`}
                  >
                    {b.name}
                  </span>
                </span>
                <span className="relative order-1 block aspect-[3/1] w-full lg:order-none">
                  <span
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-cine)] ${
                      on ? 'opacity-100' : 'opacity-60 lg:scale-95 lg:opacity-40'
                    }`}
                  >
                    <Media src={b.image} alt="" sizes="(max-width: 1024px) 42vw, 10rem" className="object-contain" />
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Временный манекен: контур формы, пока нет фото или 3D-модели. Полоса на поясе — цвет выбранного пояса. */
function MannequinPlaceholder({ belt }: { belt: string }) {
  return (
    <svg viewBox="0 0 400 560" className="absolute inset-0 h-full w-full p-[8%]" fill="none" role="img" aria-label="Манекен в форме академии — временная заглушка">
      <g stroke="rgba(235,232,226,0.28)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="200" cy="52" rx="28" ry="36" />
        <path d="M186 86v18M214 86v18" />
        {/* куртка */}
        <path d="M186 104c-34 6-70 14-86 32L74 290l34 6 18-104 2 142h144l2-142 18 104 34-6-26-154c-16-18-52-26-86-32" />
        {/* отвороты */}
        <path d="M186 104l48 176M214 104l-40 150" />
        {/* штаны */}
        <path d="M130 334l-8 196h66l12-150 12 150h66l-8-196" />
      </g>
      <rect
        x="126"
        y="292"
        width="148"
        height="20"
        fill={belt}
        stroke="rgba(235,232,226,0.45)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className="transition-[fill] duration-700 ease-[var(--ease-cine)]"
      />
    </svg>
  )
}
