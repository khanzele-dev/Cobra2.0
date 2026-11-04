import Link from 'next/link'
import { Line } from '@/components/reveal'
import { Perforation } from '@/components/perforation'
import { Logo } from '@/components/logo'
import { ADDRESS_FULL, INSTAGRAM_URL, MAP_URL, PHONE, PHONE_HREF, TELEGRAM_HANDLE, TELEGRAM_URL, WHATSAPP_URL } from '@/lib/contacts'
import { SITE } from '@/lib/site'

export function FinalScreen() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <footer id="contacts" className="relative overflow-hidden bg-ink px-5 pb-8 pt-20 md:px-10 md:pt-28">
      <Perforation id="footer-perf" size={72} clearCenter className="absolute inset-0 text-bone/[0.035]" />
      <div className="led absolute left-[15%] right-[15%] top-0 opacity-40" aria-hidden="true" />

      <h2 className="display relative text-center text-[clamp(2.5rem,8vw,7rem)]">
        <Line>Сила —</Line>
        <Line delay={0.12}>это привычка.</Line>
      </h2>

      <div className="relative mt-16 grid grid-cols-1 gap-10 border-t border-bone/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
        <div>
          <Link href="/" aria-label="13 COBRA — на главную"><Logo className="w-[140px]" /></Link>
          <p className="label mt-4 text-bone/45">Магазин · бренд · зал «Кобра»</p>
        </div>
        <div>
          <p className="label text-bone/40">Адрес</p>
          <a href={MAP_URL} {...ext} className="link-u mt-3 inline-block text-[15px]">{ADDRESS_FULL}</a>
          {SITE.hours && <p className="mt-1 text-[15px] text-bone/60">{SITE.hours}</p>}
        </div>
        <div>
          <p className="label text-bone/40">Связь</p>
          <ul className="mt-3 space-y-1 text-[15px]">
            <li><a href={PHONE_HREF} className="link-u">{PHONE}</a></li>
            <li><a href={TELEGRAM_URL} {...ext} className="link-u">Telegram {TELEGRAM_HANDLE}</a></li>
            <li><a href={WHATSAPP_URL} {...ext} className="link-u">WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <p className="label text-bone/40">Instagram</p>
          <ul className="mt-3 space-y-1 text-[15px]">
            <li><a href={INSTAGRAM_URL} {...ext} className="link-u">{SITE.shopHandle}</a></li>
            <li><a href={SITE.academy.instagram} {...ext} className="link-u">{SITE.academy.handle}</a></li>
          </ul>
        </div>
      </div>
      <p className="label relative mt-10 text-bone/30">© {new Date().getFullYear()} 13 COBRA · Каспийск</p>
    </footer>
  )
}
