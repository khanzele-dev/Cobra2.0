'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Cropped } from '@/components/media'
import { Logo } from '@/components/logo'
import { EASE } from '@/lib/motion'
import { INSTAGRAM_URL, LOCATION, PHONE, PHONE_HREF, TELEGRAM_URL, WHATSAPP_URL } from '@/lib/contacts'

type MenuLink = { href: string; label: string; img: string; crop?: 'left' | 'right' }

const MAIN: MenuLink[] = [
  { href: '/catalog', label: 'Каталог', img: '/media/store-column.jpg' },
  { href: '/#collection', label: 'Коллекция', img: '/media/apparel-kit.png', crop: 'left' },
  { href: '/brand', label: 'О бренде', img: '/media/coach-efgan.jpg' },
  { href: '/brand#history', label: 'История', img: '/media/store-perforated.jpg' },
  { href: '#contacts', label: 'Контакты', img: '/media/store-counter.jpg' },
]

const SECONDARY = [
  { href: '/catalog?g=nutrition', label: 'Спортивное питание' },
  { href: '/catalog?g=equipment', label: 'Экипировка' },
  { href: '/catalog?g=apparel', label: 'Одежда' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hover, setHover] = useState(0)
  const pathname = usePathname()
  const trigger = useRef<HTMLButtonElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    closeBtn.current?.focus()
    const t = trigger.current
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.__lenis?.start()
      t?.focus()
    }
  }, [open])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${scrolled ? 'bg-ink/90' : 'bg-transparent'}`}>
        <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <Link href="/" className="text-[11px] md:text-[13px]" aria-label="13 COBRA — на главную">
            <Logo className="w-[96px] md:w-[124px]" />
          </Link>
          <span className="label absolute left-1/2 hidden -translate-x-1/2 text-bone/45 lg:block">{LOCATION}</span>
          <nav className="flex items-center gap-7" aria-label="Основная навигация">
            <Link href="/catalog" className="label link-u hidden text-bone/80 hover:text-bone sm:inline">
              Каталог
            </Link>
            <button
              ref={trigger}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="label group flex items-center gap-3 text-bone"
            >
              Меню
              <span className="flex w-6 flex-col gap-[5px]" aria-hidden="true">
                <span className="h-px w-full bg-bone" />
                <span className="h-px w-2/3 bg-bone transition-all duration-500 group-hover:w-full" />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            className="fixed inset-0 z-[60] flex flex-col bg-ink"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
              <Logo className="w-[96px] md:w-[124px]" />
              <button ref={closeBtn} type="button" onClick={() => setOpen(false)} className="label link-u text-bone">
                Закрыть
              </button>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-10 overflow-y-auto px-5 pb-8 md:px-10 lg:grid-cols-12">
              <ul className="flex flex-col justify-center lg:col-span-7" onMouseLeave={() => setHover(0)}>
                {MAIN.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-bone/10 first:border-t">
                    <m.div initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay: 0.25 + i * 0.07, ease: EASE }}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setHover(i)}
                        onFocus={() => setHover(i)}
                        className="group flex items-baseline gap-5 py-2 md:py-3"
                      >
                        <span className="label w-10 text-bone/40">13.{String(i + 1).padStart(2, '0')}</span>
                        <span
                          className={`display text-[clamp(2.75rem,8.5vw,7.5rem)] transition-all duration-700 ease-[var(--ease-cine)] group-hover:translate-x-3 ${
                            hover === i ? 'text-bone' : 'text-bone/35 lg:text-bone/25'
                          }`}
                        >
                          {l.label}
                        </span>
                      </Link>
                    </m.div>
                  </li>
                ))}
              </ul>

              <div className="relative hidden lg:col-span-5 lg:block">
                <div className="absolute inset-y-10 right-0 w-full overflow-hidden bg-char">
                  <AnimatePresence mode="popLayout">
                    <m.div
                      key={hover}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: EASE }}
                    >
                      <Cropped src={MAIN[hover].img} crop={MAIN[hover].crop} alt="" sizes="40vw" className="object-cover" />
                    </m.div>
                  </AnimatePresence>
                  <div className="vignette absolute inset-0" />
                </div>
              </div>
            </div>

            <m.div
              className="flex flex-col gap-6 border-t border-bone/10 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {SECONDARY.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="label link-u text-bone/70 hover:text-bone">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                <li><a href={PHONE_HREF} className="label link-u text-bone/50 hover:text-bone">{PHONE}</a></li>
                {[
                  ['Telegram', TELEGRAM_URL],
                  ['WhatsApp', WHATSAPP_URL],
                  ['Instagram', INSTAGRAM_URL],
                ].map(([name, href]) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="label link-u text-bone/50 hover:text-bone">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
