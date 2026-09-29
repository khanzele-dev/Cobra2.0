import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Michroma, Oswald } from 'next/font/google'
import { Header } from '@/components/header'
import { SmoothScroll } from '@/components/smooth-scroll'
import { FinalScreen } from '@/components/final-screen'
import { MotionProvider } from '@/components/motion-provider'
import './globals.css'

const oswald = Oswald({ subsets: ['latin', 'cyrillic'], variable: '--font-oswald', display: 'swap' })
const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'swap' })
const jet = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-jet', display: 'swap', weight: ['400'], preload: false })
// только для надписи 13 COBRA — латиница
const michroma = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-michroma', display: 'swap' })

export const metadata: Metadata = {
  title: '13 COBRA — Сила. Дисциплина. Результат.',
  description: 'Магазин спортивного питания и экипировки. Каспийск, ул. Кавказская, 16а. Бренд, выросший из зала BJJ «Кобра».',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable} ${jet.variable} ${michroma.variable}`}>
      <body>
        <a href="#main" className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-3 focus:text-ink">
          К содержимому
        </a>
        <MotionProvider>
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <FinalScreen />
        </MotionProvider>
      </body>
    </html>
  )
}
