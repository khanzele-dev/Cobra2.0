'use client'

import { LazyMotion, domAnimation } from 'framer-motion'

// Урезанный набор фич framer-motion; strict ругнётся, если где-то остался тяжёлый <motion.*>
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
