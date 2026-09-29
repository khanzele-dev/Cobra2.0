'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export function useMedia(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

export const useIsMobile = () => useMedia('(max-width: 767px)')

/** true — пользователь просил меньше движения: сцены становятся статичными */
export const useCalm = () => !!useReducedMotion()
