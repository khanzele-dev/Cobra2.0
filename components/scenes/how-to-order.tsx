import { Fade, Line } from '@/components/reveal'

const STEPS = [
  { title: 'Выберите', desc: 'Товар в каталоге, размер или вкус, количество.' },
  { title: 'Заказать', desc: 'Кнопка откроет WhatsApp с готовым сообщением. Или напишите в Telegram.' },
  { title: 'Заберите', desc: 'Подтвердим наличие — заказ ждёт вас в магазине на Кавказской, 16а.' },
]

export function HowToOrder() {
  return (
    <section aria-labelledby="order-title" className="cv-auto bg-ink px-5 py-20 md:px-10 md:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="order-title" className="display text-[clamp(3rem,9vw,8.5rem)]">
          <Line>Как заказать</Line>
        </h2>
        <p className="label text-bone/45 md:pb-4">Три шага · без регистрации</p>
      </div>

      <ol className="mt-10 grid grid-cols-1 border-t border-bone/15 md:mt-16 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="border-b border-bone/10 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0">
            <Fade delay={i * 0.08}>
              <span className="display text-[clamp(4rem,9vw,8rem)] text-bone/15">{String(i + 1).padStart(2, '0')}</span>
              <p className="display mt-6 text-3xl md:text-4xl">{s.title}</p>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-bone/55">{s.desc}</p>
            </Fade>
          </li>
        ))}
      </ol>
    </section>
  )
}
