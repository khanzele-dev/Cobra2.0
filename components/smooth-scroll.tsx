'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

// Лёгкая инерция только для мыши/тачпада. Тач и prefers-reduced-motion — нативный скролл.
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return

    const lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, autoRaf: true })
    window.__lenis = lenis
    return () => {
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return null
}
