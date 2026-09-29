'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { Perforation } from '@/components/perforation'

type Art =
  | { kind: 'shelves'; tone: 'dark' | 'color' }
  | { kind: 'steel' }
  | { kind: 'type'; label: string }

// Пока реального фото нет — рисуем фрагмент магазина, а не пустоту
function artFor(src: string): Art {
  if (src.includes('store-wall') || src.includes('store-hall')) return { kind: 'shelves', tone: 'dark' }
  if (src.includes('store-shelf')) return { kind: 'shelves', tone: 'color' }
  if (src.includes('store-perforated') || src.includes('store-counter')) return { kind: 'steel' }
  if (src.includes('store-column')) return { kind: 'type', label: 'Бетон' }
  if (src.includes('academy') || src.includes('gym')) return { kind: 'type', label: 'Зал «Кобра»' }
  if (src.includes('coach')) return { kind: 'type', label: 'Тренер' }
  if (src.includes('apparel-kit')) return { kind: 'type', label: 'Комплект' }
  return { kind: 'type', label: '' }
}

const ROWS = [250, 470, 690, 910]
const COLS = [95, 265, 435, 605]

function StoreArt({ tone }: { tone: 'dark' | 'color' }) {
  const band = (row: number) => (tone === 'color' ? ['#0e5a37', '#b3161b', '#0e5a37', '#b3161b'][row] : '#a58d55')
  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sa-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f8d88" />
          <stop offset="1" stopColor="#5d5b57" />
        </linearGradient>
        <linearGradient id="sa-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff2dc" stopOpacity=".3" />
          <stop offset="1" stopColor="#fff2dc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sa-jar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#060606" />
          <stop offset=".35" stopColor="#222" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#sa-bg)" />
      {ROWS.map((y, r) => (
        <g key={y}>
          <rect x="40" y={y - 215} width="720" height="2" fill="#fff3df" />
          <rect x="40" y={y - 213} width="720" height="170" fill="url(#sa-glow)" />
          {COLS.map((x) => (
            <g key={x}>
              <rect x={x + 20} y={y - 172} width="60" height="20" rx="3" fill="#c9a955" opacity=".8" />
              <rect x={x} y={y - 154} width="100" height="154" rx="16" fill="url(#sa-jar)" />
              <rect x={x} y={y - 104} width="100" height="46" fill={band(r)} opacity=".9" />
              <rect x={x + 14} y={y - 146} width="8" height="136" rx="4" fill="#fff" opacity=".07" />
            </g>
          ))}
          <rect x="40" y={y} width="720" height="12" fill="#7b7a76" />
        </g>
      ))}
    </svg>
  )
}

function Fallback({ src, alt }: { src: string; alt: string }) {
  const art = artFor(src)
  const id = `pf${useId().replace(/[^a-z0-9]/gi, '')}`
  return (
    <div role="img" aria-label={alt} className="concrete absolute inset-0 overflow-hidden [container-type:inline-size]">
      {art.kind === 'shelves' && <StoreArt tone={art.tone} />}
      {art.kind === 'steel' && (
        <>
          <div className="steel absolute inset-0" />
          <Perforation id={id} size={44} className="absolute inset-0 text-[#151515]" />
        </>
      )}
      {art.kind === 'type' && (
        <span className="display outline-text absolute inset-0 flex items-center justify-center text-center text-[17cqw] leading-[0.85]">
          {art.label}
        </span>
      )}
      {process.env.NODE_ENV !== 'production' && (
        <span className="label absolute bottom-3 left-3 bg-ink/70 px-1 text-bone/50">public{src}</span>
      )}
    </div>
  )
}

type MediaProps = {
  src: string
  alt: string
  sizes: string
  className?: string
  eager?: boolean
}

/** Картинка на весь родитель (родитель — relative). Нет файла — нарисованная замена. */
export function Media({ src, alt, sizes, className = '', eager }: MediaProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <Fallback src={src} alt={alt} />
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

type CroppedProps = MediaProps & { crop?: 'left' | 'right' }

/** Половина широкого кадра: на фото комплекта перед и спина стоят рядом */
export function Cropped({ crop, className = 'object-contain', ...rest }: CroppedProps) {
  if (!crop) return <Media className={className} {...rest} />
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute inset-y-0 w-[200%] ${crop === 'right' ? '-left-full' : 'left-0'}`}>
        <Media className={className} {...rest} />
      </div>
    </div>
  )
}
