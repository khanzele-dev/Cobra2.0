type Props = { className?: string; width?: string }

/**
 * Знак из файла бренда. Картинка служит маской, цвет — currentColor,
 * поэтому знак ведёт себя как текст: красится через text-*, размер задаётся шириной.
 */
function BrandMask({ src, ratio, label, className = '', width }: Props & { src: string; ratio: string; label: string }) {
  const mask = `url(${src}) center / contain no-repeat`
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block bg-current align-middle ${className}`}
      style={{ mask, WebkitMask: mask, aspectRatio: ratio, width }}
    />
  )
}

/** Надпись 13 COBRA */
export function Logo(props: Props) {
  return <BrandMask src="/logo-13cobra.png" ratio="1709 / 333" label="13 COBRA" {...props} />
}

/** Два знака бренда: «13» и кобра */
export function Marks(props: Props) {
  return <BrandMask src="/media/brand/marks.png" ratio="1400 / 652" label="Знаки 13 COBRA" {...props} />
}
