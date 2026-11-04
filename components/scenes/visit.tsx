import { Media } from '@/components/media'
import { Fade, Line, SceneLabel } from '@/components/reveal'
import { Marks } from '@/components/logo'
import { Need } from '@/components/need'
import { ADDRESS_FULL, MAP_URL, PHONE, PHONE_HREF, TELEGRAM_HANDLE, TELEGRAM_URL, WHATSAPP_URL } from '@/lib/contacts'
import { SITE } from '@/lib/site'

// 13.09. Точка на карте. Светлая секция — как стены магазина.
export function Visit() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: 'Адрес', value: <a href={MAP_URL} {...ext} className="link-u">{ADDRESS_FULL}</a> },
    { label: 'Телефон', value: <a href={PHONE_HREF} className="link-u">{PHONE}</a> },
    { label: 'Telegram', value: <a href={TELEGRAM_URL} {...ext} className="link-u">{TELEGRAM_HANDLE}</a> },
    { label: 'WhatsApp', value: <a href={WHATSAPP_URL} {...ext} className="link-u">{PHONE}</a> },
  ]
  if (SITE.hours || process.env.NODE_ENV !== 'production') {
    rows.push({ label: 'Часы', value: SITE.hours ?? <Need what="часы работы" /> })
  }

  return (
    <section id="visit" aria-labelledby="visit-title" className="cv-auto bg-wall px-5 pb-24 pt-20 text-ink md:px-10 md:pb-24 md:pt-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <SceneLabel n="09" title="Визит" tone="light" />
          <h2 id="visit-title" className="display mt-8 text-[clamp(3rem,8vw,8.5rem)]">
            <Line>Приходите</Line>
            <Line delay={0.1} className="text-ink/35">в магазин</Line>
          </h2>

          <dl className="mt-14 border-t border-ink/20">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-ink/10 py-4 md:grid-cols-[9rem_1fr]">
                <dt className="label text-ink/50">{r.label}</dt>
                <dd className="text-[15px] md:text-base">{r.value}</dd>
              </div>
            ))}
          </dl>

          <a href={MAP_URL} {...ext} className="label mt-10 inline-flex h-14 items-center bg-ink px-8 text-bone transition-colors duration-500 hover:bg-graphite">
            Построить маршрут →
          </a>
        </div>

        <Fade className="md:col-span-5 md:col-start-8">
          <div className="relative aspect-[4/5] overflow-hidden bg-steel">
            <Media src="/media/store-counter.jpg" alt="Стальная панель COBRA в магазине" sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
          </div>
        </Fade>
      </div>

      {/* Финал страницы: знаки бренда на светлой стене, как на вывеске магазина */}
      <Fade className="mt-24 flex justify-center border-t border-ink/15 pt-20 md:mt-20 md:pt-20">
        <Marks width="min(78vw, 30rem)" />
      </Fade>
    </section>
  )
}
