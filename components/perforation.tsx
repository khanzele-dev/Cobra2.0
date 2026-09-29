type Props = {
  /** уникальный id паттерна на странице */
  id: string
  size?: number
  className?: string
  /** не резать металл в центре — под надписью */
  clearCenter?: boolean
}

// Сетка «13», вырезанных в металле, — как перфорированная панель в магазине.
// Статичный SVG: растеризуется один раз, на скролл не влияет.
export function Perforation({ id, size = 56, className = '', clearCenter = false }: Props) {
  const mask = 'radial-gradient(ellipse 44% 30% at 50% 50%, transparent 60%, #000 100%)'
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      className={`pointer-events-none ${className}`}
      style={clearCenter ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <text x={size / 2} y={size * 0.6} textAnchor="middle" fontSize={size * 0.3} fill="currentColor" style={{ fontFamily: 'var(--font-wide)' }}>
            13
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
